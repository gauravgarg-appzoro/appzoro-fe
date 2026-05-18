import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ContactHref from './common/ContactHref'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dynamic from "next/dynamic";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from './OptimizedIcons';





const Footer = () => {
  return (
    <>
      <footer>
        <div className='footer-view'>
          <Container>
            <Row>
              <Col md="4" xs="12">
                <div className='az_ftr-info'>
                  <div className='mb-3'>
                    <Image src="/assets/images/ftr-logo.png" width={"139"} height={"35"} alt="Appzoro" />
                  </div>
                  <p>AppZoro is a top-rated custom software development company. We empower businesses and elevate customer experiences through our excellence in what we do.</p>
                  <div className='ftr-social'>
                    <ul>
                      <li className='ftr-social_fb'><Link href="https://www.facebook.com/AppZoroT" aria-label="Visit our Facebook page" target='_blank'><FaFacebookF /></Link></li>
                      <li className='ftr-social_twitter'><Link href="https://twitter.com/AppzoroT" aria-label="Visit our Twitter page" target='_blank'><Image src="/assets/images/twitter.png" width="14" height="14" alt="twitter" /></Link></li>
                      <li className='ftr-social_linkedin'><Link href="https://www.linkedin.com/company/appzoro" aria-label="Visit our LinkedIn page" target='_blank'><FaLinkedinIn /></Link></li>
                      <li className='ftr-social_insta'><Link href="https://www.instagram.com/appzoro_technologies/?hl=en" aria-label="Visit our Instagram page" target='_blank'><FaInstagram /></Link></li>
                      <li className='ftr-social_ytd'><Link href="https://www.youtube.com/channel/UCTDITNsY5Z_TmXvF2KtYQFg" aria-label="Visit our YouTube channel" target='_blank'><FaYoutube /></Link></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md="3" xs="12">
                <div className='az_ftr-links'>
                  <h3>Services</h3>
                  <ul>
                    <li><Link href="/services/mobile-app-development-company-usa" prefetch={false}>Mobile App Development</Link></li>
                    <li><Link href="/services/web-app-development" prefetch={false}>Web App Development </Link></li>
                    <li><Link href="/services/ios-app-development" prefetch={false}>iOS App Development</Link></li>
                    <li><Link href="/services/custom-software-development-company-usa" prefetch={false}>Custom Software Development</Link></li>
                    <li><Link href="/services/ui-ux-design-services" prefetch={false}>UI UX Design Services</Link></li>
                  </ul>
                </div>
              </Col>
              <Col md="2" xs="12">
                <div className='az_ftr-links'>
                  <h3>Quick links</h3>
                  <ul>
                    <li><Link href="/team/" prefetch={false}>Teams</Link></li>
                    <li><Link href="/career/" prefetch={false}>Career</Link></li>
                    <li><ContactHref href="/contact-us" prefetch={false}>Contact</ContactHref></li>
                    <li><Link href="/blog" prefetch={false}>Blogs</Link></li>
                    <li><Link href="/locations/ " prefetch={false}>Locations</Link></li>
                    <li><Link href="/getting-started" prefetch={false}>Getting Started</Link></li>
                    <li><Link href="/sitemap" prefetch={false}>Sitemap</Link></li>
                  </ul>
                </div>
              </Col>
              <Col md="3" xs="12">
                <div className='az_ftr-connect'>
                  <h3>Connect With Us</h3>
                  <h4>USA</h4>
                  <div className='add-block'>
                    <span><HiOutlineLocationMarker /></span>
                    <p>Atlanta Tech Village<br />3423 Piedmont Rd., NE <br />Atlanta, GA 30305</p>
                  </div>
                  <div className='add-block align-items-center'>
                    <span><HiOutlinePhone /></span>
                    <p>Call Now - <Link href="tel:678 462 4034">678-462-4034</Link></p>
                  </div>
                  <div className='add-block align-items-center'>
                    <span><HiOutlineMail /></span>
                    <p>Email Us - <Link href="mailto:info@Appzoro.com">info@Appzoro.com</Link></p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='copyright-block'>
          Copyright © 2026 AppZoro Technologies Inc - Atlanta App Developers
        </div>
      </footer>
    </>
  )
}

export default Footer