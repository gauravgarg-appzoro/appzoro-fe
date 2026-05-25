import MainHeader from '../../components/MainHeader';
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import Footer from '../../components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TalkExpert from '../../components/common/TalkExpert';
import ContactHref from '../../components/common/ContactHref';
import Image from 'next/image';
import MetaData from '../../components/common/MetaData';
import SeoJsonLd from '../../components/common/SeoJsonLd';
import { buildBreadcrumbSchema } from '../../lib/schemaBuilders';
import { LuMoveRight, TbTargetArrow, FaEye, GiProcessor, LiaHandshake } from '../../components/OptimizedIcons';
import { fetchSitePage } from '../../lib/fetchSitePage';

const DEFAULT_INTRO =
  'We are more than software programmers - we are critical thinkers, problem-solvers, crafters of change, and innovators of digital transformation. We help businesses; small and big, to bring value to their end customers, beat their competition and exponentially grow as a successful company.';

const DEFAULT_MISSION =
  'AppZoro empowers your business by enhancing overall effectiveness and efficiency using next generation technology. Our focus is to help you envision potential, leverage technology and reach for infinite growth.';

const DEFAULT_VISION =
  'To consistently lead technology innovation and provide technology software services and solutions to global clientele with exceptional quality, sharp turn around time and cost effectiveness.';

const AboutUs = ({ page }) => {
  const title = page?.title || 'Meet AppZoro';
  const intro = page?.intro || DEFAULT_INTRO;
  const mission = page?.mission || DEFAULT_MISSION;
  const vision = page?.vision || DEFAULT_VISION;
  const historyHtml = page?.history?.trim() || '';

  return (
    <>
      <MetaData
        title={page?.seo_title || 'About AppZoro | Our Mission, Vision, and Approach'}
        description={
          page?.seo_description ||
          "Explore AppZoro's story, our mission, core values, and notable achievements. Discover how we develop cutting-edge products via innovation and expertise."
        }
        url="/about-us"
        image={DEFAULT_OG_IMAGE}
      />
      <SeoJsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about-us' },
        ])}
      />
      <MainHeader />
      <section className="about-banner">
        <Container>
          <Row className="align-items-center">
            <Col xs="12" md="6">
              <div className="about-banner-info">
                <h1>{title}</h1>
                <p>{intro}</p>
                <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                  Inquiry Now <span><LuMoveRight /></span>
                </ContactHref>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="banner-image">
                <Image src="/assets/images/about-1.png" alt="about" width="463" height="339" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about-info">
        <Container>
          {historyHtml ? (
            <div dangerouslySetInnerHTML={{ __html: historyHtml }} />
          ) : (
            <>
              <h2>AppZoro Mobile App Developers bring your Imagination to Reality</h2>
              <p>
                Are you looking for a Mobile Apps Development Company in Atlanta? Here is AppZoro - a
                customer-centric, mobile app, web app, and agile software development company from Atlanta, GA.
              </p>
              <p>
                AppZoro Technologies Inc. is an Atlanta app development and Software development company and a
                one-stop source for all mobile app design & development services. We bring our client&apos;s
                imagination to reality.
              </p>
              <p>
                It&apos;s not easy to find a high-quality mobile app developer but that&apos;s where AppZoro comes in.
                AppZoro is a mobile app development company based in Atlanta.
              </p>
              <p>Call us at +1 678-462-4034 or email us at info@appzoro.com to discuss your project today.</p>
              <Image src="/assets/images/about-text.png" alt="about" width="699" height="235" />
            </>
          )}
        </Container>
      </section>
      <section className="about-block">
        <Container>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className="abt-block-box">
                <div className="abb-head">
                  <TbTargetArrow />
                  <h3>Mission</h3>
                </div>
                <div className="abb-body">
                  <p>{mission}</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="abt-key-image ms-auto">
                <Image src="/assets/images/abt-mission1.png" width="489" height="419" alt="Mission" />
              </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className="abt-block-box">
                <div className="abb-head">
                  <FaEye />
                  <h3>Vision</h3>
                </div>
                <div className="abb-body">
                  <p>{vision}</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="abt-key-image">
                <Image src="/assets/images/abt-vision.png" width="489" height="419" alt="Vision" />
              </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className="abt-block-box">
                <div className="abb-head">
                  <GiProcessor />
                  <h3>Our Approach</h3>
                </div>
                <div className="abb-body">
                  <p>
                    We believe in excellence and passion towards our work. We follow the Kaizen Principle, which aims
                    for constant and never ending improvement.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="abt-key-image ms-auto">
                <Image src="/assets/images/abt-approach.png" width="489" height="419" alt="Approach" />
              </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className="abt-block-box">
                <div className="abb-head">
                  <LiaHandshake />
                  <h3>Mission-Driven Team</h3>
                </div>
                <div className="abb-body">
                  <p>
                    The heartbeat of AppZoro is our people. We are passionate experts who create unique concepts and
                    deliver best-in-class technology services for global businesses.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="abt-key-image">
                <Image src="/assets/images/abt-mission.png" width="489" height="419" alt="mission" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <TalkExpert />
      <Footer />
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const page = await fetchSitePage('about-us');
  return {
    props: { page: page || null },
    revalidate: 300,
  };
}
