import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

/**
 * ServiceBenefitsAccordion — Renders benefits as an accordion list matching Jayesh branch.
 * Props: { sectionTitle, benefits: [{ title, description }] }
 */
const ServiceBenefitsAccordion = ({ sectionTitle, benefits }) => {
    const [activeAccordion, setActiveAccordion] = useState(0);
    if (!benefits || benefits.length === 0) return null;

    return (
        <section className="ai-benefits-section" style={{ background: '#F9F9F9', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a', lineHeight: '1.3' }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                    </div>
                )}
                <div className="ai-benefits-accordion" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="accordion-item"
                            style={{
                                marginBottom: activeAccordion === index ? '20px' : '0',
                                borderRadius: activeAccordion === index ? '20px' : '0',
                                overflow: activeAccordion === index ? 'hidden' : 'visible',
                                transition: 'all 0.3s ease',
                                listStyle: 'none',
                                border: 'none',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <button
                                onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
                                style={{
                                    width: '100%',
                                    background: activeAccordion === index ? '#1a1a1a' : 'transparent',
                                    border: 'none',
                                    borderBottom: activeAccordion === index ? 'none' : '1px solid #ddd',
                                    borderRadius: activeAccordion === index ? '20px 20px 0 0' : '0',
                                    padding: '25px 30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'left',
                                    listStyle: 'none'
                                }}
                            >
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    color: activeAccordion === index ? '#fff' : '#1a1a1a',
                                    margin: 0,
                                    transition: 'color 0.3s ease',
                                    listStyle: 'none'
                                }}>
                                    {benefit.title}
                                </h3>
                                <span style={{
                                    fontSize: '24px',
                                    color: activeAccordion === index ? '#fff' : '#1a1a1a',
                                    transition: 'transform 0.3s ease, color 0.3s ease',
                                    transform: activeAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                    display: 'inline-block'
                                }}>
                                    ▼
                                </span>
                            </button>
                            <div
                                style={{
                                    maxHeight: activeAccordion === index ? '500px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.4s ease, padding 0.4s ease',
                                    background: '#1a1a1a',
                                    borderRadius: activeAccordion === index ? '0 0 20px 20px' : '0',
                                    padding: activeAccordion === index ? '5px 30px 25px 30px' : '0 30px',
                                    listStyle: 'none'
                                }}
                            >
                                <p style={{
                                    fontSize: '16px',
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: '1.7',
                                    margin: 0,
                                    paddingTop: 0,
                                    listStyle: 'none'
                                }}
                                dangerouslySetInnerHTML={{ __html: benefit.description }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ServiceBenefitsAccordion;
