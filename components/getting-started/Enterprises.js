import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Enterprises = () => {
  return (
    <section className='gs-detail-block'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep1.png" width={575} height={490} alt="Enterprise discovery workshop" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>The Discovery Workshop</h3>
                            <p>This stage is vital, especially for architectural planning. It includes brainstorming, research, and collaboration to describe the project scope and needs. It will set the foundation for the development process and ensure successful results. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep2.png" width={575} height={490} alt="Enterprise wireframes" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Wireframes</h3>
                            <p>Wireframes are the blueprint for app development and offer a digital representation of the structure and functionality. The vital architectural step enables clear communication between designers and developers, ensuring a solid foundation for the final product. It streamlines the designing process and sets the stage for successful application development. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep3.png" width={575} height={490} alt="Enterprise user stories" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>User Stories & Development Cost</h3>
                            <p>During the architecture stage of the project, user stories play a vital role in determining development costs. The teams will predict the timeline and resources required for each task by dividing the needs into manageable chunks. It ensures that projects stay on track and within budget.</p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep4.png" width={575} height={490} alt="Enterprise UX UI design" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>UX / UI Design</h3>
                            <p>UI/UX designs enable its complete focus on users&apos; experience and communication with the product. When the product&apos;s functionality is finalized, the UI/UX designers implement brand components like color and typography into the wireframes. However, the primary part of the design process ensures that all products visually match the brand and offer visual directions to the users. It includes instant call to action, initiative navigation, and a constant interface. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep5.png" width={575} height={490} alt="High fidelity prototype" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>High-Fidelity Prototype</h3>
                            <p>A high-fidelity prototype shows and functions closely with the actual product. It enables you to receive feedback from the target market before you develop User Validation Testing. It allows you to show your product to users and stakeholders as it is used in promotions and communication as the app is being developed. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/ep6.png" width={575} height={490} alt="Product deck" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Product Deck</h3>
                            <p>The demonstration shows your new app&apos;s vision to the target customers and stakeholders, its goal, and how someone can use it. It is the best approach to obtaining interest and getting it at its pre-development stage. Also, it is a handy tool to educate the sales department. </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
  )
}

export default Enterprises
