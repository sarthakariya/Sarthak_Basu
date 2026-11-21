import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface FooterProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <footer className="mx-auto max-w-3xl px-5 pt-4 pb-12 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-[#DCD0BF] pt-6 text-xs text-[#6B5849] sm:flex-row sm:items-center dark:border-[#261E19] dark:text-[#9D8D7E]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-[#1E1611] dark:text-[#E5DACD]">
            © {year} {profile.fullName}
          </span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
          >
            <span>{copied ? 'Email copied' : profile.email}</span>
            {copied ? (
              <Check className="h-3 w-3 text-[#7C4A2D] dark:text-[#C88A55]" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3 opacity-70" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-medium">
          <a
            href={profile.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
          >
            GitHub
          </a>
          <a
            href={profile.socials.googleDev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
          >
            Google Dev
          </a>
          <a
            href={profile.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
          >
            Instagram
          </a>
          {profile.socials.linkedin.enabled && profile.socials.linkedin.url && (
            <a
              href={profile.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#1E1611] dark:hover:text-[#F5EDE3]"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
