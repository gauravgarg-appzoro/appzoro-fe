import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * ServiceStatsSection — Renders stat counters on dark background.
 * Accepts children to render additional content (e.g. testimonials) inside the same dark section.
 * Props: { title, subtitle, stats: [{ value, label }], children }
 */
const ServiceStatsSection = ({ title, subtitle, stats, children }) => {
    if (!stats || stats.length === 0) return null;
    return (
        <section className="ai-ranked-testimonial-section" style={{ background: '#1a1a1a', padding: '30px 0' }}>
            <Container>
                {title && (
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: '600' }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    </div>
                )}
                {subtitle && (
                    <div className="text-center mb-5">
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '18px', maxWidth: '1100px', margin: '0 auto' }}>
                            {subtitle}
                        </p>
                    </div>
                )}
                <Row className="justify-content-center" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    {stats.map((stat, idx) => (
                        <Col xs={6} lg="3" md="6" className="mb-4" key={idx}>
                            <div className="ai-stat-box">
                                <h3 style={{ fontSize: '48px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>{stat.value}</h3>
                                <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>{stat.label}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
                {children}
            </Container>
        </section>
    );
};

export default ServiceStatsSection;
