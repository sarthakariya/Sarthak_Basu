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

export type CertificateCategory = 'tech' | 'academics' | 'sports';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: CertificateCategory;
  categoryLabel: string;
  period: string;
  summary: string;
  credentialNote: string;
  verificationUrl?: string;
  imageUrl?: string;
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
  roleLabel: 'Google Developer · Microsoft Attendee · Web & AI Builder',
  cyclingRoles: [
    'Google Developer & Web Builder',
    'Microsoft Developer Event Attendee',
    'Friends Fun SMP Founder (3,000+)',
  ],
  headline: 'Google Developer, Web & AI Builder.',
  tagline:
    'Sarthak Basu is a Google Developer, Microsoft event attendee, and web & AI builder from Kolkata — founder of the 3,000+ member Friends Fun SMP community and currently in Class 12 CS.',
  city: 'Kolkata',
  country: 'India',
  location: 'Kolkata, India',
  email: '26sarthakbasu@gmail.com',
  availability: 'Open for cool builds & collabs',
  portraitUrl: '/sarthak-basu.jpg',
  portraitAlt: 'Portrait of Sarthak Basu, Google Developer and Web Builder',
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
      detail: 'Active shipping in 2026',
    },
    {
      id: 'stat-badges',
      target: 10,
      suffix: '+',
      label: 'Google Dev Badges',
      detail: 'Builders Hub + Microsoft Events',
    },
  ],
  community: {
    name: 'Friends Fun SMP',
    role: 'Founder, Owner & Lead Dev',
    memberCount: '3,000+',
    launched: 'Jan 2021',
    url: 'https://friendsfunsmp.wixsite.com/friendsfun',
    displayUrl: 'friendsfunsmp.wixsite.com/friendsfun',
    summary:
      'Sarthak built and ran Friends Fun SMP — a 3,000+ member Minecraft community where he coded the server setup, launched its official website, and managed the whole player base.',
    highlights: [
      {
        title: '3,000+ Players',
        detail: 'Built and scaled a lively survival community with events & custom setups.',
      },
      {
        title: 'Custom Web Hub',
        detail: 'Designed and launched friendsfunsmp.wixsite.com/friendsfun from scratch.',
      },
      {
        title: 'Full Ownership',
        detail: 'Handled updates, infrastructure, and community leadership end to end.',
      },
    ],
  },
  certificates: [
    {
      id: 'cert-google-dev',
      title: 'Google Developer & Microsoft Events',
      issuer: 'Google Builders Hub · Microsoft Ecosystem',
      category: 'tech',
      categoryLabel: 'Tech',
      period: '2026',
      summary:
        'Verified Google Developer with Firebase Studio, Chrome DevTools, Android SDK, Premium Tier & Google I/O 2026 badges, plus active Microsoft developer event attendance.',
      credentialNote: 'Live on me.developers.google.com/u/mrsarthak',
      verificationUrl: 'https://me.developers.google.com/u/mrsarthak',
    },
    {
      id: 'cert-class-10',
      title: 'Class 10 Board Certified',
      issuer: 'Secondary Board · Kolkata',
      category: 'academics',
      categoryLabel: 'Academics',
      period: 'Now Class 12 CS',
      summary:
        'Completed Class 10 board certification and now studying Class 12 Computer Science alongside shipping web and AI projects.',
      credentialNote: 'Verified academic milestone',
    },
    {
      id: 'cert-karate',
      title: 'Karate Certification',
      issuer: 'Recognized Karate Federation',
      category: 'sports',
      categoryLabel: 'Sports',
      period: 'Certified',
      summary:
        'Trained and certified in Karate — sharp focus, discipline, and staying calm under pressure.',
      credentialNote: 'Martial arts certificate',
    },
    {
      id: 'cert-swimming',
      title: 'Swimming Certification',
      issuer: 'Recognized Swimming Association',
      category: 'sports',
      categoryLabel: 'Sports',
      period: 'Certified',
      summary:
        'Certified swimmer with endurance training outside of coding and tech.',
      credentialNote: 'Athletic certificate',
    },
  ],
  about: {
    lead: 'Sarthak Basu is a Google Developer and Microsoft event attendee based in Kolkata who loves building fast web apps, AI workflows, and active online communities.',
    paragraphs: [
      'He works across Java, Python, JavaScript, Spring Boot, Gemini API, ADK, Firebase, and Supabase — balancing real-world dev builds with Class 12 Computer Science, Karate, and Swimming.',
    ],
  },
  keyDetails: [
    {
      label: 'Primary Focus',
      value: 'Google Developer · Web & AI Builder',
      context: 'Kolkata, India · Microsoft Event Attendee',
    },
    {
      label: 'Community',
      value: 'Founder, Friends Fun SMP (3,000+)',
      context: 'friendsfunsmp.wixsite.com/friendsfun',
    },
    {
      label: 'Education',
      value: 'Class 12 Computer Science',
      context: 'Class 10 Certified',
    },
    {
      label: 'Email',
      value: '26sarthakbasu@gmail.com',
      context: 'Direct contact for collabs',
    },
  ],
  googleDev: {
    handle: 'me.developers.google.com/u/mrsarthak',
    url: 'https://me.developers.google.com/u/mrsarthak',
    headline: 'Google Developers',
    summary:
      'Verified Google Builders Hub profile with Firebase Studio, Chrome DevTools, Android SDK, and Google Developer Program badges.',
    badges: [
      {
        id: 'gbadge-ai',
        title: 'Gemini API, Google AI Studio & ADK',
        issuer: 'Google Developers · mrsarthak',
        category: 'AI & Agents',
        summary: 'AI workflows with Gemini API, ADK, Opal, and Jules.',
        year: '2026',
      },
      {
        id: 'gbadge-cloud',
        title: 'Firebase Studio & Google Developer Program',
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
      title: 'AI Agents & Workflows',
      summary:
        'Builds LLM-powered tools and custom agent workflows with ADK, Gemini API, Google AI Studio, Opal, and Jules.',
      impactMetric: 'ADK · Gemini API · AI Studio',
      keywords: ['Agent Development Kit (ADK)', 'Gemini API', 'Google AI Studio', 'Opal', 'Jules'],
    },
    {
      id: 'skill-fullstack-realtime',
      index: '02',
      category: 'Full-Stack Web',
      title: 'Full-Stack Web Apps',
      summary:
        'Creates responsive, real-time web apps shipped on GitHub Pages and Netlify.',
      impactMetric: 'HTML · CSS · JS · React',
      keywords: ['Full-Stack Web', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Netlify'],
    },
    {
      id: 'skill-uiux-frontend',
      index: '03',
      category: 'UI/UX Engineering',
      title: 'UI/UX & Smooth Motion',
      summary:
        'Designs bold dark-mode interfaces, fluid animations, and crisp CapCut edits.',
      impactMetric: 'UI/UX · Motion · CapCut',
      keywords: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
    },
    {
      id: 'skill-backend-cloud',
      index: '04',
      category: 'Backend & Cloud',
      title: 'Backend & Cloud Systems',
      summary:
        'Connects apps to Spring Boot, Java, Python, Firebase, Supabase, and Google Cloud.',
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
      note: 'Core code & backends.',
    },
    {
      id: 'stack-ai',
      index: '02',
      category: 'AI & Agentic Tools',
      tools: ['Gemini API', 'Google AI Studio', 'Agent Development Kit (ADK)', 'Cursor', 'Opal', 'Jules'],
      note: 'AI tools & agents.',
    },
    {
      id: 'stack-backend',
      index: '03',
      category: 'Cloud & Databases',
      tools: ['Firebase', 'Supabase', 'Google Cloud', 'GitHub Pages', 'Netlify'],
      note: 'Real-time data & hosting.',
    },
    {
      id: 'stack-design',
      index: '04',
      category: 'Design & Media',
      tools: ['UI/UX', 'Motion', 'CapCut'],
      note: 'Interfaces & edits.',
    },
  ],
  instagramPreview: {
    handle: '@mr_the_sarthak',
    displayName: 'Sarthak Basu',
    url: 'https://www.instagram.com/mr_the_sarthak/',
    bioLines: ['Google Developer · Microsoft Attendee · Friends Fun SMP'],
  },
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'Sarthak Basu (@mr_the_sarthak) is a Google Developer, Microsoft event attendee, and web & AI builder from Kolkata. He founded the 3,000+ member Friends Fun SMP community and studies Class 12 CS.',
      keywords: ['who is', 'sarthak basu', 'google developer', 'microsoft', 'kolkata', 'class 12'],
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
      question: 'What badges and certificates does Sarthak hold?',
      answer:
        'Sarthak holds verified Google Developer badges (me.developers.google.com/u/mrsarthak), attended Microsoft developer events, completed Class 10 boards, and is certified in Karate and Swimming.',
      keywords: ['certificates', 'microsoft', 'karate', 'swimming', 'class 10', 'google badges'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@mr_the_sarthak',
      url: 'https://www.instagram.com/mr_the_sarthak/',
      enabled: true,
      description: 'Direct updates & DMs',
    },
    github: {
      label: 'GitHub',
      handle: '@sarthakariya',
      url: 'https://github.com/sarthakariya',
      enabled: true,
      description: 'Repos & 255+ contributions',
    },
    googleDev: {
      label: 'Google Developers',
      handle: 'u/mrsarthak',
      url: 'https://me.developers.google.com/u/mrsarthak',
      enabled: true,
      description: 'Verified Google Builders Hub badges',
    },
    friendsFun: {
      label: 'Friends Fun SMP',
      handle: 'friendsfunsmp',
      url: 'https://friendsfunsmp.wixsite.com/friendsfun',
      enabled: true,
      description: '3,000+ member community website',
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
    'Google Developer',
    'Microsoft Developer Event Attendee',
    'Full-Stack Web & AI Developer',
    'Friends Fun SMP Founder',
    'Class 12 Computer Science',
    'Kolkata, India',
    'Agent Development Kit (ADK)',
    'Gemini API',
    'Spring Boot',
    'Firebase',
    'Supabase',
    'Karate',
    'Swimming',
  ],
  suggestedQueries: ['Friends Fun SMP', 'Google & Microsoft', 'Certificates', 'GitHub', 'ADK & AI'],
};
