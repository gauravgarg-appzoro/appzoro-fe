import { REACT_APP_API_URL } from '../lib/constants';

const ROBOTS_FALLBACK = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /cache/
Disallow: /thank-you
Disallow: /services/preview/
Disallow: /blog/categories/
Disallow: /blog/archives/
Disallow: /stage.appzoro.com/
Disallow: /cgi-bin/

# Don't waste Googlebot's crawl budget downloading per-page chunks for
# admin/preview routes — these are auth-protected UI bundles that public
# users (and crawlers) never need to execute. _next/static/chunks/pages/
# admin/* are reachable from the build manifest if not blocked.
Disallow: /_next/static/chunks/pages/admin/
Disallow: /_next/static/chunks/pages/services/preview/

Sitemap: https://appzoro.com/sitemap.xml
`;

export async function getServerSideProps({ res }) {
    const apiBase = (REACT_APP_API_URL || 'https://admin.appzoro.com/').replace(/\/+$/, '');
    let body = ROBOTS_FALLBACK;

    try {
        const apiRes = await fetch(`${apiBase}/site-config/robots`, {
            headers: { Accept: 'text/plain, application/json' },
        });
        if (apiRes.ok) {
            const json = await apiRes.json();
            const content = json?.data?.robots_txt ?? json?.robots_txt;
            if (content && String(content).trim()) {
                body = String(content);
            }
        }
    } catch {
        // use fallback
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.write(body);
    res.end();

    return { props: {} };
}

export default function RobotsTxt() {
    return null;
}
