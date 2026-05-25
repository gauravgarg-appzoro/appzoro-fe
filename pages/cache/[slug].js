import Head from 'next/head';

/** Legacy cache viewer — blocked from search engines. */
const CachePage = () => {
  return (
    <>
      <Head>
        <title>Cache | AppZoro</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <main className="container py-5">
        <h1>Page unavailable</h1>
        <p>This legacy cache route is no longer available. Please use the main site navigation.</p>
      </main>
    </>
  );
};

export async function getServerSideProps({ res }) {
  if (res?.setHeader) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return { props: {} };
}

export default CachePage;
