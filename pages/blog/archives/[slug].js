import React, { useState } from 'react'
import MainHeader from '../../../components/MainHeader'
import Footer from '../../../components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import TalkExpert from '../../../components/common/TalkExpert'
import BlogCardBox from '../BlogCardBox'
import CategoriesFilter from '../CategoriesFilter'
import MetaData from '../../../components/common/MetaData'
import { REACT_APP_API_URL } from '../../../lib/constants';
import { resolveOgImage } from '../../../lib/seo';
import { setEdgeCache } from '../../../lib/edgeCache';
import { LuMoveRight } from '../../../components/OptimizedIcons';

const BlogArchives = ({ posts, category, archiveSlug, archiveLabel }) => {
    const blogListData = posts;
    const [visibleItems, setVisibleItems] = useState(9);
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 9);
    };
    const archivePosts = posts?.[0]?.posts || [];
    const pageTitle = archiveLabel
        ? `${archiveLabel} Archives | AppZoro Blog`
        : 'Blog Archives | AppZoro';

    return (
        <>
            <MetaData
                title={pageTitle}
                description={`Browse AppZoro blog posts from ${archiveLabel || 'our archives'} on app development, design, and technology trends.`}
                url={`/blog/archives/${archiveSlug || ''}`}
                image={resolveOgImage('/assets/images/az-logo-large.png')}
                robots="noindex, follow"
            />
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Blog{archiveLabel ? `: ${archiveLabel}` : ''}</h1>
                    </div>
                </Container>
            </section>
            <section className='blog-intro'>
                <Container>
                    <h2>We have published over <span>1000+ Blogs</span> on various topics</h2>
                    <CategoriesFilter category={category} />
                </Container>
            </section>
            <section className='blog-listing'>
                <Container>
                    <Row>
                        {
                            archivePosts?.slice(0, visibleItems).map((item, index) => (
                                <BlogCardBox key={index} data={item} categoryName="" />
                            ))
                        }
                    </Row>
                </Container>
            </section>
            {visibleItems < archivePosts?.length && (
                <section className='load-more-blogs'>
                    <Container className='text-center'>
                        <button type="button" onClick={handleLoadMore} className="btn-style-arrow me-3 load-more-btn">Load More<span><LuMoveRight /></span></button>
                    </Container>
                </section>
            )}
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps({ query, res }) {
    setEdgeCache(res, 'short');
    const slug = query?.slug;
    const [postsRes, categoryRes] = await Promise.all([
        fetch(`${REACT_APP_API_URL}archives?slug=${slug}`),
        fetch(`${REACT_APP_API_URL}categories`)
    ]);
    const [postdata, category] = await Promise.all([
        postsRes.json(),
        categoryRes.json()
    ]);
    const posts = Array.isArray(postdata)
        ? postdata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
    const archiveLabel = posts?.[0]?.name || posts?.[0]?.title || slug?.replace(/-/g, ' ') || '';

    return {
        props: {
            posts,
            category,
            archiveSlug: slug || '',
            archiveLabel,
        },
    };
}

export default BlogArchives
