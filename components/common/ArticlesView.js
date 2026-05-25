import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import dateFormat, { masks } from "dateformat";
import dynamic from 'next/dynamic';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { LuMoveRight, CiClock2 } from '../OptimizedIcons';

const ArticlesView = ({ initialBlogs = [] }) => {
    const [data, setData] = useState(initialBlogs);

    useEffect(() => {
        if (initialBlogs?.length > 0) return;
        fetchData()
            .then((result) => setData(result))
            .catch((error) => console.error('Error fetching data:', error));
    }, [initialBlogs]);

    async function fetchData() {
        try {
            const response = await fetch(`${REACT_APP_API_URL}posts?_sort=published_at:DESC&_limit=5`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // const sortedData = [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.updatedAt));

    return (
        <section className='read-articles'>
            <Container>
                <div className='section-title '>
                    <h3>Blog and Insights</h3>
                    <p>Get the latest updates on development insights, technologies and trends.</p>
                </div>
                {data?.length > 0 ?
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
                        {data.slice(0, 3).map((item) => {
                            const imgUrl = item?.image?.[0]?.url;
                            const src = imgUrl ? `${STRAPI_IMAGE_BASE_URL}${imgUrl}` : `${STRAPI_IMAGE_BASE_URL}/uploads/Appzoro_Game_Changer_Developer_in_Atlanta_83b5a7bfbc.jpg`;
                            return (
                            <SwiperSlide key={item.id}>
                                <div className='home-article'>
                                    <div className="home-article-img"><Image  src={src} alt={item?.title || 'Blog'} width="350" height="219" /></div>
                                    <div className="article-content">
                                        <h3><Link target="_blank" title="Read More" href={`/blog/${item?.slug}`}>{item?.title}</Link></h3>
                                        <p><CiClock2 /> {dateFormat(item?.publishedAt, "mediumDate")}</p>
                                    </div>
                                    <div className='article-actions'>
                                        {/* <Link target="_blank" href={`/blog/${item?.slug}`}>Read more</Link> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    :
                    <>
                        <Row>
                            <Col sm="4" xs="12">
                                <div className='home-article'>
                                    <Image  src={`${STRAPI_IMAGE_BASE_URL}/uploads/Appzoro_Game_Changer_Developer_in_Atlanta_83b5a7bfbc.jpg`} width="350" height="219" alt="Blog" />
                                    <div className="article-content">
                                        <h3><Link href="/blog/game-changer-app-development-company-clutch">Appzoro Technology is a Game-Changer in App Development on Clutch</Link></h3>
                                        <p><CiClock2 /> Jun 29, 2024</p>
                                    </div>
                                    <div className='article-actions'>
                                        <Link href="/blog/game-changer-app-development-company-clutch">Read more</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="4" xs="12">
                                <div className='home-article'>
                                    <Image  src={`${STRAPI_IMAGE_BASE_URL}/uploads/New_Product_Launch_Convoy_27d0a749de.png`} width="350" height="219" alt="Blog" />
                                    <div className="article-content">
                                        <h3><Link href="/blog/introducing-convoy-transports-by-appzoro-technologies">Introducing Convoy Transports: Making Law Enforcement Transportation Easier Than Ever Before </Link></h3>
                                        <p><CiClock2 /> Jun 29, 2024</p>
                                    </div>
                                    <div className='article-actions'>
                                        <Link href="/blog/introducing-convoy-transports-by-appzoro-technologies">Read more</Link>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="4" xs="12">
                                <div className='home-article'>
                                    <Image  src={`${STRAPI_IMAGE_BASE_URL}/uploads/best_mobile_app_development_approach_ac306bf0f2.png`} width="350" height="219" alt="Blog" />
                                    <div className="article-content">
                                        <h3><Link href="/blog/mobile-app-development-approaches">Top Mobile App Development Approaches</Link></h3>
                                        <p><CiClock2 /> Mar 27, 2024</p>
                                    </div>
                                    <div className='article-actions'>
                                        <Link href="/blog/mobile-app-development-approaches">Read more</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                }
                <div className='view-more-btn text-center mt-3'>
                    <Link href="/blog" className="btn-style-arrow me-3">View All Blogs <span><LuMoveRight /></span></Link>
                </div>
            </Container>
        </section>
    )
}

export default ArticlesView