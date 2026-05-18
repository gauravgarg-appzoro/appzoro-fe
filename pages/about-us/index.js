import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TalkExpert from '../../components/common/TalkExpert'
import Link from 'next/link'
import ContactHref from '../../components/common/ContactHref'
import Image from 'next/image'
import MetaData from '../../components/common/MetaData'
import dynamic from 'next/dynamic';
import {   LuMoveRight, TbTargetArrow, FaEye, GiProcessor, LiaHandshake   } from '../../components/OptimizedIcons';


const AboutUs = () => {
  return (
    <>
    <MetaData title="About AppZoro | Our Mission, Vision, and Approach" description="Explore AppZoro's story, our mission, core values, and notable achievements. Discover how we develop cutting-edge products via innovation and expertise." url={`/about-us`} image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
    <MainHeader />
      <section className='about-banner'>
        <Container>
          <Row className='align-items-center'>
            <Col xs="12" md="6">
              <div className='about-banner-info'>
                <h1>Meet AppZoro</h1>
                <p>We are more than software programmers - we are critical thinkers, problem-solvers, crafters of change, and innovators of digital transformation. We help businesses; small and big, to bring value to their end customers, beat their competition and exponentially grow as a successful company.</p>
                <ContactHref href="/contact-us" className='btn-style-arrow me-3'>Inquiry Now <span><LuMoveRight /></span></ContactHref>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className='banner-image'>
                <Image src="/assets/images/about-1.png"  alt="about" width="463" height="339" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='about-info'>
        <Container>
          <h3>AppZoro Mobile App Developers bring your Imagination to Reality</h3>
          <p>Are you looking for a Mobile Apps Development Company in Atlanta? Here is AppZoro - a customer-centric, mobile app, web app, and agile software development company from Atlanta, GA.</p>
          <p>AppZoro Technologies Inc. is an Atlanta app development and Software development company and a one-stop source for all mobile app design & development services. We bring our client’s imagination to reality. Our certified developers are ready to fulfill your individual and business demands.</p>
          <p>It’s not easy to find a high-quality mobile app developer but that’s where AppZoro comes in. AppZoro is a mobile app development company based in Atlanta. From discovery through launch, our team of experts works with startups and enterprises to bring ideas into reality.</p>
          <p>Let’s develop custom software, high-end websites, mobile apps & web applications with AppZoro. If you have any
            business ideas to innovate, we’ll convert them into mobile & web applications.</p>
          <p>iOS & Android app development, UI/UX design, startup consultant, native & hybrid application development services, and IoT app development are our top services. Our mobile app developers in Atlanta have been creating and crafting user-friendly mobile apps for businesses.</p>
          <p>If you have a business looking for enterprise solutions, contact us right away if you are a company searching for enterprise solutions. We are a leading provider of enterprise solutions. AppZoro's app developers have been providing the best app development services in Atlanta since 2016.</p>
          <p>Contact us today to start the development and design of your mobile application off on the right foot. The main objective of AppZoro is to offer you the greatest technological solution to support the expansion of your online business.</p>
          <p>Are you ready to launch your business online or still searching for tech companies in Atlanta to develop your mobile apps & websites? AppZoro's app developers are ready to deliver. Enquire today about our app development services to build some great mobile apps together with AppZoro Technologies.</p>
          <p>Call us at +1 678-462-4034 or email us at info@appzoro.com to discuss your project today.</p>
          <Image src="/assets/images/about-text.png"  alt="about" width="699" height="235" />
        </Container>
      </section>
      <section className='about-block'>
        <Container>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className='abt-block-box'>
                <div className="abb-head">
                  <TbTargetArrow />
                  <h3>Mission</h3>
                </div>
                <div className="abb-body">
                  <p>AppZoro empowers your business by enhancing overall effectiveness and efficiency using next generation technology. Our focus is to help you envision potential, leverage technology and reach for infinite growth.</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
            <div className='abt-key-image ms-auto'>
              <Image src="/assets/images/abt-mission1.png"  width="489" height="419" alt="Mission" />
            </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className='abt-block-box'>
                <div className="abb-head">
                  <FaEye />
                  <h3>Vision</h3>
                </div>
                <div className="abb-body">
                  <p>To consistently lead technology innovation and provide technology software services and solutions to global clientele with exceptional quality, sharp turn around time and cost effectiveness.</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
            <div className='abt-key-image'>
              <Image src="/assets/images/abt-vision.png"  width="489" height="419" alt="Vision" />
            </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className='abt-block-box'>
                <div className="abb-head">
                  <GiProcessor />
                  <h3>Our Approach</h3>
                </div>
                <div className="abb-body">
                  <p>We believe in excellence and passion towards our work. We follow the Kaizen Principle, which aims for constant and never ending improvement. We are customer centric and completely relationship oriented.Technology is our passion and our focus is to empower your business with the latest technology and provide a higher return on investment. We make technology simple.</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
            <div className='abt-key-image ms-auto'>
              <Image src="/assets/images/abt-approach.png"  width="489" height="419" alt="Approach" />
            </div>
            </Col>
          </Row>
          <Row className="about-keys">
            <Col xs="12" md="6">
              <div className='abt-block-box'>
                <div className="abb-head">
                  <LiaHandshake />
                  <h3>Mission-Driven Team</h3>
                </div>
                <div className="abb-body">
                  <p>The heartbeat of AppZoro is our people. We are so much more than technocrats, designers, developers, project managers, digital marketers & QA experts. We are passionate people who encourage people to share their authentic thoughts on the table, which enables us to discuss, debate and create unique concepts, ideas and work results that other companies can’t. Our team is armed with talents that ensure we implement best technology services for global businesses. Our certified team has made technology the core of their life..</p>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
            <div className='abt-key-image'>
              <Image src="/assets/images/abt-mission.png"  width="489" height="419" alt="mission" />
            </div>
            </Col>
          </Row>
        </Container>
      </section>
      <TalkExpert />
      <Footer />
    </>
  )
}

export default AboutUs

export async function getStaticProps() {
  return { props: {} }
}