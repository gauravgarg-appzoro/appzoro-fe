import React from 'react'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import MetaData from '../../components/common/MetaData'
import { resolveOgImage } from '../../lib/seo'

const ThankYou = () => {
    return (
        <>
            <MetaData
                title="Thank You for Connecting with AppZoro"
                description="Thank you for your inquiry! Our team at AppZoro will respond shortly. Explore our services while you wait."
                url="/thank-you"
                image={resolveOgImage('/assets/images/az-logo-large.png')}
                robots="noindex, nofollow"
            />
            <MainHeader />
            <section className='thankyou'>
                <div className='tq-banenr'>
                    <Image src="/assets/images/thankyou_banner.png" width={1365} height={459} alt="Thank you" style={{ width: '100%', height: 'auto' }} />
                </div>
                <Container>
                        <div className='py-3 text-center mt-4'>
                            <Image src="/assets/images/Done.png" alt="Confirmation checkmark" width={100} height={100} />
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
