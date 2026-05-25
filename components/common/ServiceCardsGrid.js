import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import RichText from './RichText';

/**
 * ServiceCardsGrid — Renders a 3-column grid of image+title+description cards.
 * Images are loaded from the backend; no hardcoded fallback array.
 * Props: { sectionTitle, cards: [{ title, description, image }] }
 */

const ServiceCardsGrid = ({ sectionTitle, cards }) => {
    if (!cards || cards.length === 0) return null;
    const resolveImagePath = (card) => {
        const raw =
            card?.image ||
            card?.backgroundImage ||
            card?.image_url ||
            card?.image?.url ||
            card?.backgroundImage?.url ||
            card?.image_url?.url ||
            (Array.isArray(card?.image) ? card.image?.[0]?.url : '') ||
            (Array.isArray(card?.backgroundImage) ? card.backgroundImage?.[0]?.url : '');
        return typeof raw === 'string' ? raw : '';
    };

    return (
        <section className="ai-expertise-section" style={{ background: '#F9F9F9', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="section-title-dark text-center mb-5">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a' }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                    </div>
                )}
                <Row>
                    {cards.map((card, idx) => {
                        const imagePath = resolveImagePath(card);
                        const imgSrc = imagePath ? (imagePath.startsWith('http') ? imagePath : `${STRAPI_IMAGE_BASE_URL}${imagePath}`) : null;
                        return (
                            <Col md="4" xs="12" className="mb-4" key={idx}>
                                <div className="ai-expertise-card">
                                    {imgSrc && (
                                        <div className="ai-expertise-image">
                                            <Image
                                                src={imgSrc}
                                                width={400}
                                                height={226}
                                                alt={card.title || 'Service'}
                                                unoptimized
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div className="ai-expertise-content">
                                        {card.title && <h3>{card.title}</h3>}
                                        {card.description && <RichText>{card.description}</RichText>}
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

export default ServiceCardsGrid;
