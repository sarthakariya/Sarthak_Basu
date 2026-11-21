import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  fullName: string;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Search', href: '#personal-search' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
];

export function Header({ fullName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#DCD0BF]/80 bg-[#F5F0E8]/92 backdrop-blur-md transition-colors duration-200 dark:border-[#342A23]/90 dark:bg-[#14100D]/92">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight text-[#1E1611] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C4A2D] dark:text-[#F4EDE4] dark:focus-visible:outline-[#C88A55]"
        >
          {fullName}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap py-1 text-sm font-medium text-[#5C4B3E] underline-offset-4 transition-colors duration-150 hover:text-[#1E1611] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C4A2D] dark:text-[#C2B2A2] dark:hover:text-[#F4EDE4] dark:focus-visible:outline-[#C88A55]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action (plus mobile drawer trigger on small viewports) */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#connect"
            className="hidden shrink-0 whitespace-nowrap rounded-lg bg-[#7C4A2D] px-4 py-2 text-sm font-medium text-[#FAF7F2] transition-colors duration-150 hover:bg-[#633820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] md:inline-flex dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66] dark:focus-visible:outline-[#C88A55]"
          >
            Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCD0BF] text-[#1E1611] transition-colors hover:bg-[#EDE5D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C4A2D] md:hidden dark:border-[#342A23] dark:text-[#F4EDE4] dark:hover:bg-[#231C17]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="border-t border-[#DCD0BF] bg-[#FAF7F2] px-5 py-4 md:hidden dark:border-[#342A23] dark:bg-[#1B1511]"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#1E1611] transition-colors hover:bg-[#EDE5D8] dark:text-[#F4EDE4] dark:hover:bg-[#28201A]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#connect"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#7C4A2D] px-4 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#633820] dark:bg-[#C88A55] dark:text-[#14100D] dark:hover:bg-[#D89B66]"
            >
              Connect
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
