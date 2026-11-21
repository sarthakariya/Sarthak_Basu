import type { ProfileData } from '../data/profileData';

export type SearchResultKind =
  | 'About'
  | 'Community'
  | 'Certificates'
  | 'Developer Profile'
  | 'Google Badges'
  | 'Capability'
  | 'Tech Stack'
  | 'Instagram'
  | 'Key Detail'
  | 'FAQ'
  | 'Connect';

export interface SearchResultItem {
  id: string;
  kind: SearchResultKind;
  title: string;
  snippet: string;
  sectionId: string;
  meta: string;
  score: number;
  matchedTerms: string[];
  actionHint?: string;
}

export interface PersonalSearchResponse {
  query: string;
  normalizedQuery: string;
  quickAnswer: {
    heading: string;
    body: string;
    sectionId: string;
    sourceLabel: string;
  } | null;
  results: SearchResultItem[];
}

interface SearchDocument {
  id: string;
  kind: SearchResultKind;
  title: string;
  snippet: string;
  body: string;
  keywords: string[];
  sectionId: string;
  meta: string;
  actionHint?: string;
}

const SYNONYM_MAP: Record<string, string[]> = {
  adk: ['agent development kit', 'ai agents', 'gemini', 'workflows'],
  ai: ['agent development kit', 'gemini api', 'google ai studio', 'agents', 'opal', 'jules'],
  llm: ['ai agents', 'gemini api', 'adk', 'workflows'],
  gemini: ['ai agents', 'google ai studio', 'adk'],
  cursor: ['ai', 'agentic', 'tools', 'stack'],
  opal: ['ai', 'agentic', 'tools', 'stack'],
  jules: ['ai', 'agentic', 'tools', 'stack'],
  spring: ['spring boot', 'java', 'backend'],
  java: ['spring boot', 'languages', 'backend', 'stack'],
  python: ['languages', 'ai', 'backend', 'stack'],
  firebase: ['realtime', 'database', 'backend', 'cloud', 'supabase'],
  supabase: ['database', 'backend', 'cloud', 'firebase'],
  gcp: ['google cloud platform', 'cloud', 'hosting'],
  netlify: ['hosting', 'github pages', 'cloud'],
  capcut: ['video editing', 'design', 'media'],
  ui: ['ui/ux', 'frontend', 'micro-animations'],
  ux: ['ui/ux', 'frontend', 'prototyping'],
  kolkata: ['location', 'india', 'remote', 'sarthak basu'],
  remote: ['kolkata', 'global', 'collaboration', 'availability'],
  ig: ['instagram', 'mr_the_sarthak', 'social'],
  insta: ['instagram', 'mr_the_sarthak', 'social'],
  instagram: ['ig', 'mr_the_sarthak', 'social'],
  github: ['sarthakariya', 'repos', 'code', 'developer', 'projects'],
  repos: ['github', 'sarthakariya', 'projects', 'code'],
  gdev: ['google', 'badges', 'certificates', 'mrsarthak'],
  google: ['gdev', 'badges', 'certificates', 'mrsarthak', 'gcp'],
  badges: ['google', 'certificates', 'gdev', 'mrsarthak'],
  certificates: ['karate', 'swimming', 'class 10', 'google', 'badges'],
  karate: ['certificates', 'sports', 'martial arts', 'discipline'],
  swimming: ['certificates', 'sports', 'aquatic', 'athletic'],
  minecraft: ['friends fun', 'smp', 'community', '10000', 'server'],
  smp: ['friends fun', 'minecraft', 'community', '10000'],
  community: ['friends fun', 'smp', 'minecraft', '10000', 'founder'],
  stack: ['tech stack', 'languages', 'frameworks', 'tools'],
  hire: ['contact', 'email', 'connect', 'collaborate', 'remote'],
  contact: ['email', 'instagram', 'connect'],
  mail: ['email', 'contact', '26sarthakbasu'],
  who: ['sarthak', 'basu', 'about', 'full-stack', 'kolkata'],
};

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'of',
  'to',
  'in',
  'for',
  'on',
  'with',
  'at',
  'by',
  'and',
  'or',
  'about',
  'me',
  'his',
  'what',
  'how',
  'does',
  'do',
  'can',
  'i',
]);

export function tokenizeQuery(input: string): string[] {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9@._\-\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 0);

  const nonStop = cleaned.filter((token) => !STOP_WORDS.has(token));
  return nonStop.length > 0 ? nonStop : cleaned;
}

export function expandTokens(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);
  for (const token of tokens) {
    const synonyms = SYNONYM_MAP[token];
    if (synonyms) {
      for (const syn of synonyms) {
        expanded.add(syn);
      }
    }
  }
  return Array.from(expanded);
}

export function buildSearchCorpus(profile: ProfileData): SearchDocument[] {
  const docs: SearchDocument[] = [];

  docs.push({
    id: 'about-story',
    kind: 'About',
    title: `${profile.fullName} — Full-Stack Web & AI Developer (${profile.city}, ${profile.country})`,
    snippet: profile.about.lead,
    body: [profile.about.lead, ...profile.about.paragraphs].join(' '),
    keywords: [
      'about',
      'story',
      'full-stack',
      'ai developer',
      'kolkata',
      'india',
      'remote',
      'class 12',
      profile.fullName,
    ],
    sectionId: 'about',
    meta: 'Profile · Kolkata, India',
  });

  docs.push({
    id: 'community-friends-fun',
    kind: 'Community',
    title: `${profile.community.name} — ${profile.community.memberCount} Member Community`,
    snippet: profile.community.summary,
    body: [
      profile.community.name,
      profile.community.role,
      profile.community.memberCount,
      profile.community.url,
      profile.community.summary,
      ...profile.community.highlights.map((h) => `${h.title} ${h.detail}`),
    ].join(' '),
    keywords: [
      'friends fun',
      'friends fun smp',
      'smp',
      'minecraft',
      '10000',
      '10,000',
      'community',
      'founder',
      'owner',
      'wixsite',
    ],
    sectionId: 'community',
    meta: 'Founder & Lead Developer · 10,000+ Members',
  });

  docs.push({
    id: 'profile-github',
    kind: 'Developer Profile',
    title: `GitHub Engineering Profile (${profile.socials.github.handle})`,
    snippet: `Verified GitHub profile showcasing pinned repositories, achievements, and 255+ contributions at github.com/${profile.githubUsername}.`,
    body: `${profile.socials.github.url} ${profile.socials.github.handle} ${profile.socials.github.description} github repos open source`,
    keywords: ['github', 'sarthakariya', 'repos', 'repositories', 'code', 'projects'],
    sectionId: 'profiles',
    meta: 'Verified Profile · GitHub',
  });

  docs.push({
    id: 'profile-google-dev',
    kind: 'Google Badges',
    title: `${profile.googleDev.headline} (${profile.googleDev.handle})`,
    snippet: profile.googleDev.summary,
    body: [
      profile.googleDev.handle,
      profile.googleDev.url,
      profile.googleDev.summary,
      ...profile.googleDev.badges.map((b) => `${b.title} ${b.summary} ${b.category}`),
    ].join(' '),
    keywords: [
      'google',
      'google profile',
      'badges',
      'certificates',
      'me.developers.google.com',
      'mrsarthak',
      'gdev',
      'credentials',
    ],
    sectionId: 'profiles',
    meta: 'Google Builders Hub · u/mrsarthak',
  });

  for (const cert of profile.certificates) {
    docs.push({
      id: cert.id,
      kind: 'Certificates',
      title: cert.title,
      snippet: cert.summary,
      body: `${cert.title} ${cert.issuer} ${cert.categoryLabel} ${cert.summary} ${cert.credentialNote}`,
      keywords: ['certificate', 'certificates', cert.categoryLabel, cert.title, cert.issuer],
      sectionId: 'certificates',
      meta: `Certification · ${cert.categoryLabel}`,
    });
  }

  for (const skill of profile.skills) {
    docs.push({
      id: skill.id,
      kind: 'Capability',
      title: skill.title,
      snippet: skill.summary,
      body: `${skill.summary} ${skill.impactMetric}`,
      keywords: [skill.category, ...skill.keywords],
      sectionId: 'skills',
      meta: `Core Capability · ${skill.category}`,
      actionHint: skill.category,
    });
  }

  for (const group of profile.techStack) {
    docs.push({
      id: group.id,
      kind: 'Tech Stack',
      title: `Tech Stack · ${group.category}`,
      snippet: `${group.tools.join(' · ')} — ${group.note}`,
      body: `${group.category} ${group.tools.join(' ')} ${group.note}`,
      keywords: ['tech stack', 'stack', group.category, ...group.tools],
      sectionId: 'skills',
      meta: `Technical Stack · ${group.index}`,
    });
  }

  if (profile.socials.instagram.enabled) {
    docs.push({
      id: 'social-instagram',
      kind: 'Instagram',
      title: `Instagram Live Preview (${profile.socials.instagram.handle})`,
      snippet: `${profile.instagramPreview.bioLines.join(' · ')}`,
      body: `${profile.socials.instagram.label} ${profile.socials.instagram.handle} ${profile.socials.instagram.url} ${profile.instagramPreview.bioLines.join(' ')}`,
      keywords: [
        'instagram',
        'ig',
        'insta',
        'mr_the_sarthak',
        profile.socials.instagram.handle,
        'social',
        'profile',
      ],
      sectionId: 'instagram',
      meta: 'Live Instagram Embed · @mr_the_sarthak',
    });
  }

  for (const detail of profile.keyDetails) {
    docs.push({
      id: `detail-${detail.label.toLowerCase().replace(/\s+/g, '-')}`,
      kind: 'Key Detail',
      title: `${detail.label}: ${detail.value}`,
      snippet: detail.context,
      body: `${detail.label} ${detail.value} ${detail.context}`,
      keywords: [detail.label, detail.value],
      sectionId: 'about',
      meta: 'Profile Detail',
    });
  }

  for (const faq of profile.faqs) {
    docs.push({
      id: faq.id,
      kind: 'FAQ',
      title: faq.question,
      snippet: faq.answer,
      body: `${faq.question} ${faq.answer}`,
      keywords: faq.keywords,
      sectionId: 'faq',
      meta: 'Direct Q&A',
      actionHint: faq.id,
    });
  }

  if (profile.socials.linkedin.enabled && profile.socials.linkedin.url) {
    docs.push({
      id: 'social-linkedin',
      kind: 'Connect',
      title: `LinkedIn (${profile.socials.linkedin.handle})`,
      snippet: profile.socials.linkedin.description,
      body: `${profile.socials.linkedin.label} ${profile.socials.linkedin.url}`,
      keywords: ['linkedin', 'network', 'professional'],
      sectionId: 'connect',
      meta: 'Social Profile · Active',
    });
  }

  docs.push({
    id: 'contact-email',
    kind: 'Connect',
    title: `Direct Email (${profile.email})`,
    snippet: `${profile.availability}. Reach ${profile.fullName} directly via email or the contact form below.`,
    body: `${profile.email} ${profile.availability} ${profile.location}`,
    keywords: ['email', 'contact', 'hire', 'message', 'collaborate', 'remote', 'inquiry'],
    sectionId: 'connect',
    meta: 'Direct Contact',
  });

  return docs;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesText(haystack: string, needle: string): boolean {
  if (!needle) return false;
  if (needle.length <= 3) {
    const pattern = new RegExp(`\\b${escapeRegExp(needle)}\\b`, 'i');
    return pattern.test(haystack);
  }
  return haystack.includes(needle);
}

export function searchProfile(
  profile: ProfileData,
  rawQuery: string,
  limit = 6
): PersonalSearchResponse {
  const normalizedQuery = rawQuery.trim();
  if (!normalizedQuery) {
    return {
      query: rawQuery,
      normalizedQuery: '',
      quickAnswer: null,
      results: [],
    };
  }

  const baseTokens = tokenizeQuery(normalizedQuery);
  const expandedTokens = expandTokens(baseTokens);
  const corpus = buildSearchCorpus(profile);
  const lowerFullQuery = normalizedQuery.toLowerCase();

  const scored: SearchResultItem[] = [];

  for (const doc of corpus) {
    const titleLower = doc.title.toLowerCase();
    const keywordsList = doc.keywords.map((k) => k.toLowerCase());
    const keywordsLower = keywordsList.join(' ');
    const bodyLower = doc.body.toLowerCase();
    const matched = new Set<string>();
    let score = 0;

    if (matchesText(titleLower, lowerFullQuery)) {
      score += 45;
      matched.add(normalizedQuery);
    } else if (keywordsList.includes(lowerFullQuery)) {
      score += 42;
      matched.add(normalizedQuery);
    } else if (matchesText(keywordsLower, lowerFullQuery)) {
      score += 36;
      matched.add(normalizedQuery);
    } else if (matchesText(bodyLower, lowerFullQuery)) {
      score += 22;
      matched.add(normalizedQuery);
    }

    for (const token of baseTokens) {
      if (matchesText(titleLower, token)) {
        score += 18;
        matched.add(token);
      }
      if (keywordsList.includes(token)) {
        score += 20;
        matched.add(token);
      } else if (matchesText(keywordsLower, token)) {
        score += 14;
        matched.add(token);
      }
      if (matchesText(bodyLower, token)) {
        score += 7;
        matched.add(token);
      }
    }

    for (const syn of expandedTokens) {
      if (baseTokens.includes(syn)) continue;
      if (matchesText(titleLower, syn)) {
        score += 11;
        matched.add(syn);
      } else if (matchesText(keywordsLower, syn)) {
        score += 8;
        matched.add(syn);
      } else if (matchesText(bodyLower, syn)) {
        score += 3;
      }
    }

    if (score > 0) {
      const richnessBoost =
        doc.kind === 'Capability' ||
        doc.kind === 'Tech Stack' ||
        doc.kind === 'Community' ||
        doc.kind === 'Certificates' ||
        doc.kind === 'Developer Profile' ||
        doc.kind === 'Google Badges' ||
        doc.kind === 'Instagram' ||
        doc.kind === 'About'
          ? 8
          : doc.kind === 'Connect' || doc.kind === 'FAQ'
            ? 4
            : 0;
      scored.push({
        id: doc.id,
        kind: doc.kind,
        title: doc.title,
        snippet: doc.snippet,
        sectionId: doc.sectionId,
        meta: doc.meta,
        score: score + richnessBoost,
        matchedTerms: Array.from(matched).slice(0, 4),
        actionHint: doc.actionHint,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const results = scored.slice(0, limit);
  const top = results[0] ?? null;

  return {
    query: rawQuery,
    normalizedQuery,
    quickAnswer: top
      ? {
          heading: top.title,
          body: top.snippet,
          sectionId: top.sectionId,
          sourceLabel: top.meta,
        }
      : null,
    results,
  };
}
