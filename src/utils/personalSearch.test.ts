import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { searchProfile, tokenizeQuery } from './personalSearch';

test('tokenizeQuery strips punctuation and removes stop words unless all are stop words', () => {
  assert.deepEqual(tokenizeQuery('What are the AI agent skills?'), [
    'ai',
    'agent',
    'skills',
  ]);
  assert.deepEqual(tokenizeQuery('who is'), ['who']);
});

test('searchProfile returns empty response for blank queries', () => {
  const res = searchProfile(PROFILE_DATA, '   ');
  assert.equal(res.quickAnswer, null);
  assert.equal(res.results.length, 0);
});

test('searchProfile surfaces AI Agents & ADK capability for "adk" and "gemini api"', () => {
  const adkRes = searchProfile(PROFILE_DATA, 'adk');
  assert.equal(adkRes.results[0].id, 'skill-ai-agents');
  assert.equal(adkRes.results[0].sectionId, 'skills');

  const geminiRes = searchProfile(PROFILE_DATA, 'gemini api');
  assert.ok(
    geminiRes.results.some((r) => r.id === 'skill-ai-agents' || r.id === 'stack-ai')
  );
});

test('searchProfile surfaces Backend & Cloud or Tech Stack for "spring boot" and "supabase"', () => {
  const springRes = searchProfile(PROFILE_DATA, 'spring boot');
  assert.ok(
    springRes.results.some(
      (r) => r.id === 'skill-backend-cloud' || r.id === 'stack-languages'
    )
  );

  const supaRes = searchProfile(PROFILE_DATA, 'supabase');
  assert.ok(
    supaRes.results.some(
      (r) => r.id === 'skill-backend-cloud' || r.id === 'stack-backend'
    )
  );
});

test('searchProfile surfaces Google Badges for "gdev" and GitHub for "github"', () => {
  assert.equal(searchProfile(PROFILE_DATA, 'gdev').results[0].id, 'profile-google-dev');
  assert.equal(searchProfile(PROFILE_DATA, 'github').results[0].id, 'profile-github');
});

test('searchProfile finds Instagram showcase for "ig" and "@mr_the_sarthak"', () => {
  assert.equal(searchProfile(PROFILE_DATA, 'ig').results[0].id, 'social-instagram');
  assert.equal(
    searchProfile(PROFILE_DATA, '@mr_the_sarthak').results[0].id,
    'social-instagram'
  );
});

test('searchProfile finds Friends Fun SMP community, Karate/Swimming certificates, and omits disabled LinkedIn', () => {
  assert.equal(
    searchProfile(PROFILE_DATA, 'friends fun').results[0].id,
    'community-friends-fun'
  );
  assert.equal(
    searchProfile(PROFILE_DATA, 'karate').results[0].id,
    'cert-karate'
  );
  assert.equal(
    searchProfile(PROFILE_DATA, 'swimming').results[0].id,
    'cert-swimming'
  );
  assert.equal(
    searchProfile(PROFILE_DATA, 'linkedin').results.some(
      (item) => item.id === 'social-linkedin'
    ),
    false
  );
});
