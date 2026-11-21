import type { ProfileData } from '../data/profileData';

export interface SchemaGraph {
  '@context': 'https://schema.org';
  '@graph': Array<Record<string, unknown>>;
}

export function buildPersonSchemaGraph(
  profile: ProfileData,
  baseUrl = ''
): SchemaGraph {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const personId = cleanBase ? `${cleanBase}/#sarthak-basu` : '#sarthak-basu';
  const websiteId = cleanBase ? `${cleanBase}/#website` : '#website';
  const profilePageId = cleanBase ? `${cleanBase}/#profile-page` : '#profile-page';

  const sameAs: string[] = [];
  if (profile.socials.instagram.enabled && profile.socials.instagram.url) {
    sameAs.push(profile.socials.instagram.url);
  }
  if (profile.socials.github.enabled && profile.socials.github.url) {
    sameAs.push(profile.socials.github.url);
  }
  if (profile.socials.googleDev.enabled && profile.socials.googleDev.url) {
    sameAs.push(profile.socials.googleDev.url);
  }
  if (profile.socials.linkedin.enabled && profile.socials.linkedin.url) {
    sameAs.push(profile.socials.linkedin.url);
  }

  const knowsAbout = Array.from(
    new Set([
      ...profile.seoKeywords.filter((k) => k !== profile.fullName),
      ...profile.skills.flatMap((skill) => skill.keywords),
      ...profile.techStack.flatMap((group) => group.tools),
    ])
  );

  const imageUrl = cleanBase
    ? `${cleanBase}${profile.portraitUrl.startsWith('/') ? '' : '/'}${profile.portraitUrl}`
    : profile.portraitUrl;

  const personNode: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: profile.fullName,
    givenName: profile.givenName,
    familyName: profile.familyName,
    alternateName: profile.alternateNames,
    jobTitle: 'Full-Stack Web & AI Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.city,
      addressCountry: profile.country,
    },
    email: `mailto:${profile.email}`,
    description: profile.tagline,
    image: imageUrl,
    knowsAbout,
    sameAs,
  };

  if (cleanBase) {
    personNode.url = cleanBase;
  }

  const profilePageNode: Record<string, unknown> = {
    '@type': 'ProfilePage',
    '@id': profilePageId,
    name: `${profile.fullName} — Full-Stack Web & AI Developer`,
    mainEntity: { '@id': personId },
  };

  if (cleanBase) {
    profilePageNode.url = cleanBase;
  }

  const websiteNode: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: profile.fullName,
    publisher: { '@id': personId },
    potentialAction: {
      '@type': 'SearchAction',
      target: cleanBase
        ? `${cleanBase}/?q={search_term_string}`
        : '?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  if (cleanBase) {
    websiteNode.url = cleanBase;
  }

  const faqNode: Record<string, unknown> = {
    '@type': 'FAQPage',
    mainEntity: profile.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [personNode, profilePageNode, websiteNode, faqNode],
  };
}
