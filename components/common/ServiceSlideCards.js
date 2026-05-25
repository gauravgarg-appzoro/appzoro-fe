import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import RichText from './RichText';

/**
 * ServiceSlideCards — Renders overlay cards that slide up on hover.
 * Images are loaded from the backend; no hardcoded fallback array.
 * Props: { sectionTitle, cards: [{ title, description, iconSvg, backgroundImage }] }
 */

const SLIDE_ICONS = [
    // Clipboard (Strategy & Use Case Planning)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    // Phone (Multi-Platform Deployment)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    // Pyramid (Scalable Architecture)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7L12 2L20 7M4 7L12 12M20 7L12 12M12 12V22" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    // Document (Custom Integrations)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    // Lock (Secure & Compliant)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    // Brain (Continuous Learning)
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C11.5 2 11 2.19 10.59 2.59C10.2 3 10 3.5 10 4V4.5C9.5 4.5 9 4.68 8.59 5.08C8.2 5.5 8 6 8 6.5V7C7.5 7 7 7.18 6.59 7.58C6.2 8 6 8.5 6 9V10C6 10.5 6.2 11 6.59 11.41C7 11.8 7.5 12 8 12H8.5C8.5 12.5 8.68 13 9.08 13.41C9.5 13.8 10 14 10.5 14H11V20C11 20.5 11.2 21 11.59 21.41C12 21.8 12.5 22 13 22C13.5 22 14 21.8 14.41 21.41C14.8 21 15 20.5 15 20V14H15.5C16 14 16.5 13.8 16.91 13.41C17.32 13 17.5 12.5 17.5 12H18C18.5 12 19 11.8 19.41 11.41C19.8 11 20 10.5 20 10V9C20 8.5 19.8 8 19.41 7.59C19 7.2 18.5 7 18 7V6.5C18 6 17.8 5.5 17.41 5.09C17 4.7 16.5 4.5 16 4.5V4C16 3.5 15.8 3 15.41 2.59C15 2.2 14.5 2 14 2H12Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
];

const ServiceSlideCards = ({ sectionTitle, cards }) => {
    if (!cards || cards.length === 0) return null;
    return (
        <section className="ai-expertise-proven-section" style={{ background: '#FFFFFF', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="section-title-dark text-center mb-4">
                        <h2 style={{ fontSize: '40px' }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                    </div>
                )}
                <Row>
                    {cards.map((card, idx) => {
                        const bgSrc = card.backgroundImage
                            ? (card.backgroundImage.startsWith('http') ? card.backgroundImage : `${STRAPI_IMAGE_BASE_URL}${card.backgroundImage}`)
                            : null;
                        const iconPath = card?.iconImage || card?.icon || '';
                        const iconSrc = iconPath
                            ? (iconPath.startsWith('http') ? iconPath : `${STRAPI_IMAGE_BASE_URL}${iconPath}`)
                            : null;
                        return (
                            <Col md="6" xs="12" className="mb-4" key={idx}>
                                <div className="ai-expertise-slide-card">
                                    {bgSrc && (
                                        <Image
                                            src={bgSrc}
                                            width={400}
                                            height={345}
                                            alt={card.title || 'Expertise'}
                                            unoptimized
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="ai-expertise-slide-content">
                                        <div className="ai-expertise-slide-icon">
                                            {iconSrc ? (
                                                <Image
                                                    src={iconSrc}
                                                    width={30}
                                                    height={30}
                                                    alt={`${card.title || 'Card'} icon`}
                                                    unoptimized
                                                    style={{ width: 30, height: 30, objectFit: 'contain' }}
                                                />
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: card.iconSvg || SLIDE_ICONS[idx % SLIDE_ICONS.length] }} />
                                            )}
                                        </div>
                                        <h3>{card.title}</h3>
                                    </div>
                                    <div className="ai-expertise-slide-overlay">
                                        <h3>{card.title}</h3>
                                        <RichText>{card.description}</RichText>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default ServiceSlideCards;
