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

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: [
      'react-bootstrap',
      'react-icons',
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
        pathname: '/uploads/**',
      },
      ...(apiHost && apiHost.hostname !== 'admin.appzoro.com'
        ? [{ protocol: apiHost.protocol, hostname: apiHost.hostname, port: apiHost.port, pathname: '/uploads/**' }]
        : []),
    ],
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
  async rewrites() {
    return [
      {
        source: '/search',
        destination: 'https://webcache.googleusercontent.com',
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept" },
        ]
      }
    ]
  },
}

module.exports = nextConfig