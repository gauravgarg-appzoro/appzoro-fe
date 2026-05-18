import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import MetaData from '../../components/common/MetaData'

const ThankYou = () => {
    return (
        <>
            <Header />
            <MetaData title="Thank You for Connecting with AppZoro" description="Thank you for your inquiry! Our team at AppZoro will respond shortly. Explore our services while you wait and discover how we can assist you further." url={`/thank-you`} image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
            <section className='thankyou'>
                <div className='tq-banenr'>
                    <Image  layout="responsive" src="/assets/images/thankyou_banner.png" width="1365" height="459" alt="Thank you" />
                </div>
                <Container>
                        <div className='py-3 text-center mt-4'>
                            <Image  src="/assets/images/Done.png" alt="Check Image" width="100" height="100" />
                        </div>
                        <div className='py-3 mb-4 text-center'>
                            <h1>Thank You</h1>
                            <p>Thank you for contacting us, we will contact you soon.</p>
                        </div>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default ThankYou

export async function getStaticProps() {
    return { props: {} }
}