import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import type { ProfileData, StatMetric } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface HeroSectionProps {
  profile: ProfileData;
}

function AnimatedStatCard({ stat, index }: { stat: StatMetric; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(stat.target);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayValue(stat.target);
      return;
    }

    const duration = 950;
    const startTime = performance.now();
    let frameId = 0;

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * stat.target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, stat.target]);

  return (
    <SpotlightIsland
      delay={0.08 * index}
      hoverLift
      className="flex flex-col justify-between p-5"
    >
      <div ref={ref}>
        <p className="font-display text-3xl font-bold tracking-tight text-slate-50 tabular-nums sm:text-[2rem]">
          {displayValue.toLocaleString()}
          <span className="text-sky-400">{stat.suffix}</span>
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-200">{stat.label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{stat.detail}</p>
      </div>
    </SpotlightIsland>
  );
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-banner-heading"
      className="scroll-mt-24 space-y-5"
    >
      {/* Animated Tech Hero Banner Island */}
      <SpotlightIsland className="relative overflow-hidden p-6 sm:p-9">
        {/* Ambient Architectural Grid + Controlled Radial Illumination */}
        <div
          aria-hidden="true"
          className="tech-grid-bg pointer-events-none absolute inset-0 opacity-75"
        />
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.35, 0.55, 0.35],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/18 blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-400">
            <span>Full-Stack Web &amp; AI Developer</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-emerald-400">Friends Fun SMP Founder</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400">{profile.location}</span>
          </div>

          <h2
            id="hero-banner-heading"
            className="font-display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] font-bold tracking-tight [text-wrap:balance] text-slate-50"
          >
            {profile.headline}
          </h2>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#profiles"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#070B14] transition-all duration-150 hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <span>Explore Verified Profiles</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={profile.community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-400/20 bg-[#111B2E]/90 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-slate-100 transition-all duration-150 hover:border-sky-400/45 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <span>Friends Fun SMP</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </SpotlightIsland>

      {/* Full-Width 3-Column Row of Floating Animated Stat Islands */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profile.stats.map((stat, index) => (
          <AnimatedStatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
