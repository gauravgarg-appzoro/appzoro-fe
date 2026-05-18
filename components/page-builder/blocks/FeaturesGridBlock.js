import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function FeaturesGridBlock({ title, subtitle, features = [] }) {
    if (!features.length && !title) return null;

    return (
        <section className="industry-features-section py-5">
            <Container>
                {title && (
                    <div className="section-title-dark text-center mb-4">
                        <h2>{title}</h2>
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                )}
                <Row>
                    {features.map((feat, idx) => (
                        <Col md="6" lg="4" key={feat.id || idx} className="mb-4">
                            <div className="feature-card p-4 h-100 border rounded-3">
                                <h4>{feat.title || feat.featuresTitle || ''}</h4>
                                <p className="text-muted mb-0">{feat.description || feat.featuresDescription || ''}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
