export type SkillCategory =
  | 'Communication'
  | 'Problem-Solving'
  | 'Time Management'
  | 'Leadership';

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

export interface MediaEntry {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle: string;
  date: string;
  category: string;
  imageUrl: string;
  /** Optional local or hosted MP4/WebM video file path (e.g. "/media/intro-reel.mp4"). */
  videoUrl?: string;
  alt: string;
  caption: string;
  featured?: boolean;
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
  bio: {
    firstPerson: {
      label: string;
      audienceNote: string;
      lead: string;
      paragraphs: string[];
    };
    thirdPerson: {
      label: string;
      audienceNote: string;
      lead: string;
      paragraphs: string[];
    };
  };
  keyDetails: KeyDetail[];
  skills: TransferableSkill[];
  media: MediaEntry[];
  faqs: FaqEntry[];
  socials: {
    instagram: SocialLinkConfig;
    /** Set enabled: true and add your URL once your LinkedIn profile is created. */
    linkedin: SocialLinkConfig;
    github: SocialLinkConfig;
  };
  seoKeywords: string[];
  suggestedQueries: string[];
}

export const PROFILE_DATA: ProfileData = {
  fullName: 'Sarthak Basu',
  givenName: 'Sarthak',
  familyName: 'Basu',
  headline: 'Clear communication, calm problem-solving, and disciplined execution.',
  tagline:
    'Official personal profile of Sarthak Basu — bringing structured thinking, persuasive storytelling, and reliable time management to collaborative work.',
  location: 'India · Open to Global Collaborations',
  email: '26sarthakbasu@gmail.com',
  availability: 'Available for collaborations & inquiries',
  portraitUrl: '/src/assets/images/hero_editorial_portrait_1795233075752.jpg',
  portraitAlt: 'Editorial portrait representing Sarthak Basu beside warm travertine architecture',
  heroMetrics: [
    {
      label: 'Primary Focus',
      value: 'Communication',
      detail: 'Stakeholder alignment & clear written and spoken delivery',
    },
    {
      label: 'Core Method',
      value: 'Problem-Solving',
      detail: 'First-principles analysis & structured root-cause clarity',
    },
    {
      label: 'Execution Rhythm',
      value: 'Time Management',
      detail: 'Priority architecture, deep work & dependable deadlines',
    },
    {
      label: 'Direct Channel',
      value: 'Instagram & Email',
      detail: 'Fast, thoughtful responses for creative & business inquiries',
    },
  ],
  bio: {
    firstPerson: {
      label: 'First Person · Personal',
      audienceNote: 'Written for personal connection, direct introductions, and collaborators.',
      lead: 'Hi, I am Sarthak Basu. I believe the most meaningful work happens where clear human communication meets disciplined execution.',
      paragraphs: [
        'Whether I am breaking down a complex challenge, aligning a group around a shared goal, or organizing competing priorities under a tight timeline, I focus on bringing calm clarity to the room. I care deeply about listening first, asking sharper questions, and turning abstract ideas into concrete, dependable steps.',
        'Over time, I have built my foundation around transferable skills that hold up in every environment: thoughtful communication, analytical problem-solving, and structured time management. Rather than relying on noise or urgency, I prefer intentional systems that make projects smoother for everyone involved.',
        'This space is my living personal profile—designed so anyone searching for Sarthak Basu can explore how I think, review my core strengths, browse my visual journal, or use the personal search bar above to find exact answers in seconds.',
      ],
    },
    thirdPerson: {
      label: 'Third Person · Executive',
      audienceNote: 'Objective biography formatted for business websites, press kits, and LinkedIn.',
      lead: 'Sarthak Basu is a communicator, analytical problem-solver, and disciplined executor known for translating complex objectives into clear, on-time outcomes.',
      paragraphs: [
        'Grounded in high-impact transferable skills—including strategic communication, structured root-cause problem-solving, and executive time management—Sarthak Basu bridges the gap between vision and reliable delivery. His approach combines active stakeholder listening with practical decision frameworks that reduce friction across teams.',
        'Committed to continuous learning and operational clarity, Sarthak Basu prioritizes transparent documentation, calm leadership under pressure, and sustainable workflow design. He collaborates effectively across multidisciplinary initiatives where precision, adaptability, and interpersonal trust are essential.',
        'For professional inquiries, speaking introductions, or collaborative projects, Sarthak Basu can be reached directly via email at 26sarthakbasu@gmail.com or through his official Instagram profile.',
      ],
    },
  },
  keyDetails: [
    {
      label: 'Full Name',
      value: 'Sarthak Basu',
      context: 'Official spelling for search indexing & attribution',
    },
    {
      label: 'Core Strengths',
      value: 'Communication · Problem-Solving · Time Management',
      context: 'Cross-industry transferable competencies',
    },
    {
      label: 'Working Style',
      value: 'Structured, Analytical & People-First',
      context: 'Balances deep-work focus with proactive updates',
    },
    {
      label: 'Direct Contact',
      value: '26sarthakbasu@gmail.com',
      context: 'Primary channel for collaborations & opportunities',
    },
  ],
  skills: [
    {
      id: 'skill-communication',
      index: '01',
      category: 'Communication',
      title: 'Strategic Communication & Stakeholder Alignment',
      summary:
        'Translating nuanced ideas into crisp, persuasive narratives across written briefs, live presentations, and one-on-one dialogue.',
      methodology:
        'Leads with active listening and audience context, structures messages with executive clarity (bottom-line upfront), and closes every discussion with unambiguous next steps.',
      impactMetric: 'Clarity-first written & verbal delivery',
      keywords: [
        'Strategic Communication',
        'Active Listening',
        'Executive Presentations',
        'Stakeholder Alignment',
        'Persuasive Storytelling',
        'Written Clarity',
      ],
    },
    {
      id: 'skill-problem-solving',
      index: '02',
      category: 'Problem-Solving',
      title: 'Analytical Problem-Solving & Decision Frameworks',
      summary:
        'Deconstructing ambiguous challenges into verifiable root causes, evaluating trade-offs objectively, and shipping practical solutions.',
      methodology:
        'Applies first-principles thinking to separate symptoms from structural bottlenecks, weighs second-order consequences, and documents repeatable playbooks.',
      impactMetric: 'First-principles root-cause resolution',
      keywords: [
        'Analytical Problem-Solving',
        'Critical Thinking',
        'Root-Cause Analysis',
        'Systems Thinking',
        'Decision Frameworks',
        'Creative Troubleshooting',
      ],
    },
    {
      id: 'skill-time-management',
      index: '03',
      category: 'Time Management',
      title: 'Time Management & Priority Architecture',
      summary:
        'Protecting high-leverage work through deliberate scheduling, milestone decomposition, and calm delivery against tight deadlines.',
      methodology:
        'Combines time-blocked deep work with impact-versus-effort prioritization, proactive buffer planning, and transparent progress milestones.',
      impactMetric: '100% commitment to milestone reliability',
      keywords: [
        'Time Management',
        'Priority Architecture',
        'Deep-Work Scheduling',
        'Deadline Reliability',
        'Workflow Optimization',
        'Multi-Project Orchestration',
      ],
    },
    {
      id: 'skill-leadership',
      index: '04',
      category: 'Leadership',
      title: 'Cross-Functional Collaboration & Adaptability',
      summary:
        'Building high-trust momentum across diverse teams while adapting quickly to evolving goals, tools, and feedback.',
      methodology:
        'Fosters psychological safety, champions ownership over blame, and bridges technical, creative, and operational viewpoints cleanly.',
      impactMetric: 'High-trust cross-functional execution',
      keywords: [
        'Transferable Skills',
        'Cross-Functional Collaboration',
        'Adaptability',
        'Ownership Mindset',
        'Continuous Learning',
        'Team Leadership',
      ],
    },
  ],
  media: [
    {
      id: 'media-workspace',
      type: 'photo',
      title: 'Quiet Systems & Deep Work',
      subtitle: 'Editorial Photography · Personal Craft',
      date: '2026',
      category: 'Photography',
      imageUrl: '/src/assets/images/gallery_workspace_craft_1795233075469.jpg',
      alt: 'Minimalist walnut desk with open journal and espresso in golden afternoon light',
      caption:
        'Intentional spaces support clear thinking. Replace this sample editorial frame with your own workspace, portrait, or travel photography inside src/data/profileData.ts.',
      featured: true,
    },
    {
      id: 'media-dialogue',
      type: 'photo',
      title: 'Collaborative Dialogue & Clarity',
      subtitle: 'Editorial Photography · Communication',
      date: '2026',
      category: 'Photography',
      imageUrl: '/src/assets/images/gallery_communication_talk_1795233075999.jpg',
      alt: 'Team gathered around a warm travertine studio table during a structured presentation',
      caption:
        'Effective communication starts with listening deeply before presenting a structured point of view. Ready to swap with your speaking or event photos.',
    },
    {
      id: 'media-reel',
      type: 'video',
      title: 'Introduction & Visual Reel',
      subtitle: 'Short Film Slot · Ready for Your MP4',
      date: '2026',
      category: 'Video Reel',
      imageUrl: '/src/assets/images/gallery_motion_reel_cover_1795233075424.jpg',
      videoUrl: '',
      alt: 'Golden hour architectural colonnade still serving as video reel cover',
      caption:
        'Dedicated video reel frame. Drop your personal intro video (MP4/WebM) into /public/media/ and set videoUrl in src/data/profileData.ts to enable instant native playback.',
    },
  ],
  faqs: [
    {
      id: 'faq-who',
      question: 'Who is Sarthak Basu?',
      answer:
        'Sarthak Basu is a communicator, analytical problem-solver, and organized executor who pairs people-first collaboration with structured time management. This website serves as his official, SEO-indexed About Me profile.',
      keywords: ['who is', 'sarthak basu', 'about', 'identity', 'profile', 'bio'],
    },
    {
      id: 'faq-skills',
      question: 'What are Sarthak Basu’s core transferable skills?',
      answer:
        'His primary transferable competencies include strategic communication (written clarity, active listening, and presentations), analytical problem-solving (first-principles root-cause analysis), disciplined time management (priority architecture and deadline reliability), and adaptable cross-functional collaboration.',
      keywords: [
        'skills',
        'transferable',
        'communication',
        'problem solving',
        'time management',
        'strengths',
      ],
    },
    {
      id: 'faq-bio-format',
      question: 'Is there an objective third-person bio of Sarthak Basu for business or LinkedIn use?',
      answer:
        'Yes. The Biography section includes a dedicated Third Person (Executive) view with a one-click Copy Bio button specifically written for business websites, speaker introductions, press mentions, and LinkedIn profiles.',
      keywords: ['third person', 'bio', 'linkedin', 'business', 'press', 'copy'],
    },
    {
      id: 'faq-connect',
      question: 'How can I connect with Sarthak Basu online?',
      answer:
        'You can connect with Sarthak Basu via his Instagram profile or reach out directly by email at 26sarthakbasu@gmail.com. A LinkedIn profile link will also be added directly to this official hub once published.',
      keywords: ['contact', 'connect', 'instagram', 'email', 'social', 'reach', 'hire'],
    },
  ],
  socials: {
    instagram: {
      label: 'Instagram',
      handle: '@sarthakbasu',
      url: 'https://instagram.com/sarthakbasu',
      enabled: true,
      description: 'Visual moments, creative updates, and direct social connection.',
    },
    linkedin: {
      label: 'LinkedIn',
      handle: 'sarthak-basu',
      url: '',
      enabled: false,
      description: 'Professional network & career updates (activated when published).',
    },
    github: {
      label: 'GitHub',
      handle: 'sarthakbasu',
      url: 'https://github.com/sarthakbasu',
      enabled: true,
      description: 'Source repository and open web presence.',
    },
  },
  seoKeywords: [
    'Sarthak Basu',
    'Strategic Communication',
    'Analytical Problem-Solving',
    'Time Management',
    'Transferable Skills',
    'Stakeholder Alignment',
    'Priority Architecture',
    'Cross-Functional Collaboration',
    'Executive Presence',
    'Structured Execution',
  ],
  suggestedQueries: [
    'Communication skills',
    'Time management',
    'Problem solving',
    'Third-person bio',
    'Instagram',
    'Contact email',
  ],
};
