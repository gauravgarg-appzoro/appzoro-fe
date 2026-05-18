import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

export default function CTABannerBlock({ title, subtitle, buttonText = 'Get Started', buttonLink = '/contact-us' }) {
    return (
        <section className="cta-banner-section py-5" style={{ background: '#f8f9fa' }}>
            <Container className="text-center">
                {title && <h2 className="mb-3">{title}</h2>}
                {subtitle && <p className="text-muted mb-4">{subtitle}</p>}
                <Link href={buttonLink} className="btn_theme">
                    {buttonText}
                </Link>
            </Container>
        </section>
    );
}
