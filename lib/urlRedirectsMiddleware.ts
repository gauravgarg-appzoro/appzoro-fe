import { NextRequest, NextResponse } from 'next/server';

type RedirectItem = { sourceUrl: string; targetUrl: string; statusCode: number };

const isRedirectCode = (code: number) => [301, 302, 303, 307, 308].includes(code);

let cache: { items: RedirectItem[]; exp: number } | null = null;
const TTL_MS = 60_000;

function normalizePath(p: string): string {
    if (!p) return '/';
    let s = p;
    if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
    return s;
}

function resolveTarget(target: string, origin: string): string {
    const t = target.trim();
    if (/^https?:\/\//i.test(t)) return t;
    const path = t.startsWith('/') ? t : `/${t}`;
    return `${origin}${path}`;
}

function shouldSkipDynamicRedirect(pathname: string): boolean {
    if (pathname.startsWith('/admin')) return true;
    if (pathname.startsWith('/_next')) return true;
    if (pathname.startsWith('/api')) return true;
    // Skip typical static assets (middleware has no file extension matcher)
    if (/\.(ico|png|jpg|jpeg|gif|webp|svg|css|js|map|woff2?|ttf|eot)$/i.test(pathname)) {
        return true;
    }
    return false;
}

async function loadRedirects(apiBase: string): Promise<RedirectItem[]> {
    if (cache && Date.now() < cache.exp) return cache.items;
    try {
        const base = apiBase.replace(/\/+$/, '');
        const controller = new AbortController();
        const timeoutMs = process.env.NODE_ENV === 'development' ? 200 : 2000;
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        const res = await fetch(`${base}/url-redirections/public`, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) {
            cache = { items: [], exp: Date.now() + TTL_MS };
            return [];
        }
        const json = await res.json();
        const raw = Array.isArray(json) ? json : json?.data;
        const list = Array.isArray(raw) ? raw : [];
        const items: RedirectItem[] = list
            .filter(
                (r: any) =>
                    r?.sourceUrl && (Number(r.statusCode) === 410 || (r?.targetUrl && String(r.targetUrl).trim())),
            )
            .map((r: any) => {
                const src = r.sourceUrl.startsWith('/') ? r.sourceUrl : `/${r.sourceUrl}`;
                const code = Number(r.statusCode);
                if (code === 410) {
                    return {
                        sourceUrl: normalizePath(src),
                        targetUrl: '',
                        statusCode: 410,
                    };
                }
                return {
                    sourceUrl: normalizePath(src),
                    targetUrl: String(r.targetUrl).trim(),
                    statusCode: isRedirectCode(code) ? code : 301,
                };
            });
        cache = { items, exp: Date.now() + TTL_MS };
        return items;
    } catch {
        return cache?.items ?? [];
    }
}

/**
 * Database-driven redirects (after static rules in middleware).
 * Cached ~60s per edge instance to limit API load.
 */
export async function maybeApplyDynamicRedirect(
    req: NextRequest,
    origin: string,
): Promise<NextResponse | null> {
    const pathname = req.nextUrl.pathname;
    if (shouldSkipDynamicRedirect(pathname)) return null;
    if (process.env.NODE_ENV === 'development') return null;

    const apiBase =
        process.env.URL_REDIRECTS_API_BASE ||
        process.env.NEXT_PUBLIC_API_URL ||
        'https://admin.appzoro.com';

    const redirects = await loadRedirects(apiBase);
    const key = normalizePath(pathname);
    const hit = redirects.find((r) => r.sourceUrl === key);
    if (!hit) return null;

    if (hit.statusCode === 410) {
        return new NextResponse(null, {
            status: 410,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
            },
        });
    }

    const location = resolveTarget(hit.targetUrl, origin);
    return NextResponse.redirect(location, hit.statusCode as 301 | 302 | 303 | 307 | 308);
}
