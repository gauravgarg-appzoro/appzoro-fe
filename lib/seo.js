/** Shared SEO helpers — use site origin, not API/admin URLs. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.REACT_APP_SITE_URL ||
  'https://appzoro.com'
).replace(/\/$/, '');

export const TWITTER_SITE = '@AppZoroT';

const DEFAULT_OG_IMAGE = '/assets/images/az-logo-large.png';

/** Absolute public URL for a path or full URL. */
export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  const s = String(path).trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return `${SITE_URL}${s.startsWith('/') ? s : `/${s}`}`;
}

/** OG/Twitter image — prefer explicit URL; otherwise site static asset. */
export function resolveOgImage(image) {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
  const s = String(image).trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('/')) return absoluteUrl(s);
  return absoluteUrl(DEFAULT_OG_IMAGE);
}

export function resolveSeoTitle(title, fallback = 'AppZoro | Software & App Development') {
  const t = title != null ? String(title).trim() : '';
  return t || fallback;
}

export function resolveSeoDescription(description, fallback = '') {
  const d = description != null ? String(description).trim() : '';
  return d || fallback;
}

/** Strip HTML for meta descriptions sourced from rich text. */
export function stripHtmlForMeta(html, maxLen = 160) {
  if (!html) return '';
  const text = String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trim()}…`;
}

/** Canonical path overrides (pathname without query). */
const CANONICAL_OVERRIDES = {
  '/locations/atlanta-app-developers': '/locations/atlanta-app-developers',
};

export function resolveCanonicalPath(pathname, queryPage) {
  const path = (pathname || '/').split('?')[0] || '/';
  if (CANONICAL_OVERRIDES[path]) {
    return CANONICAL_OVERRIDES[path];
  }
  const base = path === '/' ? '' : path;
  if (queryPage && Number(queryPage) > 1) {
    return `${base}?page=${queryPage}`;
  }
  return base || '/';
}

export function canonicalHref(pathname, queryPage) {
  const path = resolveCanonicalPath(pathname, queryPage);
  if (path === '/' || path === '') return `${SITE_URL}/`;
  if (path.startsWith('http')) return path;
  return absoluteUrl(path.startsWith('/') ? path : `/${path}`);
}
