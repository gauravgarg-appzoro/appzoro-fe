import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const StartUps = () => {
  return (
    <section className='gs-detail-block'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image  src="/assets/images/nca4.png" width="575" height="490" alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>The Discovery Workshop</h3>
                            <p>It is the very first stage, and the primary focus is on the app and its contribution to the market, such as why someone will download the app. Appzoro Technologies will discover your thoughts collectively, brainstorm about the idea, and start to shape your User Flow Diagram. A user flow diagram is a complete brief about the features of your idea, instructs users about the steps, and establishes a connection with the tech stack. Also, the meeting is used to start discussions about the development path, branding, pitch deck, and marketing planning. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image  src="/assets/images/nca2.png" width="575" height="490" alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Wireframes</h3>
                            <p>In the wireframe, we will make the structure of your vision, which does not currently exist on the market. We use a User flow diagram from words on the page to screens demonstrating the customer’s journey.</p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image  src="/assets/images/nca3.png" width="575" height="490" alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Branding</h3>
                            <p>AppZoro Technologies will work hand in hand with you to design your logo and build your brand assets. A successful digital product has a brand that establishes an emotional connection with its users. It will only take 3 seconds for users to identify with the brand and decide whether to rely on it. Our company will initiate by creating a mood board of references based on the discussions. With communication in meetings and the designer team, we build a robust brand identity that matches the target market and gives confidence to investors and users. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image  src="/assets/images/nca1.png" width="575" height="490" alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>User Stories & Development Cost</h3>
                            <p>Through user stories, you will get specific fixed-cost quotes for each element and functionality of the project. It allows you to divide the task into different stages to build a minimum viable product (MVP) and launch it in the market quickly. It even gives a comprehensive breakdown to the development team about how features and functionality work. It encourages investors to participate in the product and development process. </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
  )
}

export default StartUps