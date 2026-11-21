import { motion } from 'motion/react';
import { Code2, GraduationCap } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import {
  ITEM_STAGGER_VARIANTS,
  SpotlightIsland,
} from './SpotlightIsland';

interface AboutNarrativeSectionProps {
  profile: ProfileData;
}

const STACK_COLORS = [
  'text-sky-300',
  'text-violet-300',
  'text-emerald-300',
  'text-amber-300',
];

export function AboutNarrativeSection({ profile }: AboutNarrativeSectionProps) {
  return (
    <SpotlightIsland
      id="about"
      accent="violet"
      staggerChild
      className="flex h-full flex-col justify-between p-6 scroll-mt-20"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-violet-300" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-violet-300 uppercase">
              Background &amp; Stack
            </p>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <GraduationCap className="h-3.5 w-3.5 text-sky-300" />
            {profile.school}
          </span>
        </div>

        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          Full-Stack Web &amp; AI Developer
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
          {profile.about.lead}
        </p>

        {profile.about.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Compact Color-Coded Tech Stack List */}
      <motion.div
        id="skills"
        variants={ITEM_STAGGER_VARIANTS}
        className="mt-5 border-t border-white/[0.09] pt-4 scroll-mt-20"
      >
        <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
          Core Tech Stack
        </p>
        <dl className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profile.techStack.map((group, idx) => (
            <div key={group.id} id={group.id}>
              <dt
                className={`font-mono text-[11px] font-semibold ${STACK_COLORS[idx % STACK_COLORS.length]}`}
              >
                {group.category}
              </dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-slate-300">
                {group.tools.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </SpotlightIsland>
  );
}
