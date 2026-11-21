import { ArrowUpRight } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import { ROUTES, type PageRoute } from '../utils/router';

interface FooterProps {
  profile: ProfileData;
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ profile, activeRoute, onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-white/[0.08] py-7">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
        <div>
          <p className="font-display text-sm font-bold text-slate-100">
            {profile.fullName}{' '}
            <span className="font-mono text-xs font-normal text-slate-500">
              · {profile.location}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Full-Stack Web &amp; AI Developer · {profile.school} · © {year}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
          {ROUTES.map((route) => (
            <a
              key={route.id}
              href={route.hash}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(route.id);
              }}
              className={`transition-colors ${
                activeRoute === route.id
                  ? 'font-semibold text-sky-300'
                  : 'hover:text-white'
              }`}
            >
              {route.label}
            </a>
          ))}
          <span aria-hidden="true" className="text-slate-700">|</span>
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
            href={profile.credlyBadge.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-amber-300"
          >
            Credly
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono transition-colors hover:text-emerald-300"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
