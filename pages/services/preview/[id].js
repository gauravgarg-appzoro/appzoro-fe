import React from 'react';
import Head from 'next/head';
import ServiceDetails from '../[slug]';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');

const ServicePreviewPage = ({ posts }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      </Head>
      <ServiceDetails posts={posts || []} />
    </>
  );
};

export async function getServerSideProps({ params, res }) {
  try {
    // Prevent indexing even if crawlers hit this URL directly.
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    }
    const apiRes = await fetch(`${API_BASE}/services/${params.id}`);
    if (!apiRes.ok) return { notFound: true };
    const raw = await apiRes.json();
    const service = raw?.data !== undefined ? raw.data : raw;
    if (!service || !(service.id || service._id)) return { notFound: true };
    return {
      props: {
        posts: [service],
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default ServicePreviewPage;
