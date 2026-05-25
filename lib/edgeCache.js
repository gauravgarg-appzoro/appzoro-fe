// Centralised CDN/edge cache headers for public SSR pages.
//
// Without these headers, the deployed CDN (Vercel/CloudFront/etc.) re-runs
// getServerSideProps for every single visitor. With our backend taking
// 1–12s per cold request, that produces the navigation slowness we saw on
// /blog: every click = cold SSR.
//
// Profiles:
//   'short' — list / index pages that may add new items frequently
//   'long'  — detail / [slug] pages that rarely change after publish
//
// Editor updates surface within the freshness window. Stale-while-revalidate
// means the *next* visitor after expiry pays the cost; everyone else served
// instantly from the edge while the cache refills in the background.
//
// NEVER call this from admin/auth-protected pages: cached HTML would leak
// across users.

export const EDGE_CACHE_SHORT = 'public, s-maxage=60, stale-while-revalidate=300';
export const EDGE_CACHE_LONG = 'public, s-maxage=300, stale-while-revalidate=3600';

export function setEdgeCache(res, profile = 'short') {
    if (!res || typeof res.setHeader !== 'function') return;
    res.setHeader(
        'Cache-Control',
        profile === 'long' ? EDGE_CACHE_LONG : EDGE_CACHE_SHORT,
    );
}
