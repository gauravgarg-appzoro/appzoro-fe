import React from 'react';
import Container from 'react-bootstrap/Container';
import ContactHref from './ContactHref';
import Image from 'next/image';
import { LuMoveRight } from '../OptimizedIcons';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';

/**
 * ServiceCTABanner — Renders a CTA section with background image overlay.
 * Props: { title, subtitle, buttonText, buttonLink, backgroundImage, className }
 */
const ServiceCTABanner = ({ title, subtitle, buttonText, buttonLink, backgroundImage, className }) => {
    if (!title) return null;
    return (
        <section style={{ padding: '30px 0', background: '#fff' }}>
            <Container>
                <div className={className || 'ai-cta-section'} style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '20px'
                }}>
                    {backgroundImage && (
                        <Image
                            src={`${STRAPI_IMAGE_BASE_URL}${backgroundImage}`}
                            alt="CTA Background"
                            width={1200}
                            height={400}
                            unoptimized
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    )}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '0 60px'
                    }}>
                        <div style={{ maxWidth: '600px' }}>
                            <h2 style={{
                                color: 'white', fontSize: '36px',
                                marginBottom: '15px', fontWeight: '600', lineHeight: '1.3'
                            }}>{title}</h2>
                            {subtitle && (
                                <p style={{
                                    color: 'rgba(255,255,255,0.9)', fontSize: '18px',
                                    marginBottom: '25px', lineHeight: '1.6'
                                }}>{subtitle}</p>
                            )}
                            {buttonText && (
                                <ContactHref href={buttonLink || '/contact-us'} className="ai-gradient-btn">
                                    {buttonText}{' '}
                                    <span><LuMoveRight /></span>
                                </ContactHref>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ServiceCTABanner;
