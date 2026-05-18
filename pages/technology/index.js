import React from 'react'
import Footer from '../../components/Footer'
import MainHeader from '../../components/MainHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link';
import TalkExpert from '../../components/common/TalkExpert';
import MetaData from '../../components/common/MetaData';
import { REACT_APP_API_URL } from '../../lib/constants';
import {   GrTechnology, LuMoveRight   } from '../../components/OptimizedIcons';

const TechnologyListing = ({ posts }) => {
    return (
        <>
            <MetaData title="Technologies Powering Our Software Development | AppZoro" description="Discover the technology stack behind AppZoro's success, featuring advanced tools and frameworks that enhance software performance and user engagement." url={`/technology/`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Technology</h1>
                        <p>Technology refers to the application of scientific knowledge for practical purposes, encompassing tools, systems, and methods used to solve problems, improve processes, and enhance human capabilities.</p>
                    </div>
                </Container>
            </section>
            <section className='common-listing'>
                <Container>
                    <Row>
                        {posts.map((post) => (
                            <Col xs="12" lg="3" md="4" sm="6" key={post._id}>
                                <div class="commonlist-box">
                                    <div class="service-icon">
                                        <span><GrTechnology /></span>
                                    </div>
                                    <h3 class="title">{post.techTitle}</h3>
                                    {post.techShortDescription &&
                                        <p class="description" title={post.techShortDescription}>{post.techShortDescription}</p>
                                    }
                                    <Link href={`/technology/${post.slug}`} className="btn-style-arrow mt-3">Read More <span><LuMoveRight /></span></Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <TalkExpert />
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${REACT_APP_API_URL}technologies`);
    const posts = await res.json();
    return {
        props: {
            posts,
        },
    };
}

export default TechnologyListing