import { ArrowUpRight, Globe, Layers, ShieldCheck, Users } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface CommunityShowcaseSectionProps {
  profile: ProfileData;
}

const HIGHLIGHT_ICONS = [Users, Layers, ShieldCheck];

export function CommunityShowcaseSection({
  profile,
}: CommunityShowcaseSectionProps) {
  const { community } = profile;

  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="scroll-mt-24"
    >
      <SpotlightIsland
        id="community-friends-fun"
        className="relative overflow-hidden p-6 sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-400/12 blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-emerald-400">
                Flagship Community &amp; Infrastructure · Launched{' '}
                {community.launched}
              </p>
              <h2
                id="community-heading"
                className="font-display mt-1.5 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl"
              >
                {community.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-300">
                {community.role} ·{' '}
                <span className="font-mono text-emerald-400 tabular-nums">
                  {community.memberCount} Members
                </span>
              </p>
            </div>

            <a
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-semibold whitespace-nowrap text-[#070B14] transition-all duration-150 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>Visit Website</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            {community.summary}
          </p>

          {/* 3-Column Feature Breakdown (clean hairline dividers, no nested boxed cards) */}
          <div className="mt-6 grid grid-cols-1 gap-5 border-t border-slate-400/12 pt-6 sm:grid-cols-3">
            {community.highlights.map((item, idx) => {
              const Icon = HIGHLIGHT_ICONS[idx % HIGHLIGHT_ICONS.length];
              return (
                <div key={item.title}>
                  <div className="flex items-center gap-2 text-sky-400">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-sm font-semibold text-slate-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct Verified URL Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-400/12 pt-4 text-xs">
            <span className="font-mono text-slate-400">
              Official Web Hub: {community.displayUrl}
            </span>
            <a
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              <span>Open Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </SpotlightIsland>
    </section>
  );
}
