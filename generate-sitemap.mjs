import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import { globby } from 'globby';
import fetch from 'node-fetch';
import { fetchRedirectSourcePaths, normalizePath } from './lib/sitemapRedirectExclude.js';

// Generate Sitemap - npm run generate-sitemap
const API_BASE = (
  process.env.URL_REDIRECTS_API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://admin.appzoro.com'
).replace(/\/$/, '');

// Function to fetch static pages
async function fetchStaticPages() {
  const pages = await globby([
    'pages/**/*{.js,.jsx,.ts,.tsx}',
    '!components/**/*{.js,.jsx,.ts,.tsx}',
    '!pages/404.js',
    '!pages/500.js',
    '!pages/homePage',
    '!pages/blog/archives',
    '!pages/blog/BlogCardBox.js',
    '!pages/blog/BlogComment.js',
    '!pages/blog/BlogFaq.js',
    '!pages/blog/BlogTags.js',
    '!pages/blog/CategoriesFilter.js',
    '!pages/blog/RecentPosts.js',
    '!pages/blog/SidebarArchives.js',
    '!pages/blog/SidebarCategories.js',
    '!pages/blog/BlogAuthorDetails.js',
    '!pages/case-study/[slug].js',
    '!pages/case-study/FeatureCaseStudy.js',
    '!pages/case-study/PoertfolioImagesSlider.js',
    '!pages/case-study/PortfolioItem.js',
    '!pages/case-study/PortfolioTechStack.js',
    '!pages/case-study/PDFDownload.js',
    '!pages/getting-started/[slug].js',
    '!pages/getting-started/Enterprises.js',
    '!pages/getting-started/NoCodeAgile.js',
    '!pages/getting-started/StartUps.js',
    '!pages/_*.js',
    '!pages/api',
    '!pages/**/[slug].js',
  ]);

  return pages.map(page => {
    const path = page
      .replace('pages', '')
      .replace(/\.(js|jsx|ts|tsx)$/, '')
      .replace(/\/index$/, '');
    return {
      url: path === '/index' ? '/' : path,
      changefreq: 'daily',
      priority: 1,
    };
  });
}

// Function to fetch routes from APIs with error handling
async function fetchAPIRoutes() {
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return [];
    }
  };

  const api1Data = await fetchData(`${API_BASE}/services`);
  const api1Routes = api1Data.map(item => {
    const images = [];
    if (item.serviceBanner) {
      const imageUrl = item.serviceBanner.formats?.large?.url || item.serviceBanner.formats?.medium?.url || item.serviceBanner.url;
      if (imageUrl) {
        images.push({
          url: `${API_BASE}${imageUrl}`,
          title: item.serviceTitle,
          caption: item.ServiceShortDescription,
        });
      }
    }
    return {
      url: `/services/${item.slug}`,
      changefreq: 'daily',
      priority: 0.9,
      img: images,
    };
  });

  const api2Data = await fetchData(`${API_BASE}/our-portfolios`);
  const api2Routes = api2Data.map(item => ({
    url: `/case-study/${item.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }));

  const api3Data = await fetchData(`${API_BASE}/locations-news`);
  const api3Routes = api3Data.map(item => ({
    url: `/locations/${item.slug}`,
    changefreq: 'daily',
    priority: 0.8,
  }));

  const api4Data = await fetchData(`${API_BASE}/posts?_limit=-1&&_sort=published_at:DESC`);
  const api4Routes = api4Data.map(item => ({
    url: `/blog/${item.slug}`,
    changefreq: 'daily',
    priority: 0.8,
  }));

  const api5Data = await fetchData(`${API_BASE}/induustries`);
  const api5Routes = api5Data.map(item => ({
    url: `/industry/${item.slug}`,
    changefreq: 'daily',
    priority: 0.9,
  }));

  const api6Data = await fetchData(`${API_BASE}/technologies`);
  const api6Routes = api6Data.map(item => ({
    url: `/technology/${item.slug}`,
    changefreq: 'daily',
    priority: 0.9,
  }));

  return [...api1Routes, ...api2Routes, ...api3Routes, ...api4Routes, ...api5Routes, ...api6Routes];
}

// Main function to generate sitemap
async function generateSitemap() {
  const [staticPages, apiRoutes, redirectSources] = await Promise.all([
    fetchStaticPages(),
    fetchAPIRoutes(),
    fetchRedirectSourcePaths(API_BASE),
  ]);

  const links = [...staticPages, ...apiRoutes].filter((link) => {
    const path = typeof link.url === 'string' ? normalizePath(link.url) : '/';
    return !redirectSources.has(path);
  });

  const stream = new SitemapStream({ hostname: 'https://appzoro.com' });
  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  // Do not write to public/sitemap.xml — that conflicts with pages/sitemap.xml.js (Next.js).
  await fs.writeFile('./sitemap.generated.xml', xmlString);
  console.log(
    'Sitemap written to ./sitemap.generated.xml (offline reference). Live /sitemap.xml is served by pages/sitemap.xml.js.',
  );
}

generateSitemap().catch(console.error);
