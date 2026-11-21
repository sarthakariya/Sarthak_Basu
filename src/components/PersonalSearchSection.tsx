import { useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import { searchProfile, type SearchResultItem } from '../utils/personalSearch';

interface PersonalSearchSectionProps {
  profile: ProfileData;
  query: string;
  onQueryChange: (value: string) => void;
  onSelectResult: (result: SearchResultItem) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function PersonalSearchSection({
  profile,
  query,
  onQueryChange,
  onSelectResult,
  inputRef,
}: PersonalSearchSectionProps) {
  const localRef = useRef<HTMLInputElement | null>(null);
  const resolvedRef = inputRef ?? localRef;

  const response = useMemo(
    () => searchProfile(profile, query, 6),
    [profile, query]
  );

  // Keyboard shortcut: Cmd/Ctrl + K focuses the Personal Search bar
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        resolvedRef.current?.focus();
        resolvedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedRef]);

  return (
    <section
      id="personal-search"
      aria-labelledby="personal-search-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-10 sm:px-8 sm:py-14"
    >
      <div className="rounded-2xl border border-[#DCD0BF] bg-[#FAF7F2] p-6 sm:p-9 dark:border-[#342A23] dark:bg-[#1B1511]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
              Interactive Personal Index · Instant Answer Feed
            </p>
            <h2
              id="personal-search-heading"
              className="font-display mt-1.5 text-3xl font-semibold tracking-tight text-[#1E1611] sm:text-4xl dark:text-[#F4EDE4]"
            >
              Search Anything About {profile.fullName}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#5C4B3E] dark:text-[#BDAE9E]">
            Query skills, biography perspectives, Instagram, or availability—complete with an instant summary card and deep links.
          </p>
        </div>

        {/* Search Input Field */}
        <div className="mt-6">
          <label htmlFor="personal-search-input" className="sr-only">
            Search Sarthak Basu’s profile, skills, bio, and contact details
          </label>
          <div className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-4 h-5 w-5 text-[#7C4A2D] dark:text-[#C88A55]"
              aria-hidden="true"
            />
            <input
              ref={resolvedRef}
              id="personal-search-input"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Try 'communication', 'time management', 'third-person bio', or 'instagram'..."
              className="w-full rounded-xl border border-[#CFC0AC] bg-[#F5F0E8] py-3.5 pr-24 pl-12 text-base text-[#1E1611] placeholder:text-[#7D6A5B] transition-colors focus:border-[#7C4A2D] focus:bg-[#FFFFFF] focus:outline-none dark:border-[#3D3129] dark:bg-[#14100D] dark:text-[#F4EDE4] dark:placeholder:text-[#8E7D6E] dark:focus:border-[#C88A55] dark:focus:bg-[#1A1410]"
            />
            <div className="absolute right-3 flex items-center gap-2">
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search query"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#5C4B3E] transition-colors hover:bg-[#E7DCCB] hover:text-[#1E1611] dark:text-[#BDAE9E] dark:hover:bg-[#2B221C] dark:hover:text-[#F4EDE4]"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="hidden rounded border border-[#CFC0AC] bg-[#FAF7F2] px-2 py-1 font-mono text-[11px] text-[#6B5849] sm:inline-block dark:border-[#3D3129] dark:bg-[#221B16] dark:text-[#BDAE9E]">
                  Ctrl K
                </kbd>
              )}
            </div>
          </div>

          {/* Interactive Suggested Query Buttons */}
          <div
            className="mt-4 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Suggested personal search queries"
          >
            <span className="mr-1 text-xs font-medium text-[#6B5849] dark:text-[#A99888]">
              Suggested:
            </span>
            {profile.suggestedQueries.map((suggestion) => {
              const isActive =
                query.trim().toLowerCase() === suggestion.toLowerCase();
              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onQueryChange(suggestion)}
                  className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] ${
                    isActive
                      ? 'bg-[#7C4A2D] text-[#FAF7F2] dark:bg-[#C88A55] dark:text-[#14100D]'
                      : 'bg-[#EDE5D8] text-[#3E3026] hover:bg-[#E2D6C4] dark:bg-[#261E19] dark:text-[#D5C6B7] dark:hover:bg-[#332922]'
                  }`}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Search Output */}
        {response.normalizedQuery && (
          <div
            className="mt-7 border-t border-[#DCD0BF] pt-6 dark:border-[#342A23]"
            aria-live="polite"
            data-testid="personal-search-results"
          >
            {response.quickAnswer ? (
              <div className="space-y-6">
                {/* Direct Knowledge Answer Card */}
                <div className="rounded-xl bg-[#1E1611] p-5 text-[#F4EDE4] sm:p-6 dark:bg-[#28201A]">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#D5B596]">
                    <span>Direct Profile Answer · {response.quickAnswer.sourceLabel}</span>
                    <span className="font-mono tabular-nums">
                      {response.results.length}{' '}
                      {response.results.length === 1 ? 'match' : 'matches'}
                    </span>
                  </div>
                  <h3 className="font-display mt-2 text-2xl font-semibold text-[#FAF7F2]">
                    {response.quickAnswer.heading}
                  </h3>
                  <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-[#E3D8CC]">
                    {response.quickAnswer.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectResult(response.results[0])}
                    className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#E5B181] underline-offset-4 transition-colors hover:text-[#FAF7F2] hover:underline"
                  >
                    <span>Jump to full section</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                {/* Ranked Matching Entries */}
                <div className="divide-y divide-[#E4D9C8] dark:divide-[#2F2620]">
                  {response.results.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectResult(item)}
                      className="group flex w-full flex-col justify-between gap-2 py-4 text-left transition-colors hover:bg-[#F3ECE0] sm:flex-row sm:items-center sm:px-3 sm:rounded-lg dark:hover:bg-[#231C17]"
                    >
                      <div className="min-w-0 pr-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5849] dark:text-[#A99888]">
                          <span>{item.meta}</span>
                          {item.matchedTerms.length > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>Matched: {item.matchedTerms.join(', ')}</span>
                            </>
                          )}
                        </div>
                        <p className="mt-1 text-base font-semibold text-[#1E1611] group-hover:text-[#7C4A2D] dark:text-[#F4EDE4] dark:group-hover:text-[#C88A55]">
                          {item.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-[#5C4B3E] dark:text-[#BDAE9E]">
                          {item.snippet}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#7C4A2D] dark:text-[#C88A55]">
                        <span>Open</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="font-display text-2xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
                  No direct match for &ldquo;{response.normalizedQuery}&rdquo;
                </p>
                <p className="mt-2 text-sm text-[#5C4B3E] dark:text-[#BDAE9E]">
                  Try searching for communication, problem solving, time management, biography, Instagram, or email.
                </p>
                <button
                  type="button"
                  onClick={() => onQueryChange('Communication skills')}
                  className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-[#EDE5D8] px-4 py-2 text-xs font-semibold text-[#1E1611] transition-colors hover:bg-[#DFD2BE] dark:bg-[#28201A] dark:text-[#F4EDE4] dark:hover:bg-[#352B23]"
                >
                  Explore Communication Skills
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
