import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface FooterProps {
  profile: ProfileData;
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
    <footer className="mx-auto max-w-6xl px-5 pt-6 pb-12 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-400/12 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-semibold text-slate-200">
            © {year} {profile.fullName}
          </span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-sky-400"
          >
            <span className="font-mono">
              {copied ? 'Email copied' : profile.email}
            </span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-75" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-5 font-medium">
          <a
            href={profile.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sky-400"
          >
            GitHub
          </a>
          <a
            href={profile.socials.googleDev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sky-400"
          >
            Google Dev
          </a>
          <a
            href={profile.socials.friendsFun.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            Friends Fun SMP
          </a>
          <a
            href={profile.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-sky-400"
          >
            Instagram
          </a>
          {profile.socials.linkedin.enabled && profile.socials.linkedin.url && (
            <a
              href={profile.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-sky-400"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
