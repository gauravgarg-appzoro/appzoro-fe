/**
 * IndexNow trigger endpoint.
 * POST /api/indexnow with { urls: ["https://appzoro.com/some-path", ...] }
 * or { url: "https://appzoro.com/some-path" }.
 *
 * Requires header `x-indexnow-token` matching env `INDEXNOW_TRIGGER_TOKEN`.
 * Call from CMS publish hooks or deploy scripts.
 */

import { pingIndexNow } from '../../lib/indexNow';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = process.env.INDEXNOW_TRIGGER_TOKEN;
    if (token && req.headers['x-indexnow-token'] !== token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = req.body || {};
    const urls = Array.isArray(body.urls)
        ? body.urls
        : body.url
            ? [body.url]
            : [];

    if (urls.length === 0) {
        return res.status(400).json({ error: 'Provide `url` or `urls`.' });
    }

    const result = await pingIndexNow(urls);
    return res.status(result.ok ? 200 : 502).json(result);
}
