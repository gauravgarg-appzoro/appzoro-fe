import { SITE_URL, stripHtmlForMeta } from './seo';

const ORG_ID = `${SITE_URL}/#organization`;

export function stripHtml(raw) {
  return stripHtmlForMeta(raw, 10000);
}

function toIso(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function buildBreadcrumbSchema(items) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function buildWebPageSchema({ name, description, url, image }) {
  if (!name || !url) return null;
  const pageUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: stripHtml(name),
    description: stripHtml(description || '').slice(0, 300),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': ORG_ID },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
  };
}

export function buildServiceSchema({ name, description, url, image, areaServed = 'United States' }) {
  if (!name || !url) return null;
  const pageUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: stripHtml(name),
    description: stripHtml(description || '').slice(0, 500),
    url: pageUrl,
    provider: { '@id': ORG_ID },
    areaServed,
    ...(image ? { image } : {}),
  };
}

export function buildJobPostingSchema({
  title,
  description,
  url,
  datePosted,
  employmentType = 'FULL_TIME',
  jobLocation = 'Atlanta, GA',
}) {
  if (!title || !url) return null;
  const pageUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: stripHtml(title),
    description: stripHtml(description || '').slice(0, 5000),
    url: pageUrl,
    datePosted: toIso(datePosted) || new Date().toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'AppZoro Technologies Inc.',
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atlanta',
        addressRegion: 'GA',
        addressCountry: 'US',
      },
      name: jobLocation,
    },
    employmentType,
  };
}

export function buildNewsArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
}) {
  if (!headline || !url) return null;
  const pageUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: stripHtml(headline),
    description: stripHtml(description || '').slice(0, 300),
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: image ? [image] : [`${SITE_URL}/assets/images/az-logo-large.png`],
    datePublished: toIso(datePublished) || undefined,
    dateModified: toIso(dateModified || datePublished) || undefined,
    author: { '@type': 'Organization', name: 'AppZoro Technologies', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'AppZoro Technologies',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/az-logo-large.png`,
      },
    },
  };
}

/** Merge CMS schema with auto-generated schemas (array for @graph). */
export function mergeSchemas(...schemas) {
  const flat = schemas.filter(Boolean);
  if (flat.length === 0) return null;
  if (flat.length === 1) return flat[0];
  return {
    '@context': 'https://schema.org',
    '@graph': flat.flatMap((s) => (s['@graph'] ? s['@graph'] : [s])),
  };
}
