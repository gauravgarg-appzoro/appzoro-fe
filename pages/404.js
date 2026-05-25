import React from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import MetaData from '../components/common/MetaData'
import { resolveOgImage } from '../lib/seo'
import { LuMoveRight } from '../components/OptimizedIcons';

const NotFound404 = () => {
  return (
    <>
      <MetaData
        title="Page Not Found | AppZoro"
        description="The page you are looking for could not be found. Return to the AppZoro homepage to explore our software development services."
        url="/404"
        image={resolveOgImage('/assets/images/az-logo-large.png')}
        robots="noindex, nofollow"
      />
      <MainHeader />
      <section className='not-found'>
        <div className="notfoundview">
          <Image src="/assets/images/404_img.png" width={1024} height={768} alt="404 Not Found" />
          <div className=''>
            <Link href="/" className="btn-style-arrow">Back to Home <span><LuMoveRight /></span></Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default NotFound404
