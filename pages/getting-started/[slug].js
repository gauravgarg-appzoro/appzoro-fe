import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import TalkExpert from "../../components/common/TalkExpert";
import NoCodeAgile from "./NoCodeAgile";
import StartUps from "./StartUps";
import Enterprises from "./Enterprises";
import MetaData from "../../components/common/MetaData";
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import {   LuMoveRight, FaArrowRightLong   } from '../../components/OptimizedIcons';

const GettingStartedDetails = ({ posts, pageSlug }) => {
  return (
    <>
      {pageSlug === "mvp" && (
        <MetaData
          title="Streamlined MVP Development for Startups | AppZoro"
          description="Explore AppZoro's MVP development process, emphasizing quick, cost-effective solutions for startups to validate their product ideas in the market efficiently."
          url={`/getting-started/mvp`}
          image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
        />
      )}
      {pageSlug === "start-ups" && (
        <MetaData
          title="Streamlined App Development Process for Startups at AppZoro"
          description="AppZoro assists startups in navigating the app development process, from initial brainstorming to creating MVPs aligned with market demands and goals."
          url={`/getting-started/start-ups`}
          image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
        />
      )}
      {pageSlug === "enterprises" && (
        <MetaData
          title="Comprehensive Enterprise Software Development Lifecycle"
          description="Explore AppZoro's tailored app development process for enterprises, emphasizing collaboration, user experience, and cost-effective solutions."
          url={`/getting-started/enterprises`}
          image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
        />
      )}
      <MainHeader />
      <section className="gs-detail">
        <Container>
          <Row className="align-items-center">
            <Col xs="12" md="6">
              <div className="gs_banner_inner">
                {pageSlug === "mvp" && (
                  <div className="gs-inner-head">
                    <Image
                      src="/assets/images/mvp.png"
                      width="93"
                      height="103"
                      alt="No Code Agile"
                      
                    />
                    <h1>No Code Agile</h1>
                  </div>
                )}
                {pageSlug === "start-ups" && (
                  <div className="gs-inner-head">
                    <Image
                      src="/assets/images/flight.png"
                      width="93"
                      height="103"
                      alt="No Code Agile"
                      
                    />
                    <h1>The Kick-Off Phase</h1>
                  </div>
                )}
                {pageSlug === "enterprises" && (
                  <div className="gs-inner-head">
                    <Image
                      src="/assets/images/agile.png"
                      width="93"
                      height="103"
                      alt="No Code Agile"
                      
                    />
                    <h1>The Architecture Phase</h1>
                  </div>
                )}

                <div className="recom-btn">
                  {pageSlug === "mvp" && (
                    <span>
                      Recommended for MVP <LuMoveRight />
                    </span>
                  )}
                  {pageSlug === "start-ups" && (
                    <span>
                      Recommended for Start-Ups <LuMoveRight />
                    </span>
                  )}
                  {pageSlug === "enterprises" && (
                    <span>
                      Recommended for Enterprise <LuMoveRight />
                    </span>
                  )}
                </div>
                {pageSlug === "mvp" && (
                  <p>
                    Searching for something more substantial right away? Here is
                    something best for you.{" "}
                  </p>
                )}
                {pageSlug === "start-ups" && (
                  <p>
                    If not a start-up business, then this product is according
                    to your requirements.
                  </p>
                )}
                {pageSlug === "enterprises" && (
                  <p>
                    Are you not an enterprise? Then, the products below are an
                    ideal choice for you.{" "}
                  </p>
                )}
                <div className="phase-list">
                  {pageSlug === "mvp" ? (
                    <>
                      <div className="phase-item phase-green">
                        <h5>Kick-off Phase</h5>
                        <Link
                          href="/getting-started/start-ups"
                          className="btn-recommend btn-green"
                        >
                          Recommended for Start-ups{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                      <div className="phase-item phase-yellow">
                        <h5>Architecture Phase</h5>
                        <Link
                          href="/getting-started/enterprises"
                          className="btn-recommend btn-yellow"
                        >
                          Recommended for Enterprise{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                    </>
                  ) : pageSlug === "start-ups" ? (
                    <>
                      <div className="phase-item phase-yellow">
                        <h5>Architecture Phase</h5>
                        <Link
                          href="/getting-started/enterprises"
                          className="btn-recommend btn-yellow"
                        >
                          Recommended for Enterprise{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                      <div className="phase-item phase-blue btn-blue">
                        <h5>No Code Agile</h5>
                        <Link
                          href="/getting-started/mvp"
                          className="btn-recommend btn-blue"
                        >
                          Recommended for MVP{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                    </>
                  ) : pageSlug === "enterprises" ? (
                    <>
                      <div className="phase-item phase-green">
                        <h5>Kick-off Phase</h5>
                        <Link
                          href="/getting-started/start-ups"
                          className="btn-recommend btn-green"
                        >
                          Recommended for Start-ups{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                      <div className="phase-item phase-blue btn-blue">
                        <h5>No Code Agile</h5>
                        <Link
                          href="/getting-started/mvp"
                          className="btn-recommend btn-blue"
                        >
                          Recommended for MVP{" "}
                        </Link>
                        <FaArrowRightLong />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              {pageSlug === "mvp" && (
                <div className="gs-detail-info">
                  <h3>
                    Streamline Your Agile Workflow Without Writing Single Line
                    of Code
                  </h3>
                  <p>
                    This approach is quick and cost-effective, but you will
                    receive a functional build instantly that substantiates your
                    products and services in the marketplace.{" "}
                  </p>
                </div>
              )}
              {pageSlug === "start-ups" && (
                <div className="gs-detail-info">
                  <h3>
                    Think About Hiring a Building Architect to Construct a House
                    Before You Hire the Builder{" "}
                  </h3>
                  <p>
                    Brainstorm about the whole vision and collect requirements
                    for your app before starting the development process.{" "}
                  </p>
                </div>
              )}
              {pageSlug === "enterprises" && (
                <div className="gs-detail-info">
                  <h3>
                    The blueprint of success ensures the organization's business
                    goal with technical feasibility and scalability.{" "}
                  </h3>
                  <p>
                    In the architect process, the Appzoro technologies will
                    understand the client app idea and collect all the essential
                    aspects required in app development. Also, it gives you the
                    requirements that play a successful role in releasing apps
                    in the market.
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {pageSlug === "mvp" && <NoCodeAgile />}
      {pageSlug === "start-ups" && <StartUps />}
      {pageSlug === "enterprises" && <Enterprises />}
      <section className="services-views">
        <Container>
          <div className="section-title-dark text-center mb-5">
            <h2>Our Prevalent Software Development Services</h2>
          </div>
          <Row className="justify-content-center">
            {posts.map((post) => (
              <Col md="4" xs="12" key={post.id}>
                <div className="service-box">
                  <Link href={`/services/${post.slug}`}>
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${post.serviceicon.url}`}
                      width="72"
                      height="74"
                      alt={post.serviceTitle}
                      
                    />
                    <h3>{post.serviceTitle}</h3>
                    <p>{post.ServiceShortDescription}</p>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <TalkExpert />
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "mvp" } },
      { params: { slug: "start-ups" } },
      { params: { slug: "enterprises" } },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let posts = [];
  try {
    const res = await fetch(`${REACT_APP_API_URL}services`);
    posts = await res.json();
  } catch (e) {
    posts = [];
  }
  return {
    props: {
      posts: Array.isArray(posts) ? posts : (posts?.posts ?? []),
      pageSlug: params.slug,
    },
    revalidate: 300,
  };
}

export default GettingStartedDetails;
