import { useState } from 'react';
import { Check, Copy, Moon, Search, Sun } from 'lucide-react';
import portraitPhoto from '../assets/sarthak-basu.jpg';
import type { ProfileData } from '../data/profileData';

interface HeroSectionProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onFocusSearch: () => void;
}

export function HeroSection({
  profile,
  isDark,
  onToggleTheme,
  onFocusSearch,
}: HeroSectionProps) {
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const portraitSrc = portraitPhoto;

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

  return (
    <header
      id="top"
      className="mx-auto max-w-3xl px-5 pt-7 pb-8 sm:px-6 sm:pt-11 sm:pb-10"
    >
      {/* Whisper-thin utility bar */}
      <div className="flex items-center justify-between gap-4 pb-8 text-xs text-[#6B5849] dark:text-[#9D8D7E]">
        <span>
          {profile.city}, {profile.country}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFocusSearch}
            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-[#DCD0BF] bg-[#FAF7F2]/80 px-2.5 py-1 text-xs font-medium text-[#4C3D31] transition-colors hover:border-[#BFA992] hover:text-[#1E1611] dark:border-[#2C231D] dark:bg-[#19130F] dark:text-[#C2B2A2] dark:hover:border-[#46372C] dark:hover:text-[#F4EDE4]"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd className="hidden font-mono text-[10px] opacity-65 sm:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDark
                ? 'Switch to Warm Beige light theme'
                : 'Switch to Deep Espresso dark theme'
            }
            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-[#DCD0BF] bg-[#FAF7F2]/80 px-2.5 py-1 text-xs font-medium text-[#4C3D31] transition-colors hover:border-[#BFA992] hover:text-[#1E1611] dark:border-[#2C231D] dark:bg-[#19130F] dark:text-[#C2B2A2] dark:hover:border-[#46372C] dark:hover:text-[#F4EDE4]"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Beige</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal Identity Header: Name on the left, Passport-Size Photo on the right */}
      <div className="flex items-center justify-between gap-5 sm:gap-8">
        <div className="min-w-0">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-[0.98] font-semibold tracking-tight text-[#1E1611] dark:text-[#F5EDE3]"
          >
            {profile.fullName}
          </h1>

          <p className="mt-2.5 text-sm font-medium text-[#5C4B3E] sm:text-base dark:text-[#CEBFA9]">
            {profile.roleLabel}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#6B5849] dark:text-[#9D8D7E]">
            <span className="font-mono text-[#7C4A2D] dark:text-[#C88A55]">
              {profile.socials.instagram.handle}
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
            >
              <span>{profile.email}</span>
              {emailCopied ? (
                <Check
                  className="h-3 w-3 text-[#7C4A2D] dark:text-[#C88A55]"
                  aria-hidden="true"
                />
              ) : (
                <Copy className="h-3 w-3 opacity-70" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Passport-sized real portrait photo right beside his name */}
        <figure className="shrink-0">
          <div className="h-[112px] w-[88px] overflow-hidden rounded-xl border border-[#D4C5B2] bg-[#EAE0D2] shadow-md sm:h-[136px] sm:w-[106px] dark:border-[#3A2E25] dark:bg-[#1E1713] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.85)]">
            {!portraitFailed ? (
              <img
                src={portraitSrc}
                alt={profile.portraitAlt}
                referrerPolicy="no-referrer"
                onError={() => setPortraitFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1E1713]">
                <span className="font-display text-2xl font-semibold text-[#F5EDE3]">
                  SB
                </span>
              </div>
            )}
          </div>
        </figure>
      </div>
    </header>
  );
}
