import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/Footer";
import MetaData from "../../components/common/MetaData";
import MainHeader from "../../components/MainHeader";

function SitemapList({ items }) {
  return (
    <ul className="sitemap-data">
      {items.map((item) => {
        const href = (item.slug && item.slug.startsWith('/')) ? item.slug : `/${item.slug || ''}`;
        if (href === '//' || href === '') return null;
        return (
        <li key={item.slug || item.title}>
          <Link href={href} className="text-blue-600 hover:underline">
            {item.title}
          </Link>
          {item.children && <SitemapList items={item.children} />}
        </li>
        );
      })}
    </ul>
  );
}

const Sitemap = () => {
  const commonMenu = [
    { title: "Home", slug: "/" },
    { title: "About Us", slug: "about-us" },
    { title: "Services", slug: "services" },
    { title: "Industries", slug: "industry" },
    { title: "Portfolio", slug: "case-study" },
    { title: "Blogs", slug: "blog" },
    { title: "Press Release", slug: "press-release" },
    { title: "Career", slug: "career" },
    { title: "Contact us", slug: "contact-us" },
    { title: "Team", slug: "team" },
    { title: "Locations", slug: "locations" },
    { title: "Getting Started", slug: "getting-started" },
  ]

  const servicesMenu = [
    { "title": "Mobile App Development", "slug": "services/mobile-app-development-company-usa" },
    { "title": "Web App Development", "slug": "services/web-app-development" },
    { "title": "Android App Development", "slug": "services/android-app-development-company-usa" },
    { "title": "IOT Development Services", "slug": "services/iot-development-services" },
    { "title": "Crossplatform App Development", "slug": "services/cross-platform-app-development-company-usa" },
    { "title": "Custom Software Development", "slug": "services/custom-software-development-company-usa" },
    { "title": "iOS App Development", "slug": "services/ios-app-development" },
    { "title": "AI & ML Services", "slug": "services/ai-and-ml-development-company-usa" },
    { "title": "UI UX Design Services", "slug": "services/ui-ux-design-services" },
    { "title": "Enterprise Mobile App Development", "slug": "services/enterprise-mobile-app-development-company" },
    { "title": "AI App Development", "slug": "services/ai-app-development-company" },
    { "title": "Hybrid App Development", "slug": "services/hybrid-app-development-company" },
    { "title": "Custom Enterprise Software Development", "slug": "services/custom-enterprise-software-development-company" },
  ]

  const productsMenu = [
    { "title": "Fitness App Development", "slug": "fitness-app-development" },
    { "title": "Salon App Development", "slug": "salon-app-development" },
    { "title": "Wellness App Development", "slug": "wellness-app-development" },
    { "title": "Transportation App Development", "slug": "transportation-app-development" },
    { "title": "Fintech App Development", "slug": "fintech-app-development" },
    { "title": "Custom LLM Development", "slug": "custom-llm-development" },
    { "title": "Transportation Software Development", "slug": "transportation-software-development-company" },
    { "title": "Custom Fintech Software Development", "slug": "custom-fintech-software-development" },
  ];

  const industyMenu = [
    { "title": "Retail & E-Commerce", "slug": "industry/retail-ecommerce" },
    { "title": "Food & Restaurant", "slug": "industry/restaurant-food-delivery-applications" },
    { "title": "Social Networking", "slug": "industry/social-networking-app-development" },
    { "title": "Real Estate", "slug": "industry/real-estate" },
    { "title": "Sports & Games", "slug": "industry/sports-app-development" },
    { "title": "Media and Entertainment", "slug": "industry/entertainment-app-development" },
    { "title": "Healthcare and Fitness", "slug": "industry/healthcare-app-development" },
    { "title": "Travel & Hospitality", "slug": "industry/travel-hospitality" },
    { "title": "Meetings and Events ", "slug": "industry/conference-and-events-app-development" },
    { "title": "E-learning & Education", "slug": "industry/education-software-development" },
    { "title": "Fintech", "slug": "industry/financial-software-development" },
    { "title": "Logistics & Transport", "slug": "industry/logistics-app-development" },
  ]

  return (
    <>
      <MetaData
        title="Sitemap | AppZoro"
        description="Explore the complete sitemap of AppZoro. Easily find links to all pages, products, and services offered on our website."
        url={`/services`}
        image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
      <MainHeader />
      <section className='page-title getting-started-bg'>
        <Container>
          <div className='page-section-title'>
            <h1>Sitemap </h1>
          </div>
        </Container>
      </section>
      <section className="sitemap-content">
        <Container>
          <Row>
            <Col md="12" xs="12">
              <div className="sitemap-section-title">
                <h2>Pages</h2>
                <SitemapList items={commonMenu} />
              </div>
            </Col>
            <Col md="12" xs="12">
              <div className="sitemap-section-title">
                <h2>Our Services</h2>
                <SitemapList items={servicesMenu} />
              </div>
            </Col>
            <Col md="12" xs="12">
              <div className="sitemap-section-title">
                <h2>Our Products</h2>
                <SitemapList items={productsMenu} />
              </div>
            </Col>
            <Col md="12" xs="12">
              <div className="sitemap-section-title">
                <h2>Industries We Serve</h2>
                <SitemapList items={industyMenu} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />

    </>
  )
}

export default Sitemap

export async function getStaticProps() {
    return { props: {} }
}