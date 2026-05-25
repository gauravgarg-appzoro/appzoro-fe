import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import ContactHref from "../../components/common/ContactHref";
import Image from "next/image";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import SeoJsonLd from "../../components/common/SeoJsonLd";
import { buildBreadcrumbSchema } from "../../lib/schemaBuilders";
import Head from "next/head";
import fs from 'fs';
import path from 'path';
import https from 'https';
import { pipeline } from 'stream/promises';
import { FaLinkedin, IoIosArrowRoundForward, LuMoveRight } from '../../components/OptimizedIcons';
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";

const ContentExpandCollapse = dynamic(() => import("../../components/common/ContentExpandCollapse"));
const TalkExpert = dynamic(() => import("../../components/common/TalkExpert"));
const ReactMarkdown = dynamic(() => import("react-markdown"));
const PoertfolioImagesSlider = dynamic(() => import("./PoertfolioImagesSlider"));
const PortfolioTechStack = dynamic(() => import("./PortfolioTechStack"));
const FeatureCaseStudy = dynamic(() => import("./FeatureCaseStudy"));
const PDFDownload = dynamic(() => import("./PDFDownload"), { ssr: false });

const PortFolioDetail = ({ posts: initialPosts, featuredPosts: initialFeaturedPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [featuredPosts, setFeaturedPosts] = useState(initialFeaturedPosts || []);

  useEffect(() => {
    setPosts(initialPosts || []);
    setFeaturedPosts(initialFeaturedPosts || []);
  }, [initialPosts, initialFeaturedPosts]);

  const postData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;


  return (
    <>
      <MetaData
        title={postData?.seo_title || postData?.Title || 'Case Study | AppZoro'}
        description={postData?.seo_description || postData?.Banner_short_description || 'App development case study from AppZoro.'}
        url={`/case-study/${postData?.slug || ''}`}
        image={postData?.secondary_block_img?.url ? `${STRAPI_IMAGE_BASE_URL}${postData.secondary_block_img.url}` : undefined}
        robots={postData?.robots_meta}
      />
      <SeoJsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Case Study', url: '/case-study' },
          { name: postData?.Title || 'Project', url: `/case-study/${postData?.slug || ''}` },
        ])}
      />
      <Head>
        {(() => {
          const cleanedSchema = sanitizeJsonLdString(String(postData?.schema_code || ''), { stripFaqPage: true });
          return cleanedSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: cleanedSchema }}
            ></script>
          ) : null;
        })()}
      </Head>
      <MainHeader />
      <section className="page-title industry-bg" style={{ position: 'relative' }}>
        {postData?.Banner_Image?.url && (
          <Image
            src={postData?.LocalBannerPath || `${STRAPI_IMAGE_BASE_URL}${postData?.Banner_Image?.formats?.medium?.url || postData?.Banner_Image?.formats?.large?.url || postData?.Banner_Image?.url || ''}`}
            alt={postData?.Title || "Case Study Banner"}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', zIndex: -1 }}
          />
        )}
        <Container>
          <div className="page-section-title">
            <h1>{postData?.Title}</h1>
            <p>{postData?.Banner_short_description}</p>
            <ContactHref href="/contact-us" className="btn-style-arrow mt-4">Talk With Expert <span><LuMoveRight /></span></ContactHref>
          </div>
        </Container>
      </section>
      {
        postData?.case_study_pdf?.url &&
        <PDFDownload data={postData?.case_study_pdf?.url} portFolioName={postData?.Title} />
      }
      <section className="portfolio-intro">
        <Container>
          <Row>
            {postData?.subtitle &&
              <Col xs="12" md="12">
                <h2>{postData?.subtitle}</h2>
              </Col>
            }
            <Col xs="12" md="6">
              <Row>
                {postData?.industry_name?.ind_name && (
                  <Col xs="12" md="4">
                    <div className="intro-short-info">
                      <h3>Industry</h3>
                      <h4>{postData?.industry_name?.ind_name}</h4>
                    </div>
                  </Col>
                )}
                {postData?.Country && (
                  <Col xs="12" md="4">
                    <div className="intro-short-info">
                      <h3>Country</h3>
                      <h4>{postData?.Country}</h4>
                    </div>
                  </Col>
                )}
                {(postData?.platform_android ||
                  postData?.platform_ios ||
                  postData?.platform_web) && (
                    <Col xs="12" md="4">
                      <div className="intro-short-info">
                        <h3>Platforms</h3>
                        <h4>
                          {postData?.platform_android && <span>Android</span>}
                          {postData?.platform_ios && <span>iOS</span>}
                          {postData?.platform_web && <span>Web</span>}
                        </h4>
                      </div>
                    </Col>
                  )}
                <Col xs="12" md="12">
                  <div className="intro-info-apps">
                    {postData?.android_link && (
                      <Link target="_blank" href={postData?.android_link}>
                        <Image
                          src="/assets/images/download_googlay_play.png"
                          width={"137"}
                          height={"40"}
                          alt="Playstore"
                        />
                      </Link>
                    )}
                    {postData?.ios_link && (
                      <Link target="_blank" href={postData?.ios_link}>
                        <Image
                          src="/assets/images/appstore.png"
                          width={"137"}
                          height={"40"}
                          alt="Playstore"
                        />
                      </Link>
                    )}
                    {postData?.web_link && (
                      <Link target="_blank" href={postData?.web_link}>
                        <Image
                          src="/assets/images/web.png"
                          width={"37"}
                          height={"37"}
                          alt="Playstore"
                        />
                      </Link>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs="12" md="6">
              <ReactMarkdown>{postData?.intro_content}</ReactMarkdown>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="portfolio-intro2">
        <Container>
          <Row>
            <Col xs="12" md="7">
              <h3>{postData?.secondary_block_title}</h3>
              {/* <ReactMarkdown>{postData?.secondary_block_content}</ReactMarkdown> */}
              <ReactMarkdown>{postData?.secondary_block_content}</ReactMarkdown>
            </Col>
            <Col xs="12" md="5">
              <div className="pi2-img text-center">
                <Image
                  src={`${STRAPI_IMAGE_BASE_URL}${postData?.secondary_block_img?.url || ''}`}
                  width={310}
                  height={436}
                  alt="Portfolio"
                  sizes="(max-width: 768px) 100vw, 385px"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="portfolio-mission">
        <Container>
          <h2>{postData?.mission_title}</h2>
          <div className="pm-content text-center">
            <ReactMarkdown>{postData?.mission_content}</ReactMarkdown>
          </div>
          <div className="pm-images">
            {postData?.mission_img && (
              <PoertfolioImagesSlider portfolioImages={postData?.mission_img} />
            )}
            {/* {postData?.mission_img.map((item) => (
                            <Image key={item.id} src={`${STRAPI_IMAGE_BASE_URL}${item?.url || ''}`} width={"310"} height={"436"} alt="Portfolio" />
                        ))} */}
          </div>
        </Container>
      </section>
      <section className="portfolio-challenges">
        <Container>
          <div className="pc-view">
            <Row className="align-items-center">
              <Col xs="12" md="4">
                <div className="pc-images">
                  <Image
                    src={`${STRAPI_IMAGE_BASE_URL}${postData?.challenges_image?.url || ''}`}
                    width={"310"}
                    height={"436"}
                    alt="Portfolio"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </Col>
              <Col xs="12" md="8">
                <div className="pc-content">
                  <h3>{postData?.challenges_title}</h3>
                  <ReactMarkdown>{postData?.challenges_content}</ReactMarkdown>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="portfolio-strategy">
        <Container>
          <Row className="align-items-center">
            <Col xs="12" md="6">
              <div className="strategy-left">
                <h2>{postData?.project_strategy_title}</h2>
                <ReactMarkdown>{postData?.project_strategy_content}</ReactMarkdown>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="strategy-right">
                {Array.isArray(postData?.project_strategy_phases) && postData.project_strategy_phases.map((item) => (
                  <div key={item?.id}>
                    <h3>
                      <span>
                        <IoIosArrowRoundForward />
                      </span>
                      {item?.phase_title}
                    </h3>
                    <div className="strategy-right-info">
                      <ReactMarkdown>{item?.phase_content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {
        postData?.content_section_title && postData?.content_section_info && (
          <ContentExpandCollapse
            title={postData?.content_section_title}
            info={postData?.content_section_info}
          />
        )
      }
      {
        postData?.tech_stacks?.length > 0 && (
          <PortfolioTechStack techStack={postData?.tech_stacks} />
        )
      }

      {
        postData?.client_comment && (
          <section className="portfolio-client-details">
            <Container>
              <h3>What Our Clients Have to Say!</h3>
              <div className="pc-info">
                <div className="pc-info-img">
                  {postData?.client_img ? (
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${postData?.client_img?.url || ''}`}
                      width="60"
                      height="60"
                      alt="Client"
                      sizes="60px"
                    />
                  ) : (
                    <Image
                      src={"/assets/images/user-icon.png"}
                      width="60"
                      height="60"
                      alt="Client"
                    />
                  )}
                </div>
                <div className="pc-info-data">
                  <h4>"{postData?.client_comment}"</h4>
                  <p className="mb-0">
                    <span>{postData?.client_name}</span> -{" "}
                    {postData?.client_designation}
                  </p>
                  {postData?.client_linkedin_profile_url && (
                    <div className="client-if_linkedin fs-2">
                      <Link
                        href={postData?.client_linkedin_profile_url}
                        target="_blank"
                        aria-label="LinkedIn Profile"
                      >
                        <FaLinkedin />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {postData?.client_review_img && (
                <div className="cr-img">
                  <Link
                    href={
                      postData?.Client_review_img_link
                        ? postData?.Client_review_img_link
                        : `${STRAPI_IMAGE_BASE_URL}${postData?.client_review_img?.url || ''}`
                    }
                    target="_blank"
                  >
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${postData?.client_review_img?.url || ''}`}
                      width="600"
                      height="400"
                      alt="Review"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                </div>
              )}
            </Container>
          </section>
        )
      }
      <section className="works-feature-projects">
        <Container>
          <h3>Explore More Case Studies</h3>
          <FeatureCaseStudy data={featuredPosts} />
          <div className="text-center">
            <Link href="/case-study" className="btn-style-arrow me-3">
              View All Case Studies{" "}
              <span>
                <LuMoveRight />
              </span>
            </Link>
          </div>
        </Container>
      </section>
      <TalkExpert />
      <Footer />
    </>
  );
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');

export async function getStaticPaths() {
  try {
    const res = await fetch(`${API_BASE}/our-portfolios?_limit=1000`);
    if (!res.ok) return { paths: [], fallback: 'blocking' };
    const data = await res.json();
    const posts = Array.isArray(data) ? data : (data?.data || []);
    const paths = (posts || []).map((post) => ({
      params: { slug: post.slug },
    })).filter((p) => p.params.slug);
    return { paths, fallback: 'blocking' };
  } catch (e) {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const [postsRes, featuredRes] = await Promise.all([
      fetch(`${API_BASE}/our-portfolios?slug=${params.slug}`),
      fetch(`${API_BASE}/our-portfolios?is_featured=true&_sort=published_at:DESC`)
    ]);

    const [postsData, featuredData] = await Promise.all([
      postsRes.ok ? postsRes.json() : [],
      featuredRes.ok ? featuredRes.json() : []
    ]);
    const posts = Array.isArray(postsData) ? postsData : (postsData?.data || []);
    const featuredPosts = Array.isArray(featuredData) ? featuredData : (featuredData?.data || []);

    if (!posts || posts.length === 0) {
      return { notFound: true };
    }

    const postData = posts[0];
    let localBannerPath = null;

    // --- Phase 9: Build-Time Image Caching ---
    if (postData?.Banner_Image?.url) {
      try {
        const bannerUrl = postData.Banner_Image.formats?.medium?.url ||
          postData.Banner_Image.formats?.large?.url ||
          postData.Banner_Image.url;

        const upstreamUrl = `${API_BASE}${bannerUrl}`;
        const filename = `hero-${params.slug}-${path.basename(bannerUrl)}`;
        const publicDir = path.join(process.cwd(), 'public', 'uploads', 'hero-cache');
        const filePath = path.join(publicDir, filename);
        const relativePath = `/uploads/hero-cache/${filename}`;

        // Ensure directory exists
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        // Download if not exists
        if (!fs.existsSync(filePath)) {
          await new Promise((resolve) => {
            https.get(upstreamUrl, (res) => {
              if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(filePath);
                pipeline(res, fileStream)
                  .then(() => resolve())
                  .catch(() => resolve());
              } else {
                resolve();
              }
            }).on('error', () => {
              resolve();
            });
          });
        }

        // Verify file was created before using local path
        if (fs.existsSync(filePath)) {
          localBannerPath = relativePath;
        }

      } catch (error) {
        // Fallback silently on error
      }
    }

    // --- Data Trimming: Reduce hydration payload to improve LCP ---
    const trimPost = (p) => ({
      id: p.id || null,
      slug: p.slug || null,
      Title: p.Title || null,
      listingColorCode: p.listingColorCode || null,
      is_featured: p.is_featured || false,
      Banner_Image: p.Banner_Image || null,
      if_feature_background_img: p.if_feature_background_img || null,
      LocalBannerPath: p.LocalBannerPath || null,
      project_logo: p.project_logo ? { url: p.project_logo.url } : null,
      Banner_short_description: p.Banner_short_description || null,
      industry: p.industry ? { Title: p.industry.Title } : null,
      Country: p.Country || null,
      platform_android: p.platform_android || null,
      platform_ios: p.platform_ios || null,
      platform_web: p.platform_web || null,
      android_link: p.android_link || null,
      ios_link: p.ios_link || null,
      web_link: p.web_link || null,
      secondary_block_img: p.secondary_block_img ? { url: p.secondary_block_img.url } : null,
    });

    const cleanedFeaturedPosts = Array.isArray(featuredPosts)
      ? featuredPosts.map(trimPost)
      : [];
    // ---------------------------------------------------------------

    return {
      props: {
        posts: [{ ...postData, LocalBannerPath: localBannerPath }],
        featuredPosts: cleanedFeaturedPosts,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default PortFolioDetail;

