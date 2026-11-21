import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight,
  Award,
  Check,
  Copy,
  Globe,
  MapPin,
  User,
} from 'lucide-react';
import type { ProfileData, StatMetric } from '../data/profileData';
import type { PageRoute } from '../utils/router';
import sarthakPortrait from '../assets/sarthak-basu.jpg';
import { ThreeHeroScene } from './ThreeHeroScene';
import {
  ITEM_STAGGER_VARIANTS,
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
  type IslandAccent,
} from './SpotlightIsland';

interface HeroSectionProps {
  profile: ProfileData;
  onNavigate: (route: PageRoute) => void;
}

const STAT_THEMES: Array<{
  accent: IslandAccent;
  valueGradient: string;
  labelColor: string;
}> = [
  {
    accent: 'emerald',
    valueGradient: 'from-emerald-300 to-teal-400',
    labelColor: 'text-emerald-300/90',
  },
  {
    accent: 'sky',
    valueGradient: 'from-sky-300 to-cyan-400',
    labelColor: 'text-sky-300/90',
  },
  {
    accent: 'amber',
    valueGradient: 'from-amber-300 to-violet-300',
    labelColor: 'text-amber-300/90',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 'some' });
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!isInView) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target);
      return;
    }

    const duration = 760;
    const startTime = performance.now();
    let frameId = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function CyclingRoleText({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(roles[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const currentRole = roles[roleIndex] ?? '';
    let timeoutId: number;

    if (!isDeleting && charCount < currentRole.length) {
      timeoutId = window.setTimeout(() => setCharCount((c) => c + 1), 38);
    } else if (!isDeleting && charCount === currentRole.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2300);
    } else if (isDeleting && charCount > 0) {
      timeoutId = window.setTimeout(() => setCharCount((c) => c - 1), 22);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => window.clearTimeout(timeoutId);
  }, [charCount, isDeleting, roleIndex, roles]);

  const displayed = (roles[roleIndex] ?? '').slice(0, charCount);

  return (
    <span className="inline-flex items-center font-mono text-xs font-medium text-sky-300 sm:text-[13px]">
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-3.5 w-[2px] bg-violet-400"
      />
    </span>
  );
}

export function HeroSection({ profile, onNavigate }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  }

  return (
    <motion.section
      id="top"
      aria-label="Sarthak Basu Home"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-6"
    >
      {/* Clean Split Hero: Glassmorphic Identity Card + Interactive Three.js 3D Artifact */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
        <SpotlightIsland
          accent="multi"
          staggerChild
          className="tech-grid-bg flex flex-col justify-between p-6 sm:p-7 lg:col-span-6"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
                  <MapPin className="h-3 w-3 text-emerald-300" />
                  <span>{profile.location}</span>
                </p>
                <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <span className="bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent">
                    {profile.fullName}
                  </span>
                </h1>
              </div>

              {/* Crisp Passport-Framed Portrait on the right of name */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="shrink-0 rounded-2xl bg-gradient-to-br from-sky-400 via-violet-400 to-emerald-400 p-[2px] shadow-[0_0_28px_-6px_rgba(56,189,248,0.55)]"
              >
                <div className="h-20 w-20 overflow-hidden rounded-[14px] bg-[#06070D] sm:h-24 sm:w-24">
                  <img
                    src={sarthakPortrait}
                    alt={profile.portraitAlt}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-3 min-h-[1.4rem]">
              <CyclingRoleText roles={profile.cyclingRoles} />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              {profile.tagline}
            </p>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2.5 pt-2">
            <motion.a
              href="#/certificates"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('certificates');
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 px-4 py-2.5 text-xs font-bold text-[#06070D] shadow-[0_10px_28px_-10px_rgba(56,189,248,0.7)] transition-all hover:brightness-110 sm:text-[13px]"
            >
              Certificates &amp; Badges
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>

            <motion.a
              href="#/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:border-violet-400/50 hover:bg-violet-400/10 sm:text-[13px]"
            >
              About Sarthak
            </motion.a>

            <motion.button
              type="button"
              onClick={handleCopyEmail}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400/45 hover:bg-amber-400/10 hover:text-amber-100"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-amber-300" />
                  Email
                </>
              )}
            </motion.button>
          </div>
        </SpotlightIsland>

        {/* Dedicated Three.js 3D Interactive Studio Showcase */}
        <motion.div variants={ITEM_STAGGER_VARIANTS} className="lg:col-span-6">
          <ThreeHeroScene className="h-full" />
        </motion.div>
      </div>

      {/* 3 Magnetic Glassmorphic Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profile.stats.map((stat: StatMetric, index: number) => {
          const theme = STAT_THEMES[index % STAT_THEMES.length];
          return (
            <SpotlightIsland
              key={stat.id}
              accent={theme.accent}
              staggerChild
              className="p-5 text-center"
            >
              <p
                className={`bg-gradient-to-r bg-clip-text font-display text-3xl font-extrabold tracking-tight text-transparent sm:text-[34px] ${theme.valueGradient}`}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </p>
              <p
                className={`mt-1 text-xs font-bold uppercase tracking-wider ${theme.labelColor}`}
              >
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{stat.detail}</p>
            </SpotlightIsland>
          );
        })}
      </div>

      {/* Clean Page Directory Cards (Separate Multi-Page Links) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <a
          href="#/about"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
          }}
          className="block focus:outline-none"
        >
          <SpotlightIsland
            accent="violet"
            staggerChild
            className="flex h-full flex-col justify-between p-5"
          >
            <div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/30">
                <User className="h-4 w-4" />
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-white">
                About &amp; Community
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                Background at Hirendra Leela Patranavis School, core tech stack, and Friends Fun SMP (3,000+ members).
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-violet-300 transition-transform group-hover:translate-x-1">
              Open About Page
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </SpotlightIsland>
        </a>

        <a
          href="#/certificates"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('certificates');
          }}
          className="block focus:outline-none"
        >
          <SpotlightIsland
            accent="amber"
            staggerChild
            className="flex h-full flex-col justify-between p-5"
          >
            <div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30">
                <Award className="h-4 w-4" />
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-white">
                Certificates &amp; Badges
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                BSERC National Space Day AI, CampusCrew &amp; Unstop QuizOff 2026, live Credly badge, Karate &amp; Swimming.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-amber-300 transition-transform group-hover:translate-x-1">
              View All Certificates
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </SpotlightIsland>
        </a>

        <a
          href="#/profiles"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('profiles');
          }}
          className="block focus:outline-none"
        >
          <SpotlightIsland
            accent="sky"
            staggerChild
            className="flex h-full flex-col justify-between p-5"
          >
            <div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/30">
                <Globe className="h-4 w-4" />
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-white">
                Profiles &amp; Contact
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                Verified GitHub (@sarthakariya), Google Builders Hub, Instagram (@mr_the_sarthak), and direct email.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-sky-300 transition-transform group-hover:translate-x-1">
              Explore Profiles
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </SpotlightIsland>
        </a>
      </div>
    </motion.section>
  );
}
