import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  GraduationCap,
  Medal,
  Waves,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { CertificateCategory, ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface CertificatesSectionProps {
  profile: ProfileData;
}

type CertFilter = 'all' | CertificateCategory;

const CERT_TABS: Array<{ id: CertFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Tech & Google' },
  { id: 'academics', label: 'Academics' },
  { id: 'sports', label: 'Sports' },
];

function getCertIcon(id: string, category: CertificateCategory) {
  if (id === 'cert-swimming') return Waves;
  if (category === 'tech') return Award;
  if (category === 'academics') return GraduationCap;
  return Medal;
}

export function CertificatesSection({ profile }: CertificatesSectionProps) {
  const [filter, setFilter] = useState<CertFilter>('all');

  const items =
    filter === 'all'
      ? profile.certificates
      : profile.certificates.filter((cert) => cert.category === filter);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="scroll-mt-24 space-y-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="certificates-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-50"
          >
            Certificates &amp; Recognition
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Verified developer credentials, academic milestones, Karate &amp;
            Swimming honors
          </p>
        </div>

        {/* Single-Row Interactive Segmented Category Filter */}
        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className="inline-flex max-w-full shrink-0 items-center gap-1 overflow-x-auto rounded-xl border border-slate-400/15 bg-[#0A101E] p-1"
        >
          {CERT_TABS.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.id)}
                className={`relative min-h-[34px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-[#070B14]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-cert-tab"
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

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {items.map((cert) => {
            const Icon = getCertIcon(cert.id, cert.category);
            return (
              <motion.div
                key={cert.id}
                id={cert.id}
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
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-400/15 bg-[#111B2E] text-sky-400">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">
                        {cert.categoryLabel} · {cert.period}
                      </span>
                    </div>

                    <h3 className="font-display mt-4 text-lg font-semibold text-slate-50">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-sky-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                      {cert.summary}
                    </p>

                    {cert.imageUrl && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-slate-400/15 bg-[#0A101E]">
                        <img
                          src={cert.imageUrl}
                          alt={`${cert.title} certificate for Sarthak Basu`}
                          referrerPolicy="no-referrer"
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-400/12 pt-3 text-xs">
                    <span className="truncate text-slate-400">
                      {cert.credentialNote}
                    </span>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                      >
                        <span>Verify</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </SpotlightIsland>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
