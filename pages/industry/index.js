import React, { useState, useEffect } from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { setEdgeCache } from '../../lib/edgeCache';
import { Col, Container, Row } from 'react-bootstrap'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const CaseStudy = dynamic(() => import('../../components/common/CaseStudy'));
const TechStack = dynamic(() => import('../../components/common/TechStack'));
const ClientReview = dynamic(() => import('../../components/common/ClientReview'));
const ArticlesView = dynamic(() => import('../../components/common/ArticlesView'));
const TalkExpert = dynamic(() => import('../../components/common/TalkExpert'));
import MetaData from '../../components/common/MetaData'
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { LuMoveRight } from '../../components/OptimizedIcons';

const Industries = ({ posts }) => {
    return (
        <>
            <MetaData title="Industry Specific App Development Solutions | AppZoro" description="Explore AppZoro's app development services for various industries, from healthcare to finance, how our specialized solutions can elevate your business." url={`/industry/`} image={DEFAULT_OG_IMAGE} />
            <MainHeader />
            <section className='page-title industry-bg' style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                    src="/assets/images/banner/getting-started-banner.png"
                    alt="Industries We Serve"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover', zIndex: -1 }}
                />
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <div className='page-section-title'>
                        <h1>Industries We Serve</h1>
                    </div>
                </Container>
            </section>
            <section className='industry-main'>
                <Container>
                    <h5 className='text-red'>Enhancing Our Global Clients by following Industry Best Practices</h5>

                    <p>Appzoro serves a wide range of industries, from retail & ecommerce, travel, and healthcare to media and entertainment to logistics and transport, education and other businesses to grow digitally with our software development services. We deliver innovative solutions to help various industries in exploring the path of evolution and growth. </p>

                    <p>In today’s ever-changing business environment, the majority of organizations are ready to embrace digital transformation and value-added solutions. As one of the recognised digital transformation partners for global clients, we deliver complex business challenges and deliver mission-critical solutions to various clients. </p>

                    <p>Our highly professional teams have a deep industry knowledge and expertise that helps them in offering professionally qualified and business-centric solutions in a wide range of sectors. We are highly inspired by creativity and entrepreneurial spirit, offering custom solutions to a wide range of  industries and across all types, sizes and industries, from small businesses to multinational companies.</p>

                    <p>Our professionals are well-versed in using the latest and advanced tools and technologies. Moreover, we have the capabilities to grab the rich features of updated IT software technologie in the context of various domains. All these factors make us provide more efficient and feasible solutions that are difficult to come by in real life. </p>
                </Container>
            </section>
            <section className='ind-cat'>
                {Array.isArray(posts) && posts.map((post, index) => (
                    <div className='ind-cat-view' key={index}>
                        <Container>
                            <Row className='ind-cat-ui'>
                                <Col md="5" xs="12">
                                    <div className='industry-cat-img'>
                                        {post?.IndImage ?
                                            <Image src={`${STRAPI_IMAGE_BASE_URL}${post.IndImage.url}`} width={470} height={408} alt={post.Title || "Industry"} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                                            :
                                            <Image src="/assets/images/nca1.png" width={470} height={408} alt={post.Title || "Industry"} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                                        }
                                    </div>
                                </Col>
                                <Col md="7" xs="12">
                                    <div className='industry-content'>
                                        <h3>{post?.Title}</h3>
                                        {post?.IndustyShortDescription &&
                                            <p>{post?.IndustyShortDescription}</p>
                                        }
                                        <Link href={`/industry/${post?.slug}`} className="btn-style-arrow me-3">Explore <span><LuMoveRight /></span></Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ))}
            </section>
            <CaseStudy />
            <TechStack />
            <ClientReview />
            <ArticlesView />
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    setEdgeCache(context.res, 'short');
    try {
        const res = await fetch(`${REACT_APP_API_URL}induustries`);
        const posts = await res.json();
        return {
            props: {
                posts: Array.isArray(posts) ? posts : [],
            },
        };
    } catch (err) {
        return { props: { posts: [] } };
    }
}

export default Industries