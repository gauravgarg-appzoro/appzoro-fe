/**
 * Redirect source paths to omit from sitemaps — must stay aligned with
 * lib/urlRedirectsMiddleware.ts (normalizePath + public list) and
 * middleware static redirects (lib/middlewareStaticSitemapExcludes.js).
 */

import { MIDDLEWARE_STATIC_SITEMAP_EXCLUDES } from './middlewareStaticSitemapExcludes.js';

export function normalizePath(p) {
    if (!p) return '/';
    let s = String(p).trim();
    if (!s.startsWith('/')) s = `/${s}`;
    if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
    return s;
}

/** @param {string} apiBase */
export async function fetchRedirectSourcePaths(apiBase) {
    const base = String(apiBase || '').replace(/\/+$/, '');
    if (!base) return new Set();
    try {
        const res = await fetch(`${base}/url-redirections/public`, {
            headers: { Accept: 'application/json' },
        });
        if (!res.ok) return new Set();
        const json = await res.json();
        const raw = Array.isArray(json) ? json : json?.data;
        const list = Array.isArray(raw) ? raw : [];
        const set = new Set();
        for (const p of MIDDLEWARE_STATIC_SITEMAP_EXCLUDES) {
            set.add(normalizePath(p));
        }
        for (const r of list) {
            if (!r?.sourceUrl) continue;
            if (Number(r.statusCode) !== 410 && !r?.targetUrl) continue;
            const src = r.sourceUrl.startsWith('/') ? r.sourceUrl : `/${r.sourceUrl}`;
            set.add(normalizePath(src));
        }
        return set;
    } catch (e) {
        console.error('[sitemap] Failed to fetch url-redirections:', e.message);
        return new Set();
    }
}

/** @param {string} fullUrl */
export function pathnameFromSiteLoc(fullUrl) {
    try {
        return normalizePath(new URL(fullUrl).pathname);
    } catch {
        return null;
    }
}
