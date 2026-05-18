import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { LuMoveRight } from '../../components/OptimizedIcons';

const FeatureCaseStudy = ({ data }) => {
  const getFeaturedProject = Array.isArray(data) ? data.filter(item => item?.is_featured === true) : [];

  return (
    <>
      <Swiper
        spaceBetween={10}
        // pagination={true} 
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        className="features-project-slide"
      >
        {Array.isArray(getFeaturedProject) && getFeaturedProject.map((item, index) => (
          <SwiperSlide key={item?.id}>

            <div className="portfolio-feture-item" style={{ position: 'relative', zIndex: 0, borderRadius: '25px', overflow: 'hidden' }}>
              {item?.if_feature_background_img && (
                <Image
                  src={`${STRAPI_IMAGE_BASE_URL}${item?.if_feature_background_img?.url || ''}`}
                  alt="background"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', zIndex: -1 }}
                />
              )}
              <div className='pf-left'>
                {item?.project_logo &&
                  <div className="pf-left_logo">
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${item?.project_logo?.url || ''}`}
                      alt="portfolio"
                      width="160"
                      height="52"
                    />
                  </div>
                }
                <h4>{item?.Title}</h4>
                <Link href={`/case-study/${item?.slug}`} className="btn-style-border">View Case Study <span><LuMoveRight /></span></Link>
                <div className='cs-icons'>
                  {item?.android_link &&
                    <Link href={item?.android_link} target="_blank"><Image
                      src="/assets/images/playstore.png" alt="Android" width="30" height="30" /></Link>
                  }
                  {item?.ios_link &&
                    <Link href={item?.ios_link} target="_blank"><Image
                      src="/assets/images/applestore.png" alt="ios" width="30" height="30" /></Link>
                  }
                  {item?.web_link &&
                    <Link href={item?.web_link} target="_blank"><Image
                      src="/assets/images/web.png" alt="ios" width="30" height="30" /></Link>
                  }
                </div>
              </div>
              {item?.secondary_block_img &&
                <div className='pf-right'>
                  <Image
                    src={`${STRAPI_IMAGE_BASE_URL}${item?.secondary_block_img?.url || ''}`}
                    alt="project"
                    width="196"
                    height="222"
                  />
                </div>
              }
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default FeatureCaseStudy