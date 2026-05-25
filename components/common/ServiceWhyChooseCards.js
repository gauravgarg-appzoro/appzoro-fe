import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import RichText from './RichText';

/**
 * ServiceWhyChooseCards — Renders dark-background cards with gradient borders and icons.
 * Images are loaded from the backend; no hardcoded fallback array.
 * Props: { sectionTitle, cards: [{ title, description, image }] }
 */

const ServiceWhyChooseCards = ({ sectionTitle, cards }) => {
    if (!cards || cards.length === 0) return null;
    return (
        <section className="ai-why-choose-section" style={{ background: '#0F0F0F', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="section-title text-center mb-4">
                        <h2 style={{ color: 'white', fontSize: '40px', fontWeight: '600', paddingLeft: '20px', paddingRight: '20px' }}>{sectionTitle}</h2>
                    </div>
                )}
                <Row style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    {cards.map((card, idx) => {
                        const imgSrc = card.image ? (card.image.startsWith('http') ? card.image : `${STRAPI_IMAGE_BASE_URL}${card.image}`) : null;
                        return (
                            <Col md={idx < 3 ? '4' : '6'} xs="12" className="mb-4" key={idx}>
                                <div className="ai-why-card-new">
                                    <h3>{card.title}</h3>
                                    <RichText>{card.description}</RichText>
                                    {imgSrc && (
                                        <div className="card-icon">
                                            <Image src={imgSrc} width={80} height={80} alt={card.title || 'Icon'} unoptimized />
                                        </div>
                                    )}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default ServiceWhyChooseCards;
