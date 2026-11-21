import { useState } from 'react';
import { Check, Copy, Gamepad2 } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface AboutNarrativeSectionProps {
  profile: ProfileData;
}

export function AboutNarrativeSection({ profile }: AboutNarrativeSectionProps) {
  const [discordCopied, setDiscordCopied] = useState(false);

  const compactStack = [
    'Java',
    'Python',
    'JavaScript',
    'Spring Boot',
    'Gemini API',
    'ADK',
    'Firebase',
    'Supabase',
    'CapCut',
  ];

  async function handleCopyDiscord() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.gaming.discordHandle);
      }
      setDiscordCopied(true);
      window.setTimeout(() => setDiscordCopied(false), 2000);
    } catch {
      setDiscordCopied(true);
      window.setTimeout(() => setDiscordCopied(false), 2000);
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-3xl scroll-mt-16 px-5 py-6 sm:px-6"
    >
      <div className="border-t border-[#DCD0BF] pt-7 dark:border-[#261E19]">
        <h2
          id="about-heading"
          className="text-xs font-medium tracking-wide text-[#7C4A2D] uppercase dark:text-[#C88A55]"
        >
          About
        </h2>

        <p className="mt-3 text-[15px] leading-relaxed text-[#2C221B] sm:text-base dark:text-[#E5DACD]">
          {profile.about.lead}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-[#5C4B3E] dark:text-[#B5A595]">
          {profile.about.paragraphs[0]}
        </p>

        {/* Compact Stack, Strengths & Gamer row */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div
            id="tech-stack"
            className="rounded-xl border border-[#DCD0BF] bg-[#FAF7F2]/85 p-4 sm:col-span-7 dark:border-[#2A211B] dark:bg-[#17120E]"
          >
            <p className="text-[11px] font-medium tracking-wide text-[#7C4A2D] uppercase dark:text-[#C88A55]">
              Stack &amp; Strengths
            </p>
            <p className="mt-1.5 text-xs leading-relaxed font-medium text-[#1E1611] dark:text-[#EFE6DB]">
              {compactStack.join(' · ')}
            </p>
            <p className="mt-2.5 border-t border-[#E6DDD0] pt-2 text-xs text-[#6B5849] dark:border-[#261E19] dark:text-[#9D8D7E]">
              {profile.transferablePillars.map((p) => p.title).join(' · ')}
            </p>
          </div>

          <div
            id="about-gaming"
            data-testid="compact-gamer-card"
            className="flex flex-col justify-between rounded-xl border border-[#DCD0BF] bg-[#FAF7F2]/85 p-4 sm:col-span-5 dark:border-[#2A211B] dark:bg-[#17120E]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-[#7C4A2D] uppercase dark:text-[#C88A55]">
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Gaming</span>
              </span>
              <span className="text-xs font-medium text-[#1E1611] dark:text-[#EFE6DB]">
                Minecraft · GTA V
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyDiscord}
              className="mt-3 inline-flex min-h-[34px] w-full items-center justify-between rounded-lg border border-[#D4C5B2] bg-[#F5F0E8] px-3 py-1.5 text-xs font-medium text-[#1E1611] transition-colors hover:border-[#7C4A2D] dark:border-[#332821] dark:bg-[#110D0A] dark:text-[#E5DACD] dark:hover:border-[#C88A55]"
            >
              <span className="font-mono">
                {discordCopied
                  ? 'Copied Discord!'
                  : `Discord: ${profile.gaming.discordHandle}`}
              </span>
              {discordCopied ? (
                <Check
                  className="h-3.5 w-3.5 text-[#7C4A2D] dark:text-[#C88A55]"
                  aria-hidden="true"
                />
              ) : (
                <Copy className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
