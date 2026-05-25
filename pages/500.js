import React from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import MetaData from '../components/common/MetaData'
import { resolveOgImage } from '../lib/seo'
import { LuMoveRight } from '../components/OptimizedIcons';

const NotFound500 = () => {
  return (
    <>
      <MetaData
        title="Server Error | AppZoro"
        description="Something went wrong on our end. Please try again later or return to the AppZoro homepage."
        url="/500"
        image={resolveOgImage('/assets/images/az-logo-large.png')}
        robots="noindex, nofollow"
      />
      <MainHeader />
      <section className='not-found'>
        <Container>
          <div className='not-found-data'>
          <Image src="/assets/images/500.png" width={1307} height={856} alt="500 error" />
            <h1>Something went wrong</h1>
            <p>Please try again after some time.</p>
            <Link href="/" className="btn-style-arrow">Back to Home <span><LuMoveRight /></span></Link>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default NotFound500
