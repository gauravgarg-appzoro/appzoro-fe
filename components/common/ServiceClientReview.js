import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { FaQuoteRight, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from '../OptimizedIcons';

/**
 * ServiceClientReview — Client testimonials Swiper matching Jayesh branch (dark variant).
 * Renders WITHOUT its own <section> so it can be embedded inside ServiceStatsSection.
 * Uses .ai-prev_review / .ai-next_review nav classes (different from the default ClientReview).
 */

const FALLBACK_REVIEWS = [
    { name: 'Michael Patterson', designation: 'CEO, CopyThat Technologies, LLC.', clientreview: '"AppZoro is a young company, and I\'ve seen them grow and get better in the short time we\'ve worked together."', img: '/assets/images/clients/1.jpg' },
    { name: 'Thad Joseph', designation: 'Founder, Turns Financing Services', clientreview: '"In addition to superb communication, they built a very smooth app with intuitive navigation and a clean interface"', img: '/assets/images/clients/11.jpg' },
    { name: 'Karen Houghton', designation: 'Director, Atlanta Tech Village', clientreview: '"They do great work with integrity."', img: '/assets/images/clients/13.jpg' },
];

const getReviewImage = (review) => {
    if (review.img) return review.img;
    const pic = review.clientProfilePic;
    if (!pic) return '/assets/images/clients/1.jpg';
    if (typeof pic === 'string') return pic;
    if (pic.url) return pic.url.startsWith('http') ? pic.url : `${STRAPI_IMAGE_BASE_URL}${pic.url}`;
    return '/assets/images/clients/1.jpg';
};

const ServiceClientReview = () => {
    const [reviews, setReviews] = useState(FALLBACK_REVIEWS);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');
                const res = await fetch(`${baseUrl}/client-reviews?_sort=createdAt:ASC&_limit=50`);
                if (!res.ok) return;
                const json = await res.json();
                const data = json?.data ?? json;
                if (Array.isArray(data) && data.length > 0) {
                    setReviews(data);
                }
            } catch {
                // Keep fallback
            }
        };
        fetchReviews();
    }, []);

    return (
        <>
            <div className="text-center mb-4">
                <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#fff' }}>
                    What Our Clients Have to Say!
                </h2>
            </div>
            <div className="clients-reviews">
                <Swiper
                    spaceBetween={10}
                    loop={true}
                    navigation={{
                        prevEl: '.ai-prev_review',
                        nextEl: '.ai-next_review',
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        768: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 2, spaceBetween: 10 },
                    }}
                    className="clientslider"
                >
                    {reviews.map((review, idx) => (
                        <SwiperSlide key={review._id || review.id || idx}>
                            <div className="client-review-box">
                                <div className="client-img">
                                    <Image
                                        sizes="(max-width: 768px) 128px, 128px"
                                        src={getReviewImage(review)}
                                        width={70}
                                        height={70}
                                        alt={review.name || 'Client'}
                                        unoptimized
                                    />
                                </div>
                                <div className="quote-icon"><FaQuoteRight /></div>
                                <p>{review.clientreview}</p>
                                <div className="client-name-heading">{review.name}</div>
                                <div className="client-pos-heading">{review.designation}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="ai-prev_review"><MdOutlineKeyboardArrowLeft /></div>
                <div className="ai-next_review"><MdOutlineKeyboardArrowRight /></div>
            </div>
        </>
    );
};

export default ServiceClientReview;
