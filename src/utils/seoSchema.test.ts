import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_DATA } from '../data/profileData';
import { buildPersonSchemaGraph } from './seoSchema';

test('buildPersonSchemaGraph includes Instagram, GitHub, and Google Developer URL in sameAs and omits disabled LinkedIn', () => {
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
  assert.equal(
    (person.address as Record<string, string>).addressLocality,
    'Kolkata'
  );
  const knowsAbout = person.knowsAbout as string[];
  assert.ok(knowsAbout.includes('Agent Development Kit (ADK)'));
  assert.ok(knowsAbout.includes('Spring Boot'));

  const sameAs = person.sameAs as string[];
  assert.ok(sameAs.includes('https://www.instagram.com/mr_the_sarthak/'));
  assert.ok(sameAs.includes('https://github.com/sarthakariya'));
  assert.ok(sameAs.includes('https://me.developers.google.com/u/mrsarthak'));
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
