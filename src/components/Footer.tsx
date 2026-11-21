import { ArrowUpRight } from 'lucide-react';
import type { ProfileData } from '../data/profileData';

interface FooterProps {
  profile: ProfileData;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-white/[0.08] py-7">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
        <div>
          <p className="font-display text-sm font-bold text-slate-100">
            {profile.fullName}{' '}
            <span className="font-mono text-xs font-normal text-slate-500">
              · {profile.location}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Google Developer · Microsoft Attendee · Friends Fun SMP Founder · © {year}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
          <a
            href={profile.socials.googleDev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-sky-300"
          >
            Google Dev
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={profile.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-violet-300"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={profile.socials.friendsFun.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-emerald-300"
          >
            Friends Fun SMP
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={profile.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-rose-300"
          >
            Instagram
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono transition-colors hover:text-amber-300"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
