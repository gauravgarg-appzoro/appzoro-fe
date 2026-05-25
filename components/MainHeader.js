import Image from 'next/image';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { MdLocalShipping, MdOutlineAccountBalance, MdOutlineContentCut, MdOutlineFitnessCenter, MdOutlineFlight, MdOutlineSpa, MdEmojiTransportation, MdCall, MdOutlineAppShortcut, MdMobileOff, MdDevices, MdOutlineFoodBank, MdOutlineSocialDistance, MdOutlineRealEstateAgent, MdOutlineSportsHandball, MdOutlineHealthAndSafety, MdCardTravel, MdCastForEducation, MdOutlineEmojiTransportation, MdOutlineInfo, MdContactPhone, GiArtificialIntelligence, BiCustomize, BiLogoGmail, VscArrowCircleRight, HiOutlineClipboardDocumentList, PiPhoneCallLight, CgFacebook, CgWebsite, CgTrending, FaTwitter, FaCartShopping, FaChalkboardUser, SiFrontendmentor, GrMultimedia, GrServices, GoCommentDiscussion, CiDesktop, RiNewspaperLine, LiaIndustrySolid } from './OptimizedIcons';

















const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPixels, setScrollPixels] = useState(0);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const pixels = window.scrollY || window.pageYOffset;
      setScrollPixels(pixels);
      if (pixels > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`az-header ${scrolled ? 'sticky-show' : ''}`}>
        <Navbar sticky="top" expand="lg" className="bg-transparent">
          <Container>
            <div className='logo' href="#home">
              <Link href="/"><Image src="/assets/images/logo.png" priority width={"160"} height={"52"} alt="AppZoro logo" /></Link>
            </div>
            <Navbar.Toggle aria-controls="az-menu" onClick={toggleNavbar} className='hamburger--elastic me-0 ms-auto'>
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse id="az-menu" className='az-header-menu'>
              <div className='mobile-menu' id="az-menu">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header as="div">Services</Accordion.Header>
                    <Accordion.Body>
                      <ul className="mobile-menu-list">
                        <li><Link href="/services"><span><GrServices /></span> All Services</Link></li>
                        <li><Nav.Link href="/services/mobile-app-development-company-usa"><span><MdOutlineAppShortcut /></span> Mobile App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/cross-platform-app-development-company-usa"><span><MdMobileOff /></span> Crossplatform App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/web-app-development"><span><CgWebsite /></span> Web App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/custom-software-development-company-usa"><span><MdDevices /></span> Custom Software Development</Nav.Link></li>
                        <li><Nav.Link href="/services/android-app-development-company-usa"><span><MdOutlineAppShortcut /></span> Android App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/ios-app-development"><span><MdDevices /></span> iOS App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/ui-ux-design-services"><span><MdDevices /></span> UI UX Design Services</Nav.Link></li>
                        <li><Nav.Link href="/services/iot-development-services"><span><FaCartShopping /></span> IOT Development Services </Nav.Link></li>
                        <li><Nav.Link href="/services/ai-and-ml-development-company-usa"><span><SiFrontendmentor /></span> AI & ML Services</Nav.Link></li>

                        <li><Nav.Link href="/services/enterprise-mobile-app-development-company"><span><MdOutlineAppShortcut /></span> Enterprise Mobile App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/ai-app-development-company"><span><SiFrontendmentor /></span> AI App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/hybrid-app-development-company"><span><MdMobileOff /></span> Hybrid App Development</Nav.Link></li>
                        <li><Nav.Link href="/services/custom-enterprise-software-development-company"><span><BiCustomize /></span> Custom Enterprise Software Development</Nav.Link></li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header as="div">Products</Accordion.Header>
                    <Accordion.Body>
                      <ul className="mobile-menu-list">
                        <li><Nav.Link href="/fitness-app-development"><span><MdOutlineFitnessCenter /></span> Fitness App Development</Nav.Link></li>
                        <li><Nav.Link href="/salon-app-development"><span><MdOutlineContentCut /></span> Salon App Development</Nav.Link></li>
                        <li><Nav.Link href="/wellness-app-development"><span><MdOutlineSpa /></span> Wellness App Development</Nav.Link></li>
                        <li><Nav.Link href="/transportation-app-development"><span><MdLocalShipping /></span> Transportation App Development</Nav.Link></li>
                        <li><Nav.Link href="/fintech-app-development"><span><MdOutlineAccountBalance /></span> Fintech App Development</Nav.Link></li>
                        <li><Nav.Link href="/custom-llm-development"><span><GiArtificialIntelligence /></span> Custom LLM Development</Nav.Link></li>
                        <li><Nav.Link href="/transportation-software-development-company"><span><MdEmojiTransportation /></span> Transportation Software Development</Nav.Link></li>
                        <li><Nav.Link href="/custom-fintech-software-development"><span><BiCustomize /></span> Custom Fintech Software Development</Nav.Link></li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header as="div">Industries</Accordion.Header>
                    <Accordion.Body>
                      <ul className="mobile-menu-list">
                        <li><Link href="/industry"><span><LiaIndustrySolid /></span> All Industries</Link></li>
                        <li><Nav.Link href="/industry/retail-ecommerce"><span><FaCartShopping /></span> Retail & E-Commerce</Nav.Link></li>
                        <li><Nav.Link href="/industry/restaurant-food-delivery-applications"><span><MdOutlineFoodBank /></span> Food & Restaurant </Nav.Link></li>
                        <li><Nav.Link href="/industry/social-networking-app-development"><span><MdOutlineSocialDistance /></span> Social Networking</Nav.Link></li>
                        <li><Nav.Link href="/industry/real-estate"><span><MdOutlineRealEstateAgent /></span> Real Estate</Nav.Link></li>
                        <li><Nav.Link href="/industry/sports-app-development"><span><MdOutlineSportsHandball /></span> Sports & Games</Nav.Link></li>
                        <li><Nav.Link href="/industry/entertainment-app-development"><span><GrMultimedia /></span> Media and Entertainment</Nav.Link></li>
                        <li><Nav.Link href="/industry/healthcare-app-development"><span><MdOutlineHealthAndSafety /></span> Healthcare and Fitness</Nav.Link></li>
                        <li><Nav.Link href="/industry/travel-hospitality"><span><MdCardTravel /></span> Travel & Hospitality</Nav.Link></li>
                        <li><Nav.Link href="/industry/conference-and-events-app-development"><span><GoCommentDiscussion /></span> Meetings and Events</Nav.Link></li>
                        <li><Nav.Link href="/industry/education-software-development"><span><MdCastForEducation /></span> E-learning & Education</Nav.Link></li>
                        <li><Nav.Link href="/industry/financial-software-development"><span><CiDesktop /></span> Fintech</Nav.Link></li>
                        <li><Nav.Link href="/industry/logistics-app-development"><span><MdOutlineEmojiTransportation /></span> Logistics & Transport</Nav.Link></li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className='no_dropdown'>
                    <Link href="/case-study">Portfolio</Link>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header as="div">Company</Accordion.Header>
                    <Accordion.Body>
                      <ul className="mobile-menu-list">
                        <li><Link href="/about-us"><span><MdOutlineInfo /></span> About Us</Link></li>
                        <li><Link href="/press-release"><span><RiNewspaperLine /></span> Press Release</Link></li>
                        <li><Link href="/career"><span><FaChalkboardUser /></span> Career</Link></li>
                        <li><Link href="/contact-us"><span><MdContactPhone /></span> Contact Us</Link></li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5" className='no_dropdown'>
                    <Link href="/blog">Blog</Link>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className='desktop-menu ms-auto'>
                <div className='az-menu' >
                  <ul>
                    <li className='mega-menu'>
                      <Link href="/services" className='mm-link'>Services</Link>
                      <div className='az-megamenu'>
                        <Container>
                          <div className='megamenu-content'>
                            <div className="menu-title">
                              <div className='menu-title-heading'>Services We Provide</div>
                            </div>
                            <div className='menu-items'>
                              <Row>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/services/mobile-app-development-company-usa"><span><MdOutlineAppShortcut /></span> Mobile App Development</Link></li>
                                    <li><Link href="/services/cross-platform-app-development-company-usa"><span><MdMobileOff /></span> Crossplatform App Development</Link></li>
                                    <li><Link href="/services/ui-ux-design-services"><span><MdDevices /></span> UI UX Design Services</Link></li>
                                    <li><Link href="/services/custom-enterprise-software-development-company"><span><BiCustomize /></span> Custom Enterprise Software Development</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/services/web-app-development"><span><CgWebsite /></span> Web App Development</Link></li>
                                    <li><Link href="/services/custom-software-development-company-usa"><span><MdDevices /></span> Custom Software Development</Link></li>
                                    <li><Link href="/services/enterprise-mobile-app-development-company"><span><MdOutlineAppShortcut /></span> Enterprise Mobile App Development</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/services/android-app-development-company-usa"><span><MdOutlineAppShortcut /></span> Android App Development</Link></li>
                                    <li><Link href="/services/ios-app-development"><span><MdDevices /></span> iOS App Development</Link></li>
                                    <li><Link href="/services/ai-app-development-company"><span><SiFrontendmentor /></span> AI App Development</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/services/iot-development-services"><span><FaCartShopping /></span> IOT Development Services </Link></li>
                                    <li><Link href="/services/ai-and-ml-development-company-usa"><span><SiFrontendmentor /></span> AI & ML Services</Link></li>
                                    <li><Link href="/services/hybrid-app-development-company"><span><MdMobileOff /></span> Hybrid App Development</Link></li>
                                  </ul>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Container>
                      </div>
                    </li>
                    <li className='mega-menu'>
                      <Link href="#" className='mm-link'>Products</Link>
                      <div className='az-megamenu'>
                        <Container>
                          <div className='megamenu-content'>
                            <div className="menu-title">
                              <div className='menu-title-heading'>Our Products</div>
                            </div>
                            <div className='menu-items'>
                              <Row>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/fitness-app-development"><span><MdOutlineFitnessCenter /></span> Fitness App Development</Link></li>
                                    <li><Link href="/fintech-app-development"><span><MdOutlineAccountBalance /></span> Fintech App Development</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/salon-app-development"><span><MdOutlineContentCut /></span> Salon App Development</Link></li>
                                    <li><Link href="/custom-llm-development"><span><GiArtificialIntelligence /></span> Custom LLM Development</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/wellness-app-development"><span><MdOutlineSpa /></span> Wellness App Development</Link></li>
                                    <li><Nav.Link href="/transportation-software-development-company"><span><MdEmojiTransportation /></span> Transportation Software Development</Nav.Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/transportation-app-development"><span><MdLocalShipping /></span> Transportation App Development </Link></li>
                                    <li><Nav.Link href="/custom-fintech-software-development"><span><BiCustomize /></span> Custom Fintech Software Development</Nav.Link></li>
                                  </ul>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Container>
                      </div>
                    </li>
                    <li className='mega-menu'>
                      <Link href="/industry" className='mm-link'>Industries</Link>
                      <div className='az-megamenu'>
                        <Container>
                          <div className='megamenu-content'>
                            <div className="menu-title">
                              <div className='menu-title-heading'>Industries We Serve</div>
                            </div>
                            <div className='menu-items'>
                              <Row>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/industry/retail-ecommerce"><span><FaCartShopping /></span> Retail & E-Commerce</Link></li>
                                    <li><Link href="/industry/restaurant-food-delivery-applications"><span><MdOutlineFoodBank /></span> Food & Restaurant </Link></li>
                                    <li><Link href="/industry/social-networking-app-development"><span><MdOutlineSocialDistance /></span> Social Networking</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/industry/real-estate"><span><MdOutlineRealEstateAgent /></span> Real Estate</Link></li>
                                    <li><Link href="/industry/sports-app-development"><span><MdOutlineSportsHandball /></span> Sports & Games</Link></li>
                                    <li><Link href="/industry/entertainment-app-development"><span><GrMultimedia /></span> Media and Entertainment</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/industry/healthcare-app-development"><span><MdOutlineHealthAndSafety /></span> Healthcare and Fitness</Link></li>
                                    <li><Link href="/industry/travel-hospitality"><span><MdCardTravel /></span> Travel & Hospitality</Link></li>
                                    <li><Link href="/industry/conference-and-events-app-development"><span><GoCommentDiscussion /></span> Meetings and Events</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/industry/education-software-development"><span><MdCastForEducation /></span> E-learning & Education</Link></li>
                                    <li><Link href="/industry/financial-software-development"><span><CiDesktop /></span> Fintech</Link></li>
                                    <li><Link href="/industry/logistics-app-development"><span><MdOutlineEmojiTransportation /></span> Logistics & Transport</Link></li>
                                  </ul>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Container>
                      </div>
                    </li>
                    <li><Link href="/case-study">Portfolio</Link></li>
                    <li className='mega-menu'>
                      <Link href="#" className='mm-link'>Company</Link>
                      <div className='az-megamenu'>
                        <Container>
                          <div className='megamenu-content'>
                            <div className="menu-title">
                              <div className='menu-title-heading'>Company</div>
                            </div>
                            <div className='menu-items'>
                              <Row>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/about-us"><span><MdOutlineInfo /></span> About Us</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/press-release"><span><RiNewspaperLine /></span> Press Release</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/career"><span><FaChalkboardUser /></span> Career</Link></li>
                                  </ul>
                                </Col>
                                <Col md="3" xs="12">
                                  <ul className='menu-items-links'>
                                    <li><Link href="/contact-us"><span><MdContactPhone /></span> Contact Us</Link></li>
                                  </ul>
                                </Col>
                              </Row>
                            </div>
                            <div className="menu-sub-title">
                              <div className='menu-title-heading'>Get in touch</div>
                            </div>
                            <div className='menu-items'>
                              <Row>
                                <Col md="3" xs="12">
                                  <div className='menu-social'>
                                    <Link href="mailto:info@Appzoro.com" className="link-social-menu">
                                      <span><BiLogoGmail /></span>
                                      <div className='menu-social-info'>
                                        <div className='social-menu-title'>Email</div>
                                        <p>info@Appzoro.com</p>
                                      </div>
                                    </Link>
                                  </div>
                                </Col>
                                <Col md="3" xs="12">
                                  <div className='menu-social'>
                                    <Link href="tel:678 462 4034" className="link-social-menu">
                                      <span><PiPhoneCallLight /></span>
                                      <div className='menu-social-info'>
                                        <div className='social-menu-title'>Contact Number</div>
                                        <p>678-462-4034</p>
                                      </div>
                                    </Link>
                                  </div>
                                </Col>
                                <Col md="3" xs="12">
                                  <div className='menu-social'>
                                    <Link href="https://www.facebook.com/AppZoroT" target="_blank" className="link-social-menu">
                                      <span><CgFacebook /></span>
                                      <div className='menu-social-info'>
                                        <div className='social-menu-title'>Facebook</div>
                                        <p>facebook.com/AppZoroT</p>
                                      </div>
                                    </Link>
                                  </div>
                                </Col>
                                <Col md="3" xs="12">
                                  <div className='menu-social'>
                                    <Link href="https://twitter.com/AppzoroT" target='_blank' className="link-social-menu">
                                      <span><FaTwitter /></span>
                                      <div className='menu-social-info'>
                                        <div className='social-menu-title'>X</div>
                                        <p>twitter.com/AppzoroT</p>
                                      </div>
                                    </Link>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Container>
                      </div>
                    </li>
                    <li><Link href="/blog">Blogs</Link></li>
                  </ul>
                  <div className='az-info'>
                    <div className='call-az'>
                      <Link href="tel:678-462-4034"><MdCall /> 678-462-4034</Link>
                    </div>
                    <div className='consult-btn-az'>
                      <Link href="/contact-us" className='theme-btn-normal'>LET'S TALK</Link>
                    </div>
                  </div>
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default MainHeader