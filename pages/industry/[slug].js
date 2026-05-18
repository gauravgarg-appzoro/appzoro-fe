import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import ContactHref from "../../components/common/ContactHref";
import Image from "next/image";
const CaseStudy = dynamic(() => import('../../components/common/CaseStudy'));
const TechStack = dynamic(() => import('../../components/common/TechStack'));
const ClientReview = dynamic(() => import('../../components/common/ClientReview'));
const ArticlesView = dynamic(() => import('../../components/common/ArticlesView'));
const TalkExpert = dynamic(() => import('../../components/common/TalkExpert'));
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import { STRAPI_IMAGE_BASE_URL, REACT_APP_API_URL } from "../../lib/constants";
import { LuMoveRight, LiaIndustrySolid } from '../../components/OptimizedIcons';
const ReactMarkdown = dynamic(import("react-markdown"));
const BlockRenderer = dynamic(() => import('../../components/page-builder/BlockRenderer'));


const IndustryDetails = ({ posts: initialPosts }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    setPosts(initialPosts || []);
  }, [initialPosts]);

  const postData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const hasPageBlocks = postData?.pageBlocks && Array.isArray(postData.pageBlocks) && postData.pageBlocks.length > 0;

  const [checkData, setCheckData] = useState(null);
  useEffect(() => {
    setCheckData(["test", "test1", "test2"]);
  }, []);

  // New API call for Other Industries
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    // Fetch other industries
    fetch(`${REACT_APP_API_URL.replace(/\/$/, '')}/induustries`)
      .then(res => res.json())
      .then((result) => setCatData(Array.isArray(result) ? result.filter((item) => item.slug !== router.query.slug) : []))
      .catch((error) => console.error('Error fetching data:', error));
  }, [router.query.slug]);

  // Fallback client-side fetch for the current industry if props are missing
  useEffect(() => {
    if ((!posts || posts.length === 0) && router.query.slug) {
      console.log("Triggering client-side fallback fetch for slug:", router.query.slug);
      const apiBase = REACT_APP_API_URL.replace(/\/$/, '');
      fetch(`${apiBase}/induustries?slug=${router.query.slug}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          }
        })
        .catch(err => console.error("Fallback fetch failed", err));
    }
  }, [posts, router.query.slug]);

  return (
    <>
      <MetaData
        title={postData?.seoTitle}
        description={postData?.seoDescription}
        url={`/industry/${postData?.slug}`}
        image={`${STRAPI_IMAGE_BASE_URL}${postData?.banner_image?.url || ''}`}
      />
      <MainHeader />
      {postData ? (
        hasPageBlocks ? (
          <>
            <BlockRenderer
              blocks={postData.pageBlocks}
              context={{ slug: postData.slug, STRAPI_IMAGE_BASE_URL, postData }}
            />
            <Footer />
          </>
        ) : (
        <>
          <section
            className="page-title industry-bg"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {postData?.banner_image && (
              <Image
                src={`${STRAPI_IMAGE_BASE_URL}${postData?.banner_image?.url || ''}`}
                alt={postData?.Title || "Industry Banner"}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', zIndex: -1 }}
              />
            )}
            <Container style={{ position: 'relative', zIndex: 1 }}>
              <div className="page-section-title">
                <h1>{postData?.Title}</h1>
                <p>{postData?.bannerShortDescription}</p>
              </div>
            </Container>
          </section>
          <section className="ind-cta">
            <Container>
              <Row>
                <Col md="5" xs="12">
                  <div className="ind-cta-view">
                    <h3>We Were Part of Their Stories</h3>
                    <p>Let's build a Better Future together.</p>
                    <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                      Talk with Expert{" "}
                      <span>
                        <LuMoveRight />
                      </span>
                    </ContactHref>
                  </div>
                </Col>
                <Col md="7" xs="12">
                  <div className="ind-cta-img">
                    {postData?.industryCTAImage ? (
                      <Image src={`${STRAPI_IMAGE_BASE_URL}${postData.industryCTAImage?.url || ''}`} width={709} height={351} alt="Appzoro Industry" sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                    ) : (
                      <Image src="/assets/images/ind-detail.png" width={709} height={351} alt="Appzoro Industry" sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="ind-detail-content">
            <Container>
              <ReactMarkdown>{postData?.industryDetailContent}</ReactMarkdown>
            </Container>
          </section>
          <section className="why-az-industry">
            <Container>
              <div className="why-ind-az-content">
                <h3>{postData?.whyChooseIndustryTitle}</h3>
                <ReactMarkdown>{postData?.whyChooseIndustryDescription}</ReactMarkdown>
              </div>
              <div className="why-ind-az-content-box">
                <Row>
                  {Array.isArray(postData?.industryFeatures) && postData.industryFeatures.map((item, index) => (
                    <Col md="3" xs="12" key={item?.id}>
                      <div className="ind-box-counter">
                        <h5>0{index + 1}</h5>
                        <h3>{item?.featuresTitle}</h3>
                        <ReactMarkdown>
                          {item?.featuresDescription}
                        </ReactMarkdown>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="why-ind-az-content-box-type2 mt-4">
                <div className="section-title">
                  <h3>Other Industries We Serve</h3>
                </div>
                <Row>
                  {Array.isArray(catData) && catData.map((item, index) => (
                    <Col md="4" xs="12" key={index}>
                      <div className="ind-box-type2">
                        {item?.industryIcon ? (
                          <Image
                            src={`${STRAPI_IMAGE_BASE_URL}${item?.industryIcon?.url || ''}`}
                            width={72}
                            height={74}
                            alt={item.slug}
                            sizes="(max-width: 768px) 50vw, 100px"
                          />
                        ) : (
                          <LiaIndustrySolid />
                        )}
                        <h3>{item.Title}</h3>
                        <Link href={`/industry/${item?.slug}`} className="btn-style-arrow me-3">
                          Explore{" "}
                          <span>
                            <LuMoveRight />
                          </span>
                        </Link>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          </section>
          <CaseStudy isCacehLoad={checkData} />
          <TechStack />
          <ClientReview />
          <ArticlesView />
          <TalkExpert />
          <Footer />
        </>
        )
      ) : (
        <>
          <section className="no-data py-4">
            <Container>
              <div className="section-title-dark text-center">
                <p>
                  The industry record you are looking for could not be found.
                  Double-check the URL or return to the industries page to browse our services.
                </p>
              </div>
            </Container>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(params) {
  try {
    const apiBase = REACT_APP_API_URL.replace(/\/$/, '');
    const url = `${apiBase}/induustries?slug=${params.query.slug}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`API Error: ${res.status} for ${url}`);
      return { notFound: true };
    }
    const posts = await res.json().catch(() => []);
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      console.warn(`No industry found for slug: ${params.query.slug} at ${url}`);
      return { notFound: true };
    }
    return { props: { posts } };
  } catch (err) {
    console.error("Error in getServerSideProps for industry:", err);
    return { notFound: true };
  }
}

export default IndustryDetails;
