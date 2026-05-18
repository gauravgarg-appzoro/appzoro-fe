/**
 * Dynamic XML Sitemap — server-rendered on each request.
 * Fetches all published content slugs from the backend API so that
 * newly created pages are immediately discoverable by crawlers
 * without a rebuild.
 * Omits URLs that are redirect sources (same rules as middleware).
 */

import { fetchRedirectSourcePaths, pathnameFromSiteLoc } from '../lib/sitemapRedirectExclude';

const SITE_URL = 'https://appzoro.com';

function pushUnlessRedirect(urls, loc, freq, priority, redirectSources) {
    const path = pathnameFromSiteLoc(loc);
    if (path && redirectSources.has(path)) return;
    urls.push(urlEntry(loc, freq, priority));
}

/** Helper — fetch JSON from backend, return [] on error */
async function fetchSlugs(apiBase, endpoint, slugField = 'slug', limit = 500) {
    try {
        const sep = endpoint.includes('?') ? '&' : '?';
        const url = `${apiBase}/${endpoint}${sep}_limit=${limit}&_start=0`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) return [];
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.data || data.results || []);
        return items
            .map((item) => {
                const s = item[slugField] || item.slug || item.Slug || '';
                return typeof s === 'string' ? s.replace(/^\//, '') : '';
            })
            .filter(Boolean);
    } catch (e) {
        console.error(`[sitemap] Failed to fetch ${endpoint}:`, e.message);
        return [];
    }
}

function escapeXml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function urlEntry(loc, changefreq = 'weekly', priority = '0.8') {
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function getServerSideProps({ res }) {
    const apiBase = (
        process.env.URL_REDIRECTS_API_BASE ||
        process.env.NEXT_PUBLIC_API_URL ||
        'https://admin.appzoro.com'
    ).replace(/\/+$/, '');

    // ── 1. Static pages ──────────────────────────────────────────────
    const staticPages = [
        { path: '/', priority: '1.0', freq: 'daily' },
        { path: '/about-us', priority: '0.9', freq: 'monthly' },
        { path: '/services', priority: '0.9', freq: 'weekly' },
        { path: '/case-study', priority: '0.9', freq: 'weekly' },
        { path: '/blog', priority: '0.9', freq: 'daily' },
        { path: '/industry', priority: '0.9', freq: 'weekly' },
        { path: '/locations', priority: '0.9', freq: 'monthly' },
        { path: '/career', priority: '0.8', freq: 'weekly' },
        { path: '/press-release', priority: '0.7', freq: 'weekly' },
        { path: '/contact-us', priority: '0.8', freq: 'monthly' },
        { path: '/team', priority: '0.7', freq: 'monthly' },
        { path: '/getting-started', priority: '0.8', freq: 'monthly' },
        { path: '/hire-developer', priority: '0.8', freq: 'monthly' },
        { path: '/technology', priority: '0.8', freq: 'monthly' },
        { path: '/privacy', priority: '0.3', freq: 'yearly' },
        { path: '/terms', priority: '0.3', freq: 'yearly' },
        { path: '/sitemap', priority: '0.3', freq: 'monthly' },
    ];

    // ── 2. Dynamic pages — fetch from API concurrently ───────────────
    const [
        blogSlugs,
        caseStudySlugs,
        serviceSlugs,
        industrySlugs,
        locationSlugs,
        careerSlugs,
        pressSlugs,
        technologySlugs,
        productSlugs,
        hireDeveloperSlugs,
        gettingStartedSlugs,
        redirectSources,
    ] = await Promise.all([
        fetchSlugs(apiBase, 'posts?_sort=published_at:DESC', 'slug', 1000),
        fetchSlugs(apiBase, 'our-portfolios?_sort=updatedAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'services?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'induustries?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'locations-news?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'careers?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'presses?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'technologies?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'products?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'hire-developers?_sort=createdAt:DESC', 'slug'),
        fetchSlugs(apiBase, 'getting-starteds?_sort=createdAt:DESC', 'slug'),
        fetchRedirectSourcePaths(apiBase),
    ]);

    // ── 3. Build URL list ────────────────────────────────────────────
    const urls = [];

    // Static pages
    for (const p of staticPages) {
        pushUnlessRedirect(urls, `${SITE_URL}${p.path}`, p.freq, p.priority, redirectSources);
    }

    // Blog posts
    for (const slug of blogSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/blog/${slug}`, 'weekly', '0.8', redirectSources);
    }

    // Case studies / portfolios
    for (const slug of caseStudySlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/case-study/${slug}`, 'monthly', '0.7', redirectSources);
    }

    // Services
    for (const slug of serviceSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/services/${slug}`, 'monthly', '0.9', redirectSources);
    }

    // Industries
    for (const slug of industrySlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/industry/${slug}`, 'monthly', '0.9', redirectSources);
    }

    // Locations
    for (const slug of locationSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/locations/${slug}`, 'monthly', '0.8', redirectSources);
    }

    // Careers
    for (const slug of careerSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/career/${slug}`, 'weekly', '0.6', redirectSources);
    }

    // Press releases
    for (const slug of pressSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/press-release/${slug}`, 'monthly', '0.6', redirectSources);
    }

    // Technologies
    for (const slug of technologySlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/technology/${slug}`, 'monthly', '0.8', redirectSources);
    }

    // Products (top-level [slug] pages)
    for (const slug of productSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/${slug}`, 'monthly', '0.8', redirectSources);
    }

    // Hire Developer
    for (const slug of hireDeveloperSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/hire-developer/${slug}`, 'monthly', '0.7', redirectSources);
    }

    // Getting Started
    for (const slug of gettingStartedSlugs) {
        pushUnlessRedirect(urls, `${SITE_URL}/getting-started/${slug}`, 'monthly', '0.7', redirectSources);
    }

    // ── 4. Render XML ────────────────────────────────────────────────
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    res.write(sitemap);
    res.end();

    return { props: {} };
}

// Must export a default component even for XML pages
export default function SitemapXml() {
    return null;
}
