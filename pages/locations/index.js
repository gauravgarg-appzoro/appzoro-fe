import React from 'react'
import Footer from '../../components/Footer'
import MainHeader from '../../components/MainHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link';
import TalkExpert from '../../components/common/TalkExpert';
import MetaData from '../../components/common/MetaData';
import { REACT_APP_API_URL } from '../../lib/constants';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {   IoLocationOutline, LuMoveRight   } from '../../components/OptimizedIcons';
const ReactMarkdown = dynamic(import('react-markdown'));

const Locaitons = ({ locations, services }) => {
    const getFilteredLocations = (locations, serviceName) => {
        const filteredData = locations?.filter(item => item?.service?.id === serviceName);
        return filteredData;
    }
    const locationSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ProfessionalService",
                "@id": "https://appzoro.com/#organization",
                "name": "AppZoro Technologies Inc",
                "url": "https://appzoro.com/",
                "logo": "https://appzoro.com/assets/images/logo.png",
                "telephone": "+1-678-462-4034",
                "email": "info@Appzoro.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "3423 Piedmont Rd., NE, Suite",
                    "addressLocality": "Atlanta",
                    "addressRegion": "GA",
                    "postalCode": "30305",
                    "addressCountry": "US"
                },
                "sameAs": [
                    "https://www.facebook.com/AppZoroT",
                    "https://twitter.com/AppzoroT",
                    "https://www.linkedin.com/company/appzoro",
                    "https://www.instagram.com/appzoro_technologies/?hl=en",
                    "https://www.youtube.com/channel/UCTDITNsY5Z_TmXvF2KtYQFg"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://appzoro.com/#website",
                "url": "https://appzoro.com/",
                "name": "AppZoro",
                "publisher": {
                    "@id": "https://appzoro.com/#organization"
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://appzoro.com/locations/#webpage",
                "url": "https://appzoro.com/locations/",
                "name": "AppZoro Locations: App Development Services Nationwide",
                "isPartOf": {
                    "@id": "https://appzoro.com/#website"
                },
                "about": {
                    "@id": "https://appzoro.com/#organization"
                },
                "breadcrumb": {
                    "@id": "https://appzoro.com/locations/#breadcrumb"
                },
                "inLanguage": "en-US",
                "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": [
                            "https://appzoro.com/locations/"
                        ]
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://appzoro.com/locations/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://appzoro.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Locations",
                        "item": "https://appzoro.com/locations/"
                    }
                ]
            },
            {
                "@type": "Service",
                "serviceType": "Mobile App and Custom Software Development",
                "provider": {
                    "@id": "https://appzoro.com/#organization"
                },
                "areaServed": [
                    { "@type": "Country", "name": "USA" },
                    { "@type": "AdministrativeArea", "name": "Georgia" },
                    { "@type": "AdministrativeArea", "name": "Massachusetts" },
                    { "@type": "AdministrativeArea", "name": "Illinois" },
                    { "@type": "AdministrativeArea", "name": "California" },
                    { "@type": "AdministrativeArea", "name": "Nevada" },
                    { "@type": "AdministrativeArea", "name": "Florida" },
                    { "@type": "AdministrativeArea", "name": "Washington" },
                    { "@type": "AdministrativeArea", "name": "Virginia" },
                    { "@type": "AdministrativeArea", "name": "New York" },
                    { "@type": "AdministrativeArea", "name": "Texas" }
                ],
                "description": "AppZoro offers custom mobile app development, web app development, and custom software solutions to startups, enterprises, and various industries across major USA locations.",
                "name": "App Development Services Nationwide"
            },
            {
                "@type": "ItemList",
                "name": "AppZoro Service Locations",
                "description": "A list of major US locations where AppZoro provides mobile and web app development services.",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Mobile App Development Company in Georgia",
                        "url": "https://appzoro.com/locations/mobile-app-development-georgia"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Mobile App Development Company in Boston",
                        "url": "https://appzoro.com/locations/mobile-app-development-boston"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Mobile App Development Company in Chicago",
                        "url": "https://appzoro.com/locations/mobile-app-development-chicago"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Mobile App Development Company in Los Angeles",
                        "url": "https://appzoro.com/locations/mobile-app-development-los-angeles"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "Mobile App Development Company in Las Vegas",
                        "url": "https://appzoro.com/locations/mobile-app-development-las-vegas"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "Mobile App Development Company in Miami",
                        "url": "https://appzoro.com/locations/mobile-app-development-miami"
                    },
                    {
                        "@type": "ListItem",
                        "position": 7,
                        "name": "Mobile App Development Company in San Diego",
                        "url": "https://appzoro.com/locations/mobile-app-development-san-diego"
                    },
                    {
                        "@type": "ListItem",
                        "position": 8,
                        "name": "Mobile App Development Company Seattle",
                        "url": "https://appzoro.com/locations/mobile-app-development-seattle"
                    },
                    {
                        "@type": "ListItem",
                        "position": 9,
                        "name": "Mobile App Development Company in Virginia",
                        "url": "https://appzoro.com/locations/mobile-app-development-virginia"
                    },
                    {
                        "@type": "ListItem",
                        "position": 10,
                        "name": "Mobile App Development Company in New York",
                        "url": "https://appzoro.com/locations/mobile-app-development-new-york"
                    },
                    {
                        "@type": "ListItem",
                        "position": 11,
                        "name": "Mobile App Development Company in Florida",
                        "url": "https://appzoro.com/locations/mobile-app-development-company-in-florida"
                    },
                    {
                        "@type": "ListItem",
                        "position": 12,
                        "name": "Mobile App Development Company in Washington DC",
                        "url": "https://appzoro.com/locations/mobile-app-development-company-in-washington-dc"
                    },
                    {
                        "@type": "ListItem",
                        "position": 13,
                        "name": "Mobile App Development Company in Dallas",
                        "url": "https://appzoro.com/locations/mobile-app-development-company-in-dallas"
                    },
                    {
                        "@type": "ListItem",
                        "position": 14,
                        "name": "Mobile App Development Company in Houston",
                        "url": "https://appzoro.com/locations/mobile-app-development-company-houston"
                    },
                    {
                        "@type": "ListItem",
                        "position": 15,
                        "name": "Web Development Company in Atlanta",
                        "url": "https://appzoro.com/locations/atlanta-web-development"
                    }
                ]
            }
        ]
    }
    return (
        <>
            <MetaData title="AppZoro Locations: App Development Services Nationwide" description="AppZoro's offers app development services across major USA locations. We deliver custom software solutions to startups, enterprises, and various industries." url={`/locations/`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
            <Head>
                <script
                    type="application/ld+json"
                    className="yoast-schema-graph"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(locationSchema, null, 2),
                    }}
                />
            </Head>
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Locations</h1>
                        <p>Discover exciting locations nearby with our comprehensive listings.</p>
                    </div>
                </Container>
            </section>
            <section className='common-listing'>
                <Container>
                    <Row>
                        {services?.map((services) => (
                            <>
                                {getFilteredLocations(locations, services?.id).length > 0 &&
                                    <>
                                        <div className="cat-title"><h3>{services.serviceTitle}</h3></div>
                                        {
                                            getFilteredLocations(locations, services?.id).map((post) => (
                                                <Col xs="12" lg="3" md="4" sm="6" key={post?._id}>
                                                    <div className="commonlist-box">
                                                        <div className="service-icon">
                                                            <span><IoLocationOutline /></span>
                                                        </div>
                                                        <h3 className="title">{post?.location_title}</h3>
                                                        <div className="description" title={post?.section1_content}>
                                                            <ReactMarkdown>{post?.section1_content}</ReactMarkdown>
                                                        </div>
                                                        <Link href={`/locations/${post?.slug}`} className="btn-style-arrow mt-3">Read More <span><LuMoveRight /></span></Link>
                                                    </div>
                                                </Col>

                                            ))
                                        }
                                    </>
                                }
                            </>
                        ))}

                    </Row>
                </Container>
            </section>
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const [locationsRes, servicesRes] = await Promise.all([
        fetch(`${REACT_APP_API_URL}locations-news`),
        fetch(`${REACT_APP_API_URL}services`)
    ]);
    const [locations, services] = await Promise.all([
        locationsRes.json(),
        servicesRes.json()
    ]);
    return { props: { locations, services } };
}


export default Locaitons