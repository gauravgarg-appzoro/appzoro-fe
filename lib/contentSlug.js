import { slugify } from './validation';

/**
 * URL slug for a career listing (API has no slug field; derived from Title).
 */
export function careerSlug(item) {
  if (!item || typeof item !== 'object') return '';
  const fromTitle = slugify(item.Title, '');
  if (fromTitle) return fromTitle;
  const id = item._id ?? item.id;
  return id != null ? String(id) : '';
}

/**
 * URL slug for a press release (API has no slug field; derived from PressTitle).
 */
export function pressSlug(item) {
  if (!item || typeof item !== 'object') return '';
  const fromTitle = slugify(item.PressTitle, '');
  if (fromTitle) return fromTitle;
  const id = item._id ?? item.id;
  return id != null ? String(id) : '';
}

const OBJECT_ID_RE = /^[a-f0-9]{24}$/i;

/**
 * Resolve a published item by route slug (title slug or MongoDB id).
 */
export function findByContentSlug(items, slug, getSlugFn) {
  if (!slug || !Array.isArray(items)) return null;
  const normalized = String(slug).replace(/^\//, '').toLowerCase();
  const bySlug = items.find((item) => getSlugFn(item).toLowerCase() === normalized);
  if (bySlug) return bySlug;
  if (OBJECT_ID_RE.test(normalized)) {
    return items.find((item) => String(item._id ?? item.id) === normalized) ?? null;
  }
  return null;
}

/**
 * Normalize Responsibility / Requirements from API (array or newline text).
 */
export function normalizeListField(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }
  if (value == null || value === '') return [];
  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}
