import { useState } from 'react';
import { Check, Copy, Gamepad2 } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface AboutNarrativeSectionProps {
  profile: ProfileData;
}

export function AboutNarrativeSection({ profile }: AboutNarrativeSectionProps) {
  const [discordCopied, setDiscordCopied] = useState(false);

  async function handleCopyDiscord() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.gaming.discordHandle);
      }
      setDiscordCopied(true);
      window.setTimeout(() => setDiscordCopied(false), 2200);
    } catch {
      setDiscordCopied(true);
      window.setTimeout(() => setDiscordCopied(false), 2200);
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="border-t border-[#DCD0BF] pt-12 dark:border-[#342A23]">
        <div>
          <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
            02. About Me · Class 12 CS &amp; Site Developer
          </p>
          <h2
            id="about-heading"
            className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] sm:text-5xl dark:text-[#F4EDE4]"
          >
            Who I Am &amp; What I Build
          </h2>
        </div>

        {/* 2-column natural first-person story + compact Gaming & Key Details */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <p className="font-display text-2xl leading-snug font-medium text-[#1E1611] sm:text-[1.85rem] dark:text-[#F4EDE4]">
              {profile.about.lead}
            </p>

            <div className="mt-6 space-y-5 text-[15px] leading-[1.78] text-[#45372C] dark:text-[#C9B9A9]">
              {profile.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[66ch]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Compact SEO Keywords Line (clean unboxed text) */}
            <div className="mt-8 border-t border-[#DCD0BF] pt-5 dark:border-[#342A23]">
              <p className="text-xs font-medium text-[#6B5849] dark:text-[#A99888]">
                Core Focus &amp; Search Keywords
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#4C3D31] dark:text-[#C2B2A2]">
                {profile.seoKeywords.join(' · ')}
              </p>
            </div>
          </article>

          <aside className="space-y-6 lg:col-span-5">
            {/* Compact Off-Duty Gaming & Discord Card (tucked inside About) */}
            <div
              id="about-gaming"
              data-testid="compact-gamer-card"
              className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 dark:border-[#342A23] dark:bg-[#1B1511]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
                  <Gamepad2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{profile.gaming.tagline}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyDiscord}
                  className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#CFC0AC] bg-[#F5F0E8] px-2.5 py-1 text-xs font-medium text-[#1E1611] transition-colors hover:bg-[#EDE5D8] dark:border-[#3D3129] dark:bg-[#14100D] dark:text-[#F4EDE4] dark:hover:bg-[#261E19]"
                >
                  {discordCopied ? (
                    <>
                      <Check
                        className="h-3.5 w-3.5 text-[#7C4A2D] dark:text-[#C88A55]"
                        aria-hidden="true"
                      />
                      <span>Copied Discord</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Discord: {profile.gaming.discordHandle}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 divide-y divide-[#E4D9C8] dark:divide-[#2F2620]">
                {profile.gaming.games.map((game) => (
                  <div key={game.name} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      {game.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#6B5849] dark:text-[#A99888]">
                      {game.style}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
                {profile.gaming.discordNote}
              </p>
            </div>

            {/* Key Profile Details Index */}
            <div className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 dark:border-[#342A23] dark:bg-[#1B1511]">
              <h3 className="font-display text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                Quick Facts
              </h3>
              <dl className="mt-4 divide-y divide-[#E4D9C8] dark:divide-[#2F2620]">
                {profile.keyDetails.map((detail) => (
                  <div key={detail.label} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      {detail.value}
                    </dd>
                    <dd className="mt-0.5 text-xs text-[#6B5849] dark:text-[#A99888]">
                      {detail.context}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
