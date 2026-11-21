import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Expand,
  Github,
  Instagram,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import googleDevScreenshot from '../assets/google-dev-profile.png';
import githubScreenshot from '../assets/github-profile.png';
import type { ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface DeveloperProfilesSectionProps {
  profile: ProfileData;
}

interface LightboxItem {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  liveUrl: string;
}

export function DeveloperProfilesSection({
  profile,
}: DeveloperProfilesSectionProps) {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    if (!lightboxItem) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightboxItem(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  const showcases: Array<{
    id: string;
    testId: string;
    title: string;
    domain: string;
    url: string;
    imageSrc: string;
    imageAlt: string;
    bgHex: string;
    icon: typeof Award;
  }> = [
    {
      id: 'profile-google-dev',
      testId: 'google-dev-preview-card',
      title: 'Google Developers',
      domain: 'me.developers.google.com/u/mrsarthak',
      url: profile.googleDev.url,
      imageSrc: googleDevScreenshot,
      imageAlt:
        'Sarthak Basu Google Developers Builders Hub profile showing verified badges and developer credentials',
      bgHex: '#121212',
      icon: Award,
    },
    {
      id: 'profile-github',
      testId: 'github-preview-card',
      title: 'GitHub',
      domain: 'github.com/sarthakariya',
      url: profile.socials.github.url,
      imageSrc: githubScreenshot,
      imageAlt:
        'Sarthak Basu GitHub profile showing pinned repositories, 255 contributions in 2026, and achievements',
      bgHex: '#0D1117',
      icon: Github,
    },
  ];

  return (
    <section
      id="profiles"
      aria-labelledby="profiles-heading"
      className="scroll-mt-24 space-y-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2
            id="profiles-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-50"
          >
            Verified Developer Profiles
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Live snapshots of Sarthak Basu’s Google Builders Hub &amp; GitHub
            accounts — click any preview to inspect full-size
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {showcases.map((item, idx) => {
          const Icon = item.icon;
          return (
            <SpotlightIsland
              key={item.id}
              id={item.id}
              delay={0.07 * idx}
              hoverLift
              className="overflow-hidden"
            >
              {/* Crisp Browser Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-400/12 bg-[#111B2E]/85 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Icon
                    className="h-4 w-4 shrink-0 text-sky-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-slate-100">
                    {item.title}
                  </span>
                  <span className="hidden truncate font-mono text-xs text-slate-400 sm:inline">
                    {item.domain}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxItem({
                        title: item.title,
                        subtitle: item.domain,
                        imageSrc: item.imageSrc,
                        imageAlt: item.imageAlt,
                        liveUrl: item.url,
                      })
                    }
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-slate-400/20 bg-[#0A101E] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/45 hover:text-sky-300"
                  >
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Zoom</span>
                  </button>

                  <a
                    data-testid={item.testId}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-lg bg-sky-400 px-3 py-1.5 text-xs font-semibold text-[#070B14] transition-colors hover:bg-sky-300"
                  >
                    <span>Open Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Click-to-Zoom Full-Width Real Screenshot */}
              <button
                type="button"
                onClick={() =>
                  setLightboxItem({
                    title: item.title,
                    subtitle: item.domain,
                    imageSrc: item.imageSrc,
                    imageAlt: item.imageAlt,
                    liveUrl: item.url,
                  })
                }
                aria-label={`Inspect ${item.title} screenshot full screen`}
                className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-400"
                style={{ backgroundColor: item.bgHex }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  referrerPolicy="no-referrer"
                  className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </button>
            </SpotlightIsland>
          );
        })}

        {/* Sleek Instagram Connect Island */}
        <SpotlightIsland id="instagram" hoverLift>
          <a
            id="social-instagram"
            data-testid="instagram-live-preview"
            href={profile.instagramPreview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 p-4 sm:px-6 sm:py-4"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-400/15 bg-[#111B2E] text-sky-400 transition-colors group-hover:border-sky-400/45">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-slate-100">
                  Instagram
                </p>
                <p className="truncate font-mono text-xs text-slate-400">
                  {profile.instagramPreview.handle} ·{' '}
                  {profile.socials.instagram.description}
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-400">
              <span>Open</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        </SpotlightIsland>
      </div>

      {/* Fullscreen High-Resolution Screenshot Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxItem.title} full screen preview`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070E]/90 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-400/20 bg-[#0D1424] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-400/15 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold text-slate-50">
                    {lightboxItem.title}
                  </p>
                  <p className="truncate font-mono text-xs text-slate-400">
                    {lightboxItem.subtitle}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={lightboxItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-sky-400 px-3.5 py-1.5 text-xs font-semibold text-[#070B14] transition-colors hover:bg-sky-300"
                  >
                    <span>Open Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    aria-label="Close preview"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-400/20 bg-[#111B2E] text-slate-200 transition-colors hover:border-sky-400/45 hover:text-white"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="overflow-auto bg-[#0B0F17] p-3 sm:p-4">
                <img
                  src={lightboxItem.imageSrc}
                  alt={lightboxItem.imageAlt}
                  referrerPolicy="no-referrer"
                  className="mx-auto h-auto w-full rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
