import { SITE_URL } from './seo';
import { slugify } from './validation';

const PUBLISHER = Object.freeze({
    '@type': 'Organization',
    name: 'AppZoro Technologies',
    logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/az-logo-large.png`,
    },
});

const DEFAULT_AUTHOR_NAME = 'AppZoro';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/az-logo-large.png`;

const stripHtml = (raw) => {
    if (raw == null) return '';
    return String(raw)
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const toIso = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const resolveImage = (blogDetail, strapiBase) => {
    const candidates = [
        blogDetail?.og_image?.url,
        Array.isArray(blogDetail?.image) ? blogDetail.image[0]?.url : null,
        blogDetail?.image?.url,
    ].filter(Boolean);
    const raw = candidates[0];
    if (!raw) return DEFAULT_IMAGE;
    if (/^https?:\/\//i.test(raw)) return raw;
    const base = String(strapiBase || '').replace(/\/$/, '');
    return `${base}${raw.startsWith('/') ? '' : '/'}${raw}`;
};

const resolveAuthor = (blogDetail) => {
    const writer = blogDetail?.writer;
    const name = (writer && (writer.name || writer.full_name)) || DEFAULT_AUTHOR_NAME;
    const cleanName = String(name).trim() || DEFAULT_AUTHOR_NAME;
    const author = { '@type': 'Person', name: cleanName };
    // Prefer the on-site author bio page (added in Issue 11) as the schema
    // author URL — it keeps the link relationship internal and gives Google
    // an indexable page describing the author. Fall back to external profile
    // URL (LinkedIn/website) only when no slug is derivable.
    const authorSlug = writer?.name ? slugify(writer.name) : '';
    if (authorSlug) {
        author.url = `${SITE_URL}/blog/author/${authorSlug}`;
    } else {
        const fallbackUrl = writer?.profile_url || writer?.website;
        if (fallbackUrl && typeof fallbackUrl === 'string') author.url = fallbackUrl;
    }
    return author;
};

/**
 * Always-correct BlogPosting JSON-LD derived from the post's structured fields,
 * so every blog post has a guaranteed-valid schema in the initial HTML head —
 * no dependency on editors pasting JSON-LD into the `post_schema` CMS field.
 *
 * Editor-pasted `post_schema` remains additive for other types (HowTo, etc.);
 * the sanitizer strips any duplicate BlogPosting from it to keep one source of truth.
 *
 * @param {object} blogDetail
 * @param {string} strapiBase
 * @returns {object|null} JSON-LD object, or null if no usable data
 */
export function buildBlogPostingSchema(blogDetail, strapiBase) {
    if (!blogDetail || typeof blogDetail !== 'object') return null;
    const slug = blogDetail.slug || '';
    if (!slug) return null;

    const url = `${SITE_URL}/blog/${slug}`;
    const headline = stripHtml(blogDetail.meta_title || blogDetail.title || '');
    if (!headline) return null;

    const description = stripHtml(
        blogDetail.meta_description || blogDetail.description || '',
    ).slice(0, 300);

    const datePublished =
        toIso(blogDetail.publishedAt) ||
        toIso(blogDetail.published_at) ||
        toIso(blogDetail.createdAt);
    const dateModified =
        toIso(blogDetail.updatedAt) || datePublished;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#blogposting`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        headline: headline.slice(0, 110),
        image: resolveImage(blogDetail, strapiBase),
        author: resolveAuthor(blogDetail),
        publisher: PUBLISHER,
    };

    if (description) schema.description = description;
    if (datePublished) schema.datePublished = datePublished;
    if (dateModified) schema.dateModified = dateModified;

    return schema;
}
