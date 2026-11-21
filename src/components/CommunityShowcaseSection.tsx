import { motion } from 'motion/react';
import { ArrowUpRight, Globe, Users } from 'lucide-react';
import type { ProfileData } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface CommunityShowcaseSectionProps {
  profile: ProfileData;
}

export function CommunityShowcaseSection({
  profile,
}: CommunityShowcaseSectionProps) {
  const { community } = profile;

  return (
    <SpotlightIsland
      id="community"
      accent="emerald"
      tilt
      staggerChild
      className="flex h-full flex-col justify-between p-6 scroll-mt-20"
    >
      <div id="community-friends-fun">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-300" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-emerald-300 uppercase">
              Community
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-300">
            {community.memberCount} Members
          </span>
        </div>

        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {community.name}
        </h2>
        <p className="mt-0.5 font-mono text-xs text-slate-400">
          {community.role} · Est. {community.launched}
        </p>

        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-300">
          {community.summary}
        </p>

        <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-3.5">
          {community.highlights.map((item) => (
            <div key={item.title} className="flex items-baseline gap-2 text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <p className="text-slate-300">
                <span className="font-semibold text-white">{item.title}:</span>{' '}
                <span className="text-slate-400">{item.detail}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-2">
        <motion.a
          href={community.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex w-full items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 px-4 py-2.5 text-xs font-bold text-[#06070D] shadow-[0_8px_24px_-10px_rgba(52,211,153,0.75)] transition-all hover:brightness-110"
        >
          <span className="inline-flex items-center gap-1.5 truncate">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{community.displayUrl}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </motion.a>
      </div>
    </SpotlightIsland>
  );
}
