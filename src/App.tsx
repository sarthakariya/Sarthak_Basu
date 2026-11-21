/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PROFILE_DATA } from './data/profileData';
import type { SearchResultItem } from './utils/personalSearch';
import { buildPersonSchemaGraph } from './utils/seoSchema';
import { TopNavBar } from './components/TopNavBar';
import { ProfileSidebarIsland } from './components/ProfileSidebarIsland';
import { HeroSection } from './components/HeroSection';
import { AboutNarrativeSection } from './components/AboutNarrativeSection';
import { CommunityShowcaseSection } from './components/CommunityShowcaseSection';
import { DeveloperProfilesSection } from './components/DeveloperProfilesSection';
import { CertificatesSection } from './components/CertificatesSection';
import { FaqSection } from './components/FaqSection';
import { PersonalSearchSection } from './components/PersonalSearchSection';
import { Footer } from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') ?? '';
  });

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return Boolean(params.get('q'));
  });

  // Enforce single Midnight Obsidian dark theme class
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Global ⌘K / Ctrl+K shortcut to open Command Search Modal
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keep Schema.org JSON-LD & canonical URL synced with live origin
  useEffect(() => {
    const originUrl = window.location.origin + window.location.pathname;
    const schemaGraph = buildPersonSchemaGraph(PROFILE_DATA, originUrl);
    const scriptEl = document.getElementById('sarthak-basu-jsonld');
    if (scriptEl) {
      scriptEl.textContent = JSON.stringify(schemaGraph);
    }

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = originUrl;
  }, []);

  // Sync ?q= parameter cleanly in address bar
  useEffect(() => {
    const url = new URL(window.location.href);
    const trimmed = searchQuery.trim();
    if (trimmed) {
      url.searchParams.set('q', trimmed);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.toString());
  }, [searchQuery]);

  function handleSelectSearchResult(result: SearchResultItem) {
    const targetEl =
      document.getElementById(result.id) ??
      document.getElementById(result.sectionId) ??
      document.getElementById('about');
    targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070B14] bg-[radial-gradient(ellipse_75%_40%_at_50%_0%,rgba(56,189,248,0.12),transparent)] text-[#F1F5F9]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#070B14]"
        >
          Skip to main content
        </a>

        <TopNavBar
          fullName={PROFILE_DATA.fullName}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
            {/* Left 4-Column Floating Sticky Profile Sidebar Island */}
            <div className="lg:col-span-4">
              <ProfileSidebarIsland profile={PROFILE_DATA} />
            </div>

            {/* Right 8-Column Animated Tech Bento & Island Stream */}
            <main id="main-content" className="space-y-10 lg:col-span-8">
              <HeroSection profile={PROFILE_DATA} />
              <AboutNarrativeSection profile={PROFILE_DATA} />
              <CommunityShowcaseSection profile={PROFILE_DATA} />
              <DeveloperProfilesSection profile={PROFILE_DATA} />
              <CertificatesSection profile={PROFILE_DATA} />
              <FaqSection profile={PROFILE_DATA} />
            </main>
          </div>
        </div>

        <Footer profile={PROFILE_DATA} />

        <PersonalSearchSection
          profile={PROFILE_DATA}
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSelectResult={handleSelectSearchResult}
        />
      </div>
    </MotionConfig>
  );
}
