import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { LuMoveRight, FaAngleLeft, FaAngleRight } from '../OptimizedIcons';


const CaseStudy = ({ isCacehLoad }) => {
    return (
        <section className='case-study' id="caseStudies">
            <Container>
                <div className='section-title-dark title-white'>
                    <h2><span>Our Featured</span> Case Studies</h2>
                </div>
            </Container>

            <div className='case-study-block'>
                <Container>
                    <Row>
                        <Col lg="5" md="5" xs="12">
                            {isCacehLoad?.length > 0 ?
                                <Swiper
                                    navigation={{
                                        prevEl: '.prev_cs',
                                        nextEl: '.next_cs',
                                    }}
                                    loop={true}
                                    allowTouchMove={false}
                                    modules={[Navigation, EffectFade]}
                                    effect={'fade'}
                                    className="cs-content-slides"
                                >
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Transportation</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Convoy Transports</div>
                                            <p>With its website and mobile application for iOS and Android, Convoy Transports is the perfect solution for both law enforcement agencies and officers regarding hassle-free prison transportation.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/convoy-transports/" target='_blank' prefetch={false} className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Judicial</span>
                                            <span>Law</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Judicial Innovations</div>
                                            <p>Judicial Innovation is a web application which offers an Online Case Resolution platform as one of the many innovative ways the court currently provides online court services.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/judicial-innovations/" prefetch={false} target='_blank' className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Logistics</span>
                                            <span>Transport</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Jax</div>
                                            <p>Jax is a mobile app marketplace in which individuals who needed to be rideshare drivers could browse vehicles, book and pay, get insurance and registration documents.</p>
                                            <div className='cs-btn'>
                                                <Link href="/case-study/car-rental-fleet-management-software" prefetch={false} className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Healthcare</span>
                                            <span>Fitness</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Dreambook & Planner</div>
                                            <p>As a mobile app development company, we helped a wellness brand develop a cross-platform mobile app(Dreambook and Planner) that serves as a planner.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/dreambook/" prefetch={false} target='_blank' className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Technology</span>
                                            <span>Software</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Atlanta Tech Village</div>
                                            <p>ATV app allows you to have our community at your fingertips. Guests can check out our 400+ events a year, apply for a job, sign up for a tour, get directions.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/official-atlanta-tech-village-app-coworking-space/" prefetch={false} target='_blank' className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Healthcare</span>
                                            <span>Fitness</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Medcraze</div>
                                            <p>Medcraze is an Online advocacy platform that allows you to search for the latest information surrounding healthcare and the medical industry.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/medcraze" prefetch={false} target='_blank' className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Logistics</span>
                                            <span>Transport</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Truck Your Way</div>
                                            <p>Truck Your Way streamlines logistics when you, the consumer, need materials and trucks fast. Instead of spending hours calling and worrying.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/truck-your-way" target='_blank' prefetch={false} className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='case-study-tags'>
                                            <span>Textile</span>
                                        </div>
                                        <div className='cs-content'>
                                            <div className="cs-content-title">Apex Textile Company</div>
                                            <p>With over 12 Years of production knowledge, and 15 years of Industry Experience, Apex Textile Company serves the Industrial & Institutional textile industry.</p>
                                            <div className='cs-btn'>
                                                <Link href="https://appzoro.com/case-study/apex-textile-company" target='_blank' prefetch={false} className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                :
                                <>
                                    <div className='case-study-tags'>
                                        <span>Transportation</span>
                                    </div>
                                    <div className='cs-content'>
                                        <div className="cs-content-title">Convoy Transports</div>
                                        <p>With its website and mobile application for iOS and Android, Convoy Transports is the perfect solution for both law enforcement agencies and officers regarding hassle-free prison transportation.</p>
                                        <div className='cs-btn'>
                                            <Link href="https://appzoro.com/case-study/convoy-transports/" target='_blank' prefetch={false} className="btn-style-arrow me-3">View Complete Case Study <span><LuMoveRight /></span></Link>
                                        </div>
                                    </div>
                                </>
                            }
                        </Col>

                    </Row>
                </Container>
                <div className='case-study-slider'>
                    <div className='cs-slider-box'>
                        <Swiper
                            navigation={{
                                prevEl: '.prev_cs',
                                nextEl: '.next_cs',
                            }}
                            loop={true}
                            allowTouchMove={false}
                            modules={[Navigation, EffectCreative]}
                            effect={'creative'}
                            creativeEffect={{
                                prev: {
                                    shadow: true,
                                    translate: [0, 0, -400],
                                    opacity: 0
                                },
                                next: {
                                    translate: ['100%', 0, 0],
                                },
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 1,
                                },
                            }}
                            className="clientslider"
                        >
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/convoy-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/ji-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/jax-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/dreambook-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/atlanta-tech-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/medcraze-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/tyw-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='cs_slide-box'>
                                    <Image style={{ objectFit: "contain" }} sizes="(max-width: 768px) 200px, 350px" src="/assets/images/web/apex-port.webp" alt="project" width="607" height="607" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className='prev_cs'><FaAngleLeft /><span>Prev</span></div>
                        <div className='next_cs'><FaAngleRight /><span>Next</span></div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default CaseStudy