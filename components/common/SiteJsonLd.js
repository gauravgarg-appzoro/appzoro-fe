import Head from 'next/head';
import { buildSiteOrganizationSchema } from '../../lib/siteOrganizationSchema';

/** Global Organization + WebSite structured data on every public page. */
export default function SiteJsonLd() {
  const schema = buildSiteOrganizationSchema();
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
