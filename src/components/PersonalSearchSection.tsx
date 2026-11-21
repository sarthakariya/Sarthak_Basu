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
          className="fixed inset-0 z-50 flex items-start justify-center bg-[#04050A]/82 px-4 pt-16 backdrop-blur-md sm:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D111C] shadow-[0_32px_90px_-24px_rgba(0,0,0,0.95)]"
          >
            <div
              aria-hidden="true"
              className="h-[2px] w-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
            />
            {/* Search Input Header */}
            <div className="relative flex items-center border-b border-white/[0.08] px-4 py-3.5">
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
                placeholder="Search Sarthak — BSERC AI, QuizOff, Credly, Friends Fun SMP, GitHub..."
                className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search query"
                  className="mr-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-slate-100"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-400 hover:text-slate-100"
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
