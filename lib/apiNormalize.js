/** Nest/Strapi-style list responses */
export function normalizeListPayload(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
}

/** Count endpoints may return a number, numeric string, or { count } */
export function normalizeCountPayload(raw) {
    if (typeof raw === 'number' && !Number.isNaN(raw)) return raw;
    if (typeof raw === 'string' && raw.trim() !== '') {
        const n = Number(raw);
        return Number.isNaN(n) ? 0 : n;
    }
    if (raw && typeof raw === 'object') {
        if (typeof raw.count === 'number') return raw.count;
        if (typeof raw.total === 'number') return raw.total;
    }
    return 0;
}

/** Avoid stale listing data when using Next.js fetch (App/SSR caching) */
export function fetchNoStore(url) {
    return fetch(url, { cache: 'no-store' });
}
