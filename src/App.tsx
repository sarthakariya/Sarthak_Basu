/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA } from './data/profileData';
import type { SearchResultItem } from './utils/personalSearch';
import { buildPersonSchemaGraph } from './utils/seoSchema';
import { HeroSection } from './components/HeroSection';
import { AboutNarrativeSection } from './components/AboutNarrativeSection';
import { DeveloperProfilesSection } from './components/DeveloperProfilesSection';
import { PersonalSearchSection } from './components/PersonalSearchSection';
import { Footer } from './components/Footer';

export default function App() {
  // Default to Deep Espresso dark mode unless user chose Warm Beige light mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = window.localStorage.getItem('sarthak-theme');
    return saved !== 'light';
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') ?? '';
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('sarthak-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('sarthak-theme', 'light');
    }
  }, [isDark]);

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

  function handleFocusSearch() {
    searchInputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 180);
  }

  function handleSelectSearchResult(result: SearchResultItem) {
    const targetEl =
      document.getElementById(result.id) ??
      document.getElementById(result.sectionId) ??
      document.getElementById('about');
    targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#1E1611] transition-colors duration-200 dark:bg-[#100C0A] dark:bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(200,138,85,0.09),transparent)] dark:text-[#F5EDE3]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#7C4A2D] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FAF7F2]"
      >
        Skip to main content
      </a>

      <HeroSection
        profile={PROFILE_DATA}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onFocusSearch={handleFocusSearch}
      />

      <main id="main-content">
        <AboutNarrativeSection profile={PROFILE_DATA} />

        <DeveloperProfilesSection profile={PROFILE_DATA} />

        <PersonalSearchSection
          profile={PROFILE_DATA}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSelectResult={handleSelectSearchResult}
          inputRef={searchInputRef}
        />
      </main>

      <Footer
        profile={PROFILE_DATA}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />
    </div>
  );
}
