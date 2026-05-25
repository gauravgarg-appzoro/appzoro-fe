import React from 'react';
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
import { LuMoveRight, FaAngleLeft, FaAngleRight } from '../OptimizedIcons';
import { useClientMounted } from '../../lib/useClientMounted';

const CASE_SLIDES = [
  { tags: ['Transportation'], title: 'Convoy Transports', desc: 'With its website and mobile application for iOS and Android, Convoy Transports is the perfect solution for both law enforcement agencies and officers regarding hassle-free prison transportation.', href: '/case-study/convoy-transports/', img: '/assets/images/web/convoy-port.webp', alt: 'Convoy Transports case study' },
  { tags: ['Judicial', 'Law'], title: 'Judicial Innovations', desc: 'Judicial Innovation is a web application which offers an Online Case Resolution platform as one of the many innovative ways the court currently provides online court services.', href: '/case-study/judicial-innovations/', img: '/assets/images/web/ji-port.webp', alt: 'Judicial Innovations case study' },
  { tags: ['Logistics', 'Transport'], title: 'Jax', desc: 'Jax is a mobile app marketplace in which individuals who needed to be rideshare drivers could browse vehicles, book and pay, get insurance and registration documents.', href: '/case-study/car-rental-fleet-management-software', img: '/assets/images/web/jax-port.webp', alt: 'Jax fleet management case study' },
  { tags: ['Healthcare', 'Fitness'], title: 'Dreambook & Planner', desc: 'As a mobile app development company, we helped a wellness brand develop a cross-platform mobile app that serves as a planner.', href: '/case-study/dreambook/', img: '/assets/images/web/dreambook-port.webp', alt: 'Dreambook and Planner case study' },
  { tags: ['Technology', 'Software'], title: 'Atlanta Tech Village', desc: 'ATV app allows you to have our community at your fingertips. Guests can check out events, apply for jobs, sign up for tours, and get directions.', href: '/case-study/official-atlanta-tech-village-app-coworking-space/', img: '/assets/images/web/atlanta-tech-port.webp', alt: 'Atlanta Tech Village app case study' },
  { tags: ['Healthcare', 'Fitness'], title: 'Medcraze', desc: 'Medcraze is an Online advocacy platform that allows you to search for the latest information surrounding healthcare and the medical industry.', href: '/case-study/medcraze', img: '/assets/images/web/medcraze-port.webp', alt: 'Medcraze healthcare case study' },
  { tags: ['Logistics', 'Transport'], title: 'Truck Your Way', desc: 'Truck Your Way streamlines logistics when you need materials and trucks fast.', href: '/case-study/truck-your-way', img: '/assets/images/web/tyw-port.webp', alt: 'Truck Your Way logistics case study' },
  { tags: ['Textile'], title: 'Apex Textile Company', desc: 'With over 12 Years of production knowledge, Apex Textile Company serves the industrial textile industry.', href: '/case-study/apex-textile-company', img: '/assets/images/web/apex-port.webp', alt: 'Apex Textile Company case study' },
];

function CaseStudyContentSlide({ slide }) {
  return (
    <>
      <div className="case-study-tags">
        {slide.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="cs-content">
        <div className="cs-content-title">{slide.title}</div>
        <p>{slide.desc}</p>
        <div className="cs-btn">
          <Link href={slide.href} className="btn-style-arrow me-3">
            View Complete Case Study <span><LuMoveRight /></span>
          </Link>
        </div>
      </div>
    </>
  );
}

const CaseStudy = () => {
  const mounted = useClientMounted();
  const first = CASE_SLIDES[0];

  return (
    <section className="case-study" id="caseStudies">
      <Container>
        <div className="section-title-dark title-white">
          <h2><span>Our Featured</span> Case Studies</h2>
        </div>
      </Container>

      <div className="case-study-block">
        <Container>
          <Row>
            <Col lg="5" md="5" xs="12">
              {mounted ? (
                <Swiper
                  navigation={{ prevEl: '.prev_cs', nextEl: '.next_cs' }}
                  loop
                  allowTouchMove={false}
                  modules={[Navigation, EffectFade]}
                  effect="fade"
                  className="cs-content-slides"
                >
                  {CASE_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.href}>
                      <CaseStudyContentSlide slide={slide} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <CaseStudyContentSlide slide={first} />
              )}
            </Col>
          </Row>
        </Container>
        <div className="case-study-slider">
          <div className="cs-slider-box">
            <Swiper
              navigation={{ prevEl: '.prev_cs', nextEl: '.next_cs' }}
              loop
              allowTouchMove={false}
              modules={[Navigation, EffectCreative]}
              effect="creative"
              creativeEffect={{
                prev: { shadow: true, translate: [0, 0, -400], opacity: 0 },
                next: { translate: ['100%', 0, 0] },
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
              }}
              className="clientslider"
            >
              {CASE_SLIDES.map((slide) => (
                <SwiperSlide key={slide.img}>
                  <div className="cs_slide-box">
                    <Image
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 200px, 350px"
                      src={slide.img}
                      alt={slide.alt}
                      width={607}
                      height={607}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="prev_cs"><FaAngleLeft /><span>Prev</span></div>
            <div className="next_cs"><FaAngleRight /><span>Next</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
