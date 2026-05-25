import React from 'react';
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import Footer from '../../components/Footer';
import MainHeader from '../../components/MainHeader';
import MetaData from '../../components/common/MetaData';
import SeoJsonLd from '../../components/common/SeoJsonLd';
import { buildBreadcrumbSchema } from '../../lib/schemaBuilders';
import ContactUsBody from '../../components/contact/ContactUsBody';
import { fetchSitePage } from '../../lib/fetchSitePage';

const ContactUs = ({ page }) => (
    <>
        <MetaData
            title={page?.seo_title || 'Contact Us - Web and App development Company'}
            description={
                page?.seo_description ||
                'If you want to get in touch? Fill in the form to contact us with your details and requirements.'
            }
            url="/contact-us"
            image={DEFAULT_OG_IMAGE}
        />
        <SeoJsonLd
            data={buildBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Contact Us', url: '/contact-us' },
            ])}
        />
        <MainHeader />
        <ContactUsBody
            variant="page"
            headlinePrimary={page?.headline_primary}
            headlineSecondary={page?.headline_secondary}
            intro={page?.intro}
        />
        <Footer />
    </>
);

export default ContactUs;

export async function getStaticProps() {
    const page = await fetchSitePage('contact-us');
    return {
        props: { page: page || null },
        revalidate: 300,
    };
}
