/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { PROFILE_DATA } from './data/profileData';
import type { SearchResultItem } from './utils/personalSearch';
import { buildPersonSchemaGraph } from './utils/seoSchema';
import {
  getRouteHash,
  mapSectionToRoute,
  parseHashRoute,
  ROUTES,
  type PageRoute,
} from './utils/router';
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
  const [activeRoute, setActiveRoute] = useState<PageRoute>(() => {
    if (typeof window === 'undefined') return 'home';
    return parseHashRoute(window.location.hash);
  });

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

  // Listen to browser hashchange (Back / Forward & shared GitHub Pages links)
  useEffect(() => {
    function handleHashChange() {
      setActiveRoute(parseHashRoute(window.location.hash));
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync page <title> with active page route
  useEffect(() => {
    const meta = ROUTES.find((r) => r.id === activeRoute);
    if (meta) {
      document.title = meta.title;
    }
  }, [activeRoute]);

  // Global ⌘K / Ctrl+K shortcut for instant search
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

  // Sync Schema.org JSON-LD & canonical URL
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

  // Sync ?q= cleanly without disturbing hash route
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

  const navigateTo = useCallback((route: PageRoute, targetElementId?: string) => {
    const nextHash = getRouteHash(route);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setActiveRoute(route);

    if (targetElementId) {
      window.setTimeout(() => {
        const el = document.getElementById(targetElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  function handleSelectSearchResult(result: SearchResultItem) {
    const targetRoute = mapSectionToRoute(result.sectionId);
    navigateTo(targetRoute, result.id);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#06070D] text-[#F1F5F9]">
        {/* Multi-Color Ambient Aurora Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_38%_at_20%_0%,rgba(56,189,248,0.14),transparent_60%),radial-gradient(ellipse_55%_36%_at_80%_10%,rgba(167,139,250,0.14),transparent_60%),radial-gradient(ellipse_50%_32%_at_50%_95%,rgba(52,211,153,0.09),transparent_65%)]"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06070D]"
        >
          Skip to main content
        </a>

        <TopNavBar
          fullName={PROFILE_DATA.fullName}
          activeRoute={activeRoute}
          onNavigate={(route) => navigateTo(route)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dedicated Uncluttered Page View */}
        <main
          id="main-content"
          className="mx-auto w-full max-w-5xl flex-1 px-5 py-7 sm:px-8 sm:py-9"
        >
          <AnimatePresence mode="wait">
            {activeRoute === 'home' && (
              <motion.div
                key="page-home"
                initial={{ opacity: 0.92, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroSection
                  profile={PROFILE_DATA}
                  onNavigate={(route) => navigateTo(route)}
                />
              </motion.div>
            )}

            {activeRoute === 'about' && (
              <motion.div
                key="page-about"
                initial={{ opacity: 0.92, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div className="text-center sm:text-left">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-violet-300 uppercase">
                    About Sarthak Basu
                  </p>
                  <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Story, Stack &amp; Community
                  </h1>
                </div>

                <motion.section
                  aria-label="About and Community"
                  variants={SECTION_STAGGER_VARIANTS}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_CONFIG}
                  className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch"
                >
                  <div className="lg:col-span-7">
                    <AboutNarrativeSection profile={PROFILE_DATA} />
                  </div>
                  <div className="lg:col-span-5">
                    <CommunityShowcaseSection profile={PROFILE_DATA} />
                  </div>
                </motion.section>

                <FaqSection profile={PROFILE_DATA} />
              </motion.div>
            )}

            {activeRoute === 'certificates' && (
              <motion.div
                key="page-certificates"
                initial={{ opacity: 0.92, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <CertificatesSection profile={PROFILE_DATA} />
              </motion.div>
            )}

            {activeRoute === 'profiles' && (
              <motion.div
                key="page-profiles"
                initial={{ opacity: 0.92, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <DeveloperProfilesSection profile={PROFILE_DATA} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer
          profile={PROFILE_DATA}
          activeRoute={activeRoute}
          onNavigate={(route) => navigateTo(route)}
        />

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
