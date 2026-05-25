/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const apiHost = apiUrl ? (() => {
  try {
    const u = new URL(apiUrl);
    return { protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port || '' };
  } catch {
    return null;
  }
})() : null;

// Where to proxy bare /uploads/* requests that miss the local public/uploads cache.
// Defaults to the Strapi admin host (where all Strapi-managed media actually lives).
const UPLOADS_FALLBACK_HOST = (apiUrl || 'https://admin.appzoro.com').replace(/\/+$/, '');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    // Tells Next.js to lazily resolve named imports from these packages,
    // tree-shaking everything that isn't actually used. Material impact on
    // the public bundle size for libraries with many named exports.
    optimizePackageImports: [
      'react-bootstrap',
      'react-icons',
      'react-share',
      'react-toastify',
      'react-markdown',
      'swiper',
      'lodash',
      'date-fns',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 512, 576, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.appzoro.com',
        port: '',
        pathname: '/**',
      },
      ...(apiHost && apiHost.hostname !== 'admin.appzoro.com'
        ? [{ protocol: apiHost.protocol, hostname: apiHost.hostname, port: apiHost.port, pathname: '/**' }]
        : []),
    ],
  },
  // Rewrites are tried AFTER static files and file-system routing.
  // `fallback` rewrites only fire when no local file matched — so existing
  // public/uploads/hero-cache/* and public/uploads/product-cache/* keep serving
  // locally, while every legacy /uploads/<anything-else> request (the 800+
  // 404s Google had indexed from the old WordPress era) is transparently
  // proxied to the Strapi backend where the asset actually lives. Result:
  // 404s become 200 OKs, image SEO stays on the appzoro.com canonical URL.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: '/uploads/:path*',
          destination: `${UPLOADS_FALLBACK_HOST}/uploads/:path*`,
        },
        // Legacy WordPress media URLs. Some old indexed URLs in Google's
        // cache still point at /wp-content/uploads/<file> from the pre-Strapi
        // era. The asset itself moved to /uploads/<file> under Strapi, so
        // rewrite the legacy prefix to the modern path and proxy upstream.
        // `rewriteLegacyWpMedia.js` handles the same pattern inside CMS HTML
        // content; this rule handles direct URL hits (Googlebot, social
        // shares, old bookmarks).
        {
          source: '/wp-content/uploads/:path*',
          destination: `${UPLOADS_FALLBACK_HOST}/uploads/:path*`,
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: '/mobile-and-software-development-services',
        destination: '/services/mobile-app-development-company-usa',
        permanent: true,
      },
      {
        source: '/blog/hire-android-app-developers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/process',
        destination: '/getting-started',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/case-study',
        permanent: true,
      },
      {
        source: '/free-initial-consultation',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps',
        destination: '/blog/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps',
        permanent: true,
      },
      {
        source: '/ui-ux-design',
        destination: '/services/ui-ux-design-services',
        permanent: true,
      },
      {
        source: '/enterprise-solutions',
        destination: '/services/web-app-development',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/homePage',
        destination: '/',
        permanent: true,
      },
      {
        source: '/homePage/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/the-app-store-optimization-process',
        destination: '/blog/the-app-store-optimization-process',
        permanent: true,
      },
      {
        source: '/our-work',
        destination: '/case-study',
        permanent: true,
      },
      {
        source: '/iphone-app-development-atlanta',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/how-iot-is-helpful-to-success-in-e-scooter-app-development',
        destination: '/blog/how-iot-is-helpful-to-success-in-e-scooter-app-development',
        permanent: true,
      },
      {
        source: '/equestquote',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/services/mobile-app-development',
        destination: '/services/mobile-app-development-company-usa',
        permanent: true,
      },
      {
        source: '/services/ai-and-ml-development',
        destination: '/services/ai-and-ml-development-company-usa',
        permanent: true,
      },
      {
        source: '/services/cross-platform-app-development',
        destination: '/services/cross-platform-app-development-company-usa',
        permanent: true,
      },
      {
        source: '/services/custom-software-development',
        destination: '/services/custom-software-development-company-usa',
        permanent: true,
      },
      {
        source: '/case-study/truck-your-way',
        destination: '/case-study/construction-app-development-services',
        permanent: true,
      },
      {
        source: '/case-study/jax-rideshare',
        destination: '/case-study/car-rental-fleet-management-software',
        permanent: true,
      },
      {
        source: '/case-study/judicial-innovations',
        destination: '/case-study/online-dispute-resolution-platform',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept" },
        ]
      }
    ]
  },
}

module.exports = nextConfig