import React from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import {   LuMoveRight   } from '../components/OptimizedIcons';

const NotFound500 = () => {
  return (
    <>
      <MainHeader />
      <section className='not-found'>
        <Container>
          <div className='not-found-data'>
          <Image src="/assets/images/500.png"  width="1307" height="856" alt="500 eror" />
            <h3>Something went Wrong, please try after sometime!!</h3>
            <Link href="/" className="btn-style-arrow">Back to Home <span><LuMoveRight /></span></Link>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default NotFound500