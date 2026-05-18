import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";

const PortfolioTechStack = ({ techStack }) => {
  return (
    <>
      <section className="tech-partner ads_fonts">
        <Container>
          <div className="section-title">
            <h3>Technologies Stack We Use</h3>
            <p>
              Our bespoke software development company is composed of
              professional IT experts with demanding knowledge and experience
              in:
            </p>
          </div>
          <div className="tech-tabs-block">
            <div className="tech-content-view pt-0">
              <ul>
                {Array.isArray(techStack) && techStack.map((item) => (
                  <li key={item?.id}>
                    {item?.techIcon &&
                      <span>
                        <Image
                          src={`${STRAPI_IMAGE_BASE_URL}${item?.techIcon?.url}`}

                          width="93"
                          height="49"
                          alt={item?.tech_name}
                        />
                      </span>
                    }
                    <div className="tech-stack-title">{item?.tech_name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PortfolioTechStack;
