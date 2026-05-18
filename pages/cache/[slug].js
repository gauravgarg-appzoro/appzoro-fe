// pages/cache/[slug].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CachePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [cachedContent, setCachedContent] = useState('');

  useEffect(() => {
    const fetchCachedContent = async () => {
      try {
        const response = await fetch(`https://webcache.googleusercontent.com/search?q=cache:${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cached content');
        }
        const data = await response.text();
        setCachedContent(data);
      } catch (error) {
        console.error('Error fetching cached content:', error);
      }
    };

    if (slug) {
      fetchCachedContent();
    }
  }, [slug]);

  return (
    <div>
      <h1>Cached Page</h1>
      <div dangerouslySetInnerHTML={{ __html: cachedContent }} />
    </div>
  );
};

export default CachePage;
