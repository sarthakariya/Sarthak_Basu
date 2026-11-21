import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

export type BioPerspective = 'firstPerson' | 'thirdPerson';

interface AboutNarrativeSectionProps {
  profile: ProfileData;
  perspective: BioPerspective;
  onPerspectiveChange: (perspective: BioPerspective) => void;
}

export function AboutNarrativeSection({
  profile,
  perspective,
  onPerspectiveChange,
}: AboutNarrativeSectionProps) {
  const [copied, setCopied] = useState(false);

  const activeBio = profile.bio[perspective];

  async function handleCopyBio() {
    const fullText = [activeBio.lead, ...activeBio.paragraphs].join('\n\n');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  }

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="border-t border-[#DCD0BF] pt-12 dark:border-[#342A23]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
              01. Biography &amp; Narrative Voice
            </p>
            <h2
              id="about-heading"
              className="font-display mt-2 text-balance text-4xl font-semibold tracking-tight text-[#1E1611] sm:text-5xl dark:text-[#F4EDE4]"
            >
              About {profile.fullName}
            </h2>
          </div>

          {/* Interactive Perspective Segmented Control + Copy Bio */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="tablist"
              aria-label="Biography voice perspective"
              className="inline-flex rounded-xl border border-[#DCD0BF] bg-[#EDE5D8] p-1 dark:border-[#342A23] dark:bg-[#1E1814]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={perspective === 'firstPerson'}
                onClick={() => onPerspectiveChange('firstPerson')}
                className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  perspective === 'firstPerson'
                    ? 'bg-[#FAF7F2] text-[#1E1611] shadow-xs dark:bg-[#C88A55] dark:text-[#14100D]'
                    : 'text-[#5C4B3E] hover:text-[#1E1611] dark:text-[#C2B2A2] dark:hover:text-[#F4EDE4]'
                }`}
              >
                First Person (Personal)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={perspective === 'thirdPerson'}
                onClick={() => onPerspectiveChange('thirdPerson')}
                className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  perspective === 'thirdPerson'
                    ? 'bg-[#FAF7F2] text-[#1E1611] shadow-xs dark:bg-[#C88A55] dark:text-[#14100D]'
                    : 'text-[#5C4B3E] hover:text-[#1E1611] dark:text-[#C2B2A2] dark:hover:text-[#F4EDE4]'
                }`}
              >
                Third Person (Business)
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyBio}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-[#CFC0AC] bg-[#FAF7F2] px-4 py-2 text-xs font-semibold text-[#1E1611] transition-colors hover:bg-[#EDE5D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] dark:border-[#3D3129] dark:bg-[#1E1814] dark:text-[#F4EDE4] dark:hover:bg-[#2A211B]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#7C4A2D] dark:text-[#C88A55]" aria-hidden="true" />
                  <span>Copied Bio</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Bio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main 2-column narrative + key details grid */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <p className="text-xs font-medium text-[#6B5849] dark:text-[#A99888]">
              {activeBio.label} · {activeBio.audienceNote}
            </p>

            <p className="font-display mt-4 text-2xl leading-snug font-medium text-[#1E1611] sm:text-[1.75rem] dark:text-[#F4EDE4]">
              {activeBio.lead}
            </p>

            <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-[#45372C] dark:text-[#C9B9A9]">
              {activeBio.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[68ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Editorial Key Details Index (clean hairline dividers, no nested cards) */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 sm:p-7 dark:border-[#342A23] dark:bg-[#1B1511]">
              <h3 className="font-display text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                Key Profile Details
              </h3>
              <p className="mt-1 text-xs text-[#6B5849] dark:text-[#A99888]">
                Structured facts indexed for search engines &amp; collaborations
              </p>

              <dl className="mt-6 divide-y divide-[#E4D9C8] dark:divide-[#2F2620]">
                {profile.keyDetails.map((detail) => (
                  <div key={detail.label} className="py-4 first:pt-0 last:pb-0">
                    <dt className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                      {detail.value}
                    </dd>
                    <dd className="mt-0.5 text-xs text-[#6B5849] dark:text-[#A99888]">
                      {detail.context}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-[#E4D9C8] pt-4 dark:border-[#2F2620]">
                <p className="text-xs font-medium text-[#6B5849] dark:text-[#A99888]">
                  Indexed Industry Keywords
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#45372C] dark:text-[#C9B9A9]">
                  {profile.seoKeywords.join(' · ')}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
