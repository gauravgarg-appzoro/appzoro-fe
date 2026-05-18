import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import dateFormat, { masks } from "dateformat";
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(import('react-markdown'));
import { REACT_APP_API_URL } from '../../lib/constants';
import { CiClock2, MdReviews, LuMoveRight, IoLocationOutline } from '../OptimizedIcons';

const LocationsSlide = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then((result) => setData(result))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    async function fetchData() {
        try {
            const response = await fetch(`${REACT_APP_API_URL}locations-news`);
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
        <section className={`read-articles ${data?.length > 0 ? "" : "disabled-js-swiper"}`}>
            <Container>
                <div className='section-title '>
                    <h2>Cities we serve</h2>
                    <p>Discover exciting locations nearby with our comprehensive listings</p>
                </div>
                <Swiper
                    modules={[Navigation]}
                    breakpoints={{
                        375: {
                            slidesPerView: 1.2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                    }}
                >
                    {data?.slice(0, 10).map((item) => (
                        <SwiperSlide key={item.id}>
                            <>
                                <div className="commonlist-box location-slide-box">
                                    <div className="service-icon">
                                        <span><IoLocationOutline /></span>
                                    </div>
                                    <h3 className="title">{item?.location_title}</h3>
                                    <div className="description" title={item?.section1_content}>
                                        <ReactMarkdown>{item?.section1_content}</ReactMarkdown>
                                    </div>
                                    <Link href={`/locations/${item?.slug}`} className="btn-style-arrow mt-3">Read More <span><LuMoveRight /></span></Link>
                                </div>
                            </>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='view-more-btn text-center mt-3'>
                    <Link href="/locations" className="btn-style-arrow me-3">View All Locations <span><LuMoveRight /></span></Link>
                </div>
            </Container>
        </section>
    )
}

export default LocationsSlide