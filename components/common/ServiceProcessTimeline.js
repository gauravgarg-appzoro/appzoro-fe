import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * ServiceProcessTimeline — Renders a numbered process timeline (2-col layout).
 * Props: { sectionTitle, sectionSubtitle, steps: [{ stepNumber, title, description }] }
 */
const ServiceProcessTimeline = ({ sectionTitle, sectionSubtitle, steps }) => {
    if (!steps || steps.length === 0) return null;
    return (
        <section className="ai-process-section" style={{ background: '#F9F9F9', padding: '30px 0' }}>
            <Container>
                <Row className="align-items-start">
                    <Col lg="5" md="12" className="mb-4 mb-lg-0 pe-lg-4">
                        <div className="ai-process-left">
                            {sectionTitle && (
                                <h2 style={{
                                    fontSize: '40px',
                                    fontWeight: '600',
                                    marginBottom: '20px',
                                    color: '#1a1a1a',
                                    lineHeight: '1.2'
                                }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                            )}
                            {sectionSubtitle && (
                                <p style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '40px',
                                    lineHeight: '1.6'
                                }}>
                                    {sectionSubtitle}
                                </p>
                            )}
                        </div>
                    </Col>
                    <Col lg="7" md="12" className="ps-lg-4">
                        <div className="ai-process-timeline">
                            {steps.map((step, idx) => (
                                <div className="ai-process-step" key={idx}>
                                    <div className="step-number">{step.stepNumber || idx + 1}</div>
                                    <div className="step-content">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ServiceProcessTimeline;
