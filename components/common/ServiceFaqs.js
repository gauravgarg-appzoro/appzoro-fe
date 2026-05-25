import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'));

// Strip markdown formatting so JSON-LD answers are plain text (Google's expected form).
const stripMarkdown = (raw) => {
    if (raw == null) return '';
    return String(raw)
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_~`>#]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const buildFaqPageJsonLd = (items) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
        .filter((item) => item && (item.serviceFaqTitle || item.serviceFaqDetails))
        .map((item) => ({
            '@type': 'Question',
            name: String(item.serviceFaqTitle || '').trim(),
            acceptedAnswer: { '@type': 'Answer', text: stripMarkdown(item.serviceFaqDetails) },
        })),
});

const ServiceFaqs = ({ faqData }) => {
    if (!Array.isArray(faqData) || faqData.length === 0) return null;

    const totalItems = faqData.length;
    const getItemsCount = Math.ceil(totalItems / 2);

    const firstHalf = faqData.slice(0, getItemsCount);
    const secondHalf = faqData.slice(getItemsCount, totalItems);

    return (
        <section className='faqs-section' id="faqs">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: buildFaqPageJsonLd(faqData) }}
            />
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