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
import ContactHref from '../../components/common/ContactHref';
const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });
import Head from "next/head";
const HomeAnimation = dynamic(() => import("./HomeAnimation"), { ssr: false });
const HomeContent = dynamic(() => import("./HomeContent"));

const ReactRotatingTextComponent = dynamic(() => import('react-rotating-text'));
import MainHeaderComponent from '../../components/MainHeader';
import FooterComponent from '../../components/Footer';
import LazyWhenVisible from '../../components/LazyWhenVisible';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, LuMoveRight, MdUpdate, GoChecklist, AiOutlineDeploymentUnit, TbWorldCheck, TbHierarchy, BsGlobe, PiUserFocusLight } from '../../components/OptimizedIcons';









const Faqs = dynamic(() => import('../../components/common/CommonFaqs'));
const BlogPosts = dynamic(() => import('../../components/common/ArticlesView'));
const NewsComponent = dynamic(() => import('../../components/common/PressSlider'));
const CaseStudyComponent = dynamic(() => import('../../components/common/CaseStudy'));
const ClientReviewComponent = dynamic(() => import('../../components/common/ClientReview'));
const AwardDevComponent = dynamic(() => import('./AwardDev'));
const TechStackComponent = dynamic(() => import('../../components/common/TechStack'));
const TalkExpertComponent = dynamic(() => import('../../components/common/TalkExpert'));


const HomePage = () => {
  const [scrollPixels, setScrollPixels] = useState(0);
  const [playIntroVideo, setPlayIntroVideo] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [postData, setPostData] = useState([]);

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

  useEffect(() => {
    setPostData(["test", "test1", "test2"]);
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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title key="title">
          Atlanta's Top Mobile and Web App Developers | AppZoro
        </title>
        <meta
          name="title"
          content="Atlanta's Top Mobile and Web App Developers | AppZoro"
        />
        <meta
          name="description"
          content="Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions."
        />
        <meta
          property="og:title"
          content="Atlanta's Top Mobile and Web App Developers | AppZoro"
        />
        <meta
          property="og:description"
          content="Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://appzoro.com/" />
        <meta
          property="og:image"
          content={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
        />
        <meta property="twitter:url" content="https://appzoro.com/" />
        <meta
          name="twitter:title"
          content="Best Software Development Company in Atlanta | AppZoro Technologies"
        />
        <meta
          name="twitter:description"
          content="Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions."
        />
        <meta
          name="twitter:image"
          content={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
        />
        <meta
          property="twitter:card"
          content="summary_large_image - @AppZoroT"
        />
        <meta name="msvalidate.01" content="B7CA750DFB954728824AA5A1D0D54A8E" />
        <link rel="canonical" href="https://appzoro.com/" />

        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://appzoro.com/#organization","url":"https://appzoro.com","name":"Appzoro Technologies","sameAs":[]},{"@type":"WebSite","@id":"https://appzoro.com/#website","url":"https://appzoro.com","name":"Appzoro Technologies","publisher":{"@id":"https://appzoro.com/#organization"}},{"@type":"WebPage","@id":"https://appzoro.com/#webpage","url":"https://appzoro.com","inLanguage":"en-US","name":"Software and App Development Company USA","isPartOf":{"@id":"https://appzoro.com/#website"},"datePublished":"2016-23-04T00:09:11-08:00","dateModified":"2024-05-01T00:31:05-08:00","description":"Appzoro is a trusted and reliable software development company in USA, providing full-fledged software development services to drive business growth."}]}`,
          }}
        ></script>
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@type":"LocalBusiness","name":"Appzoro Technologies","address":{"@type":"PostalAddress","addressCountry":"US","streetAddress":"3423 Piedmont Rd NE, STE 320","addressLocality":"Atlanta","addressRegion":"GA","postalCode":"30305"},"pricerange":"$$$","email":"info@appzoro.com","telePhone":"+1 678-462-4034","openingHours":"Mo,Tu,We,Th,Fr, 10:00-16:00","openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"10:00","closes":"16:00"}],"geo":{"@type":"GeoCoordinates","latitude":"33.848650","longitude":"-84.373370"},"image":"${REACT_APP_API_URL}/assets/images/logo.png"}`,
          }}
        ></script>
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
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org","@type": "VideoObject","name": "Mobile and Web App Solutions Delivered. Atlanta, GA","description": "Appzoro Technologies is a software development company dedicated to offering creative and comprehensive software development solutions. The solutions are tailored to fulfill the requirements of clients. We have experienced professionals who are dedicated to offering creative solutions. They enable clients to stay ahead of their competitors. The development team has the potential to deliver an ingenious website that gives suitable information to users. This user base will convert into loyal customers in the future.","thumbnailUrl": ["${STRAPI_IMAGE_BASE_URL}/uploads/transform_your_business_online_with_appzoro_1293cb8fe5.png"],"uploadDate": "2024-05-15T08:00:00+08:00","duration": "PT0M33S","contentUrl": "${REACT_APP_API_URL}/assets/images/appzoro_intro.mp4","embedUrl": "https://www.youtube.com/embed/0cpWor2aw78?si=Z82RdDxo3lVt1fOT","interactionStatistic": {"@type": "InteractionCounter","interactionType": { "@type": "WatchAction" },"userInteractionCount": "5647018"},"regionsAllowed": "US"}`,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org","@type": "WebSite","name": "Appzoro Technologies","url": "https://appzoro.com/","potentialAction": {"@type": "SearchAction","target": {"@type": "EntryPoint","urlTemplate": "https://query.appzoro.com/search?q={search_term_string}"},"query-input": "required name=search_term_string"}}`,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much do I need to pay for an app development service?","acceptedAnswer":{"@type":"Answer","text":"If you are also wondering how much mobile application development costs, then there is no precise answer before knowing your project requirement. The price of an app project generally depends upon the platform, features, UI/UX, plugins, and complexities involved. However, let me give you a brief idea about the estimate of this service. The average beginning cost of developing a basic mobile application with simple and limited features is around $10,000 to $20,000. Further, the price of developing a medium complex app project falls anywhere between $60,000 to $100,000. This development cost may go as high as $200,000 or more than $300,000 depending upon the higher complexity of the project."}},{"@type":"Question","name":"How much time does it take to develop an app?","acceptedAnswer":{"@type":"Answer","text":"The time span for developing a mobile application varies on several factors such as what features you want, how complex is the app, what are the available resources, and their skill sets. In general, it takes around 6 to 16 weeks."}},{"@type":"Question","name":"Why are app development services so expensive?","acceptedAnswer":{"@type":"Answer","text":"App development is considered quite an expensive task to incur owing to various factors. Some of the key reasons behind this higher cost are the complexity and functionality of the app, the high-quality UI/UX involved, and the lack of expert resources. Furthermore, developing a mobile application is a time-consuming process. Besides looking after the security and compliance part, there also goes cost in the QA, testing, plugins purchasing, and post-launch maintenance and updates."}},{"@type":"Question","name":"Which is the best app development company in Atlanta?","acceptedAnswer":{"@type":"Answer","text":"Though there are a larger number of companies available in the state of Atlanta: not all of them are an expert. If you are looking for a result-driven trusted mobile app development company in Atlanta, then you can go with Appzoro. Carrying a team of seasoned developers and designers, Appzoro Technologies is the best in the business. So when you want to hire highly professional mobile app developers with profound experience in the app development business, connect Appzoro."}},{"@type":"Question","name":"What are the benefits of web and app development services?","acceptedAnswer":{"@type":"Answer","text":"In this rapidly evolving era of digitalization, when all your competitors are on Google, your presence is inevitable here. With engaging architecture infrastructure and a robust backend system, a professional build website gives your business a strong identity on the internet. You have streamlined operations, you eventually get more user engagement with an improved customer base, better sales, and enhanced revenue streams."}},{"@type":"Question","name":"How much does a web development service cost in Atlanta?","acceptedAnswer":{"@type":"Answer","text":"The cost of website development in Atlanta cost can range from $1500 to $150,000 on average. A simple business website with basic features can cost around $1000 while an e-commerce website can cost you between $2000 to $10,000. All the prices exclude annual maintenance spending. Moreover, the exact cost can be estimated after evaluating your business size, types, and scope. Now when you are looking for a reliable web development company in Atlanta, you can connect with Appzoro Technologies."}}]}`,
          }}
        ></script>
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org/", "@type": "Product", "name": "AppZoro Technologies","image": "${REACT_APP_API_URL}/assets/images/logo.png","description": "Appzoro Technologies is the leading software development company in USA that provides reliable software development and web app development solutions","brand": {"@type": "Brand","name": "AppZoro Inc."},"aggregateRating": {"@type": "AggregateRating","ratingValue": "4.8","bestRating": "5","worstRating": "3.5","ratingCount": "16"}}`,
          }}
        ></script> */}
      </Head>

      <MainHeaderComponent />

      <section className="az-home-section1">
        <Image src="/assets/images/banner.png" fill priority style={{ objectFit: 'cover', objectPosition: 'left top', zIndex: -1 }} alt="Hero Background" />
        <Container>
          <Row className="align-items-center">
            <Col md="6" lg="6" xs="12">
              <div className="home-intro">
                <div>
                  <h1>
                    Crafting Reliable <span>Solutions</span> Together with
                    Atlanta's App Developers
                  </h1>
                  <h2>
                    Connect <br />
                    to{" "}
                    <span className="mob-rotate">
                      Partner with Best Software Experts
                    </span>
                    <span className="desktop-rotate">
                      <ReactRotatingTextComponent
                        items={[
                          "Unlock Digital Potential",
                          "Build Your Dream Software",
                          "Unleash the Power of Technology",
                          "Partner with Best Software Experts",
                        ]}
                      />
                    </span>
                  </h2>
                </div>
                <div className="az_home-btns">
                  <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                    Contact Us{" "}
                    <span>
                      <LuMoveRight />
                    </span>
                  </ContactHref>
                  <Link href="/case-study" className="btn-style-arrow" prefetch={false}>
                    View Portfolio{" "}
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
                    alt="Appzoro"
                  />
                </div>
                <div className="az_home_icon2 icon-animation">
                  <Image
                    priority
                    src="/assets/images/circle2.png"
                    width={"61"}
                    height={"69"}
                    alt="Appzoro"
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
                  url="https://vimeo.com/957195782"
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
                      alt="Appzoro"
                    />
                    <div className="counter-number-text">
                      {postData?.length > 0 ? (
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
                      alt="Appzoro"
                    />
                    <div className="counter-number-text">
                      {postData?.length > 0 ? (
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
                      alt="Appzoro"
                    />
                    <div className="counter-number-text">
                      {postData?.length > 0 ? (
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
                      alt="Appzoro"
                    />
                    <div className="counter-number-text">
                      {postData?.length > 0 ? (
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
        <CaseStudyComponent isCacehLoad={postData} />
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
              ecosystems across multiple touchpoints. <br />
              We drive the business value of tech investments.
            </p>
          </div>
          {postData?.length > 0 ? (
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
                    <Image src="/assets/images/service-customer-supply.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="Service Background" />
                    <Link href="/services/custom-software-development-company-usa" prefetch={false}>
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
                    <Image src="/assets/images/service-mobile-app-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="Service Background" />
                    <Link href="/services/mobile-app-development-company-usa" prefetch={false}>
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
                    <Image src="/assets/images/service-web-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="Service Background" />
                    <Link href="/services/web-app-development" prefetch={false}>
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
                    <Image src="/assets/images/service-iot-dev.png" fill style={{ objectFit: "cover", zIndex: -1 }} alt="Service Background" />
                    <Link href="/services/iot-development-services" prefetch={false}>
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
                <Link href="/industry" className="btn-arrow-transparent" prefetch={false}>
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
        <ClientReviewComponent isCacehLoad={postData} />
      </LazyWhenVisible>
      {/* <ClutchScript /> */}
      <LazyWhenVisible minHeight={340}>
        <AwardDevComponent />
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
      <HomeContent />
      <LazyWhenVisible minHeight={200}>
        <NewsComponent isCacehLoad={postData} />
      </LazyWhenVisible>
      <LazyWhenVisible minHeight={360}>
        <BlogPosts />
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

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 300,
  };
}
