/**
 * IndexNow protocol — ping Bing/Yandex/Seznam when content changes.
 * Call `pingIndexNow(urls)` after publishing/updating pages.
 *
 * Spec: https://www.indexnow.org/documentation
 */

export const INDEXNOW_KEY = '4822cb032e7193153f7184c28d62d130ccc1f2f95c2a0f8c5f705fc1f89f65d8';
export const INDEXNOW_HOST = 'appzoro.com';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const ENDPOINT = 'https://api.indexnow.org/IndexNow';

/**
 * Submit one or more URLs to IndexNow.
 * @param {string|string[]} urlOrUrls absolute URLs on appzoro.com
 * @returns {Promise<{ ok: boolean, status: number, body?: string }>}
 */
export async function pingIndexNow(urlOrUrls) {
    const list = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];
    const urls = list.filter((u) => typeof u === 'string' && u.startsWith(`https://${INDEXNOW_HOST}`));
    if (urls.length === 0) return { ok: false, status: 0, body: 'no valid urls' };

    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls,
    };

    try {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
        });
        const body = await res.text().catch(() => '');
        return { ok: res.ok, status: res.status, body };
    } catch (err) {
        return { ok: false, status: 0, body: String(err?.message || err) };
    }
}
