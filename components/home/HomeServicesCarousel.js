import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/**
 * Carousel with static Swiper imports so the UI renders correctly.
 * Loaded via dynamic import from the homepage to keep the main bundle small (code-split).
 */
export default function HomeServicesCarousel() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".prev_glimpses",
        nextEl: ".next_glimpses",
      }}
      spaceBetween={10}
      breakpoints={{
        375: { slidesPerView: 1.2, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 10 },
        1024: { slidesPerView: 4, spaceBetween: 10 },
      }}
    >
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/service-customer-supply.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/custom-software-development-company-usa">
            <div className="service-icon">
              <Image src="/assets/images/cpad.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">Custom Software Development</h3>
            <p>
              AppZoro delivers innovative custom software solutions for businesses of all sizes and types, adding on with top quality, ROI, and user attraction.
            </p>
            <div className="service-tech">
              <div className="lang_tag"><span>Java</span></div>
              <div className="lang_tag"><span>Python</span></div>
              <div className="lang_tag"><span>Javascript</span></div>
              <div className="lang_tag"><span>php</span></div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/service-mobile-app-dev.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/mobile-app-development-company-usa">
            <div className="service-icon">
              <Image src="/assets/images/mad.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">Mobile app development</h3>
            <p>
              AppZoro has expertise in building high-performing native, cross-platform, and progressive web apps with eye-catching design & unique features.
            </p>
            <div className="service-tech">
              <div className="lang_tag"><span>iOS</span></div>
              <div className="lang_tag"><span>Android</span></div>
              <div className="lang_tag"><span>Kotlin</span></div>
              <div className="lang_tag"><span>Swift</span></div>
              <div className="lang_tag"><span>React-Native</span></div>
              <div className="lang_tag"><span>Flutter</span></div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/service-web-dev.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/web-app-development">
            <div className="service-icon">
              <Image src="/assets/images/wad.png" alt="" width="57" height="50" />
            </div>
            <h3 className="text-capitalize">Web App Development</h3>
            <p>Web application development services offered by AppZoro yield benefits to companies of any type or size.</p>
            <div className="service-tech">
              <div className="lang_tag"><span>HTML</span></div>
              <div className="lang_tag"><span>CSS</span></div>
              <div className="lang_tag"><span>React</span></div>
              <div className="lang_tag"><span>Angular</span></div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/service-iot-dev.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/iot-development-services">
            <div className="service-icon">
              <Image src="/assets/images/dpd.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">IOT App Development</h3>
            <p>AppZoro develops tech-advanced IoT applications to improve efficiency and accuracy in human life. We are proficient in IoT and can ease your business process.</p>
            <div className="service-tech">
              <div className="lang_tag"><span>Python</span></div>
              <div className="lang_tag"><span>C++</span></div>
              <div className="lang_tag"><span>swift</span></div>
              <div className="lang_tag"><span>Kotlin</span></div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/cross-platform-App-developments.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/cross-platform-app-development-company-usa">
            <div className="service-icon">
              <Image src="/assets/images/cross-platform-app-deve.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">Cross-Platform App Development</h3>
            <p>We specialize in creating cross-platform applications that are scalable, robust, and cost-effective while ensuring that users have a consistent experience across Android, iOS, and web platforms, allowing you to expand your reach.</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/ui-ux-design.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/ui-ux-design-services">
            <div className="service-icon">
              <Image src="/assets/images/ui-ux-design_icon.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">UI/UX Design Services</h3>
            <p>Our experienced design team creates beautiful and user-friendly interfaces, delivering great experiences in one seamless experience that retains customers, driving higher engagement and satisfaction.</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/ai-ml-development-services.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/ai-and-ml-development-company-usa">
            <div className="service-icon">
              <Image src="/assets/images/ai-ml-icon.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">AI/ML Development Services</h3>
            <p>Tap into the power of AI and machine learning for process automation, data analytics, and custom experiences delivered to end-users. Our services help businesses improve efficiency, make decisions based on data, and drive increased customer satisfaction.</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service_box">
          <Image src="/assets/images/android-app-development.png" fill sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", zIndex: -1 }} alt="" />
          <Link href="/services/android-app-development-company-usa">
            <div className="service-icon">
              <Image src="/assets/images/android app development_icon.png" alt="" width="50" height="50" />
            </div>
            <h3 className="text-capitalize">Android App Development</h3>
            <p>We build Android apps that are fast, secure, and easy to use. Every app is designed to match your business goals and deliver a smooth experience on all Android devices.</p>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
