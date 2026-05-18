import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { LuMoveRight, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from '../OptimizedIcons';

const PressSlider = ({ isCacehLoad }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then((result) => setData(result))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`${REACT_APP_API_URL}presses?_sort=PressDate:desc&_limit=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    return (
        <section className='section-awards'>
            <Container>
                <div className='section-title'>
                    <h3>Press</h3>
                </div>
                {isCacehLoad?.length > 0 ?
                    <div className='awards-slides'>
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={10}
                            navigation={{
                                prevEl: '.prev_award',
                                nextEl: '.next_award',
                            }}
                            modules={[Navigation]}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                            className="awardslide"
                        >
                            {data?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Link rel="nofollow" target='_blank' aria-label="Press Release" href={`${item.PressUrl ? item.PressUrl : "/press-release"}`}>
                                        <div className='award_slide' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}${item?.PressImage[0]?.url})` }}></div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="prev_award"><MdOutlineKeyboardArrowLeft /></div>
                        <div className="next_award"><MdOutlineKeyboardArrowRight /></div>
                    </div>
                    :
                    <div className='awards-slides'>
                        <Row>
                            <Col xs="6" md="3">
                                <Link rel="nofollow" target='_blank' aria-label="Press Release" href="/press-release">
                                    <div className='award_slide' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}/uploads/AZ_Scam_Press_9d00c6a1d5.png` }}></div>
                                </Link>
                            </Col>
                            <Col xs="6" md="3">
                                <Link rel="nofollow" target='_blank' aria-label="Press Release" href="/press-release">
                                    <div className='award_slide' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}/uploads/Upcity_for_Press_1_502cc8dbc5.png` }}></div>
                                </Link>
                            </Col>
                            <Col xs="6" md="3">
                                <Link rel="nofollow" target='_blank' aria-label="Press Release" href="/press-release">
                                    <div className='award_slide' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}/uploads/Press_Top_10_Mobile_App_Development_Companies_In_USA_1_2ba73f7751.png` }}></div>
                                </Link>
                            </Col>
                            <Col xs="6" md="3">
                                <Link rel="nofollow" target='_blank' aria-label="Press Release" href="/press-release">
                                    <div className='award_slide' style={{ backgroundImage: `url(${STRAPI_IMAGE_BASE_URL}/uploads/Whats_App_Image_2023_03_27_at_8_58_46_PM_7c910cee87.jpeg` }}></div>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                }
                <div className='view-more-btn text-center mt-3'>
                    <Link href="/press-release" className="btn-style-arrow mt-3">View All Press <span><LuMoveRight /></span></Link>
                </div>
            </Container>
        </section>
    )
}

export default PressSlider