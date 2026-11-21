import { motion, useScroll, useSpring } from 'motion/react';
import { Search } from 'lucide-react';

interface TopNavBarProps {
  fullName: string;
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'About', hover: 'hover:text-violet-300' },
  { href: '#community', label: 'Community', hover: 'hover:text-emerald-300' },
  { href: '#profiles', label: 'Profiles', hover: 'hover:text-sky-300' },
  { href: '#certificates', label: 'Certificates', hover: 'hover:text-amber-300' },
  { href: '#faq', label: 'FAQ', hover: 'hover:text-rose-300' },
];

export function TopNavBar({ fullName, onOpenSearch }: TopNavBarProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.header
      initial={{ opacity: 0.96, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06070D]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 text-sm font-bold tracking-tight text-slate-100 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-violet-400 to-emerald-400 font-display text-xs font-extrabold text-[#06070D] shadow-[0_0_16px_rgba(167,139,250,0.35)] transition-transform duration-200 group-hover:scale-105">
            SB
          </span>
          <span className="font-display text-[15px]">{fullName}</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-medium text-slate-400 transition-colors ${item.hover}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <motion.button
          type="button"
          onClick={onOpenSearch}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-violet-400/50 hover:bg-violet-400/10 hover:text-white"
          aria-label="Search Sarthak Basu's profile"
        >
          <Search className="h-3.5 w-3.5 text-sky-400" />
          <span>Search</span>
          <kbd className="hidden rounded border border-white/10 bg-[#06070D] px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:inline-block">
            ⌘K
          </kbd>
        </motion.button>
      </div>

      {/* Multi-Color Jewel Scroll Progress Bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-sky-400 via-violet-400 via-emerald-400 to-amber-400"
      />
    </motion.header>
  );
}
