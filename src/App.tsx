/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { PROFILE_DATA } from './data/profileData';
import type { SearchResultItem } from './utils/personalSearch';
import { buildPersonSchemaGraph } from './utils/seoSchema';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { AboutNarrativeSection } from './components/AboutNarrativeSection';
import { CommunityShowcaseSection } from './components/CommunityShowcaseSection';
import { DeveloperProfilesSection } from './components/DeveloperProfilesSection';
import { CertificatesSection } from './components/CertificatesSection';
import { FaqSection } from './components/FaqSection';
import { PersonalSearchSection } from './components/PersonalSearchSection';
import { Footer } from './components/Footer';
import {
  SECTION_STAGGER_VARIANTS,
  VIEWPORT_CONFIG,
} from './components/SpotlightIsland';

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

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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
      <div className="relative min-h-screen overflow-x-clip bg-[#06070D] text-[#F1F5F9]">
        {/* Subtle Multi-Color Ambient Aurora Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_38%_at_22%_0%,rgba(56,189,248,0.13),transparent_60%),radial-gradient(ellipse_55%_36%_at_78%_8%,rgba(167,139,250,0.13),transparent_60%),radial-gradient(ellipse_50%_32%_at_50%_95%,rgba(52,211,153,0.08),transparent_65%)]"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06070D]"
        >
          Skip to main content
        </a>

        <TopNavBar
          fullName={PROFILE_DATA.fullName}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Perfectly Centered Symmetric Bento Stream */}
        <main
          id="main-content"
          className="mx-auto max-w-5xl space-y-8 px-5 py-7 sm:px-8 sm:py-9"
        >
          <HeroSection profile={PROFILE_DATA} />

          {/* Side-by-Side Compact About + Friends Fun SMP Bento Row */}
          <motion.section
            aria-label="About and Community"
            variants={SECTION_STAGGER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch"
          >
            <div className="lg:col-span-7">
              <AboutNarrativeSection profile={PROFILE_DATA} />
            </div>
            <div className="lg:col-span-5">
              <CommunityShowcaseSection profile={PROFILE_DATA} />
            </div>
          </motion.section>

          <DeveloperProfilesSection profile={PROFILE_DATA} />

          <CertificatesSection profile={PROFILE_DATA} />

          <FaqSection profile={PROFILE_DATA} />
        </main>

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
