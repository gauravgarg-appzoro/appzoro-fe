import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import 'swiper/css';
import 'swiper/css/pagination';
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import { LuMoveRight, IoIosStar } from '../../components/OptimizedIcons';




const AwardDev = () => {
  const settings = {
    customPaging: function (i) {
      return (
        <Image width="50" height="50" alt="slide" src={`/assets/images/award-slides/slide${i + 1}.png`} />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slickNext: false,
    nextArrow: false,
    accessibility: false
  };

  return (
    <section className='clutch-awards poppins-font'>
      <Container>
        <div className='ca-title'>
          <h2>One of Atlanta&apos;s Most</h2>
          <h3>Awarded Development Firm</h3>
        </div>
        <div className='ca-block'>
          <Slider {...settings}>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="AppZoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide1.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 4.7/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://clutch.co/profile/appzoro-technologies#highlights" aria-label="View Appzoro Profile on Clutch" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="AppZoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide2.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://www.goodfirms.co/company/appzoro-technologies-inc" aria-label="View Appzoro Profile on GoodFirms" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="AppZoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide3.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://upcity.com/profiles/appzoro-technologies" aria-label="View Appzoro Profile on UpCity" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="Appzoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide4.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://www.sortlist.com/agency/appzoro-technologies-inc" aria-label="View Appzoro Profile on Sortlist" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="Appzoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide5.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://www.crunchbase.com/organization/appzoro-technologies-inc" aria-label="View Appzoro Profile on Crunchbase" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="Appzoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide6.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://www.designrush.com/agency/profile/appzoro-technologies" aria-label="View Appzoro Profile on DesignRush" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

            <div className='slide-award'>
              <div className='clutch-reviews-awards'>
                <Image alt="Appzoro Clutch rating" src="/assets/images/award-imgview.png" width={211} height={80} />
                <div className='review-content'>
                  <Image src="/assets/images/award-slides/slide7.png" width="30" height="30" alt="Appzoro" />
                  <span><IoIosStar /> 5/5 Ratings</span>
                </div>
              </div>
              <div className='client-review-text'>We have been recognized as a top <span>mobile and app development</span> company in the United states.</div>
              <Link href="https://www.appfutura.com/developers/appzoro-technologies-inc" aria-label="View Appzoro Profile on AppFutura" target='_blank' className="btn-style-arrow me-3" rel="nofollow">View Profile <span><LuMoveRight /></span></Link>
            </div>

          </Slider>
        </div>
      </Container>
    </section>
  )
}

export default AwardDev