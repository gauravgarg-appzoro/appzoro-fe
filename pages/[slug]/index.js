import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from "next/link";
import ContactHref from "../../components/common/ContactHref";
import CaseStudy from "../../components/common/CaseStudy";
import TechStack from "../../components/common/TechStack";
import ClientReview from "../../components/common/ClientReview";
import ArticlesView from "../../components/common/ArticlesView";
import TalkExpert from "../../components/common/TalkExpert";
import dynamic from "next/dynamic";
const BlockRenderer = dynamic(() => import('../../components/page-builder/BlockRenderer'));
import MetaData from "../../components/common/MetaData";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ServiceFaqs from "../../components/common/ServiceFaqs";
import Head from "next/head";
import Image from "next/image";
import fs from 'fs';
import path from 'path';
import https from 'https';
import { pipeline } from 'stream/promises';
import { LuMoveRight } from '../../components/OptimizedIcons';
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";
import RichText from "../../components/common/RichText";

/** Build full image URL for section media: backend sends url as path (e.g. /uploads/xxx). */
function sectionImageUrl(media) {
  const path = media?.url;
  if (!path || typeof path !== 'string' || !path.trim()) return '';
  const base = (STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

const ProductDetails = ({ posts }) => {
  const postData = posts?.[0];
  const hasPageBlocks = postData?.pageBlocks && Array.isArray(postData.pageBlocks) && postData.pageBlocks.length > 0;
  const [activeTab, setActiveTab] = useState(0); // Track current tab
  const [activeIndex, setActiveIndex] = useState(0);

  const heading = (postData?.heading || '');
  const words = heading.split(' ').filter(Boolean);
  const firstTwo = words.slice(0, 2).join(' ');
  const rest = words.slice(2).join(' ') || '';

  const activeItem = postData?.section4?.boxes?.[activeIndex];

  const formatAnswer = (description) => {
    const str = description || '';
    const [title, descriptionWithList] = str.split('\n', 2);
    const listItems = str
      .split('\n')
      .slice(2)
      .filter((line) => line.trim() !== '')
      // Strip leading markdown bullet markers (- * •) so they don't
      // render as visible "dash" characters in the <li> output.
      // CMS authors paste content like "- Real-time tracking" and expect
      // proper bullet rendering — the <ul><li> + tick icon handles the bullet,
      // we just need to remove the redundant markdown prefix.
      .map((line) => line.replace(/^\s*[-*•]\s+/, '').trim());
    return { title, description: descriptionWithList, listItems };
  };

  const { title, description, listItems } = formatAnswer(activeItem?.description);

  if (!postData) return null;

  const section2Desc = postData?.section2_layout2?.description
    ?.replace(/\/uploads/g, `${STRAPI_IMAGE_BASE_URL}/uploads`)
    ?.replace(new RegExp("<ul>[\\\\s\\\\S]*?</ul>", "gi"), m => m.replace(new RegExp("<br\\\\s*/?>", "gi"), "")) || "";

  const section3Desc = postData?.section3?.description
    ?.replace(/\/uploads/g, `${STRAPI_IMAGE_BASE_URL}/uploads`)
    ?.replace(new RegExp("<ul>[\\\\s\\\\S]*?</ul>", "gi"), m => m.replace(new RegExp("<br\\\\s*/?>", "gi"), "")) || "";

  return (
    <>
      <MetaData
        title={postData?.seoTitle || postData?.heading || 'AppZoro'}
        description={postData?.seoDescription || postData?.shortDescription || 'Software development solutions from AppZoro.'}
        url={`/${postData?.slug || ''}`}
        image={
          postData?.Image?.url
            ? `${STRAPI_IMAGE_BASE_URL}${postData.Image.url}`
            : 'https://appzoro.com/assets/images/az-logo-large.png'
        }
      />
      <Head>
        {(() => {
          const cleanedSchema = sanitizeJsonLdString(String(postData?.schema_script || ''), { stripFaqPage: true });
          return cleanedSchema ? (
            <script
              type="application/ld+json"
              className="yoast-schema-graph"
              dangerouslySetInnerHTML={{ __html: cleanedSchema }}
            ></script>
          ) : null;
        })()}
      </Head>
      <MainHeader />
      {hasPageBlocks ? (
        <BlockRenderer
          blocks={postData.pageBlocks}
          context={{ slug: postData.slug, STRAPI_IMAGE_BASE_URL, postData }}
        />
      ) : (
      <>
      <section className='product-banner'>
        <Container>
          <Row className='align-items-center'>
            <Col xs="12" md="7">
              <div className='product-banner-info'>
                <h1><span>{firstTwo}</span>{rest ? <span className="h1-line2">{rest}</span> : null}</h1>
                <p>{postData?.shortDescription}</p>
                <Link href="/case-study" className='btn-style-arrow me-3'>View Portfolio <span><LuMoveRight /></span></Link>
                <ContactHref href="/contact-us" className='btn-style-arrow me-3'>Inquiry Now <span><LuMoveRight /></span></ContactHref>
              </div>
            </Col>
            <Col xs="12" md="5">
              <div className='banner-image'>
                {(() => {
                  const remoteBanner = postData?.Image?.url
                    ? `${STRAPI_IMAGE_BASE_URL}${postData.Image.url}`
                    : '';
                  const bannerSrc = postData?.LocalBannerPath || remoteBanner;
                  if (!bannerSrc) return null;
                  const imgFormat = postData?.Image?.formats?.large || postData?.Image;
                  const intrinsicWidth = Number(imgFormat?.width) || 800;
                  const intrinsicHeight = Number(imgFormat?.height) || Math.round(intrinsicWidth * 0.75);
                  const renderedWidth = 800;
                  const renderedHeight = Math.round((intrinsicHeight / intrinsicWidth) * renderedWidth);
                  if (postData?.LocalBannerPath) {
                    return (
                      <Image
                        src={postData.LocalBannerPath}
                        alt={postData.heading}
                        width={renderedWidth}
                        height={renderedHeight}
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                      />
                    );
                  }
                  return (
                    <Image
                      src={remoteBanner}
                      alt={postData.heading}
                      width={renderedWidth}
                      height={renderedHeight}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  );
                })()}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="clients">
        <div className="container client-brand">
          <div className="client-logos">
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={10}
              navigation={{
                prevEl: '.prev_award',
                nextEl: '.next_award',
              }}
              autoplay={{
                delay: 1000, // 3 seconds
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]} // include Autoplay
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              className="awardslide"
            >
              {postData?.BrandsLogo.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="client-logos-div">
                    <Image src={`${STRAPI_IMAGE_BASE_URL}${item?.url || ''}`} alt={item?.alternativeText || item?.name || "Client Brand"} width={200} height={100} style={{ objectFit: 'contain' }} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* section 2 */}
      {postData?.layout === 'layout_1' && (
        <section className="services">
          <div className="container">
            <h2 className="layout-heading">{postData?.section2?.heading}</h2>
            <p className="subtitle">{postData?.section2?.short_description}</p>

            <div className="services-grid">

              {(postData.section2?.section_boxes || []).map((item, i) => (
                <div key={i} className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front" style={sectionImageUrl(item?.image) ? { backgroundImage: `url(${sectionImageUrl(item.image)})` } : { backgroundColor: '#1d1d1d' }}>
                      <div className="content">
                        <div className="icon">
                          {sectionImageUrl(item?.icon) ? (
                            <Image src={sectionImageUrl(item.icon)} alt={item.heading || "Service Icon"} width={64} height={64} />
                          ) : null}
                        </div>
                        <h3>{item.heading}</h3>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <RichText>
                        {(item?.description_back || '').replace(
                          /\/uploads/g,
                          `${STRAPI_IMAGE_BASE_URL}/uploads`
                        )}
                      </RichText>
                      <ContactHref href="/contact-us" className='btn-style-arrow-layout me-3 mt-5'>Connect Now! <span><LuMoveRight /></span></ContactHref>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {postData?.layout === 'layout_2' && (
        <section className="services" id="whyChooseAz">
          <Container>
            <Row className="section-sec-layout">
              <Col xs="12" md="6">
                <div className="image-content">
                  <Image src={`${STRAPI_IMAGE_BASE_URL}${postData?.section2_layout2?.image?.url || ''}`} alt={postData?.section2_layout2?.heading || "Section Banner"} width={600} height={400} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="whyservice-left">
                  {/* <div className="whyservice-left_smtitle">{postData?.section3?.sub_heading}</div> */}
                  <div className="whychoose-left_lgtitle">{postData?.section2_layout2?.heading}</div>

                  <div dangerouslySetInnerHTML={{ __html: section2Desc }}></div>

                  <div className="view-more-btn mt-5">
                    <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                      Let’s Talk{" "}
                      <span>
                        <LuMoveRight />
                      </span>
                    </ContactHref>
                  </div>
                </div>
              </Col>

            </Row>
          </Container>
        </section >
      )}
      {/* section 2 */}

      <section className="why-services" id="whyChooseAz">
        <Container>
          <Row>
            <Col xs="12" md="6">
              <div className="whyservice-left">
                <div className="whyservice-left_smtitle">{postData?.section3?.sub_heading}</div>
                <div className="whychoose-left_lgtitle">{postData?.section3?.heading}</div>

                <div dangerouslySetInnerHTML={{ __html: section3Desc }}></div>

                {/* <div className="whyservice-left_p">
                  <p>For businesses to make the most of technology, they require an expert's calm and knowing hand. A committed partnership to illuminate the most efficient and beneficial path forward for your business.</p>
                </div>

                <ul className="features mt-3">
                  <li>✅ 100% Customer satisfaction</li>
                  <li>✅ 100% transparency</li>
                  <li>✅ 24*7 Customer support</li>
                  <li>✅ Flexible pricing</li>
                  <li>✅ Security & confidentiality</li>
                  <li>✅ Agile development.</li>
                </ul> */}

                <div className="view-more-btn mt-5">
                  <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                    Get a Free Consultation{" "}
                    <span>
                      <LuMoveRight />
                    </span>
                  </ContactHref>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="image-content">
                <Image src={`${STRAPI_IMAGE_BASE_URL}${postData?.section3?.image?.url || ''}`} alt={postData?.section3?.heading || "Overview"} width={600} height={400} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section 4 */}
      {
        postData?.layout === 'layout_1' && (
          <section className="ai-solutions">
            <div className="container">
              <h2 className="layout-heading">{postData?.section4?.heading}</h2>
              <p className="subtitle">{postData?.section4?.short_description}</p>

              <Row>
                <Col sm="6" className="solutions-list">
                  {postData?.section4?.boxes.map((q, index) => (
                    <div
                      key={q?._id}
                      className={`solution-item ${activeIndex === index ? "active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        loading="lazy"
                        className="point-image"
                        src="/assets/images/fitness/star.svg"
                        alt="icon"
                        width="24"
                        height="24"
                      />
                      <h3>{q?.heading}</h3>
                    </div>
                  ))}
                </Col>

                <Col sm="6" className="solution-details">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul className="feature-list">
                    {listItems.map((item, i) => (
                      <li key={i}>
                        <img loading="lazy" src="/assets/images/fitness/circletik.svg" alt="tick" width="20" height="20" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </div>
          </section>
        )
      }
      {
        postData?.layout === 'layout_2' && (
          <section className="app-design-layout-2">
            <div className="container">
              <h2 className="layout-heading">{postData?.section4?.heading}</h2>
              <p className="subtitle-layout-2">{postData?.section4?.short_description}</p>

              <Row className="design-grid-layout-2">
                {postData?.section4?.boxes.map((item, i) => (
                  <Col xs="12" md="12" key={i} className="design-card-layout-2">
                    <Row>
                      <Col sm="3">
                        <img loading="lazy" src={`${STRAPI_IMAGE_BASE_URL}${item?.icon?.url || ''}`} alt={item?.heading || "Solution Icon"} width="60" height="60" />
                      </Col>
                      <Col sm="9">
                        <h3>{item?.heading}</h3>
                      </Col>
                    </Row>
                    <RichText>{item?.description}</RichText>
                  </Col>
                ))}
              </Row>
            </div>
          </section>
        )
      }
      {/* section 4 */}

      {/* section 5 */}
      {
        postData?.layout === 'layout_1' && (
          <section className="key-features">
            <div className="container">
              <h2 className="layout-heading">{postData?.section5?.heading}</h2>
              <p className="subtitle">{postData?.section5?.short_description}</p>

              <Row className="container features-grid">
                {postData?.section5?.boxes.map((item, i) => (
                  <Col key={i} xs="12" md="12" className="feature-card">
                    <div className="feature-icon">
                      {sectionImageUrl(item?.icon) ? (
                        <Image src={sectionImageUrl(item.icon)} alt="Dashboard" width={64} height={64} />
                      ) : null}
                    </div>
                    <h3>{item?.title}</h3>
                    <RichText>{item?.short_description}</RichText>
                  </Col>
                ))}
              </Row>
            </div>
          </section>
        )
      }
      {
        postData?.layout === 'layout_2' && (
          <section className="key-features">
            <div className="container">
              <h2 className="layout-heading">{postData?.section5_layout2?.heading}</h2>
              <p className="subtitle">{postData?.section5_layout2?.short_description}</p>
              <Container className="my-4">
                <Row>
                  <Col xs={12} md={4}>
                    <div className="banner-image-section-5">
                      <Image
                        src={`${STRAPI_IMAGE_BASE_URL}${postData?.section5_layout2_tabs?.[activeTab]?.image?.url || ''}`}
                        alt="about"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={8} className="product-tabright">
                    <Tabs
                      defaultActiveKey={activeTab}
                      onSelect={(key) => { setActiveTab(Number(key)) }}
                      id="tab-example"
                      className="mb-3 layout-custom-tabs"
                      fill
                      variant="pills"
                    >
                      {postData?.section5_layout2_tabs?.map((item, i) => (
                        <Tab key={i} eventKey={i} title={item?.title}>
                          <p className="mt-3">{item?.description}</p>
                          <Row className="container features-grid">
                            {item?.tabs_boxes.map((box, j) => (
                              <Col key={j} xs="12" md="12" className="feature-card">
                                <div className="feature-icon">
                                  {box?.icon?.url && (
                                    <Image src={`${STRAPI_IMAGE_BASE_URL}${box.icon.url}`} alt="Dashboard Icon" width={60} height={60} />
                                  )}
                                </div>
                                <h4>{box?.title}</h4>
                              </Col>
                            ))}
                          </Row>
                        </Tab>
                      ))}
                    </Tabs>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        )
      }
      {/* secton 5 */}

      {/* section 6  */}
      {
        postData?.layout === 'layout_1' && (
          <section className="app-design">
            <div className="container">
              <h2 className="layout-heading">{postData?.section6?.heading}</h2>
              <p className="subtitle">{postData?.section6?.short_description}</p>

              <div className="design-grid">
                {postData?.section6?.boxes.map((item, i) => (
                  <div key={i} className="design-card">
                    <h3>{item?.heading}</h3>
                    <RichText>{item?.short_description}</RichText>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }
      {
        postData?.layout === 'layout_2' && (
          <section className="app-design-layout-2-section-6">
            <div className="container">
              <h2 className="layout-heading">{postData?.section6?.heading}</h2>
              <p className="subtitle-layout-2">{postData?.section6?.short_description}</p>
              <Row className="design-grid-layout-2-section-6 gx-4 gy-4">
                {postData?.section6?.boxes.map((item, i) => (
                  <Col xs="12" md="12" key={i} className="design-card-layout-2-section-6 px-2">
                    <Row>
                      <Col sm="3">
                        <Image src={`${STRAPI_IMAGE_BASE_URL}${item?.image?.url || ''}`} alt={item?.heading || "Design Step"} width={100} height={100} />
                      </Col>
                      <Col sm="9">
                        <h3>{item?.heading}</h3>
                        <RichText>{item?.short_description}</RichText>
                      </Col>
                    </Row>

                  </Col>
                ))}
              </Row>
            </div>
          </section>
        )
      }
      {/* section 6 */}

      {/* section 7 */}
      {
        postData?.layout === 'layout_1' && (
          <section className="container">
            <Row className="mt-5 mb-5">
              <Col sm="6">
                <h2 className="layout-heading">{postData?.section7?.heading}</h2>
                <RichText>{postData?.section7?.short_description}</RichText>
                <Image className="fitnessimage" src={`${STRAPI_IMAGE_BASE_URL}${postData?.section7?.image?.url || ''}`} alt={postData?.section7?.heading || "Workflow Illustration"} width={500} height={400} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
              </Col>
              <Col sm="6" className="workflow-right-section">
                <div className="workflow-timeline">
                  {postData?.section7?.points.map((item, i) => (
                    <div key={i} className="workflow-step">
                      <div className="workflow-circle">{i + 1}</div>
                      <div className="workflow-text">
                        <h5>{item?.title}</h5>
                        <RichText>{item?.description}</RichText>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </section>
        )
      }
      {
        postData?.layout === 'layout_2' && (
          <section className="key-features">
            <div className="container">
              <h2 className="layout-heading">{postData?.section7?.heading}</h2>
              <p className="subtitle">{postData?.section7?.short_description}</p>
              <Row className="container features-grid-layout-2">
                {postData?.section7?.points.map((item, i) => (
                  <Col key={i} xs="12" md="12" className="feature-card-layout-2">
                    <div className="section-7-banner">
                      <Image src={`${STRAPI_IMAGE_BASE_URL}${item?.image?.url || ''}`} alt={item?.title || "Feature Preview"} width={600} height={300} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <h3 className="mt-3">{item?.title}</h3>
                    <RichText>{item?.description}</RichText>
                  </Col>
                ))}
              </Row>
            </div>
          </section>
        )
      }
      {/* section 7 */}

      <CaseStudy />
      <TechStack />
      <ClientReview />
      {
        postData?.faqList?.length > 0 && (
          <ServiceFaqs faqData={postData?.faqList} />
        )
      }
      <ArticlesView />
      <TalkExpert />
      </>
      )}
      <Footer />
    </>
  );
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');

export async function getStaticPaths() {
  try {
    const res = await fetch(`${API_BASE}/products?_limit=1000`);
    if (!res.ok) return { paths: [], fallback: 'blocking' };
    const data = await res.json();
    const products = Array.isArray(data) ? data : (data?.data || []);
    const paths = (products || []).map((product) => ({
      params: { slug: product.slug },
    })).filter((p) => p.params.slug);
    return { paths, fallback: 'blocking' };
  } catch (e) {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const postsRes = await fetch(`${API_BASE}/products?slug=${params.slug}`);
    const data = await postsRes.json();
    const posts = Array.isArray(data) ? data : (data?.data || []);

    if (!posts || posts.length === 0) {
      return { notFound: true };
    }

    const postData = posts[0];
    let localBannerPath = null;

    // --- Image Caching for Product Hero ---
    if (postData?.Image?.url) {
      try {
        const bannerUrl = postData.Image.formats?.large?.url || postData.Image.url;
        const upstreamUrl = `${API_BASE}${bannerUrl}`;
        const filename = `product-${params.slug}-${path.basename(bannerUrl)}`;
        const publicDir = path.join(process.cwd(), 'public', 'uploads', 'product-cache');
        const filePath = path.join(publicDir, filename);
        const relativePath = `/uploads/product-cache/${filename}`;

        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        if (!fs.existsSync(filePath)) {
          await new Promise((resolve) => {
            https.get(upstreamUrl, (res) => {
              if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(filePath);
                pipeline(res, fileStream).then(() => resolve()).catch(() => resolve());
              } else {
                resolve();
              }
            }).on('error', () => resolve());
          });
        }

        if (fs.existsSync(filePath)) {
          localBannerPath = relativePath;
        }
      } catch (err) {
        // Fallback silently
      }
    }

    // --- Data Trimming ---
    const trimProduct = (p) => ({
      heading: p.heading || null,
      shortDescription: p.shortDescription || null,
      slug: p.slug || null,
      pageBlocks: p.pageBlocks || [],
      seoTitle: p.seoTitle || null,
      seoDescription: p.seoDescription || null,
      schema_script: p.schema_script || null,
      layout: p.layout || null,
      Image: p.Image || null,
      LocalBannerPath: localBannerPath,
      BrandsLogo: p.BrandsLogo || [],
      section2: p.section2 || null,
      section2_layout2: p.section2_layout2 || null,
      section3: p.section3 || null,
      section4: p.section4 || null,
      section5: p.section5 || null,
      section5_layout2: p.section5_layout2 || null,
      section5_layout2_tabs: p.section5_layout2_tabs || null,
      section6: p.section6 || null,
      section7: p.section7 || null,
      faqList: (p.faqList || []).filter(f => f.serviceFaqTitle?.trim() || f.serviceFaqDetails?.trim()),
    });

    return {
      props: {
        posts: [trimProduct(postData)],
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default ProductDetails;
