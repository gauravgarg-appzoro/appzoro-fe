import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { LuMoveRight } from '../OptimizedIcons';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';

/**
 * ServiceTechStackTabs — Renders tabbed tech stack with sidebar categories and logo grid.
 * Props: { sectionTitle, techStack: { categories: [{ name, items: [{ name, logo }] }] } }
 */
const ServiceTechStackTabs = ({ sectionTitle, techStack }) => {
    const [activeTab, setActiveTab] = useState(0);
    if (!techStack?.categories || techStack.categories.length === 0) return null;
    const activeCategory = techStack.categories[activeTab] || techStack.categories[0];

    return (
        <section className="ai-tech-stack-section" style={{ background: 'linear-gradient(to right, #DB241B 0%, #1a1a1a 100%)', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#fff', fontSize: '40px', fontWeight: '600' }} dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                    </div>
                )}
                <Row className="tech-stack-container" style={{ alignItems: 'stretch' }}>
                    <Col lg="3" md="12" className="mb-4 mb-lg-0">
                        <div className="tech-stack-sidebar" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {techStack.categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    className={`tech-category-btn ${idx === activeTab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(idx)}
                                >
                                    <span>{cat.name}</span>
                                    {idx === activeTab && <LuMoveRight />}
                                </button>
                            ))}
                        </div>
                    </Col>
                    <Col lg="9" md="12">
                        <div className="tech-stack-content" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <div className="tech-logo-grid" style={{
                                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', width: '100%'
                            }}>
                                {activeCategory.items?.map((item, idx) => (
                                    <div className={`tech-logo-item tech-item-${item.name.replace(/\s+/g, '-').replace(/\./g, '').toLowerCase()}`} key={idx} style={{ textAlign: 'center' }}>
                                        <div className="tech-logo-box" style={{ background: '#FFFFFF', borderRadius: '12px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
                                            {item.logo && (
                                                <Image
                                                    src={item.logo.startsWith('http') ? item.logo : `${STRAPI_IMAGE_BASE_URL}${item.logo}`}
                                                    width={70}
                                                    height={70}
                                                    alt={item.name || 'Tech'}
                                                    unoptimized
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            )}
                                        </div>
                                        <p className="tech-name" style={{ color: '#fff', fontSize: '12px', marginTop: '8px', marginBottom: 0 }}>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ServiceTechStackTabs;
