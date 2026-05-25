import { STRAPI_IMAGE_BASE_URL } from './constants';

/** Resolve Strapi/upload_file or nested CMS image to absolute URL. */
export function resolveCmsMediaUrl(media, base = STRAPI_IMAGE_BASE_URL) {
  if (!media) return '';
  if (typeof media === 'string') {
    if (media.startsWith('http')) return media;
    if (media.startsWith('/')) return `${base.replace(/\/$/, '')}${media}`;
    return '';
  }
  const url = media.url || media.URL;
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http')) return url;
  const b = base.replace(/\/$/, '');
  return `${b}${url.startsWith('/') ? url : `/${url}`}`;
}
