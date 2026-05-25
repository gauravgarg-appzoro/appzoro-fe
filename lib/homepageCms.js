import { resolveCmsMediaUrl } from './cmsMedia';

/** Map homepage CMS award entry to slide props (falls back handled in component). */
export function mapHomepageAward(item, index) {
  if (!item || typeof item !== 'object') return null;
  const imageUrl = resolveCmsMediaUrl(item.image);
  const profileUrl = item.url || item.URL || '';
  const ratingText = item.seo_text || item.seoText || item.rating || '';
  if (!imageUrl && !profileUrl) return null;
  return {
    key: `cms-award-${index}`,
    thumbUrl: imageUrl || `/assets/images/award-slides/slide${(index % 7) + 1}.png`,
    profileUrl,
    ratingText: ratingText || 'View Profile',
    bodyHtml:
      item.description ||
      'We have been recognized as a top <span>mobile and app development</span> company in the United States.',
    badgeUrl: '/assets/images/award-imgview.png',
    iconUrl: imageUrl || `/assets/images/award-slides/slide${(index % 7) + 1}.png`,
  };
}

/** Map homepage CMS press carousel link to slider item. */
export function mapHomepagePressLink(item, index) {
  if (!item || typeof item !== 'object') return null;
  const imageUrl = resolveCmsMediaUrl(item.image);
  const href = item.url || item.URL || '/press-release';
  if (!imageUrl) return null;
  return {
    key: `cms-press-${index}`,
    href,
    imageUrl,
    label: item.seo_text || item.seoText || 'Press feature',
  };
}

/** Map homepage CMS testimonial to ClientReview card shape. */
export function mapHomepageTestimonial(item, index) {
  if (!item || typeof item !== 'object') return null;
  const text = item.testimonial || item.Testimonial || item.review || '';
  const name = item.name || item.Name || '';
  if (!text && !name) return null;
  return {
    key: `cms-testimonial-${index}`,
    name,
    designation: item.designation || item.Designation || '',
    clientreview: text.startsWith('"') ? text : `"${text}"`,
    img: resolveCmsMediaUrl(item.image) || '/assets/images/clients/1.jpg',
    link: item.link || item.url || item.URL || null,
  };
}
