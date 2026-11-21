import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFallbackGitHubPreview,
  formatRepoUpdatedDate,
  isBusinessRelevantRepo,
  normalizeGitHubRepos,
  normalizeGitHubUser,
} from './githubPreview';

test('normalizeGitHubUser enforces clean business display name when GitHub name is stylized', () => {
  const user = normalizeGitHubUser(
    { login: 'sarthakariya', name: 'S@rth@k ;)', public_repos: 23, followers: 1 },
    'sarthakariya'
  );
  assert.equal(user.login, 'sarthakariya');
  assert.equal(user.name, 'Sarthak Basu');
  assert.equal(user.publicRepos, 23);
  assert.equal(user.followers, 1);
  assert.equal(user.htmlUrl, 'https://github.com/sarthakariya');
});

test('isBusinessRelevantRepo filters out personal/non-business repositories', () => {
  assert.equal(isBusinessRelevantRepo('1st-Anniversary'), false);
  assert.equal(isBusinessRelevantRepo('our-music-together1'), false);
  assert.equal(isBusinessRelevantRepo('We-watch'), false);
  assert.equal(isBusinessRelevantRepo('Our-Ellipse'), false);
  assert.equal(isBusinessRelevantRepo('Sarthak_Basu'), true);
  assert.equal(isBusinessRelevantRepo('24-7news'), true);
  assert.equal(isBusinessRelevantRepo('CinemaCast'), true);
});

test('normalizeGitHubRepos filters personal repos and sorts business repos by non-fork & stars', () => {
  const repos = normalizeGitHubRepos(
    [
      {
        id: 1,
        name: '1st-Anniversary',
        fork: false,
        stargazers_count: 50,
        updated_at: '2026-11-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'Sarthak_Basu',
        fork: false,
        language: 'TypeScript',
        stargazers_count: 5,
        updated_at: '2026-11-10T00:00:00Z',
      },
      {
        id: 3,
        name: 'CinemaCast',
        fork: false,
        language: 'JavaScript',
        stargazers_count: 14,
        updated_at: '2026-10-01T00:00:00Z',
      },
    ],
    4
  );

  assert.equal(repos.length, 2);
  assert.equal(repos[0].name, 'CinemaCast');
  assert.equal(repos[1].name, 'Sarthak_Basu');
});

test('formatRepoUpdatedDate formats ISO strings and handles invalid input', () => {
  assert.equal(formatRepoUpdatedDate('2026-11-15T12:00:00Z'), 'Nov 2026');
  assert.equal(formatRepoUpdatedDate('invalid-date'), 'Active');
});

test('buildFallbackGitHubPreview returns valid direct profile URL', () => {
  const fb = buildFallbackGitHubPreview('sarthakariya', '/portrait.jpg');
  assert.equal(fb.source, 'fallback');
  assert.equal(fb.user.htmlUrl, 'https://github.com/sarthakariya');
  assert.equal(fb.user.avatarUrl, '/portrait.jpg');
});
