import { useEffect, useRef } from 'react';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { CredlyBadgeConfig } from '../data/profileData';
import { SpotlightIsland } from './SpotlightIsland';

interface CredlyBadgeCardProps {
  badge: CredlyBadgeConfig;
}

export function CredlyBadgeCard({ badge }: CredlyBadgeCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Re-hydrate official Credly embed widget whenever the Certificates page mounts
    container.innerHTML = '';
    const embedDiv = document.createElement('div');
    embedDiv.setAttribute('data-iframe-width', '150');
    embedDiv.setAttribute('data-iframe-height', '270');
    embedDiv.setAttribute('data-share-badge-id', badge.badgeId);
    embedDiv.setAttribute('data-share-badge-host', badge.host);
    container.appendChild(embedDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [badge.badgeId, badge.host]);

  return (
    <SpotlightIsland
      id="credly-badge"
      accent="amber"
      staggerChild
      className="flex flex-col items-center justify-between gap-4 p-5 text-center sm:flex-row sm:text-left"
    >
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-amber-300 uppercase">
          <BadgeCheck className="h-4 w-4" />
          <span>Credly Verified Credential</span>
        </div>
        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
          {badge.label}
        </h3>
        <p className="max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
          Officially issued digital credential verified directly through Credly. Click the live badge or open the public verification record below.
        </p>
        <div className="pt-1">
          <a
            href={badge.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3.5 py-2 text-xs font-semibold text-amber-200 transition-colors hover:border-amber-300 hover:bg-amber-400/20"
          >
            Verify on Credly
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Live Official Credly Embed Slot */}
      <div className="flex min-h-[270px] min-w-[164px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-2">
        <div ref={containerRef} className="flex items-center justify-center" />
      </div>
    </SpotlightIsland>
  );
}
