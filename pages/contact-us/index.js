import React from 'react';
import Footer from '../../components/Footer';
import MainHeader from '../../components/MainHeader';
import MetaData from '../../components/common/MetaData';
import ContactUsBody from '../../components/contact/ContactUsBody';

const ContactUs = () => (
    <>
        <MetaData title="Contact Us - Web and App development Company" description="If you want to get in touch? Fill in the form to contact us with your details and requirements." url={`/contact-us`} image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
        <MainHeader />
        <ContactUsBody variant="page" />
        <Footer />
    </>
);

export default ContactUs;

export async function getStaticProps() {
    return { props: {} };
}
