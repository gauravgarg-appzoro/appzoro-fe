import { STRAPI_IMAGE_BASE_URL } from './constants';

/** Resolve technology banner from API (object or media array). */
export function resolveTechBannerUrl(techData, base = STRAPI_IMAGE_BASE_URL) {
  if (!techData?.techBanner) return '';
  const banner = techData.techBanner;
  const b = Array.isArray(banner) ? banner[0] : banner;
  const url = b?.url || b?.URL;
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http')) return url;
  const root = (base || '').replace(/\/$/, '');
  return `${root}${url.startsWith('/') ? url : `/${url}`}`;
}
