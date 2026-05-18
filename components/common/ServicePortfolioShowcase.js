import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import Link from 'next/link';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';

/**
 * ServicePortfolioShowcase — Renders a portfolio card matching Jayesh branch exactly.
 * Props: { sectionTitle, portfolio: { appName, description, rating, appIcon, screenshot, appStoreLink, playStoreLink } }
 */
const ServicePortfolioShowcase = ({ sectionTitle, portfolio }) => {
    if (!portfolio) return null;

    const getImgSrc = (path) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `${STRAPI_IMAGE_BASE_URL}${path}`;
    };

    return (
        <section className="ai-portfolio-section" style={{ background: '#fff', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a' }}>{sectionTitle}</h2>
                    </div>
                )}
                <div className="ai-portfolio-card-box" style={{
                    background: '#232E5E',
                    borderRadius: '30px',
                    padding: '40px',
                    minHeight: '480px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Row className="align-items-center">
                        <Col lg="6" md="12" className="mb-4 mb-lg-0">
                            <div className="ai-portfolio-content">
                                {portfolio.appIcon && (
                                    <div className="mb-3">
                                        <Image
                                            src={getImgSrc(portfolio.appIcon)}
                                            width={70}
                                            height={70}
                                            alt={portfolio.appName || 'App'}
                                            unoptimized
                                            style={{ borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                                        />
                                    </div>
                                )}
                                {portfolio.appName && (
                                    <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>{portfolio.appName}</h3>
                                )}
                                {portfolio.description && (
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '25px' }}>
                                        {portfolio.description}
                                    </p>
                                )}
                                {portfolio.rating && (
                                    <div className="d-flex align-items-center mb-3">
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            marginRight: '12px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>{portfolio.rating}</span>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>App Rating</span>
                                    </div>
                                )}
                                <div className="d-flex gap-3 mt-4">
                                    {portfolio.appStoreLink && (
                                        <Link href={portfolio.appStoreLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginRight: '15px' }}>
                                            <Image src="/assets/images/ai development company/App Store.png" width={130} height={40} alt="App Store" unoptimized />
                                        </Link>
                                    )}
                                    {portfolio.playStoreLink && (
                                        <Link href={portfolio.playStoreLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                                            <Image src="/assets/images/ai development company/Google-Play.png" width={130} height={40} alt="Play Store" unoptimized />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
                            {portfolio.screenshot && (
                                <div className="ai-portfolio-image text-center">
                                    <Image
                                        src={getImgSrc(portfolio.screenshot)}
                                        width={320}
                                        height={362}
                                        alt={portfolio.appName || 'App Screenshot'}
                                        unoptimized
                                        style={{ maxWidth: '320px', height: 'auto' }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default ServicePortfolioShowcase;
