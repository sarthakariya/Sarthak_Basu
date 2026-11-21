/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA, type SkillCategory } from './data/profileData';
import type { SearchResultItem } from './utils/personalSearch';
import { buildPersonSchemaGraph } from './utils/seoSchema';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PersonalSearchSection } from './components/PersonalSearchSection';
import {
  AboutNarrativeSection,
  type BioPerspective,
} from './components/AboutNarrativeSection';
import { SkillsSection } from './components/SkillsSection';
import { MediaGallerySection } from './components/MediaGallerySection';
import { FaqAndConnectSection } from './components/FaqAndConnectSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('sarthak-theme') === 'dark';
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') ?? '';
  });

  const [bioPerspective, setBioPerspective] =
    useState<BioPerspective>('firstPerson');
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    SkillCategory | 'All'
  >('All');
  const [highlightedSkillId, setHighlightedSkillId] = useState<string | null>(
    null
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    PROFILE_DATA.faqs[0]?.id ?? null
  );

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Sync Tailwind v4 dark class & localStorage
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

  // Keep Schema.org JSON-LD canonical URL & canonical <link> in sync with current origin
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

  // Sync ?q= parameter cleanly in the address bar without breaking history
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
    }, 200);
  }

  function handleSelectSearchResult(result: SearchResultItem) {
    if (result.sectionId === 'about') {
      if (result.actionHint === 'third-person') {
        setBioPerspective('thirdPerson');
      } else if (result.actionHint === 'first-person') {
        setBioPerspective('firstPerson');
      }
    } else if (result.sectionId === 'skills') {
      setActiveSkillCategory('All');
      setHighlightedSkillId(result.id);
      window.setTimeout(() => setHighlightedSkillId(null), 3500);
    } else if (result.sectionId === 'faq' && result.actionHint) {
      setOpenFaqId(result.actionHint);
    }

    const targetEl =
      document.getElementById(result.id) ??
      document.getElementById(result.sectionId);
    targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1E1611] transition-colors duration-200 dark:bg-[#14100D] dark:text-[#F4EDE4]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#7C4A2D] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FAF7F2]"
      >
        Skip to main content
      </a>

      <Header fullName={PROFILE_DATA.fullName} />

      <main id="main-content">
        <HeroSection
          profile={PROFILE_DATA}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onFocusSearch={handleFocusSearch}
        />

        <PersonalSearchSection
          profile={PROFILE_DATA}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSelectResult={handleSelectSearchResult}
          inputRef={searchInputRef}
        />

        <AboutNarrativeSection
          profile={PROFILE_DATA}
          perspective={bioPerspective}
          onPerspectiveChange={setBioPerspective}
        />

        <SkillsSection
          skills={PROFILE_DATA.skills}
          activeCategory={activeSkillCategory}
          onCategoryChange={setActiveSkillCategory}
          highlightedSkillId={highlightedSkillId}
        />

        <MediaGallerySection
          media={PROFILE_DATA.media}
          fullName={PROFILE_DATA.fullName}
        />

        <FaqAndConnectSection
          profile={PROFILE_DATA}
          openFaqId={openFaqId}
          onToggleFaq={(id) =>
            setOpenFaqId((prev) => (prev === id ? null : id))
          }
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
