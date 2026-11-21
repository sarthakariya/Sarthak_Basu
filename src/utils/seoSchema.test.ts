import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { buildPersonSchemaGraph } from './seoSchema';

test('buildPersonSchemaGraph generates Person, ProfilePage, WebSite, and FAQPage nodes', () => {
  const graph = buildPersonSchemaGraph(PROFILE_DATA, 'https://sarthakbasu.github.io');
  assert.equal(graph['@context'], 'https://schema.org');
  const types = graph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['Person', 'ProfilePage', 'WebSite', 'FAQPage']);

  const person = graph['@graph'][0];
  assert.equal(person.name, 'Sarthak Basu');
  assert.equal(person.email, 'mailto:26sarthakbasu@gmail.com');
  assert.ok(Array.isArray(person.sameAs));
  assert.ok((person.sameAs as string[]).includes('https://instagram.com/sarthakbasu'));
  assert.equal(
    (person.sameAs as string[]).some((url) => url.includes('linkedin')),
    false
  );
});

test('buildPersonSchemaGraph includes LinkedIn automatically once enabled', () => {
  const updated = {
    ...PROFILE_DATA,
    socials: {
      ...PROFILE_DATA.socials,
      linkedin: {
        ...PROFILE_DATA.socials.linkedin,
        enabled: true,
        url: 'https://linkedin.com/in/sarthak-basu',
      },
    },
  };
  const graph = buildPersonSchemaGraph(updated, 'https://sarthakbasu.github.io');
  const person = graph['@graph'][0];
  assert.ok(
    (person.sameAs as string[]).includes('https://linkedin.com/in/sarthak-basu')
  );
});
