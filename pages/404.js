import React from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import {   LuMoveRight   } from '../components/OptimizedIcons';

const NotFound404 = () => {
  return (
    <>
      <MainHeader />
      <section className='not-found'>
        <div className="notfoundview">
          <Image src="/assets/images/404_img.png"  width="1024" height="768" alt="404 Not Found" />
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