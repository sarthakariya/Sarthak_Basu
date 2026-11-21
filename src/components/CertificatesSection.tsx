import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  Download,
  GraduationCap,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
} from 'lucide-react';
import {
  resolvePublicAssetUrl,
  type CertificateCategory,
  type CertificateImageKey,
  type ProfileData,
} from '../data/profileData';
import certBsercImg from '../assets/cert-bserc-ai-2026.jpg';
import certQuizoffImg from '../assets/cert-quizoff-2026.png';
import certGeminiQuizoffImg from '../assets/cert-gemini-quizoff-2026.png';
import { CredlyBadgeCard } from './CredlyBadgeCard';
import {
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
  type IslandAccent,
} from './SpotlightIsland';

interface CertificatesSectionProps {
  profile: ProfileData;
}

type FilterOption = 'all' | 'ai' | 'badges' | 'other';

const FILTER_TABS: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Tech' },
  { id: 'badges', label: 'Badges' },
  { id: 'other', label: 'Academics & Sports' },
];

const CERT_IMAGES: Record<CertificateImageKey, string> = {
  'bserc-ai-2026': certBsercImg,
  'quizoff-2026': certQuizoffImg,
  'gemini-quizoff-2026': certGeminiQuizoffImg,
};

interface LightboxData {
  title: string;
  issuer: string;
  src: string;
  pdfUrl?: string;
}

function getCertificateVisual(category: CertificateCategory, id: string): {
  accent: IslandAccent;
  iconBg: string;
  labelColor: string;
  icon: typeof Award;
} {
  if (category === 'ai') {
    return {
      accent: 'sky',
      iconBg: 'bg-sky-400/15 text-sky-300 ring-sky-400/30',
      labelColor: 'text-sky-300',
      icon: Sparkles,
    };
  }
  if (category === 'badges') {
    return {
      accent: 'amber',
      iconBg: 'bg-amber-400/15 text-amber-300 ring-amber-400/30',
      labelColor: 'text-amber-300',
      icon: Award,
    };
  }
  if (category === 'academics') {
    return {
      accent: 'violet',
      iconBg: 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
      labelColor: 'text-violet-300',
      icon: GraduationCap,
    };
  }
  if (id === 'cert-karate') {
    return {
      accent: 'rose',
      iconBg: 'bg-rose-400/15 text-rose-300 ring-rose-400/30',
      labelColor: 'text-rose-300',
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
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  const showCredly = activeFilter === 'all' || activeFilter === 'badges';

  const visibleCertificates = profile.certificates.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return item.category === 'ai';
    if (activeFilter === 'badges') return item.category === 'badges';
    return item.category === 'academics' || item.category === 'sports';
  });

  const visualCerts = visibleCertificates.filter((c) => Boolean(c.imageKey));
  const recordCerts = visibleCertificates.filter((c) => !c.imageKey);

  return (
    <motion.section
      id="certificates"
      aria-labelledby="certificates-heading"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-6"
    >
      {/* Clean Page Header + Single-Row Filter Tabs */}
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-amber-300 uppercase">
            Verified Credentials
          </p>
          <h1
            id="certificates-heading"
            className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Certificates &amp; Badges
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Official certificates, live Credly digital badge, and academic &amp; athletic records.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className="inline-flex max-w-full shrink-0 items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.1] bg-white/[0.03] p-1"
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

      {/* Official Live Credly Embedded Badge */}
      {showCredly && <CredlyBadgeCard badge={profile.credlyBadge} />}

      {/* Uploaded Real Certificate Image Gallery */}
      {visualCerts.length > 0 && (
        <div className="space-y-3">
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
            Uploaded Certificates · Click to Inspect Full-Screen
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {visualCerts.map((cert) => {
              const imgSrc = cert.imageKey ? CERT_IMAGES[cert.imageKey] : '';
              const visual = getCertificateVisual(cert.category, cert.id);
              return (
                <SpotlightIsland
                  key={cert.id}
                  id={cert.id}
                  accent={visual.accent}
                  staggerChild
                  className="flex flex-col justify-between p-4"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          title: cert.title,
                          issuer: cert.issuer,
                          src: imgSrc,
                          pdfUrl: cert.pdfUrl
                            ? resolvePublicAssetUrl(cert.pdfUrl)
                            : undefined,
                        })
                      }
                      aria-label={`Inspect ${cert.title} full-screen`}
                      className="group/cert relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#06070D]"
                    >
                      <img
                        src={imgSrc}
                        alt={`${cert.title} — ${cert.issuer}`}
                        loading="lazy"
                        className="block aspect-[4/3] w-full object-contain p-1 transition-transform duration-500 ease-out group-hover/cert:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-lg border border-white/15 bg-[#06070D]/90 px-2 py-1 font-mono text-[10px] font-medium text-slate-200 transition-colors group-hover/cert:border-sky-400/50 group-hover/cert:text-sky-300">
                        <Maximize2 className="h-3 w-3" />
                        Zoom
                      </span>
                    </button>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-[0.12em] uppercase ${visual.labelColor}`}
                      >
                        {cert.categoryLabel}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {cert.period}
                      </span>
                    </div>

                    <h2 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-white">
                      {cert.title}
                    </h2>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {cert.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
                    <span className="truncate font-mono text-[10px] text-slate-400">
                      {cert.credentialNote}
                    </span>
                    {cert.pdfUrl && (
                      <a
                        href={resolvePublicAssetUrl(cert.pdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-sky-300 transition-colors hover:text-sky-200"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </a>
                    )}
                  </div>
                </SpotlightIsland>
              );
            })}
          </div>
        </div>
      )}

      {/* Additional Digital Badges, Academics & Sports Credentials */}
      {recordCerts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recordCerts.map((cert) => {
            const visual = getCertificateVisual(cert.category, cert.id);
            const Icon = visual.icon;
            return (
              <SpotlightIsland
                key={cert.id}
                id={cert.id}
                accent={visual.accent}
                staggerChild
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
            );
          })}
        </div>
      )}

      {/* Fullscreen Certificate Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#0D111C] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-white">
                    {lightbox.title}
                  </p>
                  <p className="truncate font-mono text-[11px] text-slate-400">
                    {lightbox.issuer}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {lightbox.pdfUrl && (
                    <a
                      href={lightbox.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-sky-400 to-violet-400 px-3 py-1.5 text-xs font-bold text-[#06070D]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Open PDF
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close certificate preview"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-[calc(92vh-64px)] overflow-auto bg-[#06070D] p-3">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="mx-auto block h-auto max-w-full rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
