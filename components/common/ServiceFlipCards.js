import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import RichText from './RichText';

/**
 * ServiceFlipCards — Renders flip cards with front (image+icon+title) and back (title+desc).
 * Images are loaded from the backend; no hardcoded fallback array.
 * Props: { sectionTitle, cards: [{ title, description, iconSvg, backgroundImage }] }
 */
const ServiceFlipCards = ({ sectionTitle, cards }) => {
    if (!cards || cards.length === 0) return null;

    const flipIcons = [
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C4.46957 16 3.96086 15.7893 3.58579 15.4142C3.21071 15.0391 3 14.5304 3 14V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H15L12 20L9 16Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.45801 12C3.73201 7.943 7.52301 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.52301 19 3.73201 16.057 2.45801 12Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17L12 22L22 17" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12L12 17L22 12" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8V16M12 11V16M8 14V16M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3C15.3 5.7 16.2 5.7 16.8 6.3L20.7 10.2C21.3 10.8 21.3 11.7 20.7 12.3L12.7 20.3C12.3 20.7 11.7 21 11.1 21H7C6.4 21 6 20.6 6 20V15.9C6 15.3 6.3 14.7 6.7 14.3L14.7 6.3Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 8L18 13" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 3H5C3.89543 3 3 3.89543 3 5V9" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 9H9.01M12 9H12.01M15 9H15.01" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17L12 22L22 17" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12L12 17L22 12" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 22V12" stroke="#DB241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>'
    ];

    return (
        <section className="ai-models-section" style={{ background: '#F9F9F9', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a' }}>{sectionTitle}</h2>
                    </div>
                )}
                <Row>
                    {cards.map((card, idx) => {
                        const imagePath = card?.backgroundImage || card?.image || '';
                        const bgSrc = imagePath
                            ? (imagePath.startsWith('http') ? imagePath : `${STRAPI_IMAGE_BASE_URL}${imagePath}`)
                            : null;
                        const iconPath = card?.iconImage || card?.icon || '';
                        const iconSrc = iconPath
                            ? (iconPath.startsWith('http') ? iconPath : `${STRAPI_IMAGE_BASE_URL}${iconPath}`)
                            : null;
                        return (
                            <Col md="3" xs="12" className="mb-4" key={idx}>
                                <div className="ai-model-flip-card">
                                    <div className="ai-model-flip-card-inner">
                                        <div className="ai-model-flip-card-front">
                                            {bgSrc && (
                                                <Image
                                                    src={bgSrc}
                                                    width={300}
                                                    height={315}
                                                    alt={card.title || 'Model'}
                                                    unoptimized
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            )}
                                            <div className="ai-model-content">
                                                <div className="ai-model-icon">
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
                                                        <span dangerouslySetInnerHTML={{ __html: card.iconSvg || flipIcons[idx % flipIcons.length] }} />
                                                    )}
                                                </div>
                                                <h3>{card.title}</h3>
                                            </div>
                                        </div>
                                        <div className="ai-model-flip-card-back">
                                            <h3>{card.title}</h3>
                                            <RichText>{card.description}</RichText>
                                        </div>
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

export default ServiceFlipCards;
