/**
 * Extract heading structure from blog content and stable ids for anchor links.
 * Used by BlogPostContentWithToc — keep slug rules in sync with injected ids.
 */

export function slugify(text) {
    if (!text) return 'section';
    const s = String(text)
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return s || 'section';
}

export function uniqueSlug(base, used) {
    let id = base || 'section';
    let n = 0;
    while (used.has(id)) {
        n += 1;
        id = `${base}-${n}`;
    }
    used.add(id);
    return id;
}

/**
 * Decode HTML entities in heading text (e.g. &amp;nbsp; → space, &amp; → &).
 * Safe for SSR; no DOM required.
 */
export function decodeHtmlEntities(str) {
    if (str == null || str === '') return '';
    let s = String(str);
    for (let i = 0; i < 5; i += 1) {
        const next = s.replace(/&amp;/g, '&');
        if (next === s) break;
        s = next;
    }
    s = s
        .replace(/&nbsp;/gi, '\u00A0')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0*39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#(\d+);/g, (_, n) => {
            const code = parseInt(n, 10);
            return code >= 0 && code <= 0x10ffff ? String.fromCharCode(code) : _;
        })
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => {
            const code = parseInt(h, 16);
            return code >= 0 && code <= 0x10ffff ? String.fromCharCode(code) : _;
        });
    return s;
}

export function stripHtmlInner(html) {
    const raw = String(html)
        .replace(/<[^>]+>/g, '')
        .replace(/[\u00A0\s]+/g, ' ')
        .trim();
    return decodeHtmlEntities(raw);
}

/** @returns {{ level: number, text: string, id: string }[]} */
export function extractMarkdownHeadings(md) {
    if (!md || typeof md !== 'string') return [];
    const headings = [];
    const used = new Set();
    let inFence = false;
    for (const line of md.split('\n')) {
        const t = line.trim();
        if (t.startsWith('```')) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;
        const m = /^(#{1,6})\s+(.+)$/.exec(t);
        if (m) {
            const level = m[1].length;
            const text = decodeHtmlEntities(m[2].trim());
            const id = uniqueSlug(slugify(text), used);
            headings.push({ level, text, id });
        }
    }
    return headings;
}

const HTML_HEADING_RE = /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h[1-6]>/gi;

/**
 * Ensure each heading has an id; return processed HTML + heading list for TOC.
 * Preserves existing id attributes.
 */
export function processHtmlHeadings(html) {
    if (!html || typeof html !== 'string') return { html: '', headings: [] };
    const headings = [];
    const used = new Set();
    const out = html.replace(HTML_HEADING_RE, (match, levelStr, attrs, inner) => {
        const level = parseInt(levelStr, 10);
        const idAttr = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i);
        let id = idAttr ? idAttr[1].trim() : null;
        const text = stripHtmlInner(inner);
        if (!id) {
            id = uniqueSlug(slugify(text), used);
        } else {
            used.add(id);
        }
        headings.push({ level, text, id });
        if (idAttr) return match;
        const safeAttrs = attrs.trim();
        const space = safeAttrs ? ' ' : '';
        return `<h${levelStr}${space}${safeAttrs} id="${escapeAttr(id)}">${inner}</h${levelStr}>`;
    });
    return { html: out, headings };
}

function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function getTextFromReactNode(node) {
    if (node == null || node === false) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextFromReactNode).join('');
    if (typeof node === 'object' && node.props && node.props.children != null) {
        return getTextFromReactNode(node.props.children);
    }
    return '';
}
