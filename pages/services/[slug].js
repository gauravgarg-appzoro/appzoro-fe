import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CountUp = dynamic(() => import("react-countup"), { ssr: false });
import MetaData from "../../components/common/MetaData";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { rewriteLegacyWpContentUploadsToAbsolute } from "../../lib/rewriteLegacyWpMedia";
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";
import { setEdgeCache } from "../../lib/edgeCache";
import RichText from "../../components/common/RichText";
import { useClientMounted } from "../../lib/useClientMounted";
import SeoJsonLd from "../../components/common/SeoJsonLd";
import { buildBreadcrumbSchema, buildServiceSchema, buildWebPageSchema } from "../../lib/schemaBuilders";
import { absoluteUrl } from "../../lib/seo";
import CaseStudy from "../../components/common/CaseStudy";
import ServiceAwards from "../../components/common/ServiceAwards";
// import LocationsSlide from "../../components/common/LocationsSlide";
const TechStack = dynamic(() => import("../../components/common/TechStack"));
const ClientReview = dynamic(() => import("../../components/common/ClientReview"));
const ArticlesView = dynamic(() => import("../../components/common/ArticlesView"));
const TalkExpert = dynamic(() => import("../../components/common/TalkExpert"));
const ServiceFaqs = dynamic(() => import("../../components/common/ServiceFaqs"));
const ContentExpandCollapse = dynamic(() => import("../../components/common/ContentExpandCollapse"));
const ServiceWhySection = dynamic(() => import("../../components/common/ServiceWhySection"));
const AppDevelopmentPartners = dynamic(() => import("../../components/common/AppDevelopmentPartners"));
const ConnectWIthExpert = dynamic(() => import("../../components/common/ConnectWIthExpert"));
import Head from "next/head";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdUpdate, LuMoveRight, GoChecklist, PiUserFocusLight, TbHierarchy, TbWorldCheck, BsGlobe, AiOutlineDeploymentUnit } from '../../components/OptimizedIcons';
const ReactMarkdown = dynamic(() => import("react-markdown"));
const BlockRenderer = dynamic(() => import("../../components/page-builder/BlockRenderer"));

// ── New Jayesh-branch reusable components (dynamic, lazy-loaded) ──
const ServiceHeroBanner = dynamic(() => import("../../components/common/ServiceHeroBanner"));
const ServiceCardsGrid = dynamic(() => import("../../components/common/ServiceCardsGrid"));
const ServiceCTABanner = dynamic(() => import("../../components/common/ServiceCTABanner"));
const ServiceFlipCards = dynamic(() => import("../../components/common/ServiceFlipCards"));
const ServiceSlideCards = dynamic(() => import("../../components/common/ServiceSlideCards"));
const ServiceProcessTimeline = dynamic(() => import("../../components/common/ServiceProcessTimeline"));
const ServiceWhyChooseCards = dynamic(() => import("../../components/common/ServiceWhyChooseCards"));
const ServiceIndustryMarquee = dynamic(() => import("../../components/common/ServiceIndustryMarquee"));
const ServicePortfolioShowcase = dynamic(() => import("../../components/common/ServicePortfolioShowcase"));
const ServiceStatsSection = dynamic(() => import("../../components/common/ServiceStatsSection"));
const ServiceTechStackTabs = dynamic(() => import("../../components/common/ServiceTechStackTabs"));
const ServiceBenefitsAccordion = dynamic(() => import("../../components/common/ServiceBenefitsAccordion"));
const ServiceCategoryFAQ = dynamic(() => import("../../components/common/ServiceCategoryFAQ"));
const ServiceAboutSection = dynamic(() => import("../../components/common/ServiceAboutSection"));
const ServiceClientReview = dynamic(() => import("../../components/common/ServiceClientReview"));

const ServiceDetails = ({ posts: initialPosts, services: initialServices }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [activeServiceTab, setActiveServiceTab] = useState(null);

  useEffect(() => {
    setPosts(initialPosts || []);
  }, [initialPosts]);
  const postData = posts && posts.length > 0 ? posts[0] : null;
  const hasPageBlocks = postData?.pageBlocks && Array.isArray(postData.pageBlocks) && postData.pageBlocks.length > 0;

  // Detect which modern sections have data — used to decide whether to show old fallback sections
  const hasModernCards    = postData?.serviceCards?.length > 0;
  const hasModernProcess  = postData?.processSteps?.length > 0;
  const hasModernTech     = !!postData?.techStackTabs;
  const hasModernStats    = !!postData?.statsSection;
  const hasModernFaqs     = postData?.faqCategories?.categories?.length > 0;
  // Modern template: check templateType OR presence of serviceAboutTitle/Description
  const isModernTemplate  = postData?.templateType === 'modern';
  const hasModernAbout    = !!(postData?.serviceAboutTitle || postData?.serviceAboutDescription || isModernTemplate);

  const clientReady = useClientMounted();

  const router = useRouter();

  useEffect(() => {
    const firstTabId = postData?.serviceTab?.[0]?.id;
    setActiveServiceTab(firstTabId || null);
  }, [postData?.slug, postData?.serviceTab]);

  // Fallback client-side fetch for the current service if props are missing
  useEffect(() => {
    if ((!posts || posts.length === 0) && router.query.slug) {
      console.log("Triggering client-side fallback fetch for service slug:", router.query.slug);
      fetch(`${API_BASE}/services?slug=${router.query.slug}`)
        .then(res => res.json())
        .then(data => {
          const fetchedPosts = (Array.isArray(data) ? data : (data?.data || [])).filter(isPublishedService);
          if (fetchedPosts.length > 0) setPosts(fetchedPosts);
        })
        .catch(err => console.error("Service fallback fetch failed", err));
    }
  }, [posts, router.query.slug]);

  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e, sectionId) => {
    // Preserve native modifier-key semantics (Cmd/Ctrl/Shift/Alt+click)
    // so users can still open section anchors in new tab, copy link, etc.
    // Only hijack plain left-click for smooth-scroll UX.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    scrollToSection(sectionId, 80); // Adjust the offset as needed (e.g., for a fixed header height)
  };

  const serviceUrl = postData?.slug ? `/services/${postData.slug}` : '/services';
  const serviceTitle = postData?.seoTitle || postData?.serviceTitle || 'Software Development Services | AppZoro';
  const serviceDesc = postData?.seoDescription || postData?.ServiceShortDescription || 'Custom software and app development services from AppZoro.';
  const serviceImage = postData?.serviceBanner?.url
    ? `${STRAPI_IMAGE_BASE_URL}${postData.serviceBanner.url}`
    : absoluteUrl('/assets/images/az-logo-large.png');
  const hasCmsSchema = Boolean(
    sanitizeJsonLdString(
      rewriteLegacyWpContentUploadsToAbsolute(String(postData?.schema_script || ''), STRAPI_IMAGE_BASE_URL),
      { stripFaqPage: true },
    ),
  );

  return (
    <>
      <MetaData
        title={serviceTitle}
        description={serviceDesc}
        url={serviceUrl}
        image={serviceImage}
        robots={postData?.robots_meta || postData?.robotsMeta}
      />
      {!hasCmsSchema && postData && (
        <SeoJsonLd
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: postData.serviceTitle || 'Service', url: serviceUrl },
            ]),
            buildServiceSchema({
              name: postData.serviceTitle || serviceTitle,
              description: serviceDesc,
              url: serviceUrl,
              image: serviceImage,
            }),
            buildWebPageSchema({
              name: serviceTitle,
              description: serviceDesc,
              url: serviceUrl,
              image: serviceImage,
            }),
          ]}
        />
      )}
      <Head>
        <link rel="preconnect" href={STRAPI_IMAGE_BASE_URL} />
        {(() => {
          const cleanedSchema = sanitizeJsonLdString(
            rewriteLegacyWpContentUploadsToAbsolute(String(postData?.schema_script || ''), STRAPI_IMAGE_BASE_URL),
            { stripFaqPage: true },
          );
          return cleanedSchema ? (
            <script
              type="application/ld+json"
              className="yoast-schema-graph"
              dangerouslySetInnerHTML={{ __html: cleanedSchema }}
            ></script>
          ) : null;
        })()}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "contentUrl": `${STRAPI_IMAGE_BASE_URL}${postData?.serviceBanner?.url || ''}`,
              "license": "https://appzoro.com/",
              "acquireLicensePage": "https://appzoro.com/contact-us",
              "creditText": "Appzoro Technologies",
              "creator": {
                "@type": "Organization",
                "name": "Appzoro Technologies"
              },
              "copyrightNotice": "Appzoro Technologies"
            }),
          }}
        />
      </Head>
      <MainHeader />
      {postData !== null ? (
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
          <section className={`page-title service-page-banner${hasModernAbout ? ' ai-hero-section' : ''}`} style={{ position: "relative" }}>
            <Image
              src={`${STRAPI_IMAGE_BASE_URL}${postData?.serviceBanner?.formats?.large?.url || postData?.serviceBanner?.formats?.medium?.url || postData?.serviceBanner?.url || ''}`}
              alt={postData?.serviceTitle || "Service Banner"}
              fill
              priority={true}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              quality={60}
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{ objectFit: "cover", zIndex: -1 }}
            />
            <Container>
              <Row className="align-items-center justify-content-center">
                <Col lg="10" md="12">
                  <div className="page-section-title service-title text-center">
                    <h1>{postData?.serviceTitle}</h1>
                    <p>{postData?.ServiceShortDescription || ""}</p>
                    <div className={`service-action-btns mt-4 d-flex flex-wrap justify-content-center gap-2 gap-sm-3`}>
                      <Link href="#expertConnect" onClick={(e) => handleScroll(e, "expertConnect")} className={hasModernAbout ? "ai-gradient-btn" : "btn-style-arrow"}>
                        {hasModernAbout ? "Talk to Our AI Experts" : "Let's Talk"}{" "}
                        <span><LuMoveRight /></span>
                      </Link>
                      {!hasModernAbout && (
                        <Link href="/case-study" className="btn-style-arrow">
                          View Portfolio{" "}
                          <span><LuMoveRight /></span>
                        </Link>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              {hasModernAbout ? (
                <ServiceHeroBanner />
              ) : (
                <div className="trusted-by">
                  <div className="trusted-by-title">Trusted By</div>
                  <div className="trusted-by-logo">
                    <Image
                      src="/assets/images/clutch-2020.png"
                      width={65}
                      height={70}
                      alt="Clutch"
                    />
                    <Image
                      src="/assets/images/appfutrrra.png"
                      width={94}
                      height={70}
                      alt="appFutura"
                    />
                    <Image
                      src="/assets/images/aws.png"
                      width={189}
                      height={70}
                      alt="amazon web services"
                    />
                    <Image
                      src="/assets/images/csdc.png"
                      width={70}
                      height={70}
                      alt="App development US"
                    />
                  </div>
                </div>
              )}
            </Container>
          </section>

          <AppDevelopmentPartners />

          {hasModernAbout && (
            <ServiceAboutSection
              title={postData?.serviceAboutTitle || postData?.serviceInfoTitle}
              description={postData?.serviceAboutDescription || postData?.serviceInfoDescription}
              ctaText={postData?.serviceAboutCtaText || "Let's Talk"}
              ctaLink={postData?.serviceAboutCtaLink || "/contact-us"}
            />
          )}

          {!hasModernCards && (
            <section className="page-heads">
              <Container>
                <ul>
                  <li>
                    <Link href="#services" onClick={(e) => handleScroll(e, "services")}>Services</Link>
                  </li>
                  <li>
                    <Link href="#expertiese" onClick={(e) => handleScroll(e, "expertiese")}>Expertise</Link>
                  </li>
                  <li>
                    <Link href="#technologies" onClick={(e) => handleScroll(e, "technologies")}>Technologies</Link>
                  </li>
                  <li>
                    <Link href="#caseStudies" onClick={(e) => handleScroll(e, "caseStudies")}>Case Studies</Link>
                  </li>
                  <li>
                    <Link href="#whyChooseAz" onClick={(e) => handleScroll(e, "whyChooseAz")}>Why Choose Appzoro</Link>
                  </li>
                  <li>
                    <Link href="#process" onClick={(e) => handleScroll(e, "process")}>Process</Link>
                  </li>
                  <li>
                    <Link href="#faqs" onClick={(e) => handleScroll(e, "faqs")}>FAQ</Link>
                  </li>
                </ul>
              </Container>
            </section>
          )}
          {postData?.parentServices?.length > 0 && (
            <section id="services"
              className={`services-views pb-0 ${clientReady ? "asd" : "disabled-js-swiper"
                }`}
            >
              <Container>
                <div className="section-title-dark text-center mb-5">
                  <h2>{postData?.parentServiceTitle}</h2>
                </div>
                <div className="service-feature-slide clients-reviews">
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".prev_review",
                      nextEl: ".next_review",
                    }}
                    loop={true}
                    breakpoints={{
                      360: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                      },
                    }}
                  >
                    {Array.isArray(postData?.parentServices) && postData.parentServices.map((post) => (
                      <SwiperSlide key={post?.id}>
                        <div className="service-box">
                          <div className="service-box_img">
                            <Image
                              src={`${STRAPI_IMAGE_BASE_URL}${post?.mediaItem[0]?.formats?.thumbnail?.url || post?.mediaItem[0]?.url || ''}`}
                              width="72"
                              height="74"
                              alt={post?.name || "Service"}

                            />
                          </div>
                          <h3>{post?.name}</h3>
                          <RichText>{post?.content}</RichText>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="prev_review">
                    <MdOutlineKeyboardArrowLeft />
                  </div>
                  <div className="next_review">
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </div>
              </Container>
            </section>
          )}
          {!hasModernStats && (
            <section className="service-counter py-4">
              <Container>
                <div className="counter-container">
                  <Row>
                    <Col md="3" lg="3" xs="6">
                      <div className="counter-num">
                        <div className="counter-icon">
                          <Image
                            src="/assets/images/counter_icon1_theme.png"
                            width="59"
                            height="67"
                            alt=""

                          />
                        </div>
                        <div className="counter-text">
                          <div className="counter-number-text">
                            {clientReady ? (
                              <>
                                <CountUp delay={1} duration={1} end={150} /> +
                              </>
                            ) : (
                              "150+"
                            )}
                          </div>
                          <p>
                            Years of Combined <br />
                            Team Experience
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md="3" lg="3" xs="6">
                      <div className="counter-num">
                        <div className="counter-icon">
                          <Image
                            src="/assets/images/counter_icon2_theme.png"
                            width="67"
                            height="67"
                            alt=""

                          />
                        </div>
                        <div className="counter-text">
                          <div className="counter-number-text">
                            {clientReady ? (
                              <>
                                <CountUp delay={1} duration={1} end={5} />
                                M+
                              </>
                            ) : (
                              "5M+"
                            )}
                          </div>
                          <p>
                            Lines of Code <br />
                            Written
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md="3" lg="3" xs="6">
                      <div className="counter-num">
                        <div className="counter-icon">
                          <Image
                            src="/assets/images/counter_icon3_theme.png"
                            width="64"
                            height="67"
                            alt=""

                          />
                        </div>
                        <div className="counter-text">
                          <div className="counter-number-text">
                            {clientReady ? (
                              <>
                                <CountUp delay={1} duration={1} end={150} />+
                              </>
                            ) : (
                              "150+"
                            )}
                          </div>
                          <p>Happy Clients</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="3" lg="3" xs="6">
                      <div className="counter-num">
                        <div className="counter-icon">
                          <Image
                            src="/assets/images/counter_icon4_theme.png"
                            width="67"
                            height="67"
                            alt=""

                          />
                        </div>
                        <div className="counter-text">
                          <div className="counter-number-text">
                            {clientReady ? (
                              <>
                                <CountUp delay={1} duration={1} end={200} />+
                              </>
                            ) : (
                              "200+"
                            )}
                          </div>
                          <p>Products Built</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
          )}
          {!hasModernAbout && postData?.serviceInfoTitle && (
            <section className="why-az-service pt-4">
              <Container>
                <Row className="align-items-center">
                  <Col md="6" xs="12">
                    <div className="why-az-content">
                      <h2>{postData?.serviceInfoTitle}</h2>
                      <RichText>{postData?.serviceInfoDescription}</RichText>
                    </div>
                  </Col>
                  {postData?.serviceInfoMedia?.length > 0 && (
                    <Col md="6" xs="12">
                      <div className="service-info-img">
                        <Image
                          alt="service"
                          width="541"
                          height="690"
                          src={`${STRAPI_IMAGE_BASE_URL}${postData?.serviceInfoMedia[0]?.formats?.medium?.url || postData?.serviceInfoMedia[0]?.formats?.large?.url || postData?.serviceInfoMedia[0]?.url || ''}`}

                        />
                      </div>
                    </Col>
                  )}
                </Row>
              </Container>
            </section>
          )}
          {postData?.serviceTab?.length > 0 && (
            <section className="service-tabs-view" id="expertiese">
              <Container>
                <div className="section-title">
                  <h2>{postData?.serviceTabSectionTitlte}</h2>
                  <p>{postData?.serviceTabSectionSubTitle}</p>
                </div>

                <div className="services-tabs services-tabs-responsive">
                  <Tab.Container
                    id="service"
                    activeKey={activeServiceTab || postData?.serviceTab[0]?.id}
                    onSelect={(key) => setActiveServiceTab(key)}
                  >
                    <Nav variant="pills" className="flex-row">
                      {Array.isArray(postData?.serviceTab) && postData.serviceTab.map((item) => (
                        <Nav.Item key={item.id}>
                          <Nav.Link eventKey={item.id} key={item.id}>
                            {item.name}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    <Tab.Content>
                      {Array.isArray(postData?.serviceTab) && postData.serviceTab.map((item) => (
                        <Tab.Pane eventKey={item.id} key={item.id}>
                          <Row>
                            <Col md="6" xs="12">
                              <RichText>{item.content}</RichText>
                            </Col>

                            <Col md="6" xs="12">
                              <div className="service-tab-img">
                                <Image
                                  src={`${STRAPI_IMAGE_BASE_URL}${item?.mediaItem[0]?.formats?.medium?.url || item?.mediaItem[0]?.url || ''}`}
                                  width="541"
                                  height="360"
                                  alt="services"

                                />
                              </div>
                            </Col>
                          </Row>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </Container>
            </section>
          )}

          {/* ── Modern sections — rendered based on data, not template type ── */}
          {postData?.serviceCards?.length > 0 && (
            <ServiceCardsGrid sectionTitle={postData.serviceCardsTitle} cards={postData.serviceCards} />
          )}
          {postData?.ctaSections?.[0] && (
            <ServiceCTABanner {...postData.ctaSections[0]} />
          )}
          {postData?.flipCards?.length > 0 && (
            <ServiceFlipCards sectionTitle={postData.flipCardsTitle} cards={postData.flipCards} />
          )}
          {postData?.slideCards?.length > 0 && (
            <ServiceSlideCards sectionTitle={postData.slideCardsTitle} cards={postData.slideCards} />
          )}
          <ServiceAwards />
          {postData?.ctaSections?.[1] && (
            <ServiceCTABanner {...postData.ctaSections[1]} className="ai-cta-market-section" />
          )}
          {postData?.processSteps?.length > 0 && (
            <ServiceProcessTimeline
              sectionTitle={postData.processSectionTitle}
              sectionSubtitle={postData.processSectionSubtitle}
              steps={postData.processSteps}
            />
          )}
          {postData?.whyChooseCards?.length > 0 && (
            <ServiceWhyChooseCards sectionTitle={postData.whyChooseTitle} cards={postData.whyChooseCards} />
          )}
          {postData?.industries?.length > 0 && (
            <ServiceIndustryMarquee
              sectionTitle={postData.industriesTitle}
              industries={postData.industries}
              ctaText="Get Started"
              ctaLink="/contact-us"
            />
          )}
          {postData?.ctaSections?.[2] && (
            <ServiceCTABanner {...postData.ctaSections[2]} className="ai-lost-potential-cta" />
          )}
          <CaseStudy />
          {hasModernStats ? (
            <ServiceStatsSection
              title={postData.statsSection.title}
              subtitle={postData.statsSection.subtitle}
              stats={postData.statsSection.stats}
            >
              <ServiceClientReview />
            </ServiceStatsSection>
          ) : (
            <ServiceClientReview />
          )}
          {hasModernTech && (
            <ServiceTechStackTabs sectionTitle="Our Tech Stack" techStack={postData.techStackTabs} />
          )}
          {postData?.benefitsAccordion?.length > 0 && (
            <ServiceBenefitsAccordion sectionTitle={postData.benefitsTitle} benefits={postData.benefitsAccordion} />
          )}
          {hasModernFaqs && (
            <ServiceCategoryFAQ
              sectionTitle={postData.faqCategories.title || 'Frequently Asked Questions'}
              categories={postData.faqCategories.categories}
            />
          )}
        </>
        )
      ) : (
        <section className="no-data py-4">
          <Container>
            <div className="section-title-dark text-center">
              <p>
                The service record you are looking for could not be found.
                Double-check the URL or return to the services page to browse our offerings.
              </p>
            </div>
          </Container>
        </section>
      )}
      {!hasPageBlocks && (
        <>
      {(() => {
        const contentSections = postData?.content_sections?.length
          ? postData.content_sections
          : (postData?.content_section_title && postData?.content_section_info)
            ? [{ title: postData.content_section_title, info: postData.content_section_info }]
            : [];

        return contentSections.map((sec, idx) => (
          <ContentExpandCollapse
            key={`${sec?.title || sec?.info || idx}-${idx}`}
            title={sec?.title ?? sec?.content_section_title ?? ''}
            info={sec?.info ?? sec?.content_section_info ?? ''}
            dividerBelow={idx < contentSections.length - 1}
            compact={contentSections.length > 1}
          />
        ));
      })()}
      {/* <LocationsSlide /> */}
      {!hasModernTech && <TechStack />}
      {!hasModernStats && <ClientReview isDark={false} />}
      <ConnectWIthExpert />
      {Array.isArray(postData?.az_diff_list) &&
        postData.az_diff_list.length > 0 &&
        (postData?.az_diff_title || postData?.az_diff_subtitle || postData?.az_diff_info) && (
        <ServiceWhySection
          list={postData?.az_diff_list}
          title={postData?.az_diff_title}
          subtitle={postData?.az_diff_subtitle}
          info={postData?.az_diff_info}
        />
      )}
      {!hasModernProcess && (
        <section className="sd-process" id="process">
          <Container>
            <div className="section-title">
              <h3>
                <span>Software</span> Development Process We Follow
              </h3>
            </div>
            <ul className="sd-process-flow list-unstyled m-0 p-0 text-decoration-none" style={{ display: 'flex' }}>
              <li className="sd-connect">
                <span className="hex">
                  <GoChecklist />
                </span>
                <span className="process-name">Requirement Analysis</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <PiUserFocusLight />
                </span>
                <span className="process-name">Resource Planning</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <TbHierarchy />
                </span>
                <span className="process-name">Design & Prototyping</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <BsGlobe />
                </span>
                <span className="process-name">Software Development</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <TbWorldCheck />
                </span>
                <span className="process-name">Testing</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <MdUpdate />
                </span>
                <span className="process-name">Maintenance & Updates</span>
              </li>
              <li className="sd-connect">
                <span className="hex">
                  <AiOutlineDeploymentUnit />
                </span>
                <span className="process-name">Deployment</span>
              </li>
            </ul>
          </Container>
        </section>
      )}
      {!hasModernFaqs && postData?.servicesFaqsList?.length > 0 && (
        <ServiceFaqs faqData={postData?.servicesFaqsList} />
      )}
      <ArticlesView />
      <TalkExpert />
      <Footer />
        </>
      )}
    </>
  );
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');
const isPublishedService = (post) => Boolean(post?.published_at || post?.publishedAt);

const normalizeServiceForPage = (post) => {
  if (!post || typeof post !== 'object') return post;
  const normalized = { ...post };

  // Legacy + modern keys can both be present in API responses.
  // Keep modern keys used by this page and remove duplicate legacy aliases.
  if (normalized.parentServices && normalized.parent_service) {
    delete normalized.parent_service;
  }
  if (normalized.parentServices && normalized.parent_services) {
    delete normalized.parent_services;
  }
  if (normalized.parentServiceTitle && normalized.parent_service_title) {
    delete normalized.parent_service_title;
  }
  if (normalized.serviceTab && normalized.service_tabs) {
    delete normalized.service_tabs;
  }
  if (normalized.servicesFaqsList && normalized.services_faqs_list) {
    delete normalized.services_faqs_list;
  }
  if (normalized.content_sections && normalized.content_section) {
    delete normalized.content_section;
  }

  return normalized;
};

export async function getServerSideProps({ params, res: response }) {
  setEdgeCache(response, 'long');
  try {
    const res = await fetch(`${API_BASE}/services?slug=${params.slug}`);
    if (!res.ok) return { notFound: true };

    const data = await res.json();
    const posts = (Array.isArray(data) ? data : (data?.data || []))
      .filter(isPublishedService)
      .map(normalizeServiceForPage);

    if (!posts || posts.length === 0) {
      return { notFound: true };
    }

    return {
      props: { posts },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default ServiceDetails;
