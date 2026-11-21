/**
 * Resolves public-folder asset paths so they work both locally and when hosted
 * under a GitHub Pages subpath (e.g. vite.config.ts `base: '/Sarthak_Basu/'`).
 */
export function resolveAssetUrl(assetPath: string): string {
  if (!assetPath || /^https?:\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const metaEnv =
    typeof import.meta !== 'undefined'
      ? (import.meta as unknown as { env?: { BASE_URL?: string } }).env
      : undefined;
  const base = metaEnv?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = assetPath.replace(/^\/+/, '');
  return `${cleanBase}${cleanPath}`;
}
