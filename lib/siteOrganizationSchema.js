import { SITE_URL } from './seo';

/** Site-wide Organization + WebSite JSON-LD for Google & AI crawlers. */
export function buildSiteOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AppZoro Technologies Inc.',
        alternateName: 'AppZoro',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/images/az-logo-large.png`,
        email: 'info@appzoro.com',
        telephone: '+1-678-462-4034',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Atlanta',
          addressRegion: 'GA',
          addressCountry: 'US',
        },
        sameAs: [
          'https://www.linkedin.com/company/appzoro-technologies',
          'https://clutch.co/profile/appzoro-technologies',
        ],
        description:
          'AppZoro is a software and mobile app development company in Atlanta, GA, building custom web and mobile applications for startups and enterprises.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AppZoro Technologies',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}
