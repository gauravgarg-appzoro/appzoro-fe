/**
 * Dynamic XML Sitemap — server-rendered on each request.
 * Fetches all published content slugs from the backend API so that
 * newly created pages are immediately discoverable by crawlers
 * without a rebuild.
 * Omits URLs that are redirect sources (same rules as middleware).
 */

import { fetchRedirectSourcePaths, pathnameFromSiteLoc } from '../lib/sitemapRedirectExclude';
import { careerSlug, pressSlug } from '../lib/contentSlug';
import { slugify } from '../lib/validation';

const SITE_URL = 'https://appzoro.com';

/** Normalize a date-like value to ISO 8601 (YYYY-MM-DDTHH:MM:SS+00:00). Falls back to today. */
function toIsoDate(value) {
    if (value) {
        const d = new Date(value);
        if (!Number.isNaN(d.getTime())) return d.toISOString();
    }
    return new Date().toISOString();
}

function pushUnlessRedirect(urls, loc, freq, priority, lastmod, redirectSources) {
    const path = pathnameFromSiteLoc(loc);
    if (path && redirectSources.has(path)) return;
    urls.push(urlEntry(loc, freq, priority, lastmod));
}

/** Fetch items and derive URL entries (slug + lastmod) for collections without a slug field. */
async function fetchDerivedItems(apiBase, endpoint, getSlug, limit = 500) {
    try {
        const sep = endpoint.includes('?') ? '&' : '?';
        const url = `${apiBase}/${endpoint}${sep}_limit=${limit}&_start=0`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) return [];
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.data || data.results || []);
        return items
            .map((item) => ({
                slug: getSlug(item),
                lastmod: toIsoDate(item.updatedAt || item.updated_at || item.published_at || item.publishedAt || item.createdAt),
            }))
            .filter((entry) => entry.slug);
    } catch (e) {
        console.error(`[sitemap] Failed to fetch ${endpoint}:`, e.message);
        return [];
    }
}

/** Fetch JSON from backend, return array of { slug, lastmod }. */
async function fetchItems(apiBase, endpoint, slugField = 'slug', limit = 500) {
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
                const slug = typeof s === 'string' ? s.replace(/^\//, '') : '';
                return {
                    slug,
                    lastmod: toIsoDate(item.updatedAt || item.updated_at || item.published_at || item.publishedAt || item.createdAt),
                };
            })
            .filter((entry) => entry.slug);
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

function urlEntry(loc, changefreq = 'weekly', priority = '0.8', lastmod = null) {
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodTag}
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

    const buildIso = toIsoDate(process.env.NEXT_PUBLIC_BUILD_ISO);

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
        { path: '/mobile-and-software-development-services', priority: '0.8', freq: 'monthly' },
    ];

    // ── 2. Dynamic pages — fetch from API concurrently ───────────────
    const [
        blogItems,
        caseStudyItems,
        serviceItems,
        industryItems,
        locationItems,
        technologyItems,
        productItems,
        hireDeveloperItems,
        gettingStartedItems,
        careerItems,
        pressItems,
        authorItems,
        redirectSources,
    ] = await Promise.all([
        fetchItems(apiBase, 'posts?_sort=published_at:DESC', 'slug', 1000),
        fetchItems(apiBase, 'our-portfolios?_sort=updatedAt:DESC', 'slug'),
        fetchItems(apiBase, 'services?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'induustries?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'locations-news?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'technologies?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'products?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'hire-developers?_sort=createdAt:DESC', 'slug'),
        fetchItems(apiBase, 'getting-starteds?_sort=createdAt:DESC', 'slug'),
        fetchDerivedItems(apiBase, 'careers', careerSlug),
        fetchDerivedItems(apiBase, 'presses?_sort=PressDate:desc', pressSlug),
        // Author bio pages: slugify writer name. Writers without a name are skipped.
        fetchDerivedItems(apiBase, 'writers?_limit=500', (w) => slugify(w?.name || '')),
        fetchRedirectSourcePaths(apiBase),
    ]);

    // ── 3. Build URL list ────────────────────────────────────────────
    const urls = [];

    // Static pages — use build date as lastmod (best we have without per-page mtime).
    for (const p of staticPages) {
        pushUnlessRedirect(urls, `${SITE_URL}${p.path}`, p.freq, p.priority, buildIso, redirectSources);
    }

    // Blog posts
    for (const { slug, lastmod } of blogItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/blog/${slug}`, 'weekly', '0.8', lastmod, redirectSources);
    }

    // Case studies / portfolios
    for (const { slug, lastmod } of caseStudyItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/case-study/${slug}`, 'monthly', '0.7', lastmod, redirectSources);
    }

    // Services
    for (const { slug, lastmod } of serviceItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/services/${slug}`, 'monthly', '0.9', lastmod, redirectSources);
    }

    // Industries
    for (const { slug, lastmod } of industryItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/industry/${slug}`, 'monthly', '0.9', lastmod, redirectSources);
    }

    // Locations
    for (const { slug, lastmod } of locationItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/locations/${slug}`, 'monthly', '0.8', lastmod, redirectSources);
    }

    // Technologies
    for (const { slug, lastmod } of technologyItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/technology/${slug}`, 'monthly', '0.8', lastmod, redirectSources);
    }

    // Products (top-level [slug] pages)
    for (const { slug, lastmod } of productItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/${slug}`, 'monthly', '0.8', lastmod, redirectSources);
    }

    // Hire Developer
    for (const { slug, lastmod } of hireDeveloperItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/hire-developer/${slug}`, 'monthly', '0.7', lastmod, redirectSources);
    }

    // Getting Started
    for (const { slug, lastmod } of gettingStartedItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/getting-started/${slug}`, 'monthly', '0.7', lastmod, redirectSources);
    }

    // Careers
    for (const { slug, lastmod } of careerItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/career/${slug}`, 'weekly', '0.7', lastmod, redirectSources);
    }

    // Press releases
    for (const { slug, lastmod } of pressItems) {
        pushUnlessRedirect(urls, `${SITE_URL}/press-release/${slug}`, 'monthly', '0.6', lastmod, redirectSources);
    }

    // Author bio pages — dedupe in case two writers share a slugified name.
    const seenAuthors = new Set();
    for (const { slug, lastmod } of authorItems) {
        if (seenAuthors.has(slug)) continue;
        seenAuthors.add(slug);
        pushUnlessRedirect(urls, `${SITE_URL}/blog/author/${slug}`, 'monthly', '0.5', lastmod, redirectSources);
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
