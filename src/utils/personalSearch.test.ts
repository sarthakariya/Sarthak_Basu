import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { searchProfile, tokenizeQuery } from './personalSearch';

test('tokenizeQuery strips punctuation and removes stop words unless all are stop words', () => {
  assert.deepEqual(tokenizeQuery('What are the web development skills?'), [
    'web',
    'development',
    'skills',
  ]);
  assert.deepEqual(tokenizeQuery('who is'), ['who']);
});

test('searchProfile returns empty response for blank queries', () => {
  const res = searchProfile(PROFILE_DATA, '   ');
  assert.equal(res.quickAnswer, null);
  assert.equal(res.results.length, 0);
});

test('searchProfile surfaces Google Badges for "gdev" and "google badges"', () => {
  const gdevRes = searchProfile(PROFILE_DATA, 'gdev');
  assert.equal(gdevRes.results[0].id, 'profile-google-dev');
  assert.equal(gdevRes.results[0].sectionId, 'profiles');

  const badgeRes = searchProfile(PROFILE_DATA, 'google badges');
  assert.equal(badgeRes.results[0].id, 'profile-google-dev');
});

test('searchProfile surfaces GitHub live repositories for "github" and "sarthakariya"', () => {
  const res = searchProfile(PROFILE_DATA, 'github repos');
  assert.equal(res.results[0].id, 'profile-github');
  assert.equal(res.results[0].sectionId, 'profiles');
});

test('searchProfile finds Instagram showcase when searching "ig" or "@mr_the_sarthak"', () => {
  const igRes = searchProfile(PROFILE_DATA, 'ig');
  assert.equal(igRes.results[0].id, 'social-instagram');
  assert.equal(igRes.results[0].sectionId, 'instagram');

  const handleRes = searchProfile(PROFILE_DATA, '@mr_the_sarthak');
  assert.equal(handleRes.results[0].id, 'social-instagram');
});

test('searchProfile finds Minecraft, GTA V, and Discord gaming card', () => {
  const mcRes = searchProfile(PROFILE_DATA, 'minecraft');
  assert.equal(mcRes.results[0].id, 'about-gaming');

  const gtaRes = searchProfile(PROFILE_DATA, 'gta 5');
  assert.equal(gtaRes.results[0].id, 'about-gaming');
});

test('searchProfile ranks Time Management top for deadline queries', () => {
  const res = searchProfile(PROFILE_DATA, 'time management');
  assert.equal(res.results[0].id, 'skill-time-management');
  assert.equal(res.results[0].sectionId, 'skills');
});

test('searchProfile omits disabled LinkedIn profile', () => {
  const res = searchProfile(PROFILE_DATA, 'linkedin');
  assert.equal(
    res.results.some((item) => item.id === 'social-linkedin'),
    false
  );
});
