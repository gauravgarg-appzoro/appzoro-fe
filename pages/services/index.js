import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
const CountUp = dynamic(() => import("react-countup"), { ssr: false });
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
const CaseStudy = dynamic(() => import("../../components/common/CaseStudy"));
const TechStack = dynamic(() => import("../../components/common/TechStack"));
const ClientReview = dynamic(() => import("../../components/common/ClientReview"));
const ArticlesView = dynamic(() => import("../../components/common/ArticlesView"));
const TalkExpert = dynamic(() => import("../../components/common/TalkExpert"));
import Link from "next/link";
import MetaData from "../../components/common/MetaData";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { LuMoveRight } from '../../components/OptimizedIcons';
import { normalizeListPayload, normalizeCountPayload, fetchNoStore } from "../../lib/apiNormalize";

const PAGE_SIZE = 9;

const mapServiceCard = (post) => ({
  id: post.id,
  slug: post.slug,
  serviceTitle: post.serviceTitle,
  ServiceShortDescription: post.ServiceShortDescription,
  serviceicon: post.serviceicon,
});

const Services = ({ initialPosts = [], total: totalFromServer = 0 }) => {
  const [postData, setPostData] = useState([]);
  const [posts, setPosts] = useState(() => initialPosts.map(mapServiceCard));
  const [totalServices, setTotalServices] = useState(() => normalizeCountPayload(totalFromServer));
  const [listStart, setListStart] = useState(PAGE_SIZE);
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    setPostData(["test", "test1", "test2"]);
  }, []);

  useEffect(() => {
    setPosts(initialPosts.map(mapServiceCard));
    setTotalServices(normalizeCountPayload(totalFromServer));
    setListStart(PAGE_SIZE);
  }, [initialPosts, totalFromServer]);

  const handleLoadMoreServices = async () => {
    setListLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/services?_start=${listStart}&_limit=${PAGE_SIZE}&_sort=createdAt:DESC`,
        { cache: "no-store" }
      );
      const data = await res.json();
      const chunk = normalizeListPayload(data).filter(isPublishedService).map(mapServiceCard);
      setPosts((prev) => [...prev, ...chunk]);
      setListStart((s) => s + PAGE_SIZE);
    } catch (e) {
      console.error("Load more services failed", e);
    } finally {
      setListLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href={STRAPI_IMAGE_BASE_URL} />
        <link rel="preload" as="image" href="/assets/images/banner/service_main.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "contentUrl": `${process.env.REACT_APP_API_URL || 'https://appzoro.com'}/assets/images/banner/service_main.png`, // Assuming local image is served from base domain
              "license": "https://appzoro.com/",
              "acquireLicensePage": "https://appzoro.com/contact-us",
              "creditText": "Appzoro Technologies",
              "creator": {
                "@type": "Organization",
                "name": "Appzoro Technologies"
              },
              "copyrightNotice": "Appzoro Technologies"
            })
          }}
        />
      </Head>
      <MetaData
        title="Software Development Services in USA | AppZoro"
        description="AppZoro offers top-tier software development services in the USA, delivering tailored solutions to meet your business needs and enhance operational efficiency."
        url={`/services`}
        image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
      <MainHeader />
      <section className="page-title service-bg" style={{ position: "relative" }}>
        <Image
          src="/assets/images/banner/service_main.png"
          alt="Software Development Services"
          fill
          priority={true}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          quality={80}
          sizes="(max-width: 768px) 100vw, 100vw"
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <Container>
          <div className="page-section-title">
            <h1>Software Development Services</h1>
            <p>
              Unlock the potential of custom software development services and
              ensure quality services to all sizes and shapes. We provide
              advanced software development solutions by leveraging the full
              potential of technological solutions that enable our clients to be
              agile, high-performing - performers, and futuristic. Talk to our
              expert team today!
            </p>
          </div>
        </Container>
      </section>
      <section className="services-counter">
        <Container>
          <Row>
            <Col md="3" xs="6">
              <div className="serv-counter">
                <h3>
                  <CountUp delay={1} duration={1} end={15} />+
                </h3>
                <p>Diverse Domains</p>
              </div>
            </Col>
            <Col md="3" xs="6">
              <div className="serv-counter">
                <h3>
                  <CountUp delay={1} duration={1} end={700} />+
                </h3>
                <p>Apps Developed</p>
              </div>
            </Col>
            <Col md="3" xs="6">
              <div className="serv-counter">
                <h3>
                  <CountUp delay={1} duration={1} end={50} />+
                </h3>
                <p>Apps Developers</p>
              </div>
            </Col>
            <Col md="3" xs="6">
              <div className="serv-counter">
                <h3>
                  <CountUp delay={1} duration={1} end={90} />%
                </h3>
                <p>On Time Delivery</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="services-views">
        <Container>
          <div className="section-title-dark text-center mb-5">
            <h2>Our Prevalent Software Development Services</h2>
            <p>
              From IT consultation and a comprehensive technology path to
              end-to-end development of scalable solutions, Appzoro Technologies
              provides complete development services that adapt perfectly
              according to business requirements.{" "}
            </p>
          </div>
          <Row className="justify-content-center">
            {posts.map((post) => (
              <Col md="4" xs="12" key={post.id}>
                <div className="service-box">
                  <Link href={`/services/${post.slug}`}>
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${post.serviceicon?.formats?.thumbnail?.url || post.serviceicon?.formats?.small?.url || post.serviceicon?.url || ''}`}
                      width="72"
                      height="74"
                      alt={post.serviceTitle}
                    />
                    <h3>{post.serviceTitle}</h3>
                    <p>{post.ServiceShortDescription}</p>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
          {posts.length < totalServices && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleLoadMoreServices}
                disabled={listLoading}
                className="btn-style-arrow me-3 load-more-btn"
              >
                {listLoading ? "Loading…" : "Load More"}
                <span>
                  <LuMoveRight />
                </span>
              </button>
            </div>
          )}
        </Container>
      </section>
      <section className="why-az-service">
        <Container>
          <Row className="align-items-center">
            <Col md="6" xs="12">
              <div className="why-az-content">
                <h3>Choose AppZoro as Your Software Development Company</h3>
                <p>
                  Appzoro Technologies is one of the best software development
                  companies providing enriched and profitable solutions. Our
                  company will provide services across all global businesses,
                  startups, and organizations. We will give high-demand custom
                  software development solutions to tech giants from multiple
                  industry verticals like finance, healthcare, e-commerce, etc.
                  Our company has the most experienced and creative team of
                  software developers at your behest. Our company's talented
                  software development team will manage complex projects and
                  find the latest innovative solutions to fulfill your business
                  requirements. Pick our proficient software developers for your
                  next projects.{" "}
                </p>
                {/* <Link href="/case-study" className="btn-style-arrow mt-3">View our Portfolio <span><LuMoveRight /></span></Link> */}
              </div>
            </Col>
            <Col md="6" xs="12">
              <div className="service-image-view">
                <Image
                  alt="service"
                  width="534"
                  height="512"
                  src="/assets/images/az-service.png"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <CaseStudy isCacehLoad={postData} />
      <TechStack />
      <ClientReview />
      <ArticlesView />
      <TalkExpert />
      <Footer />
    </>
  );
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');
const isPublishedService = (post) => Boolean(post?.published_at || post?.publishedAt);

export async function getServerSideProps() {
  try {
    const [listRes, countRes] = await Promise.all([
      fetchNoStore(`${API_BASE}/services?_start=0&_limit=${PAGE_SIZE}&_sort=createdAt:DESC`),
      fetchNoStore(`${API_BASE}/services/count`),
    ]);
    const listData = listRes.ok ? await listRes.json().catch(() => []) : [];
    const countData = countRes.ok ? await countRes.json().catch(() => 0) : 0;
    const list = normalizeListPayload(listData).filter(isPublishedService);
    const total = normalizeCountPayload(countData);
    const initialPosts = list.map(mapServiceCard);
    return { props: { initialPosts, total } };
  } catch (e) {
    console.error("services listing getServerSideProps", e);
    return { props: { initialPosts: [], total: 0 } };
  }
}

export default Services;
