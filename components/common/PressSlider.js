import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { mapHomepagePressLink } from '../../lib/homepageCms';
import { pressSlug } from '../../lib/contentSlug';
import { LuMoveRight, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from '../OptimizedIcons';

function resolvePressHref(item) {
  if (!item) return '/press-release';
  if (item.href) return item.href;
  if (item.PressUrl) return item.PressUrl;
  const slug = pressSlug(item);
  return slug ? `/press-release/${slug}` : '/press-release';
}

function resolvePressImage(item) {
  if (item?.imageUrl) return item.imageUrl;
  const url = item?.PressImage?.[0]?.url;
  if (!url) return '';
  return url.startsWith('http') ? url : `${STRAPI_IMAGE_BASE_URL}${url}`;
}

const FALLBACK_PRESS = [
  `${STRAPI_IMAGE_BASE_URL}/uploads/AZ_Scam_Press_9d00c6a1d5.png`,
  `${STRAPI_IMAGE_BASE_URL}/uploads/Upcity_for_Press_1_502cc8dbc5.png`,
  `${STRAPI_IMAGE_BASE_URL}/uploads/Press_Top_10_Mobile_App_Development_Companies_In_USA_1_2ba73f7751.png`,
  `${STRAPI_IMAGE_BASE_URL}/uploads/Whats_App_Image_2023_03_27_at_8_58_46_PM_7c910cee87.jpeg`,
];

const PressSlider = ({ initialPresses = [], pressItems = null, sectionTitle }) => {
  const [apiPresses, setApiPresses] = useState(initialPresses);

  useEffect(() => {
    if (initialPresses?.length > 0) return;
    fetch(`${REACT_APP_API_URL}presses?_sort=PressDate:desc&_limit=10`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setApiPresses(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [initialPresses]);

  const cmsItems = useMemo(() => {
    if (!Array.isArray(pressItems) || pressItems.length === 0) return [];
    return pressItems.map(mapHomepagePressLink).filter(Boolean);
  }, [pressItems]);

  const slides = useMemo(() => {
    if (cmsItems.length > 0) {
      return cmsItems.map((item) => ({
        key: item.key,
        href: item.href,
        imageUrl: item.imageUrl,
        label: item.label,
        external: /^https?:\/\//i.test(item.href),
      }));
    }
    const source = apiPresses?.length > 0 ? apiPresses : null;
    if (source) {
      return source.map((item, index) => ({
        key: `api-press-${index}`,
        href: resolvePressHref(item),
        imageUrl: resolvePressImage(item),
        label: item.PressTitle || 'Press Release',
        external: Boolean(item.PressUrl && /^https?:\/\//i.test(item.PressUrl)),
      }));
    }
    return FALLBACK_PRESS.map((imageUrl, index) => ({
      key: `fallback-press-${index}`,
      href: '/press-release',
      imageUrl,
      label: 'Press feature',
      external: false,
    }));
  }, [cmsItems, apiPresses]);

  return (
    <section className="section-awards">
      <Container>
        <div className="section-title">
          <h3>{sectionTitle?.trim() || 'Press'}</h3>
        </div>
        {slides.length > 0 ? (
          <div className="awards-slides">
            <Swiper
              slidesPerView={1}
              loop={slides.length > 4}
              spaceBetween={10}
              navigation={{
                prevEl: '.prev_award',
                nextEl: '.next_award',
              }}
              modules={[Navigation]}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 },
              }}
              className="awardslide"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.key}>
                  <Link
                    href={slide.href}
                    rel={slide.external ? 'nofollow noopener' : undefined}
                    target={slide.external ? '_blank' : undefined}
                    aria-label={slide.label}
                  >
                    <div
                      className="award_slide"
                      style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="prev_award"><MdOutlineKeyboardArrowLeft /></div>
            <div className="next_award"><MdOutlineKeyboardArrowRight /></div>
          </div>
        ) : null}
        <div className="view-more-btn text-center mt-3">
          <Link href="/press-release" className="btn-style-arrow mt-3">
            View All Press <span><LuMoveRight /></span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PressSlider;
