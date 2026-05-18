/**
 * Fixes broken media URLs in legacy blog HTML (Semrush "broken internal images"):
 * - Literal <em> / </em> inside filenames (stored as text instead of emphasis)
 * - Double origin: https://admin.appzoro.com/https://...
 */

function fixAssetUrl(url) {
    if (!url || typeof url !== 'string') return url;
    let u = url
        .replace(/<\/?em>/gi, '')
        .replace(/&lt;\/?em&gt;/gi, '')
        .replace(/&#x3C;em&#x3E;/gi, '')
        .replace(/&#x3C;\/em&#x3E;/gi, '');
    u = u.replace(/^https?:\/\/admin\.appzoro\.com\/https:\/\//i, 'https://');
    return u;
}

function needsUrlFix(url) {
    return (
        /<\/?em>/i.test(url) ||
        /&lt;\/?em&gt;/i.test(url) ||
        /admin\.appzoro\.com\/https:\/\//i.test(url)
    );
}

/**
 * @param {string} html
 * @returns {string}
 */
export function sanitizeBlogBodyHtml(html) {
    if (!html || typeof html !== 'string') return html;

    return html.replace(/\bsrc=(["'])((?:(?!\1)[^])+)\1/gi, (m, q, url) => {
        if (!needsUrlFix(url)) return m;
        return `src=${q}${fixAssetUrl(url)}${q}`;
    }).replace(/\bhref=(["'])((?:(?!\1)[^])+)\1/gi, (m, q, url) => {
        if (!needsUrlFix(url) && !/\/uploads\//i.test(url)) return m;
        if (!needsUrlFix(url)) return m;
        return `href=${q}${fixAssetUrl(url)}${q}`;
    });
}
