import React, { useState } from 'react'
import MainHeader from '../../../components/MainHeader'
import Footer from '../../../components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import TalkExpert from '../../../components/common/TalkExpert'
import BlogCardBox from '../BlogCardBox'

import CategoriesFilter from '../CategoriesFilter'
import { REACT_APP_API_URL } from '../../../lib/constants';
import { LuMoveRight } from '../../../components/OptimizedIcons';

const BlogArchives = ({ posts, category }) => {
    const blogListData = posts;
    const [visibleItems, setVisibleItems] = useState(9);
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 9);
    };
    const archivePosts = posts[0].posts;
    return (
        <>
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
                            archivePosts?.slice(0, visibleItems).map((item, index) => (
                                <BlogCardBox key={index} data={item} categoryName="" />
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
        fetch(`${REACT_APP_API_URL}archives?slug=${params.query.slug}`),
        fetch(`${REACT_APP_API_URL}categories`)
    ]);
    const [postdata, category] = await Promise.all([
        postsRes.json(),
        categoryRes.json()
    ]);
    const posts = postdata?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return { props: { posts, category } };
}

export default BlogArchives