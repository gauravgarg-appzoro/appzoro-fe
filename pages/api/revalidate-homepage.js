/**
 * On-demand ISR revalidation for the homepage.
 *
 * Called from admin's `handleSave()` after a successful homepage update so
 * the public `/` page picks up fresh CMS data immediately instead of waiting
 * for the 60s ISR window.
 *
 * Auth: requires a logged-in admin (JWT in the `Authorization: Bearer`
 * header). We verify by hitting the backend `/users/me` endpoint — if
 * backend accepts the token, we trust the caller.
 */
import { REACT_APP_API_URL } from '../../lib/constants'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const auth = req.headers.authorization || ''
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing bearer token' })
  }

  try {
    const verify = await fetch(`${REACT_APP_API_URL}users/me`, {
      headers: { Authorization: auth },
      cache: 'no-store',
    })
    if (!verify.ok) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  } catch (err) {
    return res.status(502).json({ message: 'Backend verify failed', error: String(err) })
  }

  try {
    await res.revalidate('/')
    return res.status(200).json({ revalidated: true, path: '/' })
  } catch (err) {
    return res.status(500).json({ message: 'Revalidate failed', error: String(err) })
  }
}
