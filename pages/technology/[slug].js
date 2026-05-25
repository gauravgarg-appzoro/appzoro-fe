import React, { useEffect, useState } from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import TalkExpert from '../../components/common/TalkExpert';
import MetaData from '../../components/common/MetaData';
import SeoJsonLd from '../../components/common/SeoJsonLd';
import MarkdownContent from '../../components/common/MarkdownContent';
import { REACT_APP_API_URL } from '../../lib/constants';
import { resolveTechBannerUrl } from '../../lib/resolveTechBanner';
import { setEdgeCache } from '../../lib/edgeCache';
import { buildBreadcrumbSchema, buildWebPageSchema } from '../../lib/schemaBuilders';

const Technology = ({ posts: initialPosts }) => {
    const [posts, setPosts] = useState(initialPosts || []);

    useEffect(() => {
        setPosts(initialPosts || []);
    }, [initialPosts]);

    const techData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
    const bannerUrl = resolveTechBannerUrl(techData);
    const pageUrl = techData?.slug ? `/technology/${techData.slug}` : '/technology';
    const pageTitle = techData?.seo_title || techData?.techTitle || 'Technology | AppZoro';
    const pageDesc = techData?.seo_description || techData?.techShortDescription || 'Technologies powering AppZoro software development.';
    return (
        <>
            <MetaData
                title={pageTitle}
                description={pageDesc}
                url={pageUrl}
                image={bannerUrl || DEFAULT_OG_IMAGE}
            />
            {techData && (
              <SeoJsonLd
                data={[
                  buildBreadcrumbSchema([
                    { name: 'Home', url: '/' },
                    { name: 'Technology', url: '/technology' },
                    { name: techData.techTitle || 'Technology', url: pageUrl },
                  ]),
                  buildWebPageSchema({
                    name: pageTitle,
                    description: pageDesc,
                    url: pageUrl,
                    image: bannerUrl || DEFAULT_OG_IMAGE,
                  }),
                ]}
              />
            )}
            <MainHeader />
            {techData ?
                <>
                    <section className='page-title service-bg' style={bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : undefined}>
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
                                    <MarkdownContent content={techData?.techOverview} />
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
    setEdgeCache(params.res, 'long');
    const res = await fetch(`${REACT_APP_API_URL}technologies?slug=${params.query.slug}`);
    const posts = await res.json();
    return {
        props: {
            posts,
        },
    };
}

export default Technology