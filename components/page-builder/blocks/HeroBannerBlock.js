import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

export default function HeroBannerBlock({ title, subtitle, backgroundImage, STRAPI_IMAGE_BASE_URL = '' }) {
    const bgSrc = backgroundImage
        ? (backgroundImage.startsWith('http') ? backgroundImage : `${STRAPI_IMAGE_BASE_URL}${backgroundImage}`)
        : null;

    return (
        <section className="page-title industry-bg" style={{ position: 'relative', overflow: 'hidden' }}>
            {bgSrc && (
                <Image src={bgSrc} alt={title || 'Banner'} fill priority sizes="100vw" style={{ objectFit: 'cover', zIndex: -1 }} />
            )}
            <Container style={{ position: 'relative', zIndex: 1 }}>
                <div className="page-section-title">
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                </div>
            </Container>
        </section>
    );
}
