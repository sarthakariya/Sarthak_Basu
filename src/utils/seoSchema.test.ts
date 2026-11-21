import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { buildPersonSchemaGraph } from './seoSchema';

test('buildPersonSchemaGraph includes Instagram, GitHub, and g.dev in sameAs and omits disabled LinkedIn', () => {
  const graph = buildPersonSchemaGraph(
    PROFILE_DATA,
    'https://sarthakariya.github.io'
  );
  assert.equal(graph['@context'], 'https://schema.org');
  const types = graph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['Person', 'ProfilePage', 'WebSite', 'FAQPage']);

  const person = graph['@graph'][0];
  assert.equal(person.name, 'Sarthak Basu');
  assert.equal(person.email, 'mailto:26sarthakbasu@gmail.com');
  const sameAs = person.sameAs as string[];
  assert.ok(sameAs.includes('https://instagram.com/mr_the_sarthak'));
  assert.ok(sameAs.includes('https://github.com/sarthakariya'));
  assert.ok(sameAs.includes('https://g.dev/mrsarthak'));
  assert.equal(
    sameAs.some((url) => url.includes('linkedin')),
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
  const graph = buildPersonSchemaGraph(
    updated,
    'https://sarthakariya.github.io'
  );
  const person = graph['@graph'][0];
  assert.ok(
    (person.sameAs as string[]).includes('https://linkedin.com/in/sarthak-basu')
  );
});
