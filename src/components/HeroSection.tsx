import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react';
import type { ProfileData, StatMetric } from '../data/profileData';
import sarthakPortrait from '../assets/sarthak-basu.jpg';
import {
  ITEM_STAGGER_VARIANTS,
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
  type IslandAccent,
} from './SpotlightIsland';

interface HeroSectionProps {
  profile: ProfileData;
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

    const duration = 820;
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
      timeoutId = window.setTimeout(() => setCharCount((c) => c + 1), 40);
    } else if (!isDeleting && charCount === currentRole.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2200);
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
    <span className="inline-flex items-center font-mono text-xs font-medium text-sky-300 sm:text-sm">
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-violet-400"
      />
    </span>
  );
}

export function HeroSection({ profile }: HeroSectionProps) {
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
      aria-label="Sarthak Basu overview"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-4"
    >
      {/* Centered Multi-Color Hero Island */}
      <SpotlightIsland
        accent="multi"
        tilt
        staggerChild
        className="tech-grid-bg p-6 sm:p-8 lg:p-9"
      >
        {/* Multi-color soft aurora ambiance */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-24 h-60 w-60 rounded-full bg-violet-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -left-16 h-44 w-44 rounded-full bg-emerald-500/12 blur-3xl"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Passport-Proportioned Real Portrait with Multi-Color Luminous Ring */}
          <motion.div
            variants={ITEM_STAGGER_VARIANTS}
            whileHover={{ scale: 1.04, rotate: 0.8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="mb-4 rounded-2xl bg-gradient-to-br from-sky-400 via-violet-400 to-emerald-400 p-[2px] shadow-[0_0_32px_-6px_rgba(167,139,250,0.5)]"
          >
            <div className="h-24 w-24 overflow-hidden rounded-[14px] bg-[#06070D] sm:h-28 sm:w-28">
              <img
                src={sarthakPortrait}
                alt={profile.portraitAlt}
                width={112}
                height={112}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Clean Unboxed Multi-Color Kicker */}
          <motion.p
            variants={ITEM_STAGGER_VARIANTS}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            <span className="text-sky-300">Google Developer</span>
            <span className="text-slate-600">·</span>
            <span className="text-violet-300">Microsoft Event Attendee</span>
            <span className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </span>
          </motion.p>

          {/* Main Name */}
          <motion.h1
            variants={ITEM_STAGGER_VARIANTS}
            className="mt-2.5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] lg:leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent">
              {profile.fullName}
            </span>
          </motion.h1>

          {/* Smooth Typewriter Role Line */}
          <motion.div variants={ITEM_STAGGER_VARIANTS} className="mt-2.5 min-h-[1.5rem]">
            <CyclingRoleText roles={profile.cyclingRoles} />
          </motion.div>

          {/* Concise Casual 3rd-Person Intro */}
          <motion.p
            variants={ITEM_STAGGER_VARIANTS}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15.5px]"
          >
            {profile.tagline}
          </motion.p>

          {/* Centered Action Row */}
          <motion.div
            variants={ITEM_STAGGER_VARIANTS}
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
          >
            <motion.a
              href={profile.socials.googleDev.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 px-4 py-2 text-xs font-bold text-[#06070D] shadow-[0_8px_24px_-8px_rgba(56,189,248,0.65)] transition-all hover:brightness-110 sm:text-[13px]"
            >
              Google Dev Profile
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.a>

            <motion.a
              href={profile.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/35 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-100 transition-colors hover:border-violet-300/60 hover:bg-violet-400/20 sm:text-[13px]"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-violet-300" />
            </motion.a>

            <motion.a
              href={profile.socials.friendsFun.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-300/60 hover:bg-emerald-400/20 sm:text-[13px]"
            >
              Friends Fun SMP
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-300" />
            </motion.a>

            <motion.button
              type="button"
              onClick={handleCopyEmail}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400/45 hover:bg-amber-400/10 hover:text-amber-100 sm:text-[13px]"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Email Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-amber-300" />
                  Copy Email
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </SpotlightIsland>

      {/* Centered 3-Column Animated Count-Up Stat Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profile.stats.map((stat: StatMetric, index: number) => {
          const theme = STAT_THEMES[index % STAT_THEMES.length];
          return (
            <SpotlightIsland
              key={stat.id}
              accent={theme.accent}
              tilt
              staggerChild
              className="p-4 text-center sm:p-5"
            >
              <p
                className={`bg-gradient-to-r bg-clip-text font-display text-3xl font-extrabold tracking-tight text-transparent sm:text-[34px] ${theme.valueGradient}`}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className={`mt-1 text-xs font-bold uppercase tracking-wider ${theme.labelColor}`}>
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{stat.detail}</p>
            </SpotlightIsland>
          );
        })}
      </div>
    </motion.section>
  );
}
