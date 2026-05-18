import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Col, Container, Row, Form } from 'react-bootstrap'
const DotLottiePlayer = dynamic(() => import('@dotlottie/react-player').then(mod => mod.DotLottiePlayer), { ssr: false });
import Link from 'next/link';
import ContactHref from '../../components/common/ContactHref';
const CountUp = dynamic(() => import('react-countup'), { ssr: false });
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import 'swiper/css';
import 'swiper/css/navigation';
import ClutchScript from '../../components/ClutchScript';
// const ClutchScript = dynamic(() => import("../../components/ClutchScript"));
import ReactRotatingText from 'react-rotating-text';
const ClientReview = dynamic(() => import('../../components/common/ClientReview'));
const TechStack = dynamic(() => import('../../components/common/TechStack'));
import { LuMoveRight, FaCheck, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from '../../components/OptimizedIcons';

const HomePage = () => {
  const [isClutch, setIsClutch] = useState(false);
  const [loadLottie, setLoadLottie] = useState(false);

  useEffect(() => {
    setIsClutch(true);
    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      window.requestIdleCallback(() => setLoadLottie(true));
    } else {
      const timer = setTimeout(() => setLoadLottie(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [])
  return (
    <>
      <Header />
      <section className='home-section ads_fonts'>
        <Container>
          <Row className='align-items-center'>
            <Col md="5" xs="12" className='pe-0'>
              <div className='home-section_left'>
                <h2>Custom Software Development For <br />Your Business Needs</h2>
                <h3><span>Connect <br />to</span> <ReactRotatingText items={['Unlock Your Digital Potential', 'Innovate Your Business', 'Forge Your Digital Future', 'Partner with Top IT Experts']} /></h3>
                <div className='home-section_left_action mt-4'>
                  <ContactHref href="/contact-us" className='btn_theme fs-14'>CONTACT US <span><LuMoveRight /></span></ContactHref>
                  <Link href="/case-study" className='btn_theme fs-14 ms-3'>VIEW PORTFOLIO <span><LuMoveRight /></span></Link>
                </div>
                <div className='home-section_icon1 icon-animation'>
                  <Image src="/assets/images/circle1.png" width={"78"} height={"88"} alt="Appzoro" />
                </div>
                <div className='home-section_icon2 icon-animation'>
                  <Image src="/assets/images/circle2.png" width={"61"} height={"69"} alt="Appzoro" />
                </div>
              </div>
            </Col>
            <Col md="7" xs="12">
              <div className='home-section_right'>
                <div className='home-section_icon3 icon-animation'>
                  <Image src="/assets/images/triangle.png" width={"87"} height={"72"} alt="Appzoro" />
                </div>

                <div className='home-animation'>
                  <div className='animate__animated animate__zoomIn'>
                    {loadLottie && (
                      <DotLottiePlayer
                        src="/assets/images/lottie.json"
                        autoplay
                        loop
                      >
                      </DotLottiePlayer>
                    )}
                  </div>
                </div>
                <div className='home-section_couner ms-auto'>
                  <div className='animate__animated animate__zoomInRight'>
                    <div className='counter-view'>
                      <h3><CountUp delay={1} duration={1} end={100} />+</h3>
                      <p>Years of Combined Team Experience</p>
                    </div>
                    <div className='counter-view'>
                      <h3><CountUp delay={1} duration={1} end={2} />M+</h3>
                      <p>Lines of Code Written</p>
                    </div>
                    <div className='counter-view'>
                      <h3><CountUp delay={1} duration={1} end={100} />+</h3>
                      <p>Satisfied Clients</p>
                    </div>
                    <div className='counter-view'>
                      <h3><CountUp delay={1} duration={1} end={150} />+</h3>
                      <p>Products Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

        </Container>
      </section>
      <section className='home-expertises ads_fonts'>
        <Container>


          <div className='section-title'>
            <h3>Next-Gen Software Development Services</h3>
            <p>Unlock new opportunities for your business with our custom software development services. We are the leading service provider for mobile app development services like android app development, iOS app development, web application development, UI/UX services, and IOT solutions.</p>
          </div>

        </Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="tab1">
          <Container>
            <Row>
              <Col md="4" xs="12">

                <div className='tab-view'>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="tab1">Custom Software Development</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab2">Website Development Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab3">Mobile App Development</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab4">UI/UX Development Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab5">Custom IOT Solutions</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tab6">IT Consultation Services</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

              </Col>
              <Col md="8" xs="12">

                <div className='tab-content-view'>
                  <Tab.Content>
                    <Tab.Pane eventKey="tab1">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/cross.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>Custom Software Development</h3>
                          <p>AppZoro is the most in-demand software development company based in Atlanta. We offer the most impactful and innovative custom software development solutions by using the full potential of the latest technologies. </p>
                          <ul>
                            <li>Enterprise Application Development Service</li>
                            <li>Software Modernization and Integration Service</li>
                            <li>Industry-Specific Software Development Services</li>
                            <li>SaaS Development Service</li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab2">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/pwa.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>Website Development Services</h3>
                          <p>Appzoro is a renowned web application development company. We have offered top-rated custom web development services for over a decade across the United States. We deliver user-friendly, mobile-optimized, and performance-oriented web development services. </p>
                          <ul>
                            <li>Front-End Development </li>
                            <li>Back-End Development</li>
                            <li>Full-Stack Development Services</li>
                            <li>Website Maintenance and Security</li>
                            <li>Custom CMS Development</li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab3">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/android.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>Mobile App Development</h3>
                          <p>Turn your app dream into reality with our trusted mobile application development services. Our professionals have years of expertise in delivering robust and tailored solutions to your industry needs.</p>
                          <ul>
                            <li>Android App Development Services</li>
                            <li>iOS App Development Services</li>
                            <li>Hybrid App Development</li>
                            <li>Cross-platform Apps Development</li>
                            <li>Progressive Web Apps </li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab4">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/android.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>UI/UX Development Services</h3>
                          <p>An attractive mobile and website interface can help you build a strong brand identity among your audiences. Our UI/UX development services will make your website look pleasing and ahead of the curve.</p>
                          <ul>
                            <li>UI Designing Services</li>
                            <li>UX Designer</li>
                            <li>Prototype</li>
                            <li>Logo Design </li>
                            <li>Sprint Design</li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab5">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/ios.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>Custom IOT Solutions </h3>
                          <p>Our Custom IOT software solutions seamlessly connect devices, analyze data, and optimize processes. From healthcare to manufacturing, our IoT expertise empowers businesses.</p>
                          <ul>
                            <li>AR/VR Development</li>
                            <li>AI/ML Development</li>
                            <li>Wearable Devices</li>
                            <li>Industries IoT (IIoT)</li>
                            <li>Smart Health </li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tab6">
                      <div className='tab-data'>
                        <div className='tab-icon'>
                          <Image alt="Android" src="/assets/images/flutter.png" width="81" height="81" />
                        </div>
                        <div className='tab-content-data'>
                          <h3>IT Consultation Services</h3>
                          <p>Appzoro offers you a comprehensive suite of IT consulting services. When you need expert assistance, our IT consultants provide a local presence, deep resources, and exceptional expertise.</p>
                          <ul>
                            <li>Cloud computing consulting Services</li>
                            <li>Cybersecurity consulting Services</li>
                            <li>IT project management Consulting</li>
                            <li>IT Compliance and Regulatory Consulting</li>
                            <li>IT Outsourcing Consulting </li>
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>

              </Col>
            </Row>
          </Container>
        </Tab.Container>
      </section>
      <section className='section-lets-discuss ads_fonts'>
        <Container>
          <Col md="12" xs="12">
            <div className='ld-content'>

              <div className='ld-left'>

                <h3>Let's Connect to Work Together</h3>
                <p>Are you looking to turn your business into Digital Solutions? Book your free consultation slot with our development experts to turn your idea into an awesome solution. </p>

              </div>
              <div className='ld-right'>

                <ContactHref href="/contact-us" className='btn_theme fs-14'>TALK WITH EXPERT <span><LuMoveRight /></span></ContactHref>

              </div>
            </div>
          </Col>
        </Container>
      </section>
      <TechStack />
      <section className='works-section ads_fonts'>
        <Container>

          <div className='section-title'>
            <h3>Glimpse of Our Creative Works </h3>
          </div>


          <div className='glimpses-slides'>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              navigation={{
                prevEl: '.prev_glimpses',
                nextEl: '.next_glimpses',
              }}
              modules={[Navigation]}
              centeredSlides={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              className="glimpsslide"
            >
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/dreambook" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/1.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/get-sound" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/2.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/jax" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/3.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/judicial-innovations" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/4.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/medcraze/" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/5.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/city-of-milton/" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/6.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/polisci/" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/7.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/webapp-spa-space/" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/8.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/turns-financing/" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/9.png)' }}></div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="https://appzoro.com/case-study/truck-your-way" className='portfolio_link'>
                  <div className='web_slide' style={{ backgroundImage: 'url(/assets/images/web/10.png)' }}></div>
                </Link>
              </SwiperSlide>
            </Swiper>
            <div className="prev_glimpses"><MdOutlineKeyboardArrowLeft /></div>
            <div className="next_glimpses"><MdOutlineKeyboardArrowRight /></div>
          </div>

        </Container>
      </section>
      <section className='section-awards ads_fonts'>
        <Container>
          <div className='section-title'>
            <h3>One of Atlanta's Most Awarded Development Firm</h3>
          </div>
          <div className='awards-slides'>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={{
                prevEl: '.prev_award',
                nextEl: '.next_award',
              }}
              modules={[Navigation]}
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
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className="awardslide"
            >
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/app-dev-us.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/aws_logo.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/b2b-companies-Georgia.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/expertise.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/goodfirm.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/goodfirm2.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/google-partner-card.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/toplogo.png)' }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='award_slide' style={{ backgroundImage: 'url(/assets/images/award/clutch-card.png)' }}></div>
              </SwiperSlide>
            </Swiper>
            <div className="prev_award"><MdOutlineKeyboardArrowLeft /></div>
            <div className="next_award"><MdOutlineKeyboardArrowRight /></div>
          </div>

        </Container>
      </section>
      <ClientReview />
      <section className='clutch-reviews ads_fonts'>
        <Container>

          <div suppressHydrationWarning={true} >
            {isClutch ? <ClutchScript /> : ""}
          </div>

        </Container>
      </section>
      {/* <section className="contact_section ads_fonts">
        <Container>
          <div className='section-title'>
            <h3 className='mb-2'>Let's Get Started With Your Project!</h3>
            <p>Our Custom application developers will help you transform your vision into reality and achieve your business goals. </p>
          </div>
          <Row className='mt-3'>
            <Col md="4" xs="12">
              <ul className='contact-list'>
                <li><span><FaCheck /></span>10+ years of Industry Experience</li>
                <li><span><FaCheck /></span>1000+ Global base of Customers</li>
                <li><span><FaCheck /></span>500+ Qualified Sources</li>
                <li><span><FaCheck /></span>98% Client Retention</li>
                <li><span><FaCheck /></span>Transparent Cost</li>
                <li><span><FaCheck /></span>Timely Product Delivery</li>
                <li><span><FaCheck /></span>24*7 Support</li>
              </ul>
            </Col>
            <Col md="8" xs="12">
              <div className='ftr_contact_form'>
                <h3>REQUEST A QUOTE</h3>
              </div>
              <form>
                <Row>
                  <Col md="6" xs="12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="email" placeholder="Name*" />
                    </Form.Group>
                  </Col>
                  <Col md="6" xs="12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Control type="email" placeholder="Mobile Number*" />
                    </Form.Group>
                  </Col>
                  <Col md="6" xs="12">
                    <Form.Group className="mb-3" controlId="exampleForm3">
                      <Form.Control type="email" placeholder="Enter Your E-mail*" />
                    </Form.Group>
                  </Col>
                  <Col md="6" xs="12">
                    <Form.Select aria-label="Default select example">
                      <option>Select Your Requirement*</option>
                      <option value="BLOCKER">Mobile App</option>
                      <option value="CHAMPION">Web App</option>
                      <option value="OTHER">Other Specialties</option>
                    </Form.Select>
                  </Col>
                  <Col md="12" xs="12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={6} placeholder="Tell us more about your project?" />
                    </Form.Group>
                  </Col>
                  <Col md="12" xs="12">
                    <button type="submit" className="btn_theme fs-16">
                      Submit <span><LuMoveRight /></span>
                    </button>
                  </Col>
                </Row>
              </form>

            </Col>
          </Row>
        </Container>
      </section> */}
      <Footer />
    </>
  )
}

export default HomePage

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 300,
  }
}