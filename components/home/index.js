import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Container, Row, Col } from "react-bootstrap";
const CountUp = dynamic(() => import("react-countup"), { ssr: false });
const HomeServicesCarousel = dynamic(() => import("./HomeServicesCarousel"), {
  loading: () => <div className="glimpses-slides-placeholder" style={{ minHeight: 380 }} aria-hidden="true" />,
});
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import Link from "next/link";
import ContactHref from '../common/ContactHref';
const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });
import Head from "next/head";
import MetaData from '../common/MetaData';
import { SITE_URL, resolveOgImage } from '../../lib/seo';
import { sanitizeJsonLdString } from '../../lib/jsonLdSanitize';
import { formatHeroTitleHtml } from '../../lib/formatHeroTitleHtml';
const HomeAnimation = dynamic(() => import("./HomeAnimation"), { ssr: false });
const HomeContent = dynamic(() => import("./HomeContent"));

const HERO_ROTATING_ITEMS = [
  "Unlock Digital Potential",
  "Build Your Dream Software",
  "Unleash the Power of Technology",
  "Partner with Best Software Experts",
];

const ReactRotatingTextComponent = dynamic(() => import('react-rotating-text'), {
  ssr: false,
  loading: () => <>{HERO_ROTATING_ITEMS[0]}</>,
});
import MainHeaderComponent from '../MainHeader';
import FooterComponent from '../Footer';
import LazyWhenVisible from '../LazyWhenVisible';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, LuMoveRight, MdUpdate, GoChecklist, AiOutlineDeploymentUnit, TbWorldCheck, TbHierarchy, BsGlobe, PiUserFocusLight } from '../OptimizedIcons';









const Faqs = dynamic(() => import('../common/CommonFaqs'));
const BlogPosts = dynamic(() => import('../common/ArticlesView'));
const NewsComponent = dynamic(() => import('../common/PressSlider'));
const CaseStudyComponent = dynamic(() => import('../common/CaseStudy'));
const ClientReviewComponent = dynamic(() => import('../common/ClientReview'));
const AwardDevComponent = dynamic(() => import('./AwardDev'));
const TechStackComponent = dynamic(() => import('../common/TechStack'));
const TalkExpertComponent = dynamic(() => import('../common/TalkExpert'));


const DEFAULT_HERO_TITLE = "Crafting Reliable Solutions Together with Atlanta's App Developers";

const HomePage = ({ initialBlogs = [], initialPresses = [], initialReviews = [], homepage = null }) => {
  const seo = homepage?.seo || {};
  const hero = homepage?.hero || {};
  const about = homepage?.AboutAppzoro || {};
  const awards = homepage?.awards || {};
  const pressCarousel = homepage?.pressCarousel || {};
  const testimonials = homepage?.testimonials || {};
  const heroTitle = (hero.title && String(hero.title).trim()) || DEFAULT_HERO_TITLE;
  const rotatingItems =
    Array.isArray(hero.subtitles) && hero.subtitles.length > 0
      ? hero.subtitles.map((s) => (typeof s === 'string' ? s : s?.text || '')).filter(Boolean)
      : HERO_ROTATING_ITEMS;
  const heroVideoUrl = (hero.video_link && String(hero.video_link).trim()) || 'https://vimeo.com/957195782';
  const primaryLink = Array.isArray(hero.links) && hero.links[0] ? hero.links[0] : null;
  const secondaryLink = Array.isArray(hero.links) && hero.links[1] ? hero.links[1] : null;
  const ogImage = (() => {
    const raw = seo?.ogImage;
    const cmsUrl =
      typeof raw === 'string'
        ? raw
        : raw?.url || raw?.URL || '';
    if (!cmsUrl || !String(cmsUrl).trim()) {
      return resolveOgImage('/assets/images/az-logo-large.png');
    }
    const url = String(cmsUrl).trim();
    if (/^https?:\/\//i.test(url)) {
      return url.replace(/([^:]\/)\/+/g, '$1');
    }
    if (url.startsWith('/assets/')) {
      return resolveOgImage(url);
    }
    if (url.startsWith('/uploads/')) {
      const adminBase = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(
        /\/+$/,
        '',
      );
      return `${adminBase}${url}`;
    }
    return resolveOgImage(url);
  })();
  const [scrollPixels, setScrollPixels] = useState(0);
  const [playIntroVideo, setPlayIntroVideo] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pixels = window.scrollY || window.pageYOffset;
      setScrollPixels(pixels);
      if (pixels > 10) {
        setHasScrolled(true);
      }
      if (pixels > 400 && pixels < 1100) {
        setPlayIntroVideo(true);
      } else {
        setPlayIntroVideo(false);
      }
    };

    // Check on mount in case already scrolled
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const CustomPlayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24"
      height="24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
  return (
    <>
      <MetaData
        title={seo.seoTitle || "Atlanta's Top Mobile and Web App Developers | AppZoro"}
        description={
          seo.seoDescription ||
          'Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions.'
        }
        url="/"
        image={ogImage}
        robots={seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <Head>
        <meta name="msvalidate.01" content="B7CA750DFB954728824AA5A1D0D54A8E" />
        {(() => {
          const cleanedSchema = seo.schemaCode
            ? sanitizeJsonLdString(String(seo.schemaCode), { stripFaqPage: true })
            : '';
          return cleanedSchema ? (
            <script
              type="application/ld+json"
              className="yoast-schema-graph"
              dangerouslySetInnerHTML={{ __html: cleanedSchema }}
            />
          ) : null;
        })()}
        {!seo.schemaCode ? (
        <>
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"${SITE_URL}/#organization","url":"${SITE_URL}","name":"Appzoro Technologies","sameAs":[]},{"@type":"WebSite","@id":"${SITE_URL}/#website","url":"${SITE_URL}","name":"Appzoro Technologies","publisher":{"@id":"${SITE_URL}/#organization"}},{"@type":"WebPage","@id":"${SITE_URL}/#webpage","url":"${SITE_URL}","inLanguage":"en-US","name":"Software and App Development Company USA","isPartOf":{"@id":"${SITE_URL}/#website"},"datePublished":"2016-04-23T00:09:11-08:00","dateModified":"2026-05-20T00:00:00-08:00","description":"Appzoro is a trusted and reliable software development company in USA, providing full-fledged software development services to drive business growth."}]}`,
          }}
        />
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@type":"LocalBusiness","name":"Appzoro Technologies","address":{"@type":"PostalAddress","addressCountry":"US","streetAddress":"3423 Piedmont Rd NE, STE 320","addressLocality":"Atlanta","addressRegion":"GA","postalCode":"30305"},"priceRange":"$$$","email":"info@appzoro.com","telephone":"+1 678-462-4034","openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"10:00","closes":"16:00"}],"geo":{"@type":"GeoCoordinates","latitude":"33.848650","longitude":"-84.373370"},"image":"${SITE_URL}/assets/images/logo.png"}`,
          }}
        />
        {/* <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "http://schema.org","@type": "BreadcrumbList","itemListElement":[{"@type": "ListItem","position": 1,"item":{"@id": "https://appzoro.com","name": "Home"}}]}`,
          }}
        ></script> */}
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org","@type": "Service","name": "Software and App Development Company USA","provider": {"@type": "Organization","name": "Appzoro Technologies","url": "https://appzoro.com/"},"description": "Appzoro is a trusted and reliable software development company in USA, providing full-fledged software development services to drive business growth.","url": "https://appzoro.com","mainEntityOfPage": "https://appzoro.com","areaServed": "United States","serviceType": ["Mobile App Development","Website Development Services","Custom Software Development","iOS App Development","IOT Development Services","Cross Platform App Development","UI/UX Development","AI and ML Development","Retail and Ecommerce App Development","On Demand App Development Company","Healthcare App Development","Education App Development","Fintech Software Development"],"sameAs": ["https://www.facebook.com/AppZoroT/","https://twitter.com/AppzoroT","https://www.linkedin.com/company/appzoro/", "https://www.instagram.com/appzoro_technologies/?hl=en","https://www.youtube.com/channel/UCTDITNsY5Z_TmXvF2KtYQFg"]}`,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoObject',
              name: 'AppZoro Technologies — Company Introduction',
              description:
                'Introduction to AppZoro Technologies, an Atlanta-based mobile and web app development agency.',
              thumbnailUrl: `${SITE_URL}/assets/images/banner.png`,
              uploadDate: '2024-05-01T00:00:00-04:00',
              contentUrl: heroVideoUrl,
              embedUrl: heroVideoUrl,
              publisher: {
                '@type': 'Organization',
                name: 'Appzoro Technologies',
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/images/az-logo-large.png` },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org","@type": "VideoObject","name": "Mobile and Web App Solutions Delivered. Atlanta, GA","description": "Appzoro Technologies software development overview video.","thumbnailUrl": ["${STRAPI_IMAGE_BASE_URL}/uploads/transform_your_business_online_with_appzoro_1293cb8fe5.png"],"uploadDate": "2024-05-15T08:00:00+08:00","duration": "PT0M33S","contentUrl": "${SITE_URL}/assets/images/appzoro_intro.mp4","embedUrl": "https://www.youtube.com/embed/0cpWor2aw78","regionsAllowed": "US"}`,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org","@type": "WebSite","name": "Appzoro Technologies","url": "https://appzoro.com/","potentialAction": {"@type": "SearchAction","target": {"@type": "EntryPoint","urlTemplate": "https://query.appzoro.com/search?q={search_term_string}"},"query-input": "required name=search_term_string"}}`,
          }}
        ></script>
        {/* FAQPage JSON-LD is emitted by <CommonFaqs /> from the same data it renders,
            guaranteeing schema ↔ DOM correspondence. Do not re-add a hardcoded FAQPage here. */}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org/", "@type": "Product", "name": "AppZoro Technologies","image": "${REACT_APP_API_URL}/assets/images/logo.png","description": "Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions","brand": {"@type": "Brand","name": "AppZoro Inc."},"aggregateRating": {"@type": "AggregateRating","ratingValue": "4.8","bestRating": "5","worstRating": "3.5","ratingCount": "16"}}`,
          }}
        ></script> */}
        </>
        ) : null}
      </Head>

      <MainHeaderComponent />

      <section className="az-home-section1">
        <Image src="/assets/images/banner.png" fill priority style={{ objectFit: 'cover', objectPosition: 'left top', zIndex: -1 }} alt="" />
        <Container>
          <Row className="align-items-center">
            <Col md="6" lg="6" xs="12">
              <div className="home-intro">
                <div>
                  <h1 dangerouslySetInnerHTML={{ __html: formatHeroTitleHtml(heroTitle) }} />
                  <h2>
                    <span className="hero-h2-line">Connect</span>
                    <span className="hero-h2-line">to <span className="mob-rotate">{rotatingItems.join(' · ')}</span><span className="desktop-rotate"><ReactRotatingTextComponent items={rotatingItems} /></span></span>
                    <span className="hero-h2-sr">{rotatingItems.join('. ')}</span>
                  </h2>
                </div>
                <div className="az_home-btns">
                  <ContactHref href={primaryLink?.url || primaryLink?.URL || '/contact-us'} className="btn-style-arrow me-3">
                    {primaryLink?.title || primaryLink?.Title || 'Contact Us'}{" "}
                    <span>
                      <LuMoveRight />
                    </span>
                  </ContactHref>
                  <Link href={secondaryLink?.url || secondaryLink?.URL || '/case-study'} className="btn-style-arrow">
                    {secondaryLink?.title || secondaryLink?.Title || 'View Portfolio'}{" "}
                    <span>
                      <LuMoveRight />
                    </span>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md="6" lg="6" xs="12">
              <div className="home-intro-anim">
                <div className="az_home_icon3 icon-animation">
                  <Image
                    priority
                    src="/assets/images/triangle.png"
                    width={"87"}
                    height={"72"}
                    alt=""
                  />
                </div>
                <div className="az_home_icon2 icon-animation">
                  <Image
                    priority
                    src="/assets/images/circle2.png"
                    width={"61"}
                    height={"69"}
                    alt=""
                  />
                </div>
                <div className="az-home-animation">
                  <HomeAnimation />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="video-section">
        <Container>
          <div className="video-counter">
            <div className="video-block">
              {hasScrolled && (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  playIcon={<CustomPlayIcon />}
                  playing={playIntroVideo}
                  controls={false}
                  loop={true}
                  suppressHydrationWarning
                  url={heroVideoUrl}
                />
              )}
            </div>

            <div className="counter-container">
              <Row>
                <Col md="3" lg="3" xs="6">
                  <div className="counter-num">
                    <Image
                      src="/assets/images/counter_icon1.png"
                      width="59"
                      height="67"
                      alt=""
                    />
                    <div className="counter-number-text">
                      {hasScrolled ? (
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
                </Col>
                <Col md="3" lg="3" xs="6">
                  <div className="counter-num">
                    <Image
                      src="/assets/images/counter_icon2.png"
                      width="67"
                      height="67"
                      alt=""
                    />
                    <div className="counter-number-text">
                      {hasScrolled ? (
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
                </Col>
                <Col md="3" lg="3" xs="6">
                  <div className="counter-num">
                    <Image
                      src="/assets/images/counter_icon3.png"
                      width="64"
                      height="67"
                      alt=""
                    />
                    <div className="counter-number-text">
                      {hasScrolled ? (
                        <>
                          <CountUp delay={1} duration={1} end={150} />+
                        </>
                      ) : (
                        "150+"
                      )}
                    </div>
                    <p>Happy Clients</p>
                  </div>
                </Col>
                <Col md="3" lg="3" xs="6">
                  <div className="counter-num">
                    <Image
                      src="/assets/images/counter_icon4.png"
                      width="67"
                      height="67"
                      alt=""
                    />
                    <div className="counter-number-text">
                      {hasScrolled ? (
                        <>
                          <CountUp delay={1} duration={1} end={200} />+
                        </>
                      ) : (
                        "200+"
                      )}
                    </div>
                    <p>Products Built</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
      <LazyWhenVisible minHeight={480}>
        <CaseStudyComponent />
      </LazyWhenVisible>

      <section className="home-services">
        <Container>
          <div className="section-title-dark text-center">
            <h2>
              Our <span>Software Development</span> Services
            </h2>
            <p>
              Do you want to leverage technology investments in custom software
              to bring new business to life? Our experienced team in product
              management, design and development can help build complex software
              ecosystems across multiple touchpoints.
            </p>
            <p>
              We drive the business value of tech investments.
            </p>
          </div>
          {hasScrolled ? (
            <div className="glimpses-slides" style={{ minHeight: 380 }}>
              <HomeServicesCarousel />
              <div className="prev_glimpses"><MdOutlineKeyboardArrowLeft /></div>
              <div className="next_glimpses"><MdOutlineKeyboardArrowRight /></div>
            </div>
          ) : (
            <>
              <Row>
                <Col xs="12" md="3">
                  <div className="service_box">
                    <Image src="/assets/images/service-customer-supply.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
                    <Link href="/services/custom-software-development-company-usa">
                      <div className="service-icon">
                        <Image
                          src="/assets/images/cpad.png"
                          alt="Service"
                          width="50"
                          height="50"
                        />
                      </div>
                      <h3 className="text-capitalize">
                        Custom Software Development
                      </h3>
                      <p>
                        AppZoro delivers innovative custom software solutions
                        for businesses of all sizes and types, adding on with
                        top quality, ROI, and user attraction.
                      </p>
                      <div className="service-tech">
                        <div className="lang_tag">
                          <span>Java</span>
                        </div>
                        <div className="lang_tag">
                          <span>Python</span>
                        </div>
                        <div className="lang_tag">
                          <span>Javascript</span>
                        </div>
                        <div className="lang_tag">
                          <span>php</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="service_box">
                    <Image src="/assets/images/service-mobile-app-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="" />
                    <Link href="/services/mobile-app-development-company-usa">
                      <div className="service-icon">
                        <Image
                          src="/assets/images/mad.png"
                          alt="Service"
                          width="50"
                          height="50"
                        />
                      </div>
                      <h3 className="text-capitalize">
                        Mobile app development
                      </h3>
                      <p>
                        AppZoro has expertise in building high-performing
                        native, cross-platform, and progressive web apps with
                        eye-catching design & unique features.
                      </p>
                      <div className="service-tech">
                        <div className="lang_tag">
                          <span>iOS</span>
                        </div>
                        <div className="lang_tag">
                          <span>Android</span>
                        </div>
                        <div className="lang_tag">
                          <span>Kotlin</span>
                        </div>
                        <div className="lang_tag">
                          <span>Swift</span>
                        </div>
                        <div className="lang_tag">
                          <span>React-Native</span>
                        </div>
                        <div className="lang_tag">
                          <span>Flutter</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="service_box">
                    <Image src="/assets/images/service-web-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="" />
                    <Link href="/services/web-app-development">
                      <div className="service-icon">
                        <Image
                          src="/assets/images/wad.png"
                          alt="Service"
                          width="57"
                          height="50"
                        />
                      </div>
                      <h3 className="text-capitalize">
                        Web App Development
                      </h3>
                      <p>
                        Web application development services offered by AppZoro
                        yield benefits to companies of any type or size.
                      </p>
                      <div className="service-tech">
                        <div className="lang_tag">
                          <span>HTML</span>
                        </div>
                        <div className="lang_tag">
                          <span>CSS</span>
                        </div>
                        <div className="lang_tag">
                          <span>React</span>
                        </div>
                        <div className="lang_tag">
                          <span>Angular</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="service_box">
                    <Image src="/assets/images/service-iot-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="" />
                    <Link href="/services/iot-development-services">
                      <div className="service-icon">
                        <Image
                          src="/assets/images/dpd.png"
                          alt="Service"
                          width="50"
                          height="50"
                        />
                      </div>
                      <h3 className="text-capitalize">IOT App Development</h3>
                      <p>
                        AppZoro develops tech-advanced IoT applications to
                        improve efficiency and accuracy in human life. We are
                        proficient in IoT and can ease your business process.{" "}
                      </p>
                      <div className="service-tech">
                        <div className="lang_tag">
                          <span>Python</span>
                        </div>
                        <div className="lang_tag">
                          <span>C++</span>
                        </div>
                        <div className="lang_tag">
                          <span>swift</span>
                        </div>
                        <div className="lang_tag">
                          <span>Kotlin</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
      <section className="industry-section">
        <Container>
          <Row className="align-items-center">
            <Col md="3" lg="3" xs="12">
              <div className="ind_block1">
                <Image
                  alt="AppZoro Technologies"
                  src="/assets/images/ind.png"
                  width="208"
                  height="291"
                />
                <h3>
                  Build It With <br />
                  AppZoro Technologies
                </h3>
                <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                  Contact Us{" "}
                  <span>
                    <LuMoveRight />
                  </span>
                </ContactHref>
              </div>
            </Col>
            <Col md="6" lg="6" xs="12">
              <div className="ind-block2">
                <h2>Custom IT Solutions for Various Industries</h2>
                <p>
                  Our core experiences and profound expertise have added values
                  to various industries.
                </p>
                <Link href="/industry" className="btn-arrow-transparent">
                  Industries We Serve{" "}
                  <span>
                    <LuMoveRight />
                  </span>
                </Link>
                <div className="moving_tags">
                  <div className="moving-tags_path1">
                    <Marquee direction="right">
                      <span>Retail & ECommerce</span>
                      <span>Real Estate</span>
                      <span>Healthcare and Fitness</span>
                      <span>E-learning & Education</span>
                    </Marquee>
                  </div>
                  <div className="moving-tags_path2">
                    <Marquee direction="left">
                      <span>Food & Restaurant </span>
                      <span>Sports & Games</span>
                      <span>Travel & Hospitality</span>
                      <span>Fintech</span>
                    </Marquee>
                  </div>
                  <div className="moving-tags_path3">
                    <Marquee direction="right">
                      <span>Social Networking</span>
                      <span>Media and Entertainment</span>
                      <span>Meetings and Events</span>
                      <span>Logistics & Transport</span>
                    </Marquee>
                  </div>
                  <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }} aria-hidden="true">
                    Industries we serve: Retail & ECommerce, Real Estate, Healthcare and Fitness, E-learning & Education, Food & Restaurant, Sports & Games, Travel & Hospitality, Fintech, Social Networking, Media and Entertainment, Meetings and Events, Logistics & Transport.
                  </span>
                </div>
              </div>
            </Col>
            <Col md="3" lg="3" xs="12">
              <div className="ind_enterprenuer">
                <Image
                  // 
                  src="/assets/images/ind_enterprenure.webp"
                  width="301"
                  height="158"
                  alt="AppZoro Technologies"
                />
                <h3>Entrepreneur</h3>
              </div>
              <div className="ind_enterprenuer">
                <Image
                  src="/assets/images/ind_mid_size_business.webp"
                  width="301"
                  height="158"
                  alt="AppZoro Technologies"
                />
                <h3>Small Business</h3>
              </div>
              <div className="ind_enterprenuer">
                <Image
                  src="/assets/images/ind_small_business.webp"
                  width="301"
                  height="158"
                  alt="AppZoro Technologies"
                />
                <h3>Mid-Size Business</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <LazyWhenVisible minHeight={380}>
        <ClientReviewComponent
          initialReviews={initialReviews}
          cmsTestimonials={testimonials?.list}
          sectionTitle={testimonials?.title}
        />
      </LazyWhenVisible>
      {/* <ClutchScript /> */}
      <LazyWhenVisible minHeight={340}>
        <AwardDevComponent awards={awards} />
      </LazyWhenVisible>
      <section className="sd-process">
        <Container>
          <div className="section-title">
            <h3>
              <span>Software</span> Development Process We Follow
            </h3>
          </div>
          <div className="sd-process-flow">
            <div className="sd-connect">
              <span className="hex">
                <GoChecklist />
              </span>
              <span className="process-name">Requirement Analysis</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <PiUserFocusLight />
              </span>
              <span className="process-name">Resource Planning</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <TbHierarchy />
              </span>
              <span className="process-name">Design & Prototyping</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <BsGlobe />
              </span>
              <span className="process-name">Software Development</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <TbWorldCheck />
              </span>
              <span className="process-name">Testing</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <MdUpdate />
              </span>
              <span className="process-name">Maintenance & Updates</span>
            </div>
            <div className="sd-connect">
              <span className="hex">
                <AiOutlineDeploymentUnit />
              </span>
              <span className="process-name">Deployment</span>
            </div>
          </div>
        </Container>
      </section>
      <LazyWhenVisible minHeight={280}>
        <TechStackComponent />
      </LazyWhenVisible>
      <HomeContent about={about} homeContent={hero} />
      <LazyWhenVisible minHeight={200}>
        <NewsComponent
          initialPresses={initialPresses}
          pressItems={pressCarousel?.list}
          sectionTitle={pressCarousel?.title}
        />
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={360}>
        <BlogPosts initialBlogs={initialBlogs} />
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={280}>
        <Faqs />
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={180}>
        <TalkExpertComponent />
      </LazyWhenVisible>
      <FooterComponent />
    </>
  );
};

export default HomePage;
