import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(import('react-markdown'));

const ServiceFaqs = ({ faqData }) => {
    const totalItems = faqData?.length;
    const getItemsCount = faqData?.length / 2;

    const firstHalf = faqData?.slice(0, getItemsCount);
    const secondHalf = faqData?.slice(getItemsCount, totalItems);

    return (
        <section className='faqs-section' id="faqs">
            <Container>
                <div className='section-title '>
                    <h3>Frequently Asked Questions</h3>
                </div>
                <div className='faq-views'>
                    <Accordion>
                        <Row>
                            <Col md="6" xs="12" >
                                {firstHalf?.map((item) => (
                                    <Accordion.Item key={item?.id} eventKey={item?.id}>
                                        <Accordion.Header as="h4">{item?.serviceFaqTitle}</Accordion.Header>
                                        <Accordion.Body><ReactMarkdown>{item?.serviceFaqDetails}</ReactMarkdown></Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Col>
                            <Col md="6" xs="12" >
                                {secondHalf?.map((item) => (
                                    <Accordion.Item key={item?.id} eventKey={item?.id}>
                                        <Accordion.Header as="div">{item?.serviceFaqTitle}</Accordion.Header>
                                        <Accordion.Body><ReactMarkdown>{item?.serviceFaqDetails}</ReactMarkdown></Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Col>
                        </Row>
                    </Accordion>
                </div>
            </Container>
        </section>
    )
}

export default ServiceFaqs