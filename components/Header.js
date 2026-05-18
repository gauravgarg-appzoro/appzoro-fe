import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ContactHref from './common/ContactHref'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Form';
import Head from 'next/head'
import { LuMoveRight } from './OptimizedIcons';

const Header = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title key="title">Atlanta App Developers | Atlanta Web Developers | AppZoro</title>
        <meta name="title" content="Atlanta App Developers | Atlanta Web Developers | AppZoro" />
        <meta property="og:title" content="Atlanta App Developers | Atlanta Web Developers | AppZoro" />
        <meta name="twitter:title" content="Atlanta App Developers | Atlanta Web Developers | AppZoro" />
        <meta name="description" content="AppZoro Technology- Atlanta app developers and Atlanta web developers firm. Request a quote for app development in Atlanta &amp; web development." />
        <meta property="og:description" content="AppZoro Technology- Atlanta app developers and Atlanta web developers firm. Request a quote for app development in Atlanta &amp; web development." />
        <meta name="twitter:description" content="AppZoro Technology- Atlanta app developers and Atlanta web developers firm. Request a quote for app development in Atlanta &amp; web development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://appzoro.com/" />
        <meta property="og:image" content="https://appzoro.com/assets/images/web_icon.png" />
        <meta name="twitter:image" content="https://appzoro.com/assets/images/web_icon.png" />
        <meta property="twitter:url" content="https://appzoro.com/" />
        <meta property="twitter:card" content="summary_large_image" />

        <meta property="og:site_name" content="Appzoro Technologies Inc Atlanta" />
        <meta property="article:publisher" content="https://www.facebook.com/AppZoroT/" />
        <meta property="article:modified_time" content="2021-06-01T12:22:26+00:00" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AppZoroT" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="11 minutes" />
        <meta name="referrer" content="origin" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <header>
        <Container>
          <div className='az_header'>
            <div className='az_logo'>
              <Link href="/"><Image src="/assets/images/logo.png"  width={"159"} height={"48"} alt="Appzoro" /></Link>
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