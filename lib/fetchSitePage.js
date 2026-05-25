import { REACT_APP_API_URL } from './constants';
import { unwrapApiResponse } from './unwrapApiResponse';
import { applySitePageDefaults } from './sitePageDefaults';

export async function fetchSitePage(slug) {
  const apiBase = (REACT_APP_API_URL || 'https://admin.appzoro.com/').replace(/\/+$/, '');
  try {
    const res = await fetch(`${apiBase}/site-pages/${slug}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return applySitePageDefaults(slug, {});
    }
    const json = await res.json();
    const data = unwrapApiResponse(json);
    return applySitePageDefaults(slug, data || {});
  } catch {
    return applySitePageDefaults(slug, {});
  }
}
