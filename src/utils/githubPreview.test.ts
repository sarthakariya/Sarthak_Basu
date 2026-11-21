import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFallbackGitHubPreview,
  formatRepoUpdatedDate,
  normalizeGitHubRepos,
  normalizeGitHubUser,
} from './githubPreview';

test('normalizeGitHubUser falls back safely on missing fields', () => {
  const user = normalizeGitHubUser(
    { login: 'sarthakariya', public_repos: 12, followers: 5 },
    'sarthakariya'
  );
  assert.equal(user.login, 'sarthakariya');
  assert.equal(user.name, 'Sarthak Basu');
  assert.equal(user.publicRepos, 12);
  assert.equal(user.followers, 5);
  assert.equal(user.htmlUrl, 'https://github.com/sarthakariya');
});

test('normalizeGitHubRepos prioritizes non-fork repos and higher stars', () => {
  const repos = normalizeGitHubRepos(
    [
      {
        id: 1,
        name: 'forked-lib',
        fork: true,
        stargazers_count: 20,
        updated_at: '2026-10-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'my-portfolio',
        fork: false,
        language: 'TypeScript',
        stargazers_count: 5,
        updated_at: '2026-11-01T00:00:00Z',
      },
      {
        id: 3,
        name: 'web-starter',
        fork: false,
        language: 'HTML',
        stargazers_count: 14,
        updated_at: '2026-09-01T00:00:00Z',
      },
    ],
    4
  );

  assert.equal(repos.length, 3);
  assert.equal(repos[0].name, 'web-starter');
  assert.equal(repos[1].name, 'my-portfolio');
  assert.equal(repos[2].name, 'forked-lib');
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
