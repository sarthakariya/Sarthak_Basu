import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  Instagram,
  Mail,
  Maximize2,
  X,
} from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import googleDevScreenshot from '../assets/google-dev-profile.png';
import githubScreenshot from '../assets/github-profile.png';
import {
  SECTION_STAGGER_VARIANTS,
  SpotlightIsland,
  VIEWPORT_CONFIG,
} from './SpotlightIsland';

interface DeveloperProfilesSectionProps {
  profile: ProfileData;
}

interface LightboxState {
  title: string;
  src: string;
  alt: string;
  url: string;
}

export function DeveloperProfilesSection({
  profile,
}: DeveloperProfilesSectionProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightbox(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

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
      id="profiles"
      aria-labelledby="profiles-heading"
      variants={SECTION_STAGGER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="space-y-6"
    >
      <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
            Verified Profiles &amp; Contact
          </p>
          <h1
            id="profiles-heading"
            className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Live Snapshots &amp; Links
          </h1>
        </div>
        <p className="font-mono text-xs text-slate-400">
          Click any profile snapshot to inspect full-screen
        </p>
      </div>

      {/* Side-by-Side 2-Column Real Screenshot Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* 1. Google Builders Hub Snapshot */}
        <SpotlightIsland
          id="google-developers"
          accent="sky"
          staggerChild
          className="flex flex-col p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-sky-300 uppercase">
                Public Developer Badges
              </p>
              <h2 className="truncate font-display text-lg font-bold text-white">
                Google Builders Hub
              </h2>
            </div>
            <a
              href={profile.googleDev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-sky-400/35 bg-sky-400/10 px-2.5 py-1.5 text-xs font-semibold text-sky-200 transition-colors hover:border-sky-300 hover:bg-sky-400/20"
            >
              Open Live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() =>
              setLightbox({
                title: 'Google Builders Hub — Sarthak Basu',
                src: googleDevScreenshot,
                alt: 'Google Builders Hub profile screenshot of Sarthak Basu',
                url: profile.googleDev.url,
              })
            }
            className="group/shot relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.09] bg-[#06070D] text-left"
            aria-label="Zoom Google Builders Hub profile screenshot"
          >
            <img
              src={googleDevScreenshot}
              alt="Google Builders Hub profile of Sarthak Basu showing Firebase Studio, Chrome DevTools, Android SDK, and Google Developer Program badges"
              loading="lazy"
              className="block aspect-[16/9] w-full bg-[#06070D] object-contain transition-transform duration-500 ease-out group-hover/shot:scale-[1.02]"
            />
            <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-lg border border-white/15 bg-[#06070D]/90 px-2.5 py-1 font-mono text-[10px] font-medium text-slate-200 transition-colors group-hover/shot:border-sky-400/50 group-hover/shot:text-sky-300">
              <Maximize2 className="h-3 w-3" />
              Zoom
            </span>
          </button>

          <p className="mt-2.5 truncate font-mono text-[11px] text-slate-400">
            {profile.googleDev.handle}
          </p>
        </SpotlightIsland>

        {/* 2. GitHub Snapshot */}
        <SpotlightIsland
          id="github"
          accent="violet"
          staggerChild
          className="flex flex-col p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-violet-300 uppercase">
                Code &amp; Contributions
              </p>
              <h2 className="truncate font-display text-lg font-bold text-white">
                GitHub (@{profile.githubUsername})
              </h2>
            </div>
            <a
              href={profile.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-violet-400/35 bg-violet-400/10 px-2.5 py-1.5 text-xs font-semibold text-violet-200 transition-colors hover:border-violet-300 hover:bg-violet-400/20"
            >
              Open Live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() =>
              setLightbox({
                title: `GitHub — @${profile.githubUsername}`,
                src: githubScreenshot,
                alt: 'GitHub profile screenshot of Sarthak Basu (@sarthakariya)',
                url: profile.socials.github.url,
              })
            }
            className="group/shot relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.09] bg-[#06070D] text-left"
            aria-label="Zoom GitHub profile screenshot"
          >
            <img
              src={githubScreenshot}
              alt="GitHub profile of Sarthak Basu (@sarthakariya) showing pinned repositories and 255 contributions in 2026"
              loading="lazy"
              className="block aspect-[16/9] w-full bg-[#06070D] object-contain transition-transform duration-500 ease-out group-hover/shot:scale-[1.02]"
            />
            <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-lg border border-white/15 bg-[#06070D]/90 px-2.5 py-1 font-mono text-[10px] font-medium text-slate-200 transition-colors group-hover/shot:border-violet-400/50 group-hover/shot:text-violet-300">
              <Maximize2 className="h-3 w-3" />
              Zoom
            </span>
          </button>

          <p className="mt-2.5 truncate font-mono text-[11px] text-slate-400">
            github.com/{profile.githubUsername} · 255+ contributions
          </p>
        </SpotlightIsland>
      </div>

      {/* Bottom 3-Column Direct Links & Contact Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SpotlightIsland
          id="instagram-connect"
          accent="rose"
          staggerChild
          className="flex flex-col justify-between p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30">
              <Instagram className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Instagram</p>
              <p className="truncate font-mono text-xs text-rose-300">
                {profile.instagramPreview.handle}
              </p>
            </div>
          </div>
          <a
            href={profile.instagramPreview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-between rounded-xl border border-rose-400/35 bg-rose-400/10 px-3.5 py-2 text-xs font-semibold text-rose-200 transition-colors hover:border-rose-300 hover:bg-rose-400/20"
          >
            <span>Open Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </SpotlightIsland>

        <SpotlightIsland
          accent="emerald"
          staggerChild
          className="flex flex-col justify-between p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
              <Globe className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Friends Fun SMP</p>
              <p className="truncate font-mono text-xs text-emerald-300">
                3,000+ Members
              </p>
            </div>
          </div>
          <a
            href={profile.community.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-between rounded-xl border border-emerald-400/35 bg-emerald-400/10 px-3.5 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-300 hover:bg-emerald-400/20"
          >
            <span>Visit Website</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </SpotlightIsland>

        <SpotlightIsland
          id="contact-email"
          accent="amber"
          staggerChild
          className="flex flex-col justify-between p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30">
              <Mail className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Direct Email</p>
              <p className="truncate font-mono text-xs text-amber-200">
                {profile.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-200 transition-colors hover:border-amber-300 hover:bg-amber-400/20"
            >
              Send Mail
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/30 hover:text-white"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </SpotlightIsland>
      </div>

      {/* Fullscreen Animated Lightbox */}
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
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0D111C] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <p className="truncate font-display text-sm font-semibold text-white">
                  {lightbox.title}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={lightbox.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-sky-400 to-violet-400 px-3 py-1.5 text-xs font-bold text-[#06070D]"
                  >
                    Visit Page
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close fullscreen preview"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-[calc(90vh-56px)] overflow-auto bg-[#06070D] p-2">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
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
