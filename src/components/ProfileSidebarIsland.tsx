import { useEffect, useState } from 'react';
import {
  Award,
  Check,
  Copy,
  Github,
  Globe,
  Instagram,
  Mail,
} from 'lucide-react';
import { motion } from 'motion/react';
import portraitPhoto from '../assets/sarthak-basu.jpg';
import type { ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface ProfileSidebarIslandProps {
  profile: ProfileData;
}

export function ProfileSidebarIsland({ profile }: ProfileSidebarIslandProps) {
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState(profile.cyclingRoles[0] ?? '');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth typewriter cycling role effect
  useEffect(() => {
    const roles = profile.cyclingRoles;
    if (roles.length === 0) return;

    const currentRole = roles[roleIndex % roles.length];
    let timeoutId: number;

    if (!isDeleting && typedText === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2100);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.slice(0, typedText.length - 1)
        : currentRole.slice(0, typedText.length + 1);
      timeoutId = window.setTimeout(
        () => setTypedText(nextText),
        isDeleting ? 34 : 58
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [typedText, isDeleting, roleIndex, profile.cyclingRoles]);

  async function handleCopyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      }
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    }
  }

  const socialItems = [
    {
      label: 'GitHub',
      href: profile.socials.github.url,
      icon: Github,
    },
    {
      label: 'Google Developers',
      href: profile.socials.googleDev.url,
      icon: Award,
    },
    {
      label: 'Instagram',
      href: profile.socials.instagram.url,
      icon: Instagram,
    },
    {
      label: 'Friends Fun SMP',
      href: profile.socials.friendsFun.url,
      icon: Globe,
    },
  ];

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <SpotlightIsland className="overflow-hidden p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
        {/* Portrait & Identity */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-32 w-32 overflow-hidden rounded-2xl border border-sky-400/30 bg-[#111B2E] p-1 shadow-[0_12px_36px_-12px_rgba(56,189,248,0.35)]"
          >
            <div className="h-full w-full overflow-hidden rounded-xl bg-[#0A101E]">
              {!portraitFailed ? (
                <img
                  src={portraitPhoto}
                  alt={profile.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#111B2E]">
                  <span className="font-display text-3xl font-bold text-slate-100">
                    SB
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <h1
            id="hero-heading"
            className="font-display mt-5 text-2xl font-bold tracking-tight text-slate-50 sm:text-[1.75rem]"
          >
            {profile.fullName}
          </h1>

          {/* Animated Typewriter Role */}
          <p
            aria-live="polite"
            className="mt-1.5 min-h-[22px] font-mono text-xs font-medium text-sky-400"
          >
            {typedText}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-sky-400 opacity-80"
            />
          </p>

          {/* Direct Social Icon Row */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {socialItems.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-400/15 bg-[#111B2E] text-slate-300 transition-colors hover:border-sky-400/45 hover:text-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Structured Dossier Table */}
        <dl className="mt-6 space-y-3 border-t border-slate-400/12 pt-5 text-xs">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Location</dt>
            <dd className="font-medium text-slate-100">{profile.location}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Community</dt>
            <dd className="font-mono font-medium text-emerald-400 tabular-nums">
              {profile.community.memberCount} SMP
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Education</dt>
            <dd className="font-medium text-slate-100">Class 12 CS</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Handle</dt>
            <dd className="font-mono font-medium text-slate-200">
              {profile.socials.instagram.handle}
            </dd>
          </div>
        </dl>

        {/* Primary Sidebar Action: Copy Direct Email */}
        <div className="mt-6 border-t border-slate-400/12 pt-5">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-sky-400/35 bg-sky-400/10 px-4 py-2.5 text-xs font-semibold text-sky-300 transition-all duration-150 hover:bg-sky-400 hover:text-[#070B14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            {emailCopied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Email Copied</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="truncate">{profile.email}</span>
                <Copy className="h-3.5 w-3.5 opacity-75" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </SpotlightIsland>
    </aside>
  );
}
