/**
 * Normalizes CMS HTML so paragraph copy is one continuous line in page source.
 * Soft line breaks inside a block (e.g. TipTap paste) break view-source search;
 * real paragraph breaks (blank lines / separate <p> tags) are preserved.
 */

const collapseSoftNewlines = (text) =>
    String(text)
        .replace(/([^\n>])\n([^\n<])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim();

const normalizeBlockInner = (tag, attrs, inner) => {
    const normalized = collapseSoftNewlines(inner);
    return `<${tag}${attrs}>${normalized}</${tag}>`;
};

/**
 * @param {string} html
 * @returns {string}
 */
export function normalizeHtmlLineBreaks(html) {
    if (!html || typeof html !== 'string') return html;

    let str = html.replace(/\r\n/g, '\n').replace(/<\/?br\s*\/?>/gi, '\n');

    if (!/<(?:p|div|h[1-6]|ul|ol|li)\b/i.test(str)) {
        const paragraphs = str
            .split(/\n\n+/)
            .map((para) => collapseSoftNewlines(para))
            .filter(Boolean);
        if (paragraphs.length === 0) return '';
        return paragraphs.map((p) => `<p>${p}</p>`).join('');
    }

    str = str.replace(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi, (match, attrs = '', inner) =>
        normalizeBlockInner('p', attrs, inner),
    );

    for (const tag of ['div', 'h2', 'h3', 'h4']) {
        const re = new RegExp(`<${tag}(\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi');
        str = str.replace(re, (match, attrs = '', inner) => {
            if (!inner.includes('\n')) return match;
            return normalizeBlockInner(tag, attrs, inner);
        });
    }

    return str;
}
