import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProfileData, SkillCategory } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface AboutNarrativeSectionProps {
  profile: ProfileData;
}

type FilterOption = 'All' | SkillCategory;

const STACK_TABS: Array<{ id: FilterOption; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Full-Stack Web', label: 'Web' },
  { id: 'AI & Agents', label: 'AI & Agents' },
  { id: 'Backend & Cloud', label: 'Backend' },
  { id: 'UI/UX Engineering', label: 'UI/UX' },
];

export function AboutNarrativeSection({ profile }: AboutNarrativeSectionProps) {
  const [activeTab, setActiveTab] = useState<FilterOption>('All');

  const visibleSkills =
    activeTab === 'All'
      ? profile.skills
      : profile.skills.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 space-y-5"
    >
      {/* Third-Person Biography Island */}
      <SpotlightIsland className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="about-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-50"
          >
            About Sarthak Basu
          </h2>
          <span className="font-mono text-xs text-slate-400">
            Developer · Founder · Class 12 CS
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed font-medium text-slate-200 sm:text-base">
          {profile.about.lead}
        </p>

        {profile.about.paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]"
          >
            {paragraph}
          </p>
        ))}

        {/* Clean Unboxed Key Technical Stack Matrix */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-400/12 pt-5 sm:grid-cols-2">
          {profile.techStack.map((group) => (
            <div key={group.id} id={group.id}>
              <p className="text-xs font-semibold text-sky-400">
                {group.index}. {group.category}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">
                {group.tools.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </SpotlightIsland>

      {/* Interactive Filterable Engineering Capabilities Bento */}
      <div id="skills" className="scroll-mt-24 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="shrink-0">
            <h3 className="font-display text-xl font-bold tracking-tight text-slate-100">
              Engineering Focus
            </h3>
            <p className="text-xs text-slate-400">
              Core systems Sarthak Basu designs, builds, and ships
            </p>
          </div>

          {/* Single-Row Interactive Segmented Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter engineering capabilities"
            className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-slate-400/15 bg-[#0A101E] p-1"
          >
            {STACK_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative min-h-[34px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#070B14]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-skill-tab"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-lg bg-sky-400"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill) => (
              <motion.div
                key={skill.id}
                id={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightIsland
                  hoverLift
                  className="flex h-full flex-col justify-between p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-medium text-sky-400">
                        {skill.index} · {skill.category}
                      </span>
                    </div>
                    <h4 className="font-display mt-2.5 text-lg font-semibold text-slate-50">
                      {skill.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {skill.summary}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-slate-400/12 pt-3 font-mono text-[11px] text-slate-300">
                    {skill.impactMetric}
                  </p>
                </SpotlightIsland>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
