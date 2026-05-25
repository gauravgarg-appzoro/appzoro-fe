import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ContactHref from './common/ContactHref'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Form';
import { LuMoveRight } from './OptimizedIcons';

/** Legacy marketing header chrome only — use {@link MainHeader} + {@link MetaData} on public pages for SEO. */
const Header = () => {
  return (
    <>
      <header>
        <Container>
          <div className='az_header'>
            <div className='az_logo'>
              <Link href="/"><Image src="/assets/images/logo.png"  width={"159"} height={"48"} alt="AppZoro logo" /></Link>
            </div>
            <div className='az_header_btn'>
              <ContactHref href="/contact-us" className='btn_theme fs-14'>LET'S TALK <span><LuMoveRight /></span></ContactHref>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

export default Header