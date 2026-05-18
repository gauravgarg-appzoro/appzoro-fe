import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Head from 'next/head';
import TalkExpert from '../../../components/common/TalkExpert'
import CategoriesFilter from '../CategoriesFilter'
import BlogCardBox from '../BlogCardBox'
import MainHeader from '../../../components/MainHeader'
import Footer from '../../../components/Footer'
import { useSearchParams } from 'next/navigation'
import MetaData from '../../../components/common/MetaData'
import { REACT_APP_API_URL } from '../../../lib/constants';
import { LuMoveRight } from '../../../components/OptimizedIcons';

const BlogCategory = ({ posts, category }) => {
    const blogListData = posts[0]?.posts;
    const [visibleItems, setVisibleItems] = useState(6);
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 9);
    };
    const searchParams = useSearchParams()

    const catName = searchParams.get('name')
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <MetaData title={catName ? catName : "AppzoroAppZoro Blogs: Insights on App Development and Tech Trends"} description="Stay informed with AppZoro Blogs, featuring articles on app development strategies, design tips, and the latest industry trends." url={`/blog/`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h3>Blog</h3>
                    </div>
                </Container>
            </section>
            <section className='blog-intro'>
                <Container>
                    <h3>We have published over <span>1000+ Blogs</span> on various topics</h3>
                    <CategoriesFilter category={category} />
                </Container>
            </section>
            <section className='blog-listing'>
                <Container>
                    <Row>
                        {
                            blogListData?.slice(0, visibleItems).map((item, index) => (
                                <BlogCardBox data={item} key={index} categoryName={catName} />
                            ))
                        }
                    </Row>
                </Container>
            </section>
            {visibleItems < blogListData?.length && (
                <section className='load-more-blogs'>
                    <Container className='text-center'>

                        <button onClick={handleLoadMore} className="btn-style-arrow me-3 load-more-btn">Load More<span><LuMoveRight /></span></button>

                    </Container>
                </section>
            )}
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps(params) {
    const [postsRes, categoryRes] = await Promise.all([
        fetch(`${REACT_APP_API_URL}categories?slug=${params.query.slug}`),
        fetch(`${REACT_APP_API_URL}categories`)
    ]);
    const [posts, category] = await Promise.all([
        postsRes.json(),
        categoryRes.json()
    ]);
    return { props: { posts, category } };
}

export default BlogCategory