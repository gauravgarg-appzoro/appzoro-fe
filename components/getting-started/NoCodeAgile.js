import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const NoCodeAgile = () => {
    return (
        <section className='gs-detail-block'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/nca1.png" width={575} height={490} alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Discovery Stage</h3>
                            <p>In the beginning phase, we will discuss the practical aspects, and the leading purpose is to focus on the app and the value provided in the market - aka - what the app&apos;s specialty is and why people download it. </p>
                            <p>AppZoro Technologies will bring valuable insights into brainstorming the concept and design of the User Flow Diagram. This image briefly describes the user&apos;s steps and how the back-end technology will work. For this agile service, our company will follow up and share ideas about what is vital to validate the product in the market. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/agile-nca2.png" width={575} height={490} alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Wireframes</h3>
                            <p>Based on the initial discussion, we will create a wireframe to hit the ground running with queries and feedback quickly. Meanwhile, in the Agile stage, we transfer various precious elements into stage 2 to promptly maintain and complete the loop. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/agile-nca3.png" width={575} height={490} alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>User Stories & Development Cost</h3>
                            <p>Contrary to the kick-off and architecture stages, this agile stage no longer requires detailed discussion through development. We will describe the main elements to build and create a rough estimation of the cost and completion of the task. </p>
                        </div>
                    </Col>
                </Row>
                <Row className='align-items-center'>
                    <Col xs="12" md="6">
                        <div className='gs-lr-img'>
                            <Image src="/assets/images/agile-nca4.png" width={575} height={490} alt="No code agile" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className='gs-lr-info'>
                            <h3>Design And Development</h3>
                            <p>Along with the development, we also provide design in the agile no-code as we build the product using no-code development tools. No-code development is restricted to offering design options, so we can quickly change the designs according to the choice of the tool available. </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NoCodeAgile
