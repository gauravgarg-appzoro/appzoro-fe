import Image from "next/image";
import React from "react";
import Container from 'react-bootstrap/Container';

const logos = [
  { src: "/assets/images/ai development company/convoy_logo.png", width: 163, height: 60, alt: "convoy" },
  { src: "/assets/images/ai development company/jax-logo.png", width: 107, height: 60, alt: "jax" },
  { src: "/assets/images/ai development company/Medcraze_logo.png", width: 197, height: 60, alt: "medcraze" },
  { src: "/assets/images/ai development company/Freedom_logo.png", width: 161, height: 60, alt: "freedom" },
  { src: "/assets/images/ai development company/JI_logo.png", width: 161, height: 60, alt: "judicial innovations" },
];

const AppDevelopmentPartners = () => {
  return (
    <section className="app-partners">
      <Container>
        <div className="app-partners-content">
          <div className="app-partner-title">
            Trusted by
          </div>
          <div className="app-dev-partner-icons">
            <div className="marquee-wrapper">
              <div className="marquee-content">
                {logos.map((logo, index) => (
                  <Image
                    key={`logo-1-${index}`}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt}
                    unoptimized
                  />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {logos.map((logo, index) => (
                  <Image
                    key={`logo-2-${index}`}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt}
                    unoptimized
                  />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {logos.map((logo, index) => (
                  <Image
                    key={`logo-3-${index}`}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt}
                    unoptimized
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AppDevelopmentPartners;
