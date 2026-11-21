export type SkillCategory =
  | 'Web Development'
  | 'Communication'
  | 'Problem-Solving'
  | 'Time Management';

export interface TransferableSkill {
  id: string;
  index: string;
  category: SkillCategory;
  title: string;
  summary: string;
  methodology: string;
  impactMetric: string;
  keywords: string[];
}

export interface KeyDetail {
  label: string;
  value: string;
  context: string;
}

export type GoogleBadgeCategory = 'Web & Cloud' | 'CS & AI' | 'Certificates';

export interface GoogleBadgeItem {
  id: string;
  title: string;
  issuer: string;
  category: GoogleBadgeCategory;
  summary: string;
  year: string;
}

export interface InstagramPost {
  id: string;
  category: 'Posts' | 'Tech & Setup' | 'Reels';
  title: string;
  caption: string;
  date: string;
  likes: number;
  imageUrl: string;
  alt: string;
  isReel?: boolean;
  /** Optional local MP4/WebM path (e.g. "/media/my-reel.mp4") */
  videoUrl?: string;
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
  location: string;
  email: string;
  availability: string;
  portraitUrl: string;
  portraitAlt: string;
  heroMetrics: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  about: {
    lead: string;
    paragraphs: string[];
  };
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
  skills: TransferableSkill[];
  instagramShowcase: {
    handle: string;
    displayName: string;
    bioLines: string[];
    url: string;
    posts: InstagramPost[];
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

export const PROFILE_DATA: ProfileData = {
  fullName: 'Sarthak Basu',
  givenName: 'Sarthak',
  familyName: 'Basu',
  alternateNames: ['sarthakariya', 'mrsarthak', 'mr_the_sarthak'],
  roleLabel: 'Class 12 Computer Science · Web & Site Developer',
  headline: 'Building fast, modern sites — backed by Google Developer badges and a tech-first mindset.',
  tagline:
    "I'm Sarthak Basu, a Class 12 Computer Science student, web developer, and gamer. I build clean responsive websites, earn Google Developer badges and certificates, and bring strong communication, problem-solving, and time management to every project.",
  location: 'India · Class 12 Computer Science',
  email: '26sarthakbasu@gmail.com',
  availability: 'Open to web projects, dev collaborations & tech communities',
  portraitUrl: '/assets/aistudio/IMG-20260711-WA0000_c86ea758.jpg',
  portraitAlt: 'Portrait of Sarthak Basu wearing a black button-down shirt and brown leather belt',
  heroMetrics: [
    {
      label: 'Primary Craft',
      value: 'Site Developer',
      detail: 'Responsive web interfaces, clean front-end code & SEO-first builds',
    },
    {
      label: 'Credentials',
      value: 'Google Badges',
      detail: 'Google Developer profile & certificates at g.dev/mrsarthak',
    },
    {
      label: 'Academic Track',
      value: 'Class 12 CS',
      detail: 'Computer Science student applying theory to real web projects',
    },
    {
      label: 'Off-Duty',
      value: 'Gamer & Discord',
      detail: 'Minecraft, GTA V & active community sessions on Discord',
    },
  ],
  about: {
    lead: "Hi, I'm Sarthak Basu — a Class 12 Computer Science student, site developer, and full-time tech guy who loves turning ideas into live websites.",
    paragraphs: [
      'Most importantly, I am a developer. From designing clean, mobile-friendly websites to digging into Computer Science concepts and earning Google Developer badges and certificates, I love learning by actually shipping things people can open in a browser.',
      'Alongside coding, I focus heavily on the transferable skills that make technical work matter: clear communication so everyone stays aligned, calm analytical problem-solving when code or systems break, and disciplined time management to balance Class 12 academics, dev builds, and personal projects.',
      "When I step away from VS Code and GitHub, you'll usually find me gaming—building in Minecraft, roaming Los Santos in GTA V, or hanging out with friends on Discord.",
    ],
  },
  gaming: {
    tagline: 'Off-Duty · Gaming & Discord',
    discordHandle: 'mr_the_sarthak',
    discordNote: 'Always down for co-op sessions, server builds, or dev talk on Discord.',
    games: [
      {
        name: 'Minecraft',
        style: 'Survival, redstone logic & custom server play',
      },
      {
        name: 'GTA V',
        style: 'Story mode, Online heists & open-world sessions',
      },
    ],
  },
  keyDetails: [
    {
      label: 'Identity',
      value: 'Sarthak Basu · Class 12 CS Student',
      context: 'Web & site developer and tech enthusiast',
    },
    {
      label: 'Developer Profiles',
      value: 'github.com/sarthakariya · g.dev/mrsarthak',
      context: 'Open-source repositories & Google Developer badges',
    },
    {
      label: 'Core Transferable Skills',
      value: 'Communication · Problem-Solving · Time Management',
      context: 'Paired with modern responsive web development',
    },
    {
      label: 'Social & Direct',
      value: '@mr_the_sarthak · 26sarthakbasu@gmail.com',
      context: 'Instagram showcase, Discord & direct email',
    },
  ],
  googleDev: {
    handle: 'g.dev/mrsarthak',
    url: 'https://g.dev/mrsarthak',
    headline: 'Google Developer Profile, Badges & Certificates',
    summary:
      'Verified learning milestones, hands-on developer pathways, and certificates earned across modern web, cloud, and Computer Science fundamentals.',
    badges: [
      {
        id: 'gbadge-web',
        title: 'Modern Web & Responsive Site Architecture',
        issuer: 'Google Developers · g.dev/mrsarthak',
        category: 'Web & Cloud',
        summary:
          'Hands-on pathways focused on fast, accessible, mobile-first websites, Core Web Vitals, and search-friendly semantic markup.',
        year: '2026',
      },
      {
        id: 'gbadge-cloud',
        title: 'Google Cloud & Developer Tools Badges',
        issuer: 'Google Developer Program',
        category: 'Web & Cloud',
        summary:
          'Earned badges across developer workflows, cloud tooling, and modern web deployment pipelines.',
        year: '2026',
      },
      {
        id: 'gbadge-cs',
        title: 'Computer Science & Applied Problem-Solving',
        issuer: 'Google Developer Learning Paths',
        category: 'CS & AI',
        summary:
          'Foundational coding challenges, debugging workflows, and applied AI/developer studio tooling aligned with Class 12 CS.',
        year: '2026',
      },
      {
        id: 'gbadge-certs',
        title: 'Verified Developer Certificates',
        issuer: 'Google · Public Profile Credential',
        category: 'Certificates',
        summary:
          'Completed practical assessments and course certifications showcased on my public Google Developer profile.',
        year: '2026',
      },
    ],
  },
  githubUsername: 'sarthakariya',
  skills: [
    {
      id: 'skill-web-dev',
      index: '01',
      category: 'Web Development',
      title: 'Web & Site Development',
      summary:
        'Designing and coding responsive, fast-loading websites tailored for phones, tablets, and desktops with clean UI structure and SEO best practices.',
      methodology:
        'Builds component-driven interfaces with semantic HTML, modern CSS/Tailwind, TypeScript/React, and GitHub Pages deployment so sites look sharp and rank cleanly.',
      impactMetric: 'Mobile-first, SEO-structured web builds',
      keywords: [
        'Site Development',
        'Web Development',
        'Responsive Design',
        'HTML & CSS',
        'JavaScript & TypeScript',
        'Technical SEO',
      ],
    },
    {
      id: 'skill-communication',
      index: '02',
      category: 'Communication',
      title: 'Clear Communication & Collaboration',
      summary:
        'Explaining technical ideas in plain language, listening carefully to goals, and keeping teammates, peers, and clients aligned without confusion.',
      methodology:
        'Combines concise written updates, thoughtful active listening, and structured walkthroughs across GitHub issues, Discord discussions, and project presentations.',
      impactMetric: 'Clarity-first technical & team dialogue',
      keywords: [
        'Communication Skills',
        'Active Listening',
        'Technical Clarity',
        'Team Collaboration',
        'Stakeholder Updates',
        'Presentation Skills',
      ],
    },
    {
      id: 'skill-problem-solving',
      index: '03',
      category: 'Problem-Solving',
      title: 'Analytical Problem-Solving & Debugging',
      summary:
        'Breaking tough programming bugs, layout glitches, and CS problems into clear root causes and shipping reliable fixes step by step.',
      methodology:
        'Uses first-principles logic from Computer Science to isolate issues systematically, test edge cases cleanly, and turn recurring headaches into repeatable solutions.',
      impactMetric: 'Methodical root-cause debugging',
      keywords: [
        'Problem-Solving',
        'Analytical Thinking',
        'Debugging',
        'Computer Science Logic',
        'Root-Cause Analysis',
        'Systems Thinking',
      ],
    },
    {
      id: 'skill-time-management',
      index: '04',
      category: 'Time Management',
      title: 'Time Management & Consistent Delivery',
      summary:
        'Balancing Class 12 Computer Science studies, site development projects, Google certification tracks, and downtime without missing deadlines.',
      methodology:
        'Breaks large builds into focused daily milestones, protects distraction-free coding blocks, and prioritizes high-impact tasks first.',
      impactMetric: 'Balanced academic & developer execution',
      keywords: [
        'Time Management',
        'Priority Planning',
        'Deep-Work Focus',
        'Deadline Reliability',
        'Transferable Skills',
        'Self-Discipline',
      ],
    },
  ],
  instagramShowcase: {
    handle: '@mr_the_sarthak',
    displayName: 'Sarthak Basu',
    bioLines: [
      'Class 12 CS · Site & Web Developer',
      'Google Dev Badges (g.dev/mrsarthak) · Tech & Gaming',
      'Minecraft · GTA V · Building on GitHub (@sarthakariya)',
    ],
    url: 'https://instagram.com/mr_the_sarthak',
    posts: [
      {
        id: 'ig-post-portrait',
        category: 'Posts',
        title: 'Classic Black & Warm Tones',
        caption:
          'Keeping it sharp and minimal. Building new web projects, leveling up my Class 12 CS game, and earning more Google Developer badges. Follow @mr_the_sarthak for updates.',
        date: '2026',
        likes: 128,
        imageUrl: '/assets/aistudio/IMG-20260711-WA0000_c86ea758.jpg',
        alt: 'Sarthak Basu portrait in black button-down shirt and brown belt',
      },
      {
        id: 'ig-post-desk',
        category: 'Tech & Setup',
        title: 'Late Afternoon Build Session',
        caption:
          'Clean space, clear mind. Sketching out responsive layouts, pushing commits to github.com/sarthakariya, and structuring SEO metadata so every project stands out.',
        date: '2026',
        likes: 94,
        imageUrl: '/src/assets/images/gallery_workspace_craft_1795233075469.jpg',
        alt: 'Minimalist walnut desk with notebook and coffee in warm afternoon sunlight',
      },
      {
        id: 'ig-post-reel',
        category: 'Reels',
        title: 'Dev & Gaming Reel Slot',
        caption:
          'Behind-the-scenes of coding sites, testing builds, and unwinding with Minecraft & GTA V. Drop your own MP4 reel into /public/media/ and link videoUrl anytime.',
        date: '2026',
        likes: 112,
        imageUrl: '/src/assets/images/gallery_motion_reel_cover_1795233075424.jpg',
        alt: 'Golden hour architectural colonnade still serving as reel preview',
        isReel: true,
        videoUrl: '',
      },
    ],
  },
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'I am Sarthak Basu — a Class 12 Computer Science student, web and site developer, tech enthusiast, and gamer. I build modern responsive websites, hold Google Developer badges and certificates (g.dev/mrsarthak), and publish projects on GitHub (sarthakariya).',
      keywords: ['who is', 'sarthak basu', 'class 12', 'computer science', 'developer', 'student'],
    },
    {
      id: 'faq-profiles',
      question: 'Where can I check out Sarthak Basu’s GitHub and Google Developer badges?',
      answer:
        'You can inspect my live repositories directly on this site or on GitHub at github.com/sarthakariya, and view my Google Developer badges and certificates at g.dev/mrsarthak.',
      keywords: ['github', 'sarthakariya', 'google', 'badges', 'certificates', 'g.dev', 'mrsarthak'],
    },
    {
      id: 'faq-skills',
      question: 'What technical and transferable skills does Sarthak Basu bring?',
      answer:
        'Alongside web and site development (responsive UI, clean front-end engineering, and technical SEO), I focus on core transferable skills: clear communication, analytical problem-solving, and structured time management.',
      keywords: [
        'skills',
        'web development',
        'site developer',
        'communication',
        'problem solving',
        'time management',
        'transferable',
      ],
    },
    {
      id: 'faq-social-gaming',
      question: 'How can I connect with Sarthak Basu on Instagram, Discord, or Email?',
      answer:
        'Follow me on Instagram at @mr_the_sarthak (featured right inside this site), connect on Discord for Minecraft, GTA V, or dev chats, or reach out directly via email at 26sarthakbasu@gmail.com.',
      keywords: ['instagram', 'mr_the_sarthak', 'discord', 'minecraft', 'gta 5', 'gaming', 'email', 'contact'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@mr_the_sarthak',
      url: 'https://instagram.com/mr_the_sarthak',
      enabled: true,
      description: 'Personal photos, tech moments & direct social updates.',
    },
    github: {
      label: 'GitHub',
      handle: '@sarthakariya',
      url: 'https://github.com/sarthakariya',
      enabled: true,
      description: 'Live repositories, web projects & open-source activity.',
    },
    googleDev: {
      label: 'Google Developer',
      handle: 'g.dev/mrsarthak',
      url: 'https://g.dev/mrsarthak',
      enabled: true,
      description: 'Verified Google Developer badges, learning paths & certificates.',
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
    'Web Developer',
    'Site Developer',
    'Class 12 Computer Science',
    'Google Developer Badges',
    'github.com/sarthakariya',
    'g.dev/mrsarthak',
    '@mr_the_sarthak',
    'Communication Skills',
    'Problem-Solving',
    'Time Management',
  ],
  suggestedQueries: [
    'Web development',
    'Google badges',
    'GitHub repos',
    'Instagram',
    'Minecraft & GTA V',
    'Communication',
  ],
};
