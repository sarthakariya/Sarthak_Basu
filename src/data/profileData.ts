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
  roleLabel: 'Full-Stack Web & AI Developer · Community Founder',
  cyclingRoles: [
    'Full-Stack Web Developer',
    'AI & Agent Builder',
    'Friends Fun SMP Founder',
  ],
  headline: 'Building Web Systems, AI Tools & 10,000+ Communities',
  tagline:
    'Sarthak Basu is a Full-Stack Web & AI Developer based in Kolkata, India, founder and lead developer of the 10,000+ member Friends Fun SMP community, and a Class 12 Computer Science student.',
  city: 'Kolkata',
  country: 'India',
  location: 'Kolkata, India',
  email: '26sarthakbasu@gmail.com',
  availability: 'Available for remote & global collaboration',
  portraitUrl: '/sarthak-basu.jpg',
  portraitAlt: 'Portrait of Sarthak Basu, Full-Stack Web and AI Developer',
  stats: [
    {
      id: 'stat-community',
      target: 10000,
      suffix: '+',
      label: 'Community Members',
      detail: 'Friends Fun SMP Network',
    },
    {
      id: 'stat-contributions',
      target: 255,
      suffix: '+',
      label: 'GitHub Contributions',
      detail: 'Public activity in 2026',
    },
    {
      id: 'stat-badges',
      target: 10,
      suffix: '+',
      label: 'Google Dev Badges',
      detail: 'Verified Builders Hub profile',
    },
  ],
  community: {
    name: 'Friends Fun SMP',
    role: 'Founder, Owner & Lead Developer',
    memberCount: '10,000+',
    launched: 'January 2021',
    url: 'https://friendsfunsmp.wixsite.com/friendsfun',
    displayUrl: 'friendsfunsmp.wixsite.com/friendsfun',
    summary:
      'Sarthak Basu founded, owned, and engineered Friends Fun SMP — a large-scale Minecraft Survival Multiplayer community that scaled past 10,000 players. He built the official web portal, configured multi-version Java server architecture, and led community operations.',
    highlights: [
      {
        title: '10,000+ Player Ecosystem',
        detail:
          'Scaled a dedicated survival multiplayer network with active community events and structured moderation.',
      },
      {
        title: 'Custom Web Hub & Infrastructure',
        detail:
          'Designed and published the official Friends Fun SMP site while maintaining server performance across Minecraft releases.',
      },
      {
        title: 'Leadership & Systems Ownership',
        detail:
          'Managed technical deployments, feature rollouts, and community governance as owner and lead developer.',
      },
    ],
  },
  certificates: [
    {
      id: 'cert-google-dev',
      title: 'Google Developer Program & Verified Badges',
      issuer: 'Google Developers · Builders Hub',
      category: 'tech',
      categoryLabel: 'Tech & Google',
      period: '2026',
      summary:
        'Earned verified Google Developer credentials including Firebase Studio Developer Community, Code Wiki, Chrome DevTools User, Android SDK Platform Tools, Google Developer Program Premium Tier, and Google I/O 2026.',
      credentialNote: 'Verified live on me.developers.google.com/u/mrsarthak',
      verificationUrl: 'https://me.developers.google.com/u/mrsarthak',
    },
    {
      id: 'cert-class-10',
      title: 'Class 10 Board Certification',
      issuer: 'Secondary Board Examination · Kolkata',
      category: 'academics',
      categoryLabel: 'Academics',
      period: 'Completed · Now Class 12 CS',
      summary:
        'Completed Class 10 board certification with strong academic grounding before specializing in Computer Science in Class 12 alongside active full-stack software engineering.',
      credentialNote: 'Academic milestone · Certificate record held',
    },
    {
      id: 'cert-karate',
      title: 'Karate Certification & Martial Arts Training',
      issuer: 'Recognized Karate Federation',
      category: 'sports',
      categoryLabel: 'Sports & Discipline',
      period: 'Certified',
      summary:
        'Trained and certified in Karate, building focus, structured discipline, composure under pressure, and consistent technical execution.',
      credentialNote: 'Martial arts certification · Verified personal record',
    },
    {
      id: 'cert-swimming',
      title: 'Swimming Certification & Aquatic Training',
      issuer: 'Recognized Swimming Association',
      category: 'sports',
      categoryLabel: 'Sports & Discipline',
      period: 'Certified',
      summary:
        'Certified in competitive and endurance swimming, reinforcing stamina, goal-oriented training habits, and physical resilience outside software development.',
      credentialNote: 'Athletic certification · Verified personal record',
    },
  ],
  about: {
    lead: 'Sarthak Basu is a Full-Stack Web & AI Developer from Kolkata, India, known for building responsive web applications, agentic AI workflows, and large-scale digital communities.',
    paragraphs: [
      'Before focusing on modern cloud backends and Google AI tooling, Sarthak founded, owned, and engineered Friends Fun SMP — scaling the Minecraft community past 10,000 members while designing its dedicated web hub. Alongside shipping software across Java, Python, JavaScript, Spring Boot, Firebase, and Supabase, he is currently a Class 12 Computer Science student with certified backgrounds in Karate and Swimming.',
    ],
  },
  keyDetails: [
    {
      label: 'Primary Focus',
      value: 'Full-Stack Web & AI Development',
      context: 'Kolkata, India · Available globally',
    },
    {
      label: 'Community Leadership',
      value: 'Founder, Friends Fun SMP (10,000+)',
      context: 'Owner & Lead Developer · friendsfunsmp.wixsite.com/friendsfun',
    },
    {
      label: 'Education',
      value: 'Class 12 Computer Science',
      context: 'Class 10 Board Certified',
    },
    {
      label: 'Email',
      value: '26sarthakbasu@gmail.com',
      context: 'Direct contact for collaborations',
    },
  ],
  googleDev: {
    handle: 'me.developers.google.com/u/mrsarthak',
    url: 'https://me.developers.google.com/u/mrsarthak',
    headline: 'Google Developers',
    summary:
      'Verified Google Builders Hub profile featuring Firebase Studio, Chrome DevTools, Android SDK, and Google Developer Program badges.',
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
      title: 'AI Agents & Automated Workflows',
      summary:
        'Architects LLM-powered applications and custom agentic workflows using Agent Development Kit (ADK), Gemini API, Google AI Studio, Opal, and Jules.',
      impactMetric: 'ADK · Gemini API · Google AI Studio',
      keywords: ['Agent Development Kit (ADK)', 'Gemini API', 'Google AI Studio', 'Opal', 'Jules'],
    },
    {
      id: 'skill-fullstack-realtime',
      index: '02',
      category: 'Full-Stack Web',
      title: 'Full-Stack Web & Real-Time Apps',
      summary:
        'Engineers responsive full-stack web platforms and real-time multi-user experiences deployed seamlessly across GitHub Pages and Netlify.',
      impactMetric: 'HTML · CSS · JavaScript · React',
      keywords: ['Full-Stack Web', 'HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Netlify'],
    },
    {
      id: 'skill-uiux-frontend',
      index: '03',
      category: 'UI/UX Engineering',
      title: 'Interactive UI/UX & Motion Engineering',
      summary:
        'Crafts dark-tech dashboards, tactile bento layouts, fluid 60fps micro-animations, and sharp media edits with CapCut.',
      impactMetric: 'UI Prototyping · Motion · CapCut',
      keywords: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
    },
    {
      id: 'skill-backend-cloud',
      index: '04',
      category: 'Backend & Cloud',
      title: 'Backend, Cloud & Server Systems',
      summary:
        'Integrates clean frontends with scalable authentication, databases, and server logic via Spring Boot, Java, Python, Firebase, Supabase, and Google Cloud.',
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
      note: 'Core software engineering & backend APIs.',
    },
    {
      id: 'stack-ai',
      index: '02',
      category: 'AI & Agentic Tools',
      tools: ['Gemini API', 'Google AI Studio', 'Agent Development Kit (ADK)', 'Cursor', 'Opal', 'Jules'],
      note: 'LLM reasoning & custom agent pipelines.',
    },
    {
      id: 'stack-backend',
      index: '03',
      category: 'Backend, Cloud & Hosting',
      tools: ['Firebase Realtime Database', 'Supabase', 'Google Cloud Platform', 'GitHub Pages', 'Netlify'],
      note: 'Real-time state sync, auth & cloud deployment.',
    },
    {
      id: 'stack-design',
      index: '04',
      category: 'Design & Media',
      tools: ['UI/UX Prototyping', 'Micro-Animations', 'CapCut Video Editing'],
      note: 'Interactive product interfaces & media.',
    },
  ],
  instagramPreview: {
    handle: '@mr_the_sarthak',
    displayName: 'Sarthak Basu',
    url: 'https://www.instagram.com/mr_the_sarthak/',
    bioLines: ['Developer · Friends Fun SMP Founder · Kolkata'],
  },
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'Sarthak Basu (@mr_the_sarthak) is a Full-Stack Web & AI Developer from Kolkata, India. He is the founder and lead developer of the 10,000+ member Friends Fun SMP community and is currently pursuing Class 12 Computer Science.',
      keywords: ['who is', 'sarthak basu', 'kolkata', 'india', 'developer', 'class 12'],
    },
    {
      id: 'faq-friends-fun',
      question: 'What is Friends Fun SMP and what did Sarthak Basu build there?',
      answer:
        'Friends Fun SMP (friendsfunsmp.wixsite.com/friendsfun) is a 10,000+ member Minecraft community founded in January 2021. As owner and lead developer, Sarthak Basu built the community website, engineered the server environment, and led operations for thousands of players.',
      keywords: ['friends fun', 'smp', 'minecraft', '10000', 'community', 'owner', 'wixsite'],
    },
    {
      id: 'faq-stack',
      question: 'What technologies and AI tools does Sarthak Basu work with?',
      answer:
        'Sarthak develops full-stack web apps and AI workflows using Java, Python, JavaScript, Spring Boot, Gemini API, Agent Development Kit (ADK), Google AI Studio, Firebase Realtime Database, Supabase, and Google Cloud Platform.',
      keywords: ['tech stack', 'adk', 'gemini', 'spring boot', 'firebase', 'supabase', 'java', 'python'],
    },
    {
      id: 'faq-certificates',
      question: 'What certificates and achievements has Sarthak Basu earned?',
      answer:
        'Sarthak Basu holds verified Google Developer Program badges (including Firebase Studio Community, Chrome DevTools, Android SDK, and Premium Tier), Class 10 board certification, and certified athletic credentials in Karate and Swimming.',
      keywords: ['certificates', 'karate', 'swimming', 'class 10', 'google badges', 'awards'],
    },
    {
      id: 'faq-profiles',
      question: 'Where can Sarthak Basu’s official profiles be verified?',
      answer:
        'Sarthak Basu’s verified profiles are available on GitHub (github.com/sarthakariya), Google Developers (me.developers.google.com/u/mrsarthak), Friends Fun SMP (friendsfunsmp.wixsite.com/friendsfun), Instagram (@mr_the_sarthak), and via email at 26sarthakbasu@gmail.com.',
      keywords: ['github', 'google', 'instagram', 'email', 'contact', 'profiles'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@mr_the_sarthak',
      url: 'https://www.instagram.com/mr_the_sarthak/',
      enabled: true,
      description: 'Official Instagram profile & direct updates.',
    },
    github: {
      label: 'GitHub',
      handle: '@sarthakariya',
      url: 'https://github.com/sarthakariya',
      enabled: true,
      description: 'Public repositories, pinned projects & 255+ contributions.',
    },
    googleDev: {
      label: 'Google Developers',
      handle: 'u/mrsarthak',
      url: 'https://me.developers.google.com/u/mrsarthak',
      enabled: true,
      description: 'Verified Google Builders Hub badges & developer profile.',
    },
    friendsFun: {
      label: 'Friends Fun SMP',
      handle: 'friendsfunsmp',
      url: 'https://friendsfunsmp.wixsite.com/friendsfun',
      enabled: true,
      description: '10,000+ member Minecraft community website built by Sarthak Basu.',
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
  suggestedQueries: ['Friends Fun SMP', 'Certificates', 'Google Dev', 'GitHub', 'ADK & AI'],
};
