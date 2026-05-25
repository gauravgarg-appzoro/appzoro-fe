import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import Container from 'react-bootstrap/Container';
// react-slick needs only the slick stylesheet; the previous `swiper/css` and
// `swiper/css/pagination` imports here were unused (this component renders
// `Slider` from react-slick, not Swiper).
import 'slick-carousel/slick/slick.css';
import {
  LuMoveRight,
  IoIosStar,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from '../OptimizedIcons';
import { mapHomepageAward } from '../../lib/homepageCms';

// Custom react-slick arrow components. react-slick automatically passes
// `onClick`, `currentSlide`, `slideCount`, and `className` (which includes
// `slick-prev` / `slick-next` and `slick-disabled` when navigation is at
// the edge with `infinite: false`). We pass `className` straight through so
// existing CSS positioning + the disabled-edge styling both keep working.
function PrevArrow({ className, onClick }) {
  return (
    <button
      type="button"
      aria-label="Previous award slide"
      className={`${className || ''} ca-arrow ca-arrow-prev`.trim()}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft />
    </button>
  );
}

function NextArrow({ className, onClick }) {
  return (
    <button
      type="button"
      aria-label="Next award slide"
      className={`${className || ''} ca-arrow ca-arrow-next`.trim()}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight />
    </button>
  );
}

const DEFAULT_SLIDES = [
  { key: 'clutch', thumbUrl: '/assets/images/award-slides/slide1.png', iconUrl: '/assets/images/award-slides/slide1.png', profileUrl: 'https://clutch.co/profile/appzoro-technologies#highlights', ratingText: '4.7/5 Ratings', label: 'View Appzoro Profile on Clutch' },
  { key: 'goodfirms', thumbUrl: '/assets/images/award-slides/slide2.png', iconUrl: '/assets/images/award-slides/slide2.png', profileUrl: 'https://www.goodfirms.co/company/appzoro-technologies-inc', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on GoodFirms' },
  { key: 'upcity', thumbUrl: '/assets/images/award-slides/slide3.png', iconUrl: '/assets/images/award-slides/slide3.png', profileUrl: 'https://upcity.com/profiles/appzoro-technologies', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on UpCity' },
  { key: 'sortlist', thumbUrl: '/assets/images/award-slides/slide4.png', iconUrl: '/assets/images/award-slides/slide4.png', profileUrl: 'https://www.sortlist.com/agency/appzoro-technologies-inc', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on Sortlist' },
  { key: 'crunchbase', thumbUrl: '/assets/images/award-slides/slide5.png', iconUrl: '/assets/images/award-slides/slide5.png', profileUrl: 'https://www.crunchbase.com/organization/appzoro-technologies-inc', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on Crunchbase' },
  { key: 'designrush', thumbUrl: '/assets/images/award-slides/slide6.png', iconUrl: '/assets/images/award-slides/slide6.png', profileUrl: 'https://www.designrush.com/agency/profile/appzoro-technologies', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on DesignRush' },
  { key: 'appfutura', thumbUrl: '/assets/images/award-slides/slide7.png', iconUrl: '/assets/images/award-slides/slide7.png', profileUrl: 'https://www.appfutura.com/developers/appzoro-technologies-inc', ratingText: '5/5 Ratings', label: 'View Appzoro Profile on AppFutura' },
];

// Stored as a raw HTML string so the CMS-supplied `bodyHtml` (which is
// also a string containing real <span> tags) and this fallback share one
// rendering path via dangerouslySetInnerHTML. Without this, React escapes
// the angle brackets in the CMS string and the user sees literal "<span>"
// text instead of bold styling.
const DEFAULT_BODY_HTML =
  'We have been recognized as a top <span>mobile and app development</span> company in the United States.';

function AwardSlide({ slide }) {
  const isExternal = /^https?:\/\//i.test(slide.profileUrl);
  return (
    <div className="slide-award">
      <div className="clutch-reviews-awards">
        <Image alt="AppZoro award recognition" src={slide.badgeUrl || '/assets/images/award-imgview.png'} width={211} height={80} />
        <div className="review-content">
          <Image src={slide.iconUrl} width={30} height={30} alt="" />
          <span>
            <IoIosStar /> {slide.ratingText}
          </span>
        </div>
      </div>
      <div
        className="client-review-text"
        dangerouslySetInnerHTML={{ __html: slide.bodyHtml || DEFAULT_BODY_HTML }}
      />
      <Link
        href={slide.profileUrl}
        aria-label={slide.label || 'View profile'}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'nofollow noopener' : undefined}
        className="btn-style-arrow me-3"
      >
        View Profile <span><LuMoveRight /></span>
      </Link>
    </div>
  );
}

const AwardDev = ({ awards }) => {
  const sectionTitle = awards?.title?.trim?.() || "One of Atlanta's Most";
  const sectionSubtitle = awards?.subtitle?.trim?.() || 'Awarded Development Firm';

  const cmsSlides = (Array.isArray(awards?.list) ? awards.list : [])
    .map(mapHomepageAward)
    .filter(Boolean);
  const slides = cmsSlides.length > 0 ? cmsSlides : DEFAULT_SLIDES;

  const settings = {
    customPaging(i) {
      return (
        <Image width={50} height={50} alt="" src={slides[i]?.thumbUrl || `/assets/images/award-slides/slide${i + 1}.png`} />
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // Custom left/right navigation arrows so users can scroll between award
    // profiles without having to click the small thumbnail dots below.
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    accessibility: true,
  };

  return (
    <section className="clutch-awards poppins-font">
      <Container>
        <div className="ca-title">
          <h2>{sectionTitle}</h2>
          <h3>{sectionSubtitle}</h3>
        </div>
        <div className="ca-block">
          <Slider {...settings}>
            {slides.map((slide) => (
              <AwardSlide key={slide.key} slide={slide} />
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default AwardDev;
