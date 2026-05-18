import Link from "next/link";
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dynamic from 'next/dynamic';
import { IoIosArrowRoundForward, LuMoveRight } from '../OptimizedIcons';



const ServiceWhySection = (props) => {
  const scrollToSection = (id, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 80); // Adjust the offset as needed (e.g., for a fixed header height)
  };
  
  return (
    <section className="why-services" id="whyChooseAz">
      <Container>
        <Row className="align-items-center">
          <Col xs="12" md="6">
            <div className="whyservice-left">
              <div className="whyservice-left_smtitle">{props.subtitle && props.subtitle}</div>
              <div className="whyservice-left_lgtitle">{props.title && props.title}</div>
              <div className="whyservice-left_p">
                <p>{props.info && props.info}</p>
              </div>
              <div className="view-more-btn mt-5">
                <Link href="#expertConnect" onClick={(e) => handleScroll(e, "expertConnect")} className="btn-style-arrow me-3">
                  Get a Free Consultation{" "}
                  <span>
                    <LuMoveRight />
                  </span>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs="12" md="6">
            {(props?.list).length > 0 && (
              <div className="whyservice-right">
                <div className="whyservice-right_box">
                  <ul>
                    {(props?.list).map((item, idx) => (
                      <li key={item?._id || idx}>
                        <div className="whyservice-right_box_title">
                          <span className="why-service-list-arrow">
                            <IoIosArrowRoundForward />
                          </span>
                          <h3>{item?.az_diff_list_title}</h3>
                        </div>
                        <div className="whyservice-right_box_p">
                          <p>{item?.az_diff_list_content}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceWhySection;
