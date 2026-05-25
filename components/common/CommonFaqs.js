import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

// Single source of truth: DOM (accordion) AND JSON-LD FAQPage schema below
// are both derived from this array, so they cannot drift apart.
// Drift between schema and rendered FAQ is treated as "schema spam" by Google.
const FAQ_ITEMS = [
    {
        question: 'How much do I need to pay for an app development service?',
        answer:
            'If you are also wondering how much mobile application development costs, then there is no precise answer before knowing your project requirement. The price of an app project generally depends upon the platform, features, UI/UX, plugins, and complexities involved. However, let me give you a brief idea about the estimate of this service. The average beginning cost of developing a basic mobile application with simple and limited features is around $10,000 to $20,000. Further, the price of developing a medium complex app project falls anywhere between $60,000 to $100,000. This development cost may go as high as $200,000 or more than $300,000 depending upon the higher complexity of the project.',
    },
    {
        question: 'How much time does it take to develop an app?',
        answer:
            'The time span for developing a mobile application varies on several factors such as what features you want, how complex is the app, what are the available resources, and their skill sets. In general, it takes around 6 to 16 weeks.',
    },
    {
        question: 'Why are app development services so expensive?',
        answer:
            'App development is considered quite an expensive task to incur owing to various factors. Some of the key reasons behind this higher cost are the complexity and functionality of the app, the high-quality UI/UX involved, and the lack of expert resources. Furthermore, developing a mobile application is a time-consuming process. Besides looking after the security and compliance part, there also goes cost in the QA, testing, plugins purchasing, and post-launch maintenance and updates.',
    },
    {
        question: 'Which is the best app development company in Atlanta?',
        answer:
            'Though there are a larger number of companies available in the state of Atlanta: not all of them are an expert. If you are looking for a result-driven trusted mobile app development company in Atlanta, then you can go with Appzoro. Carrying a team of seasoned developers and designers, Appzoro Technologies is the best in the business. So when you want to hire highly professional mobile app developers with profound experience in the app development business, connect Appzoro.',
    },
    {
        question: 'What are the benefits of web and app development services?',
        answer:
            'In this rapidly evolving era of digitalization, when all your competitors are on Google, your presence is inevitable here. With engaging architecture infrastructure and a robust backend system, a professional build website gives your business a strong identity on the internet. You have streamlined operations, you eventually get more user engagement with an improved customer base, better sales, and enhanced revenue streams.',
    },
    {
        question: 'How much does a web development service cost in Atlanta?',
        answer:
            'The cost of website development in Atlanta cost can range from $1500 to $150,000 on average. A simple business website with basic features can cost around $1000 while an e-commerce website can cost you between $2000 to $10,000. All the prices exclude annual maintenance spending. Moreover, the exact cost can be estimated after evaluating your business size, types, and scope. Now when you are looking for a reliable web development company in Atlanta, you can connect with Appzoro Technologies.',
    },
];

const buildFaqPageJsonLd = (items) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
});

const CommonFaqs = () => {
    const half = Math.ceil(FAQ_ITEMS.length / 2);
    const firstHalf = FAQ_ITEMS.slice(0, half);
    const secondHalf = FAQ_ITEMS.slice(half);

    return (
        <section className='faqs-section'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: buildFaqPageJsonLd(FAQ_ITEMS) }}
            />
            <Container>
                <div className='section-title '>
                    <h3>Frequently Asked Questions</h3>
                </div>
                <div className='faq-views'>
                    <Accordion>
                        <Row>
                            <Col md="6" xs="12">
                                {firstHalf.map((item, idx) => (
                                    <Accordion.Item eventKey={`faq-${idx}`} key={`faq-${idx}`}>
                                        <Accordion.Header as="div">{item.question}</Accordion.Header>
                                        <Accordion.Body>
                                            <p>{item.answer}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Col>
                            <Col md="6" xs="12">
                                {secondHalf.map((item, idx) => (
                                    <Accordion.Item eventKey={`faq-${half + idx}`} key={`faq-${half + idx}`}>
                                        <Accordion.Header as="div">{item.question}</Accordion.Header>
                                        <Accordion.Body>
                                            <p>{item.answer}</p>
                                        </Accordion.Body>
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

export default CommonFaqs
