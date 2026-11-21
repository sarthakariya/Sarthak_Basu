import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

interface TopNavBarProps {
  fullName: string;
  onOpenSearch: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#community' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'FAQ', href: '#faq' },
];

export function TopNavBar({ fullName, onOpenSearch }: TopNavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-400/12 bg-[#070B14]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Display Wordmark */}
        <a
          href="#top"
          className="font-display shrink-0 text-lg font-bold tracking-tight whitespace-nowrap text-slate-100 transition-colors hover:text-sky-400"
        >
          {fullName}
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative shrink-0 py-1 text-sm font-medium whitespace-nowrap text-slate-400 transition-colors hover:text-slate-100 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-sky-400 after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (+ Mobile Menu Trigger on Small Screens) */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-xl bg-sky-400 px-4 py-2 text-xs font-semibold whitespace-nowrap text-[#070B14] transition-all duration-150 hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search Profile</span>
            <kbd className="hidden rounded bg-[#070B14]/15 px-1.5 py-0.5 font-mono text-[10px] font-medium sm:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-400/20 bg-[#0D1424] text-slate-200 transition-colors hover:border-sky-400/40 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400"
      />

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile navigation"
            className="border-t border-slate-400/12 bg-[#0A101E] px-5 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-sky-400"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
