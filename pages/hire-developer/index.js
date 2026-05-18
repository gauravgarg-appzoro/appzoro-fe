import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import MetaData from "../../components/common/MetaData";
import { REACT_APP_API_URL } from "../../lib/constants";
import Link from "next/link";

import dynamic from "next/dynamic";
import {   LuMoveRight, GrPersonalComputer   } from '../../components/OptimizedIcons';
const ReactMarkdown = dynamic(import("react-markdown"));

const HireDeveloper = ({ hireDev }) => {
  console.log("hireDev", hireDev);
  return (
    <>
      <MetaData
        title="Hire Developers | Hire Mobile &amp; Web Developers"
        description="Hire developers who are experienced in ensuring the success of your project: Hire mobile and web developers."
        url={`/hire-developer`}
        image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
      <MainHeader />
      <section className="page-title service-bg">
        <Container>
          <div className="page-section-title">
            <h1>Hire Dedicated Developers</h1>
            <p>
              Scale seamlessly: Leverage skilled developers to accelerate your
              project's success.
            </p>
          </div>
        </Container>
      </section>
      <section className="hire-developer-listing">
        <Container>
          <Row>
            {hireDev.length > 0 &&
              hireDev.map((item) => (
                <Col xs="12" lg="3" md="4" sm="6" key={item.id}>
                  <div className="commonlist-box">
                    <div className="service-icon">
                      <span>
                        <GrPersonalComputer />
                      </span>
                    </div>
                    <h3 className="title">{item.job_title}</h3>
                    <div className="description">
                      <ReactMarkdown>
                        {item.job_description}
                      </ReactMarkdown>
                    </div>
                    <Link href={`/hire-developer/${item?.slug}`} className="btn-style-arrow mt-3">
                      Read More{" "}
                      <span>
                        <LuMoveRight />
                      </span>
                    </Link>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const [hiredevRes] = await Promise.all([
    fetch(`${REACT_APP_API_URL}hire-developers`),
  ]);
  const [hireDev] = await Promise.all([hiredevRes.json()]);
  return { props: { hireDev } };
}

export default HireDeveloper;
