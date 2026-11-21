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

export interface TransferablePillar {
  title: string;
  detail: string;
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

export interface GamingProfile {
  tagline: string;
  discordHandle: string;
  discordNote: string;
  games: Array<{
    name: string;
    style: string;
  }>;
}

export interface ProfileData {
  fullName: string;
  givenName: string;
  familyName: string;
  alternateNames: string[];
  roleLabel: string;
  headline: string;
  tagline: string;
  city: string;
  country: string;
  location: string;
  email: string;
  availability: string;
  portraitUrl: string;
  portraitAlt: string;
  /** Optional real screenshots provided by the user (leave empty when not uploaded). */
  profileScreenshots: {
    googleDev: string;
    instagram: string;
    github: string;
  };
  about: {
    lead: string;
    paragraphs: string[];
  };
  transferablePillars: TransferablePillar[];
  gaming: GamingProfile;
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
  roleLabel: 'Class 12 CS Student · Developer · Gamer',
  headline: 'Class 12 CS Student · Developer · Gamer',
  tagline:
    'Class 12 Computer Science student and developer from Kolkata, India — building web & AI projects and playing Minecraft & GTA V.',
  city: 'Kolkata',
  country: 'India',
  location: 'Kolkata, India',
  email: '26sarthakbasu@gmail.com',
  availability: 'Available for remote & global collaboration',
  portraitUrl: '/assets/aistudio/IMG-20260711-WA0000_c86ea758.jpg',
  portraitAlt: 'Passport portrait of Sarthak Basu',
  profileScreenshots: {
    googleDev: '',
    instagram: '',
    github: '',
  },
  about: {
    lead: "I'm Sarthak Basu — a Class 12 Computer Science student, full-stack web & AI developer, and gamer from Kolkata, India.",
    paragraphs: [
      'I build web apps and AI workflows with Java, Python, JavaScript, Spring Boot, Gemini API, Agent Development Kit (ADK), Firebase, and Supabase — backed by strong communication, problem-solving, and time management. Off-duty, I play Minecraft and GTA V.',
    ],
  },
  transferablePillars: [
    {
      title: 'Communication',
      detail: 'Clear specs & transparent updates.',
    },
    {
      title: 'Problem-Solving',
      detail: 'First-principles debugging across code & APIs.',
    },
    {
      title: 'Time Management',
      detail: 'Balancing Class 12 CS & shipping on time.',
    },
  ],
  gaming: {
    tagline: 'Gaming & Discord',
    discordHandle: 'mr_the_sarthak',
    discordNote: 'Down for co-op sessions or dev chats on Discord.',
    games: [
      {
        name: 'Minecraft',
        style: 'Survival worlds & server play',
      },
      {
        name: 'GTA V',
        style: 'Story mode & Online heists',
      },
    ],
  },
  keyDetails: [
    {
      label: 'Identity',
      value: 'Class 12 CS Student · Developer · Gamer',
      context: 'Kolkata, India · @mr_the_sarthak',
    },
    {
      label: 'Email',
      value: '26sarthakbasu@gmail.com',
      context: 'Direct contact for remote & global collaborations',
    },
  ],
  googleDev: {
    handle: 'me.developers.google.com/u/mrsarthak',
    url: 'https://me.developers.google.com/u/mrsarthak',
    headline: 'Google Developers',
    summary: 'Verified Google Developer profile, badges, and certificates.',
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
        title: 'Firebase & Google Cloud Platform',
        issuer: 'Google Developer Program',
        category: 'Web & Cloud',
        summary: 'Real-time cloud databases, auth, and deployment.',
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
        'Designing LLM-powered features and custom agentic workflows using Agent Development Kit (ADK), Gemini API, Google AI Studio, Opal, and Jules.',
      impactMetric: 'Agentic & LLM workflows',
      keywords: ['Agent Development Kit (ADK)', 'Gemini API', 'Google AI Studio', 'Opal', 'Jules'],
    },
    {
      id: 'skill-fullstack-realtime',
      index: '02',
      category: 'Full-Stack Web',
      title: 'Full-Stack Web & Real-Time Apps',
      summary:
        'Responsive web apps and real-time multi-user experiences deployed on GitHub Pages and Netlify.',
      impactMetric: 'Real-time web apps',
      keywords: ['Full-Stack Web', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Netlify'],
    },
    {
      id: 'skill-uiux-frontend',
      index: '03',
      category: 'UI/UX Engineering',
      title: 'UI/UX & Frontend Engineering',
      summary:
        'Dark-themed layouts, clean micro-animations, and CapCut video edits.',
      impactMetric: 'Responsive frontend polish',
      keywords: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
    },
    {
      id: 'skill-backend-cloud',
      index: '04',
      category: 'Backend & Cloud',
      title: 'Backend & Cloud Integration',
      summary:
        'Connecting frontends to Firebase Realtime Database, Supabase, Google Cloud Platform, and Spring Boot.',
      impactMetric: 'Scalable backends',
      keywords: ['Spring Boot', 'Java', 'Python', 'Firebase Realtime Database', 'Supabase'],
    },
  ],
  techStack: [
    {
      id: 'stack-languages',
      index: '01',
      category: 'Languages & Frameworks',
      tools: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'Spring Boot'],
      note: 'Core CS & full-stack engineering.',
    },
    {
      id: 'stack-ai',
      index: '02',
      category: 'AI & Agentic Tools',
      tools: ['Gemini API', 'Google AI Studio', 'Agent Development Kit (ADK)', 'Cursor', 'Opal', 'Jules'],
      note: 'AI reasoning & custom agent workflows.',
    },
    {
      id: 'stack-backend',
      index: '03',
      category: 'Backend, Cloud & Hosting',
      tools: ['Firebase Realtime Database', 'Supabase', 'Google Cloud Platform', 'GitHub Pages', 'Netlify'],
      note: 'Real-time data, auth & hosting.',
    },
    {
      id: 'stack-design',
      index: '04',
      category: 'Design & Media',
      tools: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
      note: 'Clean UI systems & video edits.',
    },
  ],
  instagramPreview: {
    handle: '@mr_the_sarthak',
    displayName: 'Sarthak Basu',
    url: 'https://www.instagram.com/mr_the_sarthak/',
    bioLines: ['Class 12 CS · Developer · Gamer · Kolkata'],
  },
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'Sarthak Basu (@mr_the_sarthak) is a Class 12 Computer Science student, full-stack web & AI developer, and gamer from Kolkata, India.',
      keywords: ['who is', 'sarthak basu', 'kolkata', 'india', 'class 12'],
    },
    {
      id: 'faq-profiles',
      question: 'Where can I find Sarthak Basu online?',
      answer:
        'GitHub (github.com/sarthakariya), Google Developers (me.developers.google.com/u/mrsarthak), Instagram (@mr_the_sarthak), Discord (mr_the_sarthak), and email (26sarthakbasu@gmail.com).',
      keywords: ['github', 'google', 'instagram', 'discord', 'email'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@mr_the_sarthak',
      url: 'https://www.instagram.com/mr_the_sarthak/',
      enabled: true,
      description: 'Active Instagram profile & direct social updates.',
    },
    github: {
      label: 'GitHub',
      handle: '@sarthakariya',
      url: 'https://github.com/sarthakariya',
      enabled: true,
      description: 'Public repositories & code.',
    },
    googleDev: {
      label: 'Google Developers',
      handle: 'u/mrsarthak',
      url: 'https://me.developers.google.com/u/mrsarthak',
      enabled: true,
      description: 'Google Developer profile, badges & certificates.',
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
    'Class 12 Computer Science',
    'Kolkata, India',
    'Agent Development Kit (ADK)',
    'Gemini API',
    'Spring Boot',
    'Firebase',
    'Supabase',
  ],
  suggestedQueries: ['ADK & AI', 'Tech stack', 'Google Dev', 'GitHub', 'Instagram'],
};
