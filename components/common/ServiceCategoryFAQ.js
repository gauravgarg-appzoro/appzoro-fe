import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * ServiceCategoryFAQ — Renders category-based FAQ matching Jayesh branch exactly.
 * Props: { sectionTitle, categories: [{ name, faqs: [{ question, answer }] }] }
 */
const ServiceCategoryFAQ = ({ sectionTitle, categories }) => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeFAQ, setActiveFAQ] = useState(0);

    if (!categories || categories.length === 0) return null;
    const currentCategory = categories[activeCategory] || categories[0];

    return (
        <section className="ai-faq-section" style={{ background: '#fff', padding: '50px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a', marginBottom: '30px' }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                    </div>
                )}
                <Row style={{ alignItems: 'stretch' }}>
                    <Col lg="4" md="12" className="mb-4 mb-lg-0" style={{ display: 'flex' }}>
                        <div style={{
                            background: '#F5F5F5',
                            borderRadius: '20px',
                            padding: '20px',
                            width: '100%',
                            minHeight: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActiveCategory(idx);
                                        setActiveFAQ(0);
                                    }}
                                    style={{
                                        width: '100%',
                                        background: activeCategory === idx
                                            ? 'linear-gradient(90deg, #DB241B 0%, #4C2523 100%)'
                                            : 'transparent',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '15px 20px',
                                        marginBottom: idx === categories.length - 1 ? '0' : '10px',
                                        color: activeCategory === idx ? '#fff' : '#1a1a1a',
                                        fontSize: '16px',
                                        fontWeight: activeCategory === idx ? '600' : '500',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </Col>
                    <Col lg="8" md="12" style={{ display: 'flex' }}>
                        <div className="faq-accordion" style={{ width: '100%' }}>
                            {currentCategory.faqs?.map((faq, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        marginBottom: activeFAQ === idx ? '20px' : '0',
                                        borderRadius: activeFAQ === idx ? '12px' : '0',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveFAQ(activeFAQ === idx ? -1 : idx)}
                                        style={{
                                            width: '100%',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: (activeFAQ === idx || idx === currentCategory.faqs.length - 1) ? 'none' : '1px solid #E0E0E0',
                                            padding: '20px 0',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <h4 style={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#1a1a1a',
                                            margin: 0,
                                            paddingRight: '20px',
                                            flex: 1
                                        }}>
                                            {faq.question}
                                        </h4>
                                    </button>
                                    <div
                                        style={{
                                            maxHeight: activeFAQ === idx ? '500px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.4s ease, padding 0.4s ease',
                                            padding: activeFAQ === idx ? '0 0 20px 0' : '0'
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '15px',
                                            color: '#666',
                                            lineHeight: '1.7',
                                            margin: 0
                                        }} dangerouslySetInnerHTML={{ __html: faq.answer }} />
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

export default ServiceCategoryFAQ;
