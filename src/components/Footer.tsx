import { ArrowUp, Moon, Sun } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface FooterProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Footer({ profile, isDark, onToggleTheme }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#DCD0BF] bg-[#EDE5D8]/60 py-10 dark:border-[#342A23] dark:bg-[#110D0A]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-[#1E1611] dark:text-[#F4EDE4]">
            {profile.fullName}
          </p>
          <p className="mt-1 text-xs text-[#6B5849] dark:text-[#A99888]">
            © {year} {profile.fullName}. Official personal profile &amp; portfolio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#5C4B3E] dark:text-[#C2B2A2]">
          {profile.socials.github.enabled && (
            <a
              href={profile.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-[#1E1611] hover:underline dark:hover:text-[#F4EDE4]"
            >
              GitHub
            </a>
          )}
          {profile.socials.googleDev.enabled && (
            <a
              href={profile.socials.googleDev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-[#1E1611] hover:underline dark:hover:text-[#F4EDE4]"
            >
              g.dev
            </a>
          )}
          {profile.socials.instagram.enabled && (
            <a
              href={profile.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-[#1E1611] hover:underline dark:hover:text-[#F4EDE4]"
            >
              Instagram
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            className="underline-offset-4 transition-colors hover:text-[#1E1611] hover:underline dark:hover:text-[#F4EDE4]"
          >
            Email
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex min-h-[36px] items-center gap-1.5 underline-offset-4 transition-colors hover:text-[#1E1611] hover:underline dark:hover:text-[#F4EDE4]"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Warm Beige</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Espresso Dark</span>
              </>
            )}
          </button>
          <a
            href="#top"
            className="inline-flex min-h-[36px] items-center gap-1 text-[#7C4A2D] underline-offset-4 hover:underline dark:text-[#C88A55]"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
