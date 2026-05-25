import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  absoluteUrl,
  canonicalHref,
  resolveOgImage,
  resolveSeoDescription,
  resolveSeoTitle,
  TWITTER_SITE,
} from '../../lib/seo';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.url] — path e.g. `/blog/my-post`
 * @param {string} [props.image] — absolute or site-relative image URL
 * @param {string} [props.robots] — e.g. `index, follow` or `noindex, nofollow`
 * @param {string} [props.canonicalPath] — override canonical path (optional)
 * @param {string} [props.ogType] — Open Graph type, e.g. `website` or `article`
 */
const MetaData = (props) => {
  const router = useRouter();
  const pathname = (router?.asPath || '/').split('?')[0] || '/';
  const pageQuery = router?.query?.page;

  const title = resolveSeoTitle(props?.title);
  const description = resolveSeoDescription(props?.description);
  const pathForMeta = props?.url || pathname;
  const pageUrl = absoluteUrl(pathForMeta);
  const imageUrl = resolveOgImage(props?.image);
  const canonical = props?.canonicalPath
    ? absoluteUrl(props.canonicalPath)
    : canonicalHref(pathname, pageQuery);
  const robots =
    props?.robots && String(props.robots).trim()
      ? String(props.robots).trim()
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#DB241B" key="theme-color" />
      <link rel="manifest" href="/manifest.json" key="manifest" />
      <title key="title">{title}</title>
      <meta name="title" content={title} key="meta-title" />
      <meta name="description" content={description} key="meta-description" />
      <meta name="robots" content={robots} key="meta-robots" />
      <link rel="canonical" href={canonical} key="canonical" />

      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-description" />
      <meta property="og:type" content={props?.ogType || 'website'} key="og-type" />
      <meta property="og:url" content={pageUrl} key="og-url" />
      <meta property="og:image" content={imageUrl} key="og-image" />
      <meta property="og:site_name" content="AppZoro Technologies" key="og-site-name" />
      <meta property="og:locale" content="en_US" key="og-locale" />

      <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
      <meta name="twitter:site" content={TWITTER_SITE} key="twitter-site" />
      <meta name="twitter:title" content={title} key="twitter-title" />
      <meta name="twitter:description" content={description} key="twitter-description" />
      <meta name="twitter:image" content={imageUrl} key="twitter-image" />
      <meta name="twitter:url" content={pageUrl} key="twitter-url" />
    </Head>
  );
};

export default MetaData;
