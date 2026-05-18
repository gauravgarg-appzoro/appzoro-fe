import React, { useEffect, useState } from 'react'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import TalkExpert from '../../components/common/TalkExpert';
import dynamic from 'next/dynamic';
import MetaData from '../../components/common/MetaData';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
const ReactMarkdown = dynamic(import('react-markdown'));

const Technology = ({ posts: initialPosts }) => {
    const [posts, setPosts] = useState(initialPosts || []);

    useEffect(() => {
        setPosts(initialPosts || []);
    }, [initialPosts]);

    const techData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
    return (
        <>
            <MetaData title={techData?.seo_title} description={techData?.seo_description} url={`/technology/${techData?.slug}`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
            <MainHeader />
            {techData ?
                <>
                    <section className='page-title service-bg' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}${techData.techBanner.url})` }}>
                        <Container>
                            <div className='page-section-title'>
                                <h1>{techData.techTitle}</h1>
                                {techData.techShortDescription &&
                                    <p>{techData.techShortDescription}</p>
                                }
                            </div>
                        </Container>
                    </section>

                    <section className='why-az-service pt-4'>
                        <Container>
                            <Row className='align-items-center'>
                                <Col md="12" xs="12">
                                    <ReactMarkdown>{techData?.techOverview}</ReactMarkdown>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
                :
                <section className='no-data py-4'>
                    <Container>
                        <div className='section-title-dark text-center'>
                            <p>The technology record you are looking for could not be found.
                                Double-check the URL or return to our technology index to browse our expertise.</p>
                        </div>
                    </Container>
                </section>
            }
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps(params) {
    const res = await fetch(`${REACT_APP_API_URL}technologies?slug=${params.query.slug}`);
    const posts = await res.json();
    return {
        props: {
            posts,
        },
    };
}

export default Technology