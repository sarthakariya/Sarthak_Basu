export type SkillCategory =
  | 'AI & Agents'
  | 'Full-Stack Web'
  | 'UI/UX Engineering'
  | 'Backend & Cloud';

export interface CapabilityItem {
  id: string;
  index: string;
  category: SkillCategory;
  title: string;
  summary: string;
  impactMetric: string;
  keywords: string[];
}

export interface TechStackGroup {
  id: string;
  index: string;
  category: string;
  tools: string[];
  note: string;
}

export interface StatMetric {
  id: string;
  target: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface CommunityShowcase {
  name: string;
  role: string;
  memberCount: string;
  launched: string;
  url: string;
  displayUrl: string;
  summary: string;
  highlights: Array<{
    title: string;
    detail: string;
  }>;
}

export type CertificateCategory = 'ai' | 'badges' | 'academics' | 'sports';

export type CertificateImageKey =
  | 'bserc-ai-2026'
  | 'quizoff-2026'
  | 'gemini-quizoff-2026';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: CertificateCategory;
  categoryLabel: string;
  period: string;
  summary: string;
  credentialNote: string;
  credentialId?: string;
  verificationUrl?: string;
  pdfUrl?: string;
  imageKey?: CertificateImageKey;
}

export interface CredlyBadgeConfig {
  badgeId: string;
  host: string;
  publicUrl: string;
  label: string;
  subtitle: string;
}

export interface KeyDetail {
  label: string;
  value: string;
  context: string;
}

export type GoogleBadgeCategory = 'Web & Cloud' | 'AI & Agents' | 'Certificates';

export interface GoogleBadgeItem {
  id: string;
  title: string;
  issuer: string;
  category: GoogleBadgeCategory;
  summary: string;
  year: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export interface SocialLinkConfig {
  label: string;
  handle: string;
  url: string;
  enabled: boolean;
  description: string;
}

export interface ProfileData {
  fullName: string;
  givenName: string;
  familyName: string;
  alternateNames: string[];
  school: string;
  roleLabel: string;
  cyclingRoles: string[];
  headline: string;
  tagline: string;
  city: string;
  country: string;
  location: string;
  email: string;
  availability: string;
  portraitUrl: string;
  portraitAlt: string;
  stats: StatMetric[];
  community: CommunityShowcase;
  credlyBadge: CredlyBadgeConfig;
  certificates: CertificateItem[];
  about: {
    lead: string;
    paragraphs: string[];
  };
  keyDetails: KeyDetail[];
  googleDev: {
    handle: string;
    url: string;
    headline: string;
    summary: string;
    badges: GoogleBadgeItem[];
  };
  githubUsername: string;
  skills: CapabilityItem[];
  techStack: TechStackGroup[];
  instagramPreview: {
    handle: string;
    displayName: string;
    url: string;
    bioLines: string[];
  };
  faqs: FaqEntry[];
  socials: {
    instagram: SocialLinkConfig;
    github: SocialLinkConfig;
    googleDev: SocialLinkConfig;
    friendsFun: SocialLinkConfig;
    /** Set enabled: true and add your URL once your LinkedIn profile is created. */
    linkedin: SocialLinkConfig;
  };
  seoKeywords: string[];
  suggestedQueries: string[];
}

export function resolvePublicAssetUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, '');
  const baseUrl =
    typeof import.meta !== 'undefined' &&
    typeof (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL === 'string'
      ? (import.meta as { env?: { BASE_URL?: string } }).env!.BASE_URL!
      : '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${cleanPath}`;
}

export const PROFILE_DATA: ProfileData = {
  fullName: 'Sarthak Basu',
  givenName: 'Sarthak',
  familyName: 'Basu',
  alternateNames: ['mr_the_sarthak', 'sarthakariya', 'mrsarthak'],
  school: 'Hirendra Leela Patranavis School',
  roleLabel: 'Full-Stack Web & AI Developer · Kolkata, India',
  cyclingRoles: [
    'Full-Stack Web & AI Developer',
    'Friends Fun SMP Founder (3,000+)',
    'Class 12 CS · HLPS, Kolkata',
  ],
  headline: 'Building web apps, AI workflows, and real communities.',
  tagline:
    'Sarthak Basu is a Full-Stack Web & AI Developer from Kolkata, currently studying Class 12 Computer Science at Hirendra Leela Patranavis School and founder of the 3,000+ member Friends Fun SMP community.',
  city: 'Kolkata',
  country: 'India',
  location: 'Kolkata, India',
  email: '26sarthakbasu@gmail.com',
  availability: 'Available for remote & global collaborations',
  portraitUrl: '/sarthak-basu.jpg',
  portraitAlt: 'Portrait of Sarthak Basu, Full-Stack Web and AI Developer',
  stats: [
    {
      id: 'stat-community',
      target: 3000,
      suffix: '+',
      label: 'Community Members',
      detail: 'Friends Fun SMP Network',
    },
    {
      id: 'stat-contributions',
      target: 255,
      suffix: '+',
      label: 'GitHub Contributions',
      detail: 'Open-source shipping in 2026',
    },
    {
      id: 'stat-certificates',
      target: 6,
      suffix: '+',
      label: 'Verified Credentials',
      detail: 'BSERC AI, Unstop, Credly & Sports',
    },
  ],
  community: {
    name: 'Friends Fun SMP',
    role: 'Founder, Owner & Lead Developer',
    memberCount: '3,000+',
    launched: 'Jan 2021',
    url: 'https://friendsfunsmp.wixsite.com/friendsfun',
    displayUrl: 'friendsfunsmp.wixsite.com/friendsfun',
    summary:
      'Sarthak founded and engineered Friends Fun SMP — a 3,000+ member Minecraft community where he built the server setup, designed the web portal, and led the player network.',
    highlights: [
      {
        title: '3,000+ Members',
        detail: 'Grew and managed an active survival server with custom events and systems.',
      },
      {
        title: 'Web Portal',
        detail: 'Built and launched friendsfunsmp.wixsite.com/friendsfun for the community.',
      },
      {
        title: 'End-to-End Ownership',
        detail: 'Maintained server configuration, community operations, and ongoing updates.',
      },
    ],
  },
  credlyBadge: {
    badgeId: 'af9db91d-d1ef-4330-8c4b-e365546c6834',
    host: 'https://www.credly.com',
    publicUrl:
      'https://www.credly.com/badges/af9db91d-d1ef-4330-8c4b-e365546c6834/public_url',
    label: 'Microsoft AI Skills Fest 2026',
    subtitle: 'Issued by Microsoft · Verified digital badge via Credly',
  },
  certificates: [
    {
      id: 'cert-bserc-ai',
      title: 'Artificial Intelligence Workshop — National Space Day 2026',
      issuer: 'Bharat Space Education Research Centre (BSERC)',
      category: 'ai',
      categoryLabel: 'AI & Space Tech',
      period: '23 Aug 2026',
      summary:
        'Completed the One Day Artificial Intelligence Workshop during Def-Space Innovation Week 2026 representing Hirendra Leela Patranavis School (3-hour program).',
      credentialNote: 'Cert No: BSERC-2026-NSD26790',
      credentialId: 'BSERC-2026-NSD26790',
      pdfUrl: '/cert-bserc-ai-2026.pdf',
      imageKey: 'bserc-ai-2026',
    },
    {
      id: 'cert-quizoff-2026',
      title: "QuizOff 2026: India's Biggest AI Quiz",
      issuer: 'CampusCrew · Hosted on Unstop',
      category: 'ai',
      categoryLabel: 'AI Competition',
      period: '19 Jul 2026',
      summary:
        'Recognized among select students competing alongside 5,25,000+ participants from 48,500+ institutions across 35+ countries.',
      credentialNote: 'Signed by Aaradhya Gupta, Founder, CampusCrew',
      imageKey: 'quizoff-2026',
    },
    {
      id: 'cert-gemini-quizoff',
      title: 'Google Gemini QuizOff 2026 — 100K Special',
      issuer: 'CampusCrew · Unstop (#TeamGemini)',
      category: 'ai',
      categoryLabel: 'AI Competition',
      period: '2026',
      summary:
        'Certificate of participation in the CampusCrew 100K Special Certificate Distribution of Google Gemini QuizOff 2026 representing Friends Fun.',
      credentialNote: 'Unstop · #TeamGemini',
      imageKey: 'gemini-quizoff-2026',
    },
    {
      id: 'cert-google-builders',
      title: 'Google Builders Hub & Developer Program Badges',
      issuer: 'Google Developers Profile (u/mrsarthak)',
      category: 'badges',
      categoryLabel: 'Digital Badges',
      period: '2026',
      summary:
        'Earned verified community badges including Google Developer Program Premium Tier, Firebase Studio Developer Community, Chrome DevTools, Android SDK, and Google I/O 2026.',
      credentialNote: 'me.developers.google.com/u/mrsarthak',
      verificationUrl: 'https://me.developers.google.com/u/mrsarthak',
    },
    {
      id: 'cert-class-10',
      title: 'Class 10 Board Certification',
      issuer: 'Hirendra Leela Patranavis School · Kolkata',
      category: 'academics',
      categoryLabel: 'Academics',
      period: 'Now Class 12 CS',
      summary:
        'Completed Class 10 board certification and currently pursuing Class 12 Computer Science alongside building web and AI projects.',
      credentialNote: 'Academic milestone',
    },
    {
      id: 'cert-karate',
      title: 'Karate Certification',
      issuer: 'Recognized Karate Federation',
      category: 'sports',
      categoryLabel: 'Sports',
      period: 'Certified',
      summary:
        'Trained and certified in Karate, building focus, consistency, and composure.',
      credentialNote: 'Martial arts credential',
    },
    {
      id: 'cert-swimming',
      title: 'Swimming Certification',
      issuer: 'Recognized Swimming Association',
      category: 'sports',
      categoryLabel: 'Sports',
      period: 'Certified',
      summary:
        'Certified swimmer trained in endurance and athletic discipline outside engineering.',
      credentialNote: 'Aquatics credential',
    },
  ],
  about: {
    lead: 'Sarthak Basu is a Full-Stack Web & AI Developer from Kolkata, currently studying Class 12 Computer Science at Hirendra Leela Patranavis School.',
    paragraphs: [
      'He builds responsive web apps, real-time backends, and AI agent workflows using Java, Python, JavaScript, Spring Boot, Gemini API, Agent Development Kit (ADK), Firebase, and Supabase.',
      'Beyond code, Sarthak founded and ran the 3,000+ member Friends Fun SMP community and holds certifications in AI workshops, Karate, and Swimming.',
    ],
  },
  keyDetails: [
    {
      label: 'Role',
      value: 'Full-Stack Web & AI Developer',
      context: 'Kolkata, India · Remote Collaborations',
    },
    {
      label: 'School',
      value: 'Hirendra Leela Patranavis School',
      context: 'Class 12 Computer Science (Class 10 Certified)',
    },
    {
      label: 'Community',
      value: 'Founder, Friends Fun SMP (3,000+)',
      context: 'friendsfunsmp.wixsite.com/friendsfun',
    },
    {
      label: 'Email',
      value: '26sarthakbasu@gmail.com',
      context: 'Direct contact',
    },
  ],
  googleDev: {
    handle: 'me.developers.google.com/u/mrsarthak',
    url: 'https://me.developers.google.com/u/mrsarthak',
    headline: 'Google Builders Hub',
    summary:
      'Public developer profile showcasing Firebase Studio Developer Community, Chrome DevTools, Android SDK, and Google Developer Program Premium Tier badges.',
    badges: [
      {
        id: 'gbadge-ai',
        title: 'Gemini API, Google AI Studio & ADK',
        issuer: 'Google Builders Hub · mrsarthak',
        category: 'AI & Agents',
        summary: 'AI workflows built with Gemini API, ADK, Opal, and Jules.',
        year: '2026',
      },
      {
        id: 'gbadge-cloud',
        title: 'Firebase Studio & Developer Program Badges',
        issuer: 'Google Builders Hub',
        category: 'Web & Cloud',
        summary: 'Firebase Studio Community, Chrome DevTools, Android SDK & Premium Tier.',
        year: '2026',
      },
    ],
  },
  githubUsername: 'sarthakariya',
  skills: [
    {
      id: 'skill-ai-agents',
      index: '01',
      category: 'AI & Agents',
      title: 'AI Agents & Automated Workflows',
      summary:
        'Builds LLM-powered features and custom agentic workflows using Agent Development Kit (ADK), Gemini API, Google AI Studio, Opal, and Jules.',
      impactMetric: 'ADK · Gemini API · AI Studio',
      keywords: ['Agent Development Kit (ADK)', 'Gemini API', 'Google AI Studio', 'Opal', 'Jules'],
    },
    {
      id: 'skill-fullstack-realtime',
      index: '02',
      category: 'Full-Stack Web',
      title: 'Full-Stack & Real-Time Web Apps',
      summary:
        'Ships responsive, real-time web applications hosted across GitHub Pages, Netlify, and cloud platforms.',
      impactMetric: 'HTML · CSS · JS · React',
      keywords: ['Full-Stack Web', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Netlify'],
    },
    {
      id: 'skill-uiux-frontend',
      index: '03',
      category: 'UI/UX Engineering',
      title: 'High-Craft UI/UX & Motion',
      summary:
        'Crafts clean dark interfaces, smooth micro-animations, interactive 3D elements, and CapCut media edits.',
      impactMetric: 'UI/UX · Motion · 3D · CapCut',
      keywords: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
    },
    {
      id: 'skill-backend-cloud',
      index: '04',
      category: 'Backend & Cloud',
      title: 'Backend & Cloud Integration',
      summary:
        'Connects clean frontends to scalable databases and backends using Java, Python, Spring Boot, Firebase, Supabase, and Google Cloud.',
      impactMetric: 'Spring Boot · Firebase · Supabase',
      keywords: ['Spring Boot', 'Java', 'Python', 'Firebase Realtime Database', 'Supabase'],
    },
  ],
  techStack: [
    {
      id: 'stack-languages',
      index: '01',
      category: 'Languages & Frameworks',
      tools: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'Spring Boot'],
      note: 'Core engineering & APIs.',
    },
    {
      id: 'stack-ai',
      index: '02',
      category: 'AI & Agentic Tools',
      tools: ['Gemini API', 'Google AI Studio', 'Agent Development Kit (ADK)', 'Cursor', 'Opal', 'Jules'],
      note: 'LLMs & agent workflows.',
    },
    {
      id: 'stack-backend',
      index: '03',
      category: 'Cloud & Databases',
      tools: ['Firebase', 'Supabase', 'Google Cloud', 'GitHub Pages', 'Netlify'],
      note: 'Realtime data & hosting.',
    },
    {
      id: 'stack-design',
      index: '04',
      category: 'Design & Media',
      tools: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
      note: 'Interface craft & media.',
    },
  ],
  instagramPreview: {
    handle: '@mr_the_sarthak',
    displayName: 'Sarthak Basu',
    url: 'https://www.instagram.com/mr_the_sarthak/',
    bioLines: ['Full-Stack Web & AI Developer · Friends Fun SMP · Kolkata'],
  },
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'Sarthak Basu (@mr_the_sarthak) is a Full-Stack Web & AI Developer and Class 12 Computer Science student at Hirendra Leela Patranavis School in Kolkata, India.',
      keywords: ['who is', 'sarthak basu', 'developer', 'hirendra', 'kolkata', 'class 12'],
    },
    {
      id: 'faq-friends-fun',
      question: 'What is Friends Fun SMP?',
      answer:
        'Friends Fun SMP (friendsfunsmp.wixsite.com/friendsfun) is a 3,000+ member Minecraft community founded, owned, and developed by Sarthak Basu.',
      keywords: ['friends fun', 'smp', 'minecraft', '3000', 'community', 'owner', 'wixsite'],
    },
    {
      id: 'faq-certificates',
      question: 'What verified certificates and badges does Sarthak hold?',
      answer:
        'Sarthak holds verified certificates from BSERC National Space Day 2026 AI Workshop, CampusCrew & Unstop QuizOff 2026, Google Gemini QuizOff 2026, a verified Credly badge, Google Builders Hub badges, Class 10 boards, Karate, and Swimming.',
      keywords: ['certificates', 'bserc', 'unstop', 'campuscrew', 'credly', 'karate', 'swimming', 'class 10'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@mr_the_sarthak',
      url: 'https://www.instagram.com/mr_the_sarthak/',
      enabled: true,
      description: 'Direct updates & messages',
    },
    github: {
      label: 'GitHub',
      handle: '@sarthakariya',
      url: 'https://github.com/sarthakariya',
      enabled: true,
      description: 'Repositories & 255+ contributions',
    },
    googleDev: {
      label: 'Google Builders Hub',
      handle: 'u/mrsarthak',
      url: 'https://me.developers.google.com/u/mrsarthak',
      enabled: true,
      description: 'Public developer community badges',
    },
    friendsFun: {
      label: 'Friends Fun SMP',
      handle: 'friendsfunsmp',
      url: 'https://friendsfunsmp.wixsite.com/friendsfun',
      enabled: true,
      description: '3,000+ member community portal',
    },
    linkedin: {
      label: 'LinkedIn',
      handle: 'sarthak-basu',
      url: '',
      enabled: false,
      description: 'Professional network (activated once published).',
    },
  },
  seoKeywords: [
    'Sarthak Basu',
    'Full-Stack Web & AI Developer',
    'Hirendra Leela Patranavis School',
    'Friends Fun SMP Founder',
    'Class 12 Computer Science',
    'Kolkata, India',
    'BSERC Artificial Intelligence Workshop',
    'CampusCrew QuizOff 2026',
    'Credly Verified Badge',
    'Agent Development Kit (ADK)',
    'Gemini API',
    'Spring Boot',
    'Firebase',
    'Supabase',
    'Karate',
    'Swimming',
  ],
  suggestedQueries: ['BSERC AI', 'Credly Badge', 'QuizOff 2026', 'Friends Fun SMP', 'GitHub'],
};
