import type { ProfileData } from '../data/profileData';

export type SearchResultKind =
  | 'Biography'
  | 'Skill'
  | 'Key Detail'
  | 'Visual Journal'
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
  ig: ['instagram', 'social', 'handle', 'photos'],
  insta: ['instagram', 'social', 'handle'],
  instagram: ['ig', 'social', 'connect'],
  linkedin: ['third', 'executive', 'business', 'bio', 'resume'],
  cv: ['bio', 'third', 'executive', 'skills', 'details'],
  resume: ['bio', 'third', 'executive', 'skills', 'transferable'],
  hire: ['contact', 'email', 'connect', 'availability'],
  contact: ['email', 'instagram', 'connect', 'reach'],
  reach: ['contact', 'email', 'instagram', 'connect'],
  mail: ['email', 'contact', '26sarthakbasu'],
  speak: ['communication', 'presentations', 'verbal', 'storytelling'],
  speaking: ['communication', 'presentations', 'stakeholder'],
  writing: ['communication', 'written', 'clarity'],
  listen: ['communication', 'listening', 'stakeholder'],
  debug: ['problem', 'solving', 'root-cause', 'analytical'],
  analysis: ['analytical', 'problem', 'solving', 'first-principles'],
  critical: ['problem', 'solving', 'thinking', 'analytical'],
  deadlines: ['time', 'management', 'priority', 'reliability', 'schedule'],
  schedule: ['time', 'management', 'deep-work', 'priority'],
  organize: ['time', 'management', 'workflow', 'priority'],
  productivity: ['time', 'management', 'deep-work', 'execution'],
  video: ['reel', 'media', 'gallery', 'visual', 'film'],
  photos: ['photography', 'gallery', 'visual', 'journal'],
  photo: ['photography', 'gallery', 'visual'],
  team: ['collaboration', 'leadership', 'cross-functional'],
  who: ['sarthak', 'basu', 'about', 'biography', 'profile'],
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
    id: 'bio-first-person',
    kind: 'Biography',
    title: 'First-Person Story (Personal Voice)',
    snippet: profile.bio.firstPerson.lead,
    body: [profile.bio.firstPerson.lead, ...profile.bio.firstPerson.paragraphs].join(' '),
    keywords: [
      'first person',
      'personal',
      'story',
      'about me',
      profile.fullName,
      'introduction',
    ],
    sectionId: 'about',
    meta: 'Biography · First Person',
    actionHint: 'first-person',
  });

  docs.push({
    id: 'bio-third-person',
    kind: 'Biography',
    title: 'Objective Third-Person Bio (Business & LinkedIn)',
    snippet: profile.bio.thirdPerson.lead,
    body: [profile.bio.thirdPerson.lead, ...profile.bio.thirdPerson.paragraphs].join(' '),
    keywords: [
      'third person',
      'executive',
      'objective',
      'business',
      'linkedin',
      'press',
      'bio',
      profile.fullName,
    ],
    sectionId: 'about',
    meta: 'Biography · Third Person',
    actionHint: 'third-person',
  });

  for (const skill of profile.skills) {
    docs.push({
      id: skill.id,
      kind: 'Skill',
      title: skill.title,
      snippet: skill.summary,
      body: `${skill.summary} ${skill.methodology} ${skill.impactMetric}`,
      keywords: [skill.category, ...skill.keywords, 'transferable skills'],
      sectionId: 'skills',
      meta: `Transferable Skill · ${skill.category}`,
      actionHint: skill.category,
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

  for (const item of profile.media) {
    docs.push({
      id: item.id,
      kind: 'Visual Journal',
      title: item.title,
      snippet: item.caption,
      body: `${item.subtitle} ${item.caption} ${item.alt}`,
      keywords: [item.type, item.category, 'gallery', 'visual', 'media'],
      sectionId: 'gallery',
      meta: `${item.category} · ${item.date}`,
      actionHint: item.id,
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

  if (profile.socials.instagram.enabled) {
    docs.push({
      id: 'social-instagram',
      kind: 'Connect',
      title: `Instagram (${profile.socials.instagram.handle})`,
      snippet: profile.socials.instagram.description,
      body: `${profile.socials.instagram.label} ${profile.socials.instagram.handle} ${profile.socials.instagram.url} ${profile.socials.instagram.description}`,
      keywords: ['instagram', 'ig', 'insta', 'social', 'follow', 'dm'],
      sectionId: 'connect',
      meta: 'Social Profile · Active',
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
    keywords: ['email', 'contact', 'hire', 'message', 'collaborate', 'inquiry'],
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
        doc.kind === 'Skill' || doc.kind === 'Biography'
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
