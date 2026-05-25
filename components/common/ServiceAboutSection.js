import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import ContactHref from './ContactHref';
import { LuMoveRight } from '../OptimizedIcons';
import { normalizeHtmlLineBreaks } from '../../lib/normalizeHtmlLineBreaks';

/**
 * ServiceAboutSection — Renders about section with heading, description, and CTA.
 * Image is hardcoded to the Jayesh branch "About Our Enterprise AI" image (same for all services).
 * Props: { title, description, ctaText, ctaLink }
 */
const ServiceAboutSection = ({ title, description, ctaText, ctaLink }) => {
    if (!title && !description) return null;
    const normalizedDescription = description
        ? normalizeHtmlLineBreaks(description)
        : '';
    return (
        <section className="why-az-service" style={{ padding: '30px 0' }}>
            <Container>
                <Row className="align-items-center">
                    <Col md="6" xs="12" className="pe-md-4 pe-lg-5">
                        <div className="why-az-content">
                            {title && (
                                <h2>{title}</h2>
                            )}
                            {normalizedDescription && (
                                <div dangerouslySetInnerHTML={{ __html: normalizedDescription }} />
                            )}
                            {ctaText && (
                                <ContactHref href={ctaLink || '/contact-us'} className="ai-gradient-btn mt-3">
                                    {ctaText}{' '}
                                    <span><LuMoveRight /></span>
                                </ContactHref>
                            )}
                        </div>
                    </Col>
                    <Col md="6" xs="12" className="ps-md-4 ps-lg-5">
                        <div className="ai-single-image">
                            <Image
                                alt={title || 'About Our Services'}
                                width={600}
                                height={450}
                                src="/assets/images/ai development company/About-Our-Enterprise-AI.png"
                                unoptimized
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ServiceAboutSection;
