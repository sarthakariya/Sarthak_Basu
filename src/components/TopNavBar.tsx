import { motion, useScroll, useSpring } from 'motion/react';
import { Search } from 'lucide-react';
import { ROUTES, type PageRoute } from '../utils/router';

interface TopNavBarProps {
  fullName: string;
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
}

export function TopNavBar({
  fullName,
  activeRoute,
  onNavigate,
  onOpenSearch,
}: TopNavBarProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.header
      initial={{ opacity: 0.96, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="sticky top-0 z-40 border-b border-white/[0.09] bg-[#06070D]/88 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-8">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="group flex shrink-0 items-center gap-2.5 text-sm font-bold tracking-tight text-slate-100 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-violet-400 to-emerald-400 font-display text-xs font-extrabold text-[#06070D] shadow-[0_0_16px_rgba(167,139,250,0.35)] transition-transform duration-200 group-hover:scale-105">
            SB
          </span>
          <span className="hidden font-display text-[15px] sm:inline">{fullName}</span>
        </a>

        {/* Single-Row Multi-Page Navigation */}
        <nav
          aria-label="Primary page navigation"
          className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-white/[0.09] bg-white/[0.03] p-1"
        >
          {ROUTES.map((route) => {
            const isActive = activeRoute === route.id;
            return (
              <a
                key={route.id}
                href={route.hash}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(route.id);
                }}
                className={`relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 ${
                  isActive
                    ? 'text-[#06070D]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="top-nav-active-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300"
                  />
                )}
                <span className="relative z-10">{route.label}</span>
              </a>
            );
          })}
        </nav>

        <motion.button
          type="button"
          onClick={onOpenSearch}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white sm:px-3"
          aria-label="Search Sarthak Basu's profile"
        >
          <Search className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-white/10 bg-[#06070D] px-1.5 py-0.5 font-mono text-[10px] text-slate-400 md:inline-block">
            ⌘K
          </kbd>
        </motion.button>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-sky-400 via-violet-400 via-emerald-400 to-amber-400"
      />
    </motion.header>
  );
}
