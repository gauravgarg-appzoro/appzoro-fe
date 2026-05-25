import React from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { setEdgeCache } from '../../lib/edgeCache';
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import ContactHref from '../../components/common/ContactHref'
import Image from 'next/image'
import TalkExpert from '../../components/common/TalkExpert'
import MetaData from '../../components/common/MetaData'
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import dynamic from 'next/dynamic';
import {   LuMoveRight, AiOutlineDeploymentUnit, MdUpdate, TbHierarchy, TbWorldCheck, BsGlobe, PiUserFocusLight, GoChecklist, FaArrowRightLong, FaRegSquareCheck, FaRegSquareMinus   } from '../../components/OptimizedIcons';



const GettingStarted = (posts) => {
  return (
    <>
      <MainHeader />
      <MetaData title="AppZoro Software Development Process | Start Your Project" description="Learn about AppZoro's comprehensive approach to software development, from requirement analysis to maintenance, for businesses and startups alike.  " url={`/getting-started`} image={DEFAULT_OG_IMAGE} />
      <section className='page-title getting-started-bg'>
        <Container>
          <div className='page-section-title'>
            <h1>Software Development lifecycle</h1>
          </div>
        </Container>
      </section>
      <section className="gs-info">
        <Container>
          <Row className='align-items-center'>
            <Col md="5" xs="12">
              <div className='gs-info-left'>
                We think <br /><span>outside the [ ]</span>
              </div>
            </Col>
            <Col md="7" xs="12">
              <div className='gs-info-right'>
                <p>Empower your business transformation with the best software development process and services. We provide comprehensive solutions for the development process and assure quality to businesses of all sizes and shapes. As a leading development organization, we provide complete services that allow entrepreneurs to be futuristic, agile, and high-performing. </p>
                <ContactHref href="/contact-us" className="btn-style-arrow me-3 mt-3">Get a Free Consultation <span><LuMoveRight /></span></ContactHref>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='sd-process'>
        <Container>
          <div className='section-title'>
            <h3><span>Software</span> Development Process We Follow</h3>
          </div>
          <div className='sd-process-flow'>
            <div className='sd-connect'>
              <span className="hex">
                <GoChecklist />
              </span>
              <span className='process-name'>Requirement Analysis</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <PiUserFocusLight />
              </span>
              <span className='process-name'>Resource Planning</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <TbHierarchy />
              </span>
              <span className='process-name'>Design & Prototyping</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <BsGlobe />
              </span>
              <span className='process-name'>Software Development</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <TbWorldCheck />
              </span>
              <span className='process-name'>Testing</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <MdUpdate />
              </span>
              <span className='process-name'>Maintenance & Updates</span>
            </div>
            <div className='sd-connect'>
              <span className="hex">
                <AiOutlineDeploymentUnit />
              </span>
              <span className='process-name'>Deployment</span>
            </div>
          </div>
        </Container>
      </section>
      <section className='gs-info-all'>
        <Container>
          <Row>
            <Col xs="12" md="6">
              <div className='gs-info-all-left'>
                <h3>Make It Happen</h3>
                <p>Unleash the business to soar beyond client expectations with customized solutions and have the potential to unleash innovation. Our company offers creative solutions that boost your business. Our years of expertise have delivered successful projects to clients worldwide.</p>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="phase-list">
                <div className='phase-item phase-green'>
                  <h5>Kick-off Phase</h5>
                  <Link href="/getting-started/start-ups" className='btn-recommend btn-green'>Recommended for Start-ups </Link>
                  <FaArrowRightLong />
                </div>
                <div className='phase-item phase-yellow'>
                  <h5>Architecture Phase</h5>
                  <Link href="/getting-started/enterprises" className='btn-recommend btn-yellow'>Recommended for Enterprise </Link>
                  <FaArrowRightLong />
                </div>
                <div className='phase-item phase-blue btn-blue'>
                  <h5>No Code Agile</h5>
                  <Link href="/getting-started/mvp" className='btn-recommend btn-blue'>Recommended for MVP </Link>
                  <FaArrowRightLong />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              <div className='gs-table table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th width="40%">AppZoro<br />Package<br />Options</th>
                      <th>
                        <div className="packgage-head">
                          Kick-off Phase
                          <Link href="/getting-started/start-ups" className='btn-recommend btn-green'>Recommended for Start-ups</Link>
                        </div>
                      </th>
                      <th>
                        <div className="packgage-head">
                          Architecture
                          <Link href="/getting-started/enterprises" className='btn-recommend btn-yellow'>Recommended for Enterprise</Link>
                        </div>
                      </th>
                      <th>
                        <div className="packgage-head">
                          No Code Agile
                          <Link href="/getting-started/mvp" className='btn-recommend btn-blue'>Recommended for MVP</Link>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td colSpan={4}>
                        <div className="start-here">
                          <span>Start Here</span>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={14}>
                        <div className='row-data'>
                          <div className='row-data-btn'><Image  src="/assets/images/dp-btn.png" width="35" height="148" alt="development" /></div>
                          <div className='row-data-btn'><Image  src="/assets/images/dev-btn.png" width="35" height="108" alt="Design pattern" /></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><u>Discovery & Workshop</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-yellow"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-blue"><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>Wireframes</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-yellow"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-blue"><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>User Stories / Sprint Plans</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-yellow"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview checkview-blue"><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>User Interface</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview bg-check-none"><FaRegSquareMinus /></div></td>
                      <td rowSpan={5}><div className="tbl-checkview text-check ">User Interface & Development happening simultaneously</div></td>
                    </tr>
                    <tr>
                      <td><u>Landing Page</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview bg-check-none"><FaRegSquareMinus /></div></td>
                      {/* <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td> */}
                    </tr>
                    <tr>
                      <td><u>Pitch Deck / Product Deck</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview bg-check-none"><FaRegSquareMinus /></div></td>
                      {/* <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td> */}
                    </tr>
                    <tr>
                      <td><u>Branding</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview bg-check-none"><FaRegSquareMinus /></div></td>
                      {/* <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td> */}
                    </tr>
                    <tr>
                      <td><u>Prototype</u></td>
                      <td><div className="tbl-checkview checkview-green"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview bg-check-none"><FaRegSquareMinus /></div></td>
                      {/* <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td> */}
                    </tr>
                    <tr>
                      <td><u>Sprint Planning</u></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>Coding</u></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>Quality Assurance & Testing</u></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview "><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>Implementing</u></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                    </tr>
                    <tr>
                      <td><u>Hardening, Optimsations & refactoring</u></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                      <td><div className="tbl-checkview"><FaRegSquareCheck /></div></td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td className='text-end pt-4'>
                        <span className='me-3'><FaRegSquareCheck /> Mandatory</span>
                        <span><FaRegSquareMinus /> -Optional</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='gs-tbinfo'>
                  <div className='gs-lt-ms'>
                    <div className='gs-lt'>
                      <span>Launch & Traction</span>
                    </div>
                    <div className='gs-ms'>
                      <span>Maintain & Scale</span>
                    </div>
                  </div>
                  <div className='gs-lt-ms-info'>
                    <div className='gs-lm-info'>
                      <h3>AppZoro can</h3>
                      <p>Publish your App on your behalf</p>
                    </div>
                    <div className='gs-lm-info'>
                      <p>User Guidelines</p>
                    </div>
                    <div className='gs-lm-info'>
                      <p>Education & Training</p>
                    </div>
                    <div className='gs-lm-info'>
                      <h3>Sister Marketing Agency</h3>
                      <p>The X/OVER Agency can help you scale & find traction</p>
                    </div>
                    <div className='gs-lm-info'>
                      <h3>Optional</h3>
                      <p>Support & Maintenance</p>
                    </div>
                    <div className='gs-lm-info'>
                      <h3>Features</h3>
                      <p>New Feature Updates & Iterations</p>
                    </div>
                    <div className='gs-lm-info'>
                      <h3>Features</h3>
                      <p>New Feature Updates & Iterations</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='services-views'>
        <Container>
          <div className='section-title-dark text-center mb-5'>
            <h2>Our Prevalent Software Development Services</h2>
          </div>
          <Row className='justify-content-center'>
            {posts?.posts?.map((post) => (
              <Col md="4" xs="12" key={post?.id}>
                <div className='service-box'>
                  <Link href={`/services/${post?.slug}`}>
                    <Image src={`${STRAPI_IMAGE_BASE_URL}${post?.serviceicon?.url}`} width="72"
                      height="74" alt={post?.serviceTitle}  />
                    <h3>{post?.serviceTitle}</h3>
                    <p>{post?.ServiceShortDescription}</p>
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
  )
}

export async function getServerSideProps(context) {
  setEdgeCache(context.res, 'short');
  const res = await fetch(`${REACT_APP_API_URL}services`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

export default GettingStarted