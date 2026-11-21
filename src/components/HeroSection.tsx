import { useState } from 'react';
import {
  ArrowDownRight,
  Award,
  Github,
  Instagram,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
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

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-20"
    >
      {/* Editorial 2-column balanced split */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left column: Developer & Google Badges First */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            {/* Unboxed editorial metadata line */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCD0BF] pb-4 text-xs font-medium text-[#6B5849] dark:border-[#342A23] dark:text-[#BDAE9E]">
              <div className="flex flex-wrap items-center gap-2">
                <span>{profile.roleLabel}</span>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={
                  isDark
                    ? 'Switch to Warm Beige light theme'
                    : 'Switch to Deep Espresso dark theme'
                }
                className="-ml-2.5 inline-flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium text-[#5C4B3E] transition-colors hover:bg-[#EDE5D8] hover:text-[#1E1611] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] sm:ml-0 dark:text-[#C2B2A2] dark:hover:bg-[#261E19] dark:hover:text-[#F4EDE4]"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Warm Beige</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Espresso Dark</span>
                  </>
                )}
              </button>
            </div>

            <h1
              id="hero-heading"
              className="font-display mt-7 text-balance text-[clamp(2.85rem,5.8vw,4.75rem)] leading-[1.03] font-semibold tracking-tight text-[#1E1611] dark:text-[#F4EDE4]"
            >
              {profile.fullName}
            </h1>

            <p className="font-display mt-4 max-w-2xl text-balance text-2xl leading-snug font-medium text-[#5C4B3E] italic sm:text-3xl dark:text-[#D9C7B4]">
              {profile.headline}
            </p>

            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[#4C3D31] dark:text-[#C9B9A9]">
              {profile.tagline}
            </p>

            {/* Primary & secondary action row */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#profiles"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#7C4A2D] px-5 py-2.5 text-sm font-semibold text-[#FAF7F2] transition-colors duration-150 hover:bg-[#633820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66] dark:focus-visible:outline-[#C88A55]"
              >
                <span>GitHub &amp; Google Badges</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onFocusSearch}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#CBBBA6] bg-[#FAF7F2] px-5 py-2.5 text-sm font-medium text-[#1E1611] transition-colors duration-150 hover:bg-[#EDE5D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] dark:border-[#3D3129] dark:bg-[#1E1814] dark:text-[#F4EDE4] dark:hover:bg-[#2A211B]"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Search Profile</span>
              </button>
            </div>

            {/* Direct Verified Identity Links (clean unboxed text row) */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#5C4B3E] dark:text-[#C2B2A2]">
              <a
                href={profile.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 underline-offset-4 transition-colors hover:text-[#7C4A2D] hover:underline dark:hover:text-[#C88A55]"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span>github.com/sarthakariya</span>
              </a>
              <a
                href={profile.socials.googleDev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 underline-offset-4 transition-colors hover:text-[#7C4A2D] hover:underline dark:hover:text-[#C88A55]"
              >
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                <span>g.dev/mrsarthak</span>
              </a>
              <a
                href={profile.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 underline-offset-4 transition-colors hover:text-[#7C4A2D] hover:underline dark:hover:text-[#C88A55]"
              >
                <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{profile.socials.instagram.handle}</span>
              </a>
            </div>
          </div>

          {/* Subtle bottom availability & email line */}
          <div className="mt-10 border-t border-[#DCD0BF] pt-4 text-xs leading-relaxed text-[#6B5849] dark:border-[#342A23] dark:text-[#A99888]">
            <span>{profile.availability}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{profile.email}</span>
          </div>
        </div>

        {/* Right column: Sarthak's real uploaded portrait */}
        <div className="lg:col-span-5">
          <figure className="relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-[#DCD0BF] bg-[#EAE0D2] dark:border-[#342A23] dark:bg-[#221B16]">
            {!portraitFailed ? (
              <img
                src={profile.portraitUrl}
                alt={profile.portraitAlt}
                referrerPolicy="no-referrer"
                onError={() => setPortraitFailed(true)}
                className="h-full max-h-[560px] w-full object-cover object-top lg:max-h-none"
              />
            ) : (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center bg-gradient-to-br from-[#2B221C] via-[#1F1814] to-[#14100D] p-8 text-center">
                <span className="font-display text-5xl font-semibold text-[#F4EDE4]">
                  SB
                </span>
                <span className="mt-2 text-sm text-[#C2B2A2]">
                  {profile.fullName}
                </span>
              </div>
            )}

            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14100D]/90 via-[#14100D]/45 to-transparent px-5 pt-14 pb-4 text-[#FAF7F2]">
              <p className="text-xs font-medium tracking-wide text-[#E5D7C6]">
                {profile.fullName} · Class 12 CS &amp; Web Developer
              </p>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Full-width 4-column Identity Strip below hero split */}
      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#DCD0BF] bg-[#DCD0BF] sm:grid-cols-2 lg:grid-cols-4 dark:border-[#342A23] dark:bg-[#342A23]">
        {profile.heroMetrics.map((metric, idx) => (
          <div
            key={metric.label}
            className="bg-[#FAF7F2] p-5 transition-colors dark:bg-[#1B1511]"
          >
            <div className="flex items-center justify-between text-xs text-[#6B5849] dark:text-[#A99888]">
              <span>{metric.label}</span>
              <span className="font-mono tabular-nums">0{idx + 1}</span>
            </div>
            <p className="font-display mt-2 text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
              {metric.value}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
