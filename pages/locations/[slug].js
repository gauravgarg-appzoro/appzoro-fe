import React, { useState, useEffect } from "react";
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import TalkExpert from "../../components/common/TalkExpert";
import MetaData from "../../components/common/MetaData";
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";
import Head from "next/head";
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";
import { setEdgeCache } from "../../lib/edgeCache";
import MarkdownContent from "../../components/common/MarkdownContent";
import SeoJsonLd from "../../components/common/SeoJsonLd";
import { buildBreadcrumbSchema, buildServiceSchema, buildWebPageSchema } from "../../lib/schemaBuilders";

const Locations = ({ posts: initialPosts, services: initialServices }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [services, setServices] = useState(initialServices || []);

  useEffect(() => {
    setPosts(initialPosts || []);
    setServices(initialServices || []);
  }, [initialPosts, initialServices]);

  const locationData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const router = useRouter();
  const pageUrl = locationData?.slug ? `/locations/${locationData.slug}` : '/locations';
  const pageTitle = locationData?.seo_title || locationData?.location_title || 'App Development Location | AppZoro';
  const pageDesc = locationData?.seo_description || locationData?.section1_content?.slice?.(0, 160) || 'App development services from AppZoro.';
  const cleanedLocationSchema = sanitizeJsonLdString(String(locationData?.location_schema || ''), { stripFaqPage: true });

  // Fallback client-side fetch for the current location if props are missing
  useEffect(() => {
    if ((!posts || posts.length === 0) && router.isReady && router.query.slug) {
      const slug = String(router.query.slug);
      if (slug && slug !== 'locations') {
        console.log("Triggering client-side fallback fetch for location slug:", slug);
        Promise.all([
          fetch(`${REACT_APP_API_URL}locations-news?slug=${slug}`),
          fetch(`${REACT_APP_API_URL}location-common-services`),
        ])
          .then(([pRes, sRes]) => Promise.all([pRes.json(), sRes.json()]))
          .then(([pData, sData]) => {
            if (Array.isArray(pData) && pData.length > 0) setPosts(pData);
            if (Array.isArray(sData)) setServices(sData);
          })
          .catch(err => console.error("Location fallback fetch failed", err));
      }
    }
  }, [posts, router.isReady, router.query.slug]);

  return (
    <>
      <MetaData
        title={locationData?.seo_title || locationData?.location_title || 'App Development Location | AppZoro'}
        description={locationData?.seo_description || locationData?.section1_content?.slice?.(0, 160) || 'App development services from AppZoro.'}
        url={`/locations/${locationData?.slug || ''}`}
        image={DEFAULT_OG_IMAGE}
        robots={locationData?.robots_meta}
      />
      <Head>
        {cleanedLocationSchema ? (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            dangerouslySetInnerHTML={{ __html: cleanedLocationSchema }}
          />
        ) : null}
      </Head>
      {!cleanedLocationSchema && locationData && (
        <SeoJsonLd
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Locations', url: '/locations' },
              { name: locationData.location_title || 'Location', url: pageUrl },
            ]),
            buildServiceSchema({
              name: locationData.location_title || pageTitle,
              description: pageDesc,
              url: pageUrl,
            }),
            buildWebPageSchema({
              name: pageTitle,
              description: pageDesc,
              url: pageUrl,
            }),
          ]}
        />
      )}
      <MainHeader />

      {locationData ? (
        <>
          {/* New UI */}
          <section className="location-section1">
            <Container>
              <div className="as1-data">
                <h1>{locationData?.location_title}</h1>
                <MarkdownContent content={locationData?.section1_content} />
                {/* <div className='as1-action'>
                                    <ContactHref href="/contact-us" className="btn-style-arrow me-3">Talk to an Expert <span><LuMoveRight /></span></ContactHref>
                                </div> */}
                {locationData?.section1_img?.url && (
                  <Image
                    src={`${STRAPI_IMAGE_BASE_URL}${locationData?.section1_img?.url}`}
                    alt={locationData?.location_title || 'AppZoro location'}
                    width="486"
                    height="204"

                  />
                )}
              </div>
            </Container>
          </section>
          <section className="location-section2">
            <Container>
              <div className="as2-content">
                <h2>{locationData?.section2_title}</h2>
                <MarkdownContent content={locationData?.section2_content} />
              </div>
            </Container>
          </section>
          {router.asPath !== "/locations/atlanta-web-development" &&
            <section className="location-features">
              <Container>
                <h3>Mobile app development offering</h3>
                <div className="lf-block">
                  {Array.isArray(services) && services.map((item, index) => (
                    <div className="lf-view" key={index}>
                      <div className="lf-content">
                        <div className="lf-icon">
                          {item?.lcs_icon?.url && (
                            <Image
                              src={`${STRAPI_IMAGE_BASE_URL}${item?.lcs_icon?.url}`}
                              width="50"
                              height="50"
                              alt="appzoro"

                            />
                          )}
                        </div>
                        <div className="lf-data">
                          <h4>{item?.lcs_title}</h4>
                          <MarkdownContent content={item?.lcs_content} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          }
          <section className="location-services">
            <Container>
              {Array.isArray(locationData?.locations_features) && locationData.locations_features.map((item, index) => (
                <Row className="pb-5" key={index}>
                  <Col xs="12" md="6">
                    <div className="ls-content">
                      <h3>{item?.feature_title}</h3>
                      <MarkdownContent content={item?.feature_content} />
                    </div>
                  </Col>
                  <Col xs="12" md="6">
                    <div className="ls-img">
                      {item?.feature_image?.url && (
                        <Image
                          src={`${STRAPI_IMAGE_BASE_URL}${item?.feature_image?.url}`}
                          alt="appzoro"
                          width="500"
                          height="500"

                        />
                      )}
                    </div>
                  </Col>
                </Row>
              ))}
            </Container>
          </section>
          {Array.isArray(locationData?.location_faq) && locationData.location_faq.length > 0 && (
            <section className="locations-faq mb-5">
              <Container>
                <div className="blog-faq mt-4">
                  <h3 className="blog-block-title text-center">
                    Frequently Asked Questions
                  </h3>
                  <Accordion>
                    {locationData.location_faq.map((item, index) => (
                      <Accordion.Item eventKey={item?._id || index} key={item?._id || index}>
                        <Accordion.Header>{item.faq_title}</Accordion.Header>
                        <Accordion.Body>
                          <MarkdownContent content={item.faq_content} />
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </Container>
            </section>
          )}
          {/* New UI */}
        </>
      ) : (
        <section className="no-data py-4">
          <Container>
            <div className="section-title-dark text-center">
              <p>
                The location record you are looking for could not be found.
                Double-check the URL or return to the locations page to browse our services.
              </p>
            </div>
          </Container>
        </section>
      )}

      <TalkExpert />
      <Footer />
    </>
  );
};

// export async function getServerSideProps(params) {
//     const res = await fetch(`${REACT_APP_API_URL}locations?slug=${params.query.slug}`);
//     const posts = await res.json();
//     return {
//         props: {
//             posts,
//         },
//     };
// }

export async function getServerSideProps(params) {
  setEdgeCache(params.res, 'long');
  try {
    const [postsRes, serviceRes] = await Promise.all([
      fetch(`${REACT_APP_API_URL}locations-news?slug=${params.query.slug}`),
      fetch(`${REACT_APP_API_URL}location-common-services`),
    ]);
    const [posts, services] = await Promise.all([
      postsRes.json(),
      serviceRes.json(),
    ]);
    return { props: { posts: Array.isArray(posts) ? posts : [], services: Array.isArray(services) ? services : [] } };
  } catch (err) {
    console.error("Error in getServerSideProps for locations:", err);
    return { props: { posts: [], services: [] } };
  }
}

export default Locations;
