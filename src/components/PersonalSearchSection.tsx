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
    () => searchProfile(profile, query, 4),
    [profile, query]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        resolvedRef.current?.focus();
        resolvedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedRef]);

  return (
    <section
      id="personal-search"
      aria-label={`Search ${profile.fullName}'s profile`}
      className="mx-auto max-w-3xl scroll-mt-16 px-5 py-6 sm:px-6"
    >
      <div className="border-t border-[#DCD0BF] pt-7 dark:border-[#261E19]">
        <label htmlFor="personal-search-input" className="sr-only">
          Search Sarthak Basu’s profile, stack, GitHub, Google Developers, and Instagram
        </label>
        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#7C4A2D] dark:text-[#C88A55]"
            aria-hidden="true"
          />
          <input
            ref={resolvedRef}
            id="personal-search-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search Sarthak Basu — try 'adk', 'github', 'google', 'instagram', 'minecraft'..."
            className="w-full rounded-xl border border-[#D4C5B2] bg-[#FAF7F2] py-2.5 pr-16 pl-10 text-sm text-[#1E1611] placeholder:text-[#7D6A5B] transition-colors focus:border-[#7C4A2D] focus:outline-none dark:border-[#2C231D] dark:bg-[#17120E] dark:text-[#F5EDE3] dark:placeholder:text-[#7D6E61] dark:focus:border-[#C88A55]"
          />
          <div className="absolute right-2.5 flex items-center">
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search query"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#5C4B3E] hover:bg-[#EDE5D8] dark:text-[#B5A595] dark:hover:bg-[#261E19]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="hidden rounded border border-[#D4C5B2] px-1.5 py-0.5 font-mono text-[10px] text-[#6B5849] sm:inline-block dark:border-[#332821] dark:text-[#9D8D7E]">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        {/* Live Search Output (only renders when user enters a query) */}
        {response.normalizedQuery && (
          <div
            className="mt-3 rounded-xl border border-[#DCD0BF] bg-[#FAF7F2] p-3.5 dark:border-[#2D241E] dark:bg-[#17120E]"
            aria-live="polite"
            data-testid="personal-search-results"
          >
            {response.quickAnswer ? (
              <div className="divide-y divide-[#E6DDD0] dark:divide-[#261E19]">
                {response.results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectResult(item)}
                    className="group flex w-full items-center justify-between gap-3 py-2.5 text-left first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#7C4A2D] dark:text-[#C88A55]">
                        {item.meta}
                      </p>
                      <p className="truncate text-sm font-semibold text-[#1E1611] group-hover:text-[#7C4A2D] dark:text-[#F5EDE3] dark:group-hover:text-[#C88A55]">
                        {item.title}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#7C4A2D] dark:text-[#C88A55]"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#6B5849] dark:text-[#9D8D7E]">
                No direct match for &ldquo;{response.normalizedQuery}&rdquo;. Try github, google, instagram, adk, or minecraft.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
