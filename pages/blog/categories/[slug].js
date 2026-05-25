import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TalkExpert from '../../../components/common/TalkExpert'
import CategoriesFilter from '../CategoriesFilter'
import BlogCardBox from '../BlogCardBox'
import MainHeader from '../../../components/MainHeader'
import Footer from '../../../components/Footer'
import MetaData from '../../../components/common/MetaData'
import { REACT_APP_API_URL } from '../../../lib/constants';
import { resolveOgImage } from '../../../lib/seo';
import { setEdgeCache } from '../../../lib/edgeCache';
import { LuMoveRight } from '../../../components/OptimizedIcons';

const BlogCategory = ({ posts, category, categorySlug, categoryName }) => {
    const blogListData = posts?.[0]?.posts;
    const [visibleItems, setVisibleItems] = useState(6);
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 9);
    };
    const displayName = categoryName || 'App Development';
    const pageTitle = `${displayName} | AppZoro Blog`;

    return (
        <>
            <MetaData
                title={pageTitle}
                description={`Read AppZoro blog posts about ${displayName}. Insights on app development, design tips, and industry trends.`}
                url={`/blog/categories/${categorySlug || ''}`}
                image={resolveOgImage('/assets/images/az-logo-large.png')}
                robots="noindex, follow"
            />
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Blog: {displayName}</h1>
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
                            blogListData?.slice(0, visibleItems).map((item, index) => (
                                <BlogCardBox data={item} key={index} categoryName={displayName} />
                            ))
                        }
                    </Row>
                </Container>
            </section>
            {visibleItems < blogListData?.length && (
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
        fetch(`${REACT_APP_API_URL}categories?slug=${slug}`),
        fetch(`${REACT_APP_API_URL}categories`)
    ]);
    const [posts, category] = await Promise.all([
        postsRes.json(),
        categoryRes.json()
    ]);

    const matched = Array.isArray(category)
        ? category.find((c) => c.slug === slug)
        : null;
    const categoryName = matched?.name || posts?.[0]?.name || slug?.replace(/-/g, ' ') || '';

    return {
        props: {
            posts,
            category,
            categorySlug: slug || '',
            categoryName,
        },
    };
}

export default BlogCategory
