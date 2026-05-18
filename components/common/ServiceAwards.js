import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * ServiceAwards — Static awards section matching Jayesh branch exactly.
 * Same awards shown for all services (static, not data-driven).
 */
const AWARDS = [
    { src: '/assets/images/ai development company/Awards/Clutch.png', name: 'Clutch', description: 'Top Mobile App Agencies in Atlanta' },
    { src: '/assets/images/ai development company/Awards/GoodFirms.png', name: 'GoodFirms', description: 'Top Mobile App Developers in Georgia' },
    { src: '/assets/images/ai development company/Awards/Upcity.png', name: 'UpCity', description: 'Best of Georgia Winner 2023' },
    { src: '/assets/images/ai development company/Awards/Techreviewer.png', name: 'Techreviewer', description: 'Top App Developers in Atlanta' },
    { src: '/assets/images/ai development company/Awards/DesignRush.png', name: 'DesignRush', description: 'Top Mobile App Development Company' },
];

const ServiceAwards = () => {
    return (
        <section className="ai-awards-section" style={{
            backgroundImage: 'url(/assets/images/ai%20development%20company/Awards/award%20background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '30px 0',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0, 0, 0, 0.92)',
                zIndex: 1,
            }} />
            <Container style={{ position: 'relative', zIndex: 2 }}>
                <div className="text-center mb-4">
                    <h2 style={{ color: 'white', fontSize: '40px', lineHeight: '1.3' }}>
                        One of Atlanta's Most<br />
                        Awarded Development Firm
                    </h2>
                </div>
                <Row>
                    {AWARDS.map((award, idx) => (
                        <Col
                            key={idx}
                            lg="2" md="4" sm="6" xs="12"
                            className="mb-4"
                            style={{ flex: '0 0 20%', maxWidth: '20%' }}
                        >
                            <div className="ai-award-box">
                                <div className="ai-award-icon">
                                    <img src={award.src} alt={award.name} />
                                </div>
                                <h4>{award.name}</h4>
                                <p>{award.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default ServiceAwards;
