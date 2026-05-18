import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";

const PoertfolioImagesSlider = (props) => {
  const portfolioImageItem = props?.portfolioImages;
  return (
    <>
      {Array.isArray(portfolioImageItem) && portfolioImageItem.length > 1 ? (
        <Swiper
          spaceBetween={10}
          pagination={true}
          modules={[Pagination]}
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
          {portfolioImageItem.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="text-center">
                <Image

                  key={item.id}
                  src={`${STRAPI_IMAGE_BASE_URL}${item?.url}`}
                  width={"310"}
                  height={"436"}
                  alt="Portfolio"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center single-web-view">
          {Array.isArray(portfolioImageItem) && portfolioImageItem.map((item) => (
            <Image

              src={`${STRAPI_IMAGE_BASE_URL}${item?.url}`}
              width={"310"}
              height={"436"}
              alt="Portfolio"
              key={item?.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PoertfolioImagesSlider;
