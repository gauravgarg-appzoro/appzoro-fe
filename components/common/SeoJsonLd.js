import Head from 'next/head';

/** Render one or more JSON-LD objects in document head. */
export default function SeoJsonLd({ data }) {
  if (!data) return null;
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      />
    </Head>
  );
}
