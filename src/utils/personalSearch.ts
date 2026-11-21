import type { ProfileData } from '../data/profileData';

export type SearchResultKind =
  | 'About'
  | 'Developer Profile'
  | 'Google Badges'
  | 'Capability'
  | 'Tech Stack'
  | 'Instagram'
  | 'Gaming'
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
  capcut: ['video editing', 'design', 'media', 'reels'],
  ui: ['ui/ux', 'frontend', 'micro-animations', 'liquid-glass'],
  ux: ['ui/ux', 'frontend', 'prototyping', 'editorial'],
  kolkata: ['location', 'india', 'remote', 'sarthak basu'],
  remote: ['kolkata', 'global', 'collaboration', 'availability'],
  ig: ['instagram', 'mr_the_sarthak', 'social', 'photos', 'reels'],
  insta: ['instagram', 'mr_the_sarthak', 'social'],
  instagram: ['ig', 'mr_the_sarthak', 'social', 'posts'],
  github: ['sarthakariya', 'repos', 'code', 'developer', 'projects'],
  repos: ['github', 'sarthakariya', 'projects', 'code'],
  gdev: ['google', 'badges', 'certificates', 'mrsarthak'],
  google: ['gdev', 'badges', 'certificates', 'mrsarthak', 'gcp'],
  badges: ['google', 'certificates', 'gdev', 'mrsarthak'],
  certificates: ['google', 'badges', 'gdev', 'mrsarthak'],
  minecraft: ['gaming', 'gamer', 'discord', 'mc'],
  mc: ['minecraft', 'gaming', 'gamer'],
  gta: ['gta v', 'gaming', 'gamer', 'discord'],
  gta5: ['gta v', 'gaming', 'gamer'],
  gamer: ['gaming', 'minecraft', 'gta v', 'discord'],
  gaming: ['gamer', 'minecraft', 'gta v', 'discord'],
  discord: ['gaming', 'minecraft', 'gta v', 'gamer'],
  stack: ['tech stack', 'languages', 'frameworks', 'tools'],
  hire: ['contact', 'email', 'connect', 'collaborate', 'remote'],
  contact: ['email', 'instagram', 'discord', 'connect'],
  mail: ['email', 'contact', '26sarthakbasu'],
  communication: ['transferable', 'collaboration', 'about'],
  deadlines: ['time management', 'transferable', 'about'],
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
    title: `About ${profile.fullName} — Full-Stack Web & AI Developer (${profile.city}, ${profile.country})`,
    snippet: profile.about.lead,
    body: [
      profile.about.lead,
      ...profile.about.paragraphs,
      ...profile.transferablePillars.map((p) => `${p.title} ${p.detail}`),
    ].join(' '),
    keywords: [
      'about',
      'story',
      'full-stack',
      'ai developer',
      'kolkata',
      'india',
      'remote',
      'communication',
      'problem-solving',
      'time management',
      profile.fullName,
    ],
    sectionId: 'about',
    meta: 'About Me · Kolkata, India',
  });

  docs.push({
    id: 'profile-github',
    kind: 'Developer Profile',
    title: `GitHub Engineering Repositories (${profile.socials.github.handle})`,
    snippet: `Inspect Sarthak Basu's public engineering repositories and activity at github.com/${profile.githubUsername}.`,
    body: `${profile.socials.github.url} ${profile.socials.github.handle} ${profile.socials.github.description} live github repos open source`,
    keywords: ['github', 'sarthakariya', 'repos', 'repositories', 'code', 'projects'],
    sectionId: 'profiles',
    meta: 'Developer Profile · Live API',
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
      'g.dev',
      'mrsarthak',
      'gdev',
      'credentials',
    ],
    sectionId: 'profiles',
    meta: 'Google Developer · mrsarthak',
  });

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
      sectionId: 'tech-stack',
      meta: `Technical Stack · ${group.index}`,
    });
  }

  docs.push({
    id: 'about-gaming',
    kind: 'Gaming',
    title: 'Off-Duty Gaming & Discord — Minecraft & GTA V',
    snippet: `${profile.gaming.discordNote} Games: ${profile.gaming.games.map((g) => g.name).join(' & ')}. Discord: ${profile.gaming.discordHandle}.`,
    body: `${profile.gaming.tagline} ${profile.gaming.discordHandle} ${profile.gaming.discordNote} ${profile.gaming.games.map((g) => `${g.name} ${g.style}`).join(' ')}`,
    keywords: ['gaming', 'gamer', 'minecraft', 'gta v', 'gta 5', 'discord', 'mc'],
    sectionId: 'about',
    meta: 'Off-Duty · Gaming & Discord',
  });

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
        doc.kind === 'Developer Profile' ||
        doc.kind === 'Google Badges' ||
        doc.kind === 'Instagram' ||
        doc.kind === 'Gaming' ||
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
