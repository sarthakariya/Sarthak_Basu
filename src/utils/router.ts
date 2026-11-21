export type PageRoute = 'home' | 'about' | 'certificates' | 'profiles';

export interface RouteMeta {
  id: PageRoute;
  label: string;
  hash: string;
  title: string;
}

export const ROUTES: RouteMeta[] = [
  {
    id: 'home',
    label: 'Home',
    hash: '#/',
    title: 'Sarthak Basu — Full-Stack Web & AI Developer',
  },
  {
    id: 'about',
    label: 'About',
    hash: '#/about',
    title: 'About · Sarthak Basu',
  },
  {
    id: 'certificates',
    label: 'Certificates',
    hash: '#/certificates',
    title: 'Certificates & Badges · Sarthak Basu',
  },
  {
    id: 'profiles',
    label: 'Profiles',
    hash: '#/profiles',
    title: 'Profiles & Contact · Sarthak Basu',
  },
];

export function parseHashRoute(hash: string): PageRoute {
  const normalized = hash.replace(/^#\/?/, '').split('?')[0].toLowerCase().trim();
  if (normalized === 'about' || normalized === 'community' || normalized === 'skills' || normalized === 'faq') {
    return 'about';
  }
  if (normalized === 'certificates' || normalized === 'badges') {
    return 'certificates';
  }
  if (normalized === 'profiles' || normalized === 'contact' || normalized === 'connect') {
    return 'profiles';
  }
  return 'home';
}

export function getRouteHash(route: PageRoute): string {
  const found = ROUTES.find((r) => r.id === route);
  return found ? found.hash : '#/';
}

export function mapSectionToRoute(sectionId: string): PageRoute {
  if (sectionId === 'certificates') return 'certificates';
  if (sectionId === 'profiles' || sectionId === 'instagram' || sectionId === 'connect') {
    return 'profiles';
  }
  if (sectionId === 'about' || sectionId === 'community' || sectionId === 'skills' || sectionId === 'faq') {
    return 'about';
  }
  return 'home';
}
