import { useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProfileData } from '../data/profileData';
import { searchProfile, type SearchResultItem } from '../utils/personalSearch';

interface PersonalSearchSectionProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  onSelectResult: (result: SearchResultItem) => void;
}

export function PersonalSearchSection({
  profile,
  isOpen,
  onClose,
  query,
  onQueryChange,
  onSelectResult,
}: PersonalSearchSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const response = useMemo(
    () => searchProfile(profile, query, 6),
    [profile, query]
  );

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Search ${profile.fullName}'s profile`}
          className="fixed inset-0 z-50 flex items-start justify-center bg-[#04070E]/82 px-4 pt-16 backdrop-blur-md sm:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-400/20 bg-[#0D1424] shadow-[0_32px_90px_-24px_rgba(0,0,0,0.95)]"
          >
            {/* Search Input Header */}
            <div className="relative flex items-center border-b border-slate-400/15 px-4 py-3.5">
              <Search
                className="h-4 w-4 shrink-0 text-sky-400"
                aria-hidden="true"
              />
              <label htmlFor="personal-search-input" className="sr-only">
                Search Sarthak Basu’s profile, Friends Fun SMP, certificates,
                GitHub, and Google Developers
              </label>
              <input
                ref={inputRef}
                id="personal-search-input"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search Sarthak Basu — Friends Fun SMP, Karate, GitHub, ADK..."
                className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search query"
                  className="mr-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-md border border-slate-400/20 bg-[#111B2E] px-2 py-1 font-mono text-[10px] text-slate-400 hover:text-slate-100"
              >
                ESC
              </button>
            </div>

            {/* Body: Suggestions or Instant Results */}
            <div
              className="max-h-[60vh] overflow-y-auto p-4"
              aria-live="polite"
              data-testid="personal-search-results"
            >
              {!response.normalizedQuery ? (
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Quick Jumps
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.suggestedQueries.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => onQueryChange(suggestion)}
                        className="min-h-[34px] rounded-lg border border-slate-400/15 bg-[#111B2E] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-sky-400/45 hover:text-sky-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : response.quickAnswer ? (
                <div className="divide-y divide-slate-400/12">
                  {response.results.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectResult(item);
                        onClose();
                      }}
                      className="group flex w-full items-center justify-between gap-4 py-3 text-left first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-sky-400">
                          {item.meta}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-100 group-hover:text-sky-300">
                          {item.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                          {item.snippet}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-xs text-slate-400">
                  No direct match for &ldquo;{response.normalizedQuery}&rdquo;.
                  Try Friends Fun SMP, Karate, Swimming, GitHub, Google, or ADK.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
