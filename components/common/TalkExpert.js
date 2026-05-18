import Image from 'next/image'
import React from 'react'
import ContactHref from './ContactHref'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dynamic from 'next/dynamic';
import { LuMoveRight } from '../OptimizedIcons';

const TalkExpert = () => {
  return (
    <section className='talk_expert_main'>
        <Container>
            <Row className='align-items-center'>
            <Col lg="7" md="7" xs="12">
                <div className='cta-content'>
                    <h3><span>Let's Build</span> the Future of Technology Together</h3>
                    <p>Share your project idea and we'll provide a free consultation on how we will to turn it reality and on amazing digital product.</p>
                    <ContactHref href="/contact-us" className="btn-style-arrow me-3">Talk With Expert <span><LuMoveRight /></span></ContactHref>
                </div>
            </Col>
            <Col lg="5" md="5" xs="12">
                <div className='cta-graphics'>
                    <Image src="/assets/images/dir.png"  width="215" height="214" alt="Talk to expert" />
                    <Image src="/assets/images/expert-view.png"  width="233" height="369" alt="Talk to expert" />
                </div>    
            </Col>
            </Row>
        </Container>
    </section>
  )
}

export default TalkExpert