import { STRAPI_IMAGE_BASE_URL } from './constants';

const WP_TO_RELATIVE = [
    [/https?:\/\/(?:www\.)?appzoro\.com\/wp-content\/uploads\/?/gi, '/uploads/'],
    [/https?:\/\/admin\.appzoro\.com\/wp-content\/uploads\/?/gi, '/uploads/'],
];

/**
 * Legacy WordPress media URLs → path-only /uploads/… (then blog pipeline can prefix Strapi base).
 */
export function rewriteLegacyWpContentUploadsToRelative(str) {
    if (str == null || typeof str !== 'string' || !str.length) return str;
    let out = str;
    for (const [re, repl] of WP_TO_RELATIVE) {
        out = out.replace(re, repl);
    }
    return out;
}

/**
 * Legacy WordPress media URLs → absolute Strapi /uploads/… (for JSON-LD, inline HTML outside blog pipeline).
 */
export function rewriteLegacyWpContentUploadsToAbsolute(str, strapiBase = STRAPI_IMAGE_BASE_URL) {
    if (str == null || typeof str !== 'string' || !str.length) return str;
    const base = String(strapiBase).replace(/\/+$/, '');
    if (!base) return str;
    return str
        .replace(/https?:\/\/(?:www\.)?appzoro\.com\/wp-content\/uploads\/?/gi, `${base}/uploads/`)
        .replace(/https?:\/\/admin\.appzoro\.com\/wp-content\/uploads\/?/gi, `${base}/uploads/`);
}
