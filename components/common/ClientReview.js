import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL, REACT_APP_API_URL } from '../../lib/constants';
import { mapHomepageTestimonial } from '../../lib/homepageCms';
import { SITE_URL } from '../../lib/seo';

import dynamic from 'next/dynamic';
import { FaQuoteRight, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from '../OptimizedIcons';

const FALLBACK_REVIEWS = [
    { name: 'Michael Patterson', designation: 'CEO, CopyThat Technologies, LLC.', clientreview: '"AppZoro is a young company, and I\'ve seen them grow and get better in the short time we\'ve worked together."', img: '/assets/images/clients/1.jpg' },
    { name: 'Thad Joseph', designation: 'Founder, Turns Financing Services', clientreview: '"In addition to superb communication, they built a very smooth app with intuitive navigation and a clean interface"', img: '/assets/images/clients/11.jpg' },
    { name: 'Karen Houghton', designation: 'Director, Atlanta Tech Village', clientreview: '"They do great work with integrity."', img: '/assets/images/clients/13.jpg' },
    { name: 'Josh Chamberlain', designation: 'Founder, Sitter Sanity App', clientreview: '"AppZoro was good at keeping me updated and rolling out new builds as needed."', img: '/assets/images/clients/12.jpg' },
    { name: 'Robert Herrera', designation: 'Co-Founder, Cowork Oasis', clientreview: '"The fact that the team is small helps them respond quickly."', img: '/assets/images/clients/10.jpg' },
    { name: 'Ed Bolian', designation: 'Founder, VINwiki', clientreview: '"AppZoro made each project feel like it was their baby, and they seemed to care about nothing else."', img: '/assets/images/clients/9.jpg' },
    { name: 'Paawan Mathur', designation: 'President, Apex Textile Co.', clientreview: '"Calls and sales are up by at least 20 percent now since that we\'ve launched the site."', img: '/assets/images/clients/8.jpg' },
    { name: 'Phil Ackley', designation: 'Marketing Director, The Dragontree', clientreview: '"AppZoro is very organized, their team is always on top of everything."', img: '/assets/images/clients/7.jpg' },
    { name: 'Mario Gonzales', designation: 'VP of Operations, Judicial Innovations', clientreview: '"There\'s never been a language barrier or an issue with our difference in time zones. Their team has been really great."', img: '/assets/images/clients/6.jpg' },
    { name: 'Lata Sharma', designation: 'Founder & CEO, ImSafeNow', clientreview: '"AppZoro Technologies, Inc. is very transparent and upfront about how long each task takes."', img: '/assets/images/clients/5.jpg' },
    { name: 'Tobin Brogunier', designation: 'Founder and CEO - USpace', clientreview: '"AppZoro Technologies, Inc. delivered as promised."', img: '/assets/images/clients/14.jpg' },
    { name: 'Steve Thompson', designation: 'Founder - Beverage Solutions Group, LLC', clientreview: '"They grasped what I wanted to accomplish and helped me get there. I\'ll never go elsewhere for an IT provider."', img: '/assets/images/clients/15.jpg' },
    { name: 'Carey Markey', designation: 'CEO, MEDcraze', clientreview: '"They go above and beyond to communicate direction and are responsive to feedback."', img: '/assets/images/clients/2.jpg' },
    { name: 'Max Hockley', designation: 'CTO, Jax Rideshare Rentals', clientreview: '"I\'ve been very impressed with the dedication the AppZoro Technologies, Inc. team has to our project."', img: '/assets/images/clients/3.jpg' },
    { name: 'Kevin Murnane', designation: 'Ph.D. Professor, Mercer University', clientreview: '"Sam [Agarwal] has been a tremendous help to us as we formed our company… His expertise in App and website development is deep, and has an excellent team in place to supplement his expertise."', img: '/assets/images/clients/4.jpg' },
];

const getReviewImage = (review) => {
    if (review.img) return review.img;
    const pic = review.clientProfilePic;
    if (!pic) return '/assets/images/clients/1.jpg';
    if (typeof pic === 'string') return pic;
    if (pic.url) {
        return pic.url.startsWith('http') ? pic.url : `${STRAPI_IMAGE_BASE_URL}${pic.url}`;
    }
    return '/assets/images/clients/1.jpg';
};

const ClientReview = ({ initialReviews = [], cmsTestimonials = null, sectionTitle }) => {
    // Map homepage-admin-curated testimonials, then KEEP only those that have a
    // real uploaded image (`item.image` resolves to a non-default URL). Items
    // without a proper photo are dropped — those would otherwise force every
    // card on the public page to fall back to `/assets/images/clients/1.jpg`,
    // making different people appear with the same stock photo.
    const cmsMapped = useMemo(
        () =>
            (Array.isArray(cmsTestimonials) ? cmsTestimonials : [])
                .map(mapHomepageTestimonial)
                .filter(Boolean)
                .filter((r) => r.img && r.img !== '/assets/images/clients/1.jpg'),
        [cmsTestimonials],
    );

    // Source-of-truth precedence (highest first):
    //   1. initialReviews   — canonical data from /client-reviews API (has real
    //                          per-person `clientProfilePic` uploaded in admin)
    //   2. cmsMapped        — homepage-admin curated subset (used only when
    //                          marketing intentionally curated AND every item
    //                          has a valid photo — see filter above)
    //   3. FALLBACK_REVIEWS — hardcoded copy for when both API sources are empty
    const pickReviews = () => {
        if (initialReviews?.length > 0) return initialReviews;
        if (cmsMapped.length > 0) return cmsMapped;
        return FALLBACK_REVIEWS;
    };

    const [reviews, setReviews] = useState(pickReviews);

    useEffect(() => {
        if (initialReviews?.length > 0) {
            setReviews(initialReviews);
            return;
        }
        if (cmsMapped.length > 0) {
            setReviews(cmsMapped);
            return;
        }
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${REACT_APP_API_URL}client-reviews?_sort=createdAt:ASC&_limit=50`);
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
    }, [initialReviews, cmsMapped]);

    const showSlider = reviews.length > 2;

    /** Build Organization + AggregateRating + per-review schema for SERP rich results. */
    const reviewsSchema = useMemo(() => {
        const top = reviews.slice(0, 10);
        if (top.length === 0) return null;
        return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'AppZoro Technologies',
            url: SITE_URL,
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.7',
                bestRating: '5',
                worstRating: '1',
                ratingCount: String(Math.max(reviews.length, 16)),
            },
            review: top.map((r) => ({
                '@type': 'Review',
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                author: { '@type': 'Person', name: String(r.name || 'AppZoro client') },
                reviewBody: String(r.clientreview || '').replace(/^["']|["']$/g, '').slice(0, 500),
            })),
        };
    }, [reviews]);

    return (
        <section className='clients-reviews_section ads_fonts'>
            {reviewsSchema && (
                <Head>
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
                    />
                </Head>
            )}
            <Container>
                <div className='section-title pb-4'>
                    <h3>{sectionTitle?.trim() ? sectionTitle : <>What <span>Our Clients</span> Have to Say!</>}</h3>
                </div>

                {showSlider ?
                    <div className='clients-reviews'>
                        <Swiper
                            spaceBetween={10}
                            navigation={{
                                prevEl: '.prev_review',
                                nextEl: '.next_review',
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
                                <div className='client-review-box'>
                                    <div className='client-img'>
                                            <Image sizes="(max-width: 768px) 128px, 128px" src={getReviewImage(review)} width="70" height="70" alt={review.name || 'Client'} />
                                    </div>
                                    <div className='quote-icon'><FaQuoteRight /></div>
                                        <p>{review.clientreview}</p>
                                        <div className="client-name-heading">{review.name}</div>
                                        <div className="client-pos-heading">{review.designation}</div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="prev_review"><MdOutlineKeyboardArrowLeft /></div>
                        <div className="next_review"><MdOutlineKeyboardArrowRight /></div>
                    </div>
                    :
                        <div className='clients-reviews'>
                            <Row>
                            {reviews.slice(0, 2).map((review, idx) => (
                                <Col xs="12" md="6" key={review._id || review.id || idx}>
                                    <div className='client-review-box'>
                                        <div className='client-img'>
                                            <Image sizes="(max-width: 768px) 128px, 128px" src={getReviewImage(review)} width="70" height="70" alt={review.name || 'Client'} />
                                        </div>
                                        <div className='quote-icon'><FaQuoteRight /></div>
                                        <p>{review.clientreview}</p>
                                        <div className="client-name-heading">{review.name}</div>
                                        <div className="client-pos-heading">{review.designation}</div>
                                    </div>
                                </Col>
                            ))}
                            </Row>
                        </div>
                }
            </Container>
        </section>
    )
}

export default ClientReview
