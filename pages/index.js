import HomePage from '../components/home'
import { REACT_APP_API_URL } from '../lib/constants'
import { unwrapApiResponse } from '../lib/unwrapApiResponse'
import { mergeHomepageWithDefaults } from '../lib/mergeHomepageWithDefaults'

export default function Home({ initialBlogs, initialPresses, initialReviews, homepage }) {
  return (
    <>
      <HomePage
        initialBlogs={initialBlogs}
        initialPresses={initialPresses}
        initialReviews={initialReviews}
        homepage={homepage}
      />
    </>
  )
}

async function fetchJson(url) {
  try {
    // Cache busting strategy:
    // - `cache: 'no-store'` tells Next.js fetch not to cache.
    // - `Cache-Control: no-store` header tells any intermediate proxy
    //   to also bypass cache.
    //
    // NOTE: Do NOT append a `?_ts=<timestamp>` query parameter here. The
    // backend (NestJS w/ Strapi-compatible API) treats unknown query
    // parameters as MongoDB filter conditions — `?_ts=12345` filters
    // for records where the `_ts` field equals 12345. Since no record
    // has that field, the response is always `[]`, and the homepage
    // silently falls back to hardcoded defaults for blogs, press,
    // reviews, and the entire homepage shape.
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-store',
      },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    return unwrapApiResponse(json)
  } catch {
    return null
  }
}

export async function getStaticProps() {
  const [blogs, presses, reviews, homepageRaw] = await Promise.all([
    fetchJson(`${REACT_APP_API_URL}posts?_sort=published_at:DESC&_limit=5`),
    fetchJson(`${REACT_APP_API_URL}presses?_sort=PressDate:desc&_limit=10`),
    fetchJson(`${REACT_APP_API_URL}client-reviews?_sort=createdAt:ASC&_limit=50`),
    fetchJson(`${REACT_APP_API_URL}homepage`),
  ])

  const reviewsArray = Array.isArray(reviews) ? reviews : []

  const homepage =
    homepageRaw && typeof homepageRaw === 'object'
      ? mergeHomepageWithDefaults(homepageRaw)
      : mergeHomepageWithDefaults(null)

  return {
    props: {
      initialBlogs: Array.isArray(blogs) ? blogs : [],
      initialPresses: Array.isArray(presses) ? presses : [],
      initialReviews: reviewsArray,
      homepage,
    },
    // Revalidate every 60s (was 300s) — editor changes from CMS admin
    // panel surface on production within 1 minute instead of 5.
    // In dev mode (`npm run dev`), revalidate is ignored and every
    // request re-fetches fresh data automatically.
    revalidate: 60,
  }
}
