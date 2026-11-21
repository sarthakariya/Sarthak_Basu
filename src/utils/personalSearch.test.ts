import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { searchProfile, tokenizeQuery } from './personalSearch';

test('tokenizeQuery strips punctuation and removes stop words unless all are stop words', () => {
  assert.deepEqual(tokenizeQuery('What are the communication skills?'), [
    'communication',
    'skills',
  ]);
  assert.deepEqual(tokenizeQuery('who is'), ['who']);
});

test('searchProfile returns empty response for blank queries', () => {
  const res = searchProfile(PROFILE_DATA, '   ');
  assert.equal(res.quickAnswer, null);
  assert.equal(res.results.length, 0);
});

test('searchProfile ranks Time Management top for deadline and time management queries', () => {
  const deadlineRes = searchProfile(PROFILE_DATA, 'deadlines');
  assert.ok(deadlineRes.quickAnswer !== null);
  assert.equal(deadlineRes.results[0].id, 'skill-time-management');
  assert.equal(deadlineRes.results[0].sectionId, 'skills');

  const directRes = searchProfile(PROFILE_DATA, 'time management');
  assert.equal(directRes.results[0].id, 'skill-time-management');
  assert.equal(
    directRes.quickAnswer?.heading,
    'Time Management & Priority Architecture'
  );
});

test('searchProfile finds Instagram when user searches shorthand "ig"', () => {
  const res = searchProfile(PROFILE_DATA, 'ig');
  assert.ok(res.results.some((item) => item.id === 'social-instagram'));
  assert.equal(res.results[0].id, 'social-instagram');
});

test('searchProfile does not expose disabled LinkedIn profile', () => {
  const res = searchProfile(PROFILE_DATA, 'linkedin');
  assert.equal(
    res.results.some((item) => item.id === 'social-linkedin'),
    false
  );
  // Still surfaces the third-person executive bio written for LinkedIn use
  assert.ok(res.results.some((item) => item.id === 'bio-third-person'));
});

test('searchProfile returns no matches cleanly for unrelated gibberish', () => {
  const res = searchProfile(PROFILE_DATA, 'zxqvbnm12345');
  assert.equal(res.quickAnswer, null);
  assert.equal(res.results.length, 0);
});
