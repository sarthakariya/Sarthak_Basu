import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Award, GraduationCap, ShieldCheck, Waves } from 'lucide-react';
import type { CertificateCategory, ProfileData } from '../data/profileData';
import {
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
  type IslandAccent,
} from './SpotlightIsland';

interface CertificatesSectionProps {
  profile: ProfileData;
}

type FilterOption = 'all' | CertificateCategory;

const FILTER_TABS: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Tech' },
  { id: 'academics', label: 'Academics' },
  { id: 'sports', label: 'Sports' },
];

function getCertificateVisual(id: string): {
  accent: IslandAccent;
  iconBg: string;
  labelColor: string;
  icon: typeof Award;
} {
  if (id === 'cert-google-dev') {
    return {
      accent: 'sky',
      iconBg: 'bg-sky-400/15 text-sky-300 ring-sky-400/30',
      labelColor: 'text-sky-300',
      icon: Award,
    };
  }
  if (id === 'cert-class-10') {
    return {
      accent: 'amber',
      iconBg: 'bg-amber-400/15 text-amber-300 ring-amber-400/30',
      labelColor: 'text-amber-300',
      icon: GraduationCap,
    };
  }
  if (id === 'cert-karate') {
    return {
      accent: 'violet',
      iconBg: 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
      labelColor: 'text-violet-300',
      icon: ShieldCheck,
    };
  }
  return {
    accent: 'emerald',
    iconBg: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30',
    labelColor: 'text-emerald-300',
    icon: Waves,
  };
}

export function CertificatesSection({ profile }: CertificatesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const visibleCertificates =
    activeFilter === 'all'
      ? profile.certificates
      : profile.certificates.filter((item) => item.category === activeFilter);

  return (
    <motion.section
      id="certificates"
      aria-labelledby="certificates-heading"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-4 scroll-mt-20"
    >
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-amber-300 uppercase">
            Certificates &amp; Milestones
          </p>
          <h2
            id="certificates-heading"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-white"
          >
            Tech, Academics &amp; Sports
          </h2>
        </div>

        {/* Single-Row Spring Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className="inline-flex max-w-full shrink-0 items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0D111C] p-1"
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'text-[#06070D]'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="cert-filter-active"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-300 via-sky-300 to-violet-300"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact 2x2 Multi-Color Bento Grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleCertificates.map((cert) => {
            const visual = getCertificateVisual(cert.id);
            const Icon = visual.icon;
            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0.9, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              >
                <SpotlightIsland
                  id={cert.id}
                  accent={visual.accent}
                  tilt
                  className="flex h-full flex-col justify-between p-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${visual.iconBg}`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-[0.12em] uppercase ${visual.labelColor}`}
                      >
                        {cert.categoryLabel} · {cert.period}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
                      {cert.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
                    <span className="truncate font-mono text-[11px] text-slate-500">
                      {cert.credentialNote}
                    </span>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-300 transition-colors hover:text-sky-200"
                      >
                        Verify
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </SpotlightIsland>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
