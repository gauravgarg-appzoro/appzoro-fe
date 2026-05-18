import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import TalkExpert from "../../components/common/TalkExpert";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Accordion from "react-bootstrap/Accordion";
import Head from "next/head";
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";
const ReactMarkdown = dynamic(import("react-markdown"));

const Locations = ({ posts: initialPosts, services: initialServices }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [services, setServices] = useState(initialServices || []);

  useEffect(() => {
    setPosts(initialPosts || []);
    setServices(initialServices || []);
  }, [initialPosts, initialServices]);

  const locationData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const [checkData, setCheckData] = useState(null);
  useEffect(() => {
    setCheckData(["test", "test1", "test2"]);
  }, []);
  const pathname = usePathname();

  // Fallback client-side fetch for the current location if props are missing
  useEffect(() => {
    if ((!posts || posts.length === 0) && pathname) {
      const slug = pathname.split('/').pop();
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
  }, [posts, pathname]);

  return (
    <>
      <MetaData
        title={locationData?.seo_title}
        description={locationData?.seo_description}
        url={`/locations/${locationData?.slug}`}
        image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
      <Head>
        {locationData?.location_schema && (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            dangerouslySetInnerHTML={{
              __html: sanitizeJsonLdString(String(locationData?.location_schema || '')),
            }}
          ></script>
        )}
      </Head>
      <MainHeader />

      {locationData ? (
        <>
          {/* New UI */}
          <section className="location-section1">
            <Container>
              <div className="as1-data">
                <h1>{locationData?.location_title}</h1>
                {checkData?.length > 0 ? (
                  <ReactMarkdown>
                    {locationData?.section1_content}
                  </ReactMarkdown>
                ) : (
                  <p>{locationData?.section1_content}</p>
                )}
                {/* <div className='as1-action'>
                                    <ContactHref href="/contact-us" className="btn-style-arrow me-3">Talk to an Expert <span><LuMoveRight /></span></ContactHref>
                                </div> */}
                {locationData?.section1_img?.url && (
                  <Image
                    src={`${STRAPI_IMAGE_BASE_URL}${locationData?.section1_img?.url}`}
                    alt="Appzoro"
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
                {checkData?.length > 0 ? (
                  <ReactMarkdown>
                    {locationData?.section2_content}
                  </ReactMarkdown>
                ) : (
                  <p>{locationData?.section2_content}</p>
                )}
              </div>
            </Container>
          </section>
          {pathname !== "/locations/atlanta-web-development" &&
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
                          {checkData?.length > 0 ? (
                            <ReactMarkdown>{item?.lcs_content}</ReactMarkdown>
                          ) : (
                            <p>{item?.lcs_content}</p>
                          )}
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
                      {checkData?.length > 0 ? (
                        <ReactMarkdown>{item?.feature_content}</ReactMarkdown>
                      ) : (
                        <p>{item?.feature_content}</p>
                      )}
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
                          <ReactMarkdown>{item.faq_content}</ReactMarkdown>
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
