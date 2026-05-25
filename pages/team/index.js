import React from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import Footer from '../../components/Footer'
import MainHeader from '../../components/MainHeader'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import TalkExpert from '../../components/common/TalkExpert';
import MetaData from '../../components/common/MetaData';

const Team = () => {
    const teamDreamers = [
        {
            name: "SAM A.",
            post: "CHIEF ARCHITECT/PROJECT LEAD",
            image: "sam.png",
        },
        {
            name: "RICHARD B",
            post: "SENIOR SALES EXECUTIVE",
            image: "Richard.png",
        },
        {
            name: "SEAN S.",
            post: "MARKETING EXECUTIVE",
            image: "sean.png",
        },
        {
            name: "BIANCA R.",
            post: "GRAPHIC DESIGNER",
            image: "Bianca.png",
        }
    ]

    const teamCreators = [
        {
            post: "MANAGER",
            image: "kapil.png",
        },
        {
            post: "PROJECT MANAGER",
            image: "rohan.png",
        },
        {
            post: "DELIVERY MANAGER",
            image: "darshan.png",
        },
        {
            post: "REACT NATIVE DEVELOPER",
            image: "jiten.png",
        },
        {
            post: "REACT NATIVE DEVELOPER",
            image: "cp.jpg",
        },
        {
            post: "IOS DEVELOPER",
            image: "anil-chodhary.jpg",
        },
        {
            post: "ANDROID DEVELOPER",
            image: "shelendra.png",
        },
        {
            post: "MEAN STACK DEVELOPER",
            image: "bharat.png",
        },
        {
            post: "DATA SCIENTIST",
            image: "gravit.jpg",
        },
        {
            post: "DATA SCIENTIST",
            image: "anil.jpg",
        },
        {
            post: "UI/UX DESIGNER",
            image: "vinod.png",
        },
        {
            post: "GRAPHIC DESIGNER",
            image: "jayesh.png",
        },
        {
            post: "WEB DEVELOPER",
            image: "manesh.png",
        },
        {
            post: "WEB DEVELOPER",
            image: "rohit.png",
        },
        {
            post: "WEB DEVELOPER",
            image: "mayank.png",
        },
        {
            post: "QUALITY ANALYST",
            image: "vinit.png",
        },
        {
            post: "QUALITY ANALYST",
            image: "abhishek.png",
        },
    ]
    return (
        <>
            <MetaData title="Team and Members | Appzoro Technologies " description="Appzoro Technology has a professional team that will take your software project to the Next level of success" url={`/team`} image={DEFAULT_OG_IMAGE} />
            <MainHeader />
            <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Team </h1>
                        <p>Backed by experience and united by our passion for innovation, we know what it takes to make your success a reality..</p>
                    </div>
                </Container>
            </section>
            <section className='team-view pb-0'>
                <Container>
                    <div className='section-title'>
                        <h3>The Dreamers</h3>
                    </div>
                    <Row>
                        {
                            teamDreamers.map((item, index) => (
                                <Col md="3" xs="12" key={index}>
                                    <div class="our-team">
                                        <div class="pic">
                                            <Image  src={`/assets/images/team/${item.image}`} width="250" height="250" alt="Appzoro Team" />
                                        </div>
                                        <h3 class="title">{item.name}</h3>
                                        <span class="post">{item.post}</span>
                                    </div>
                                </Col>
                            ))
                        }

                    </Row>
                </Container>
            </section>
            <section className='team-view '>
                <Container>
                    <div className='section-title'>
                        <h3>The Creators</h3>
                    </div>
                    <Row>
                        {
                            teamCreators.map((item, index) => (
                                <Col md="3" xs="12" key={index}>
                                    <div class="our-team">
                                        <div class="pic">
                                            <Image  src={`/assets/images/team/${item.image}`} width="250" height="250" alt="Appzoro Team" />
                                        </div>
                                        <h3 class="title">{item.post}</h3>
                                    </div>
                                </Col>
                            ))
                        }

                    </Row>
                </Container>
            </section>
            <TalkExpert />
            <Footer />
        </>
    )
}

export default Team

export async function getStaticProps() {
    return { props: {} }
}