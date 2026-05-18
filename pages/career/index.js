import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { Container } from 'react-bootstrap'
import TalkExpert from '../../components/common/TalkExpert'
import Modal from 'react-bootstrap/Modal';
import HubspotForm from 'react-hubspot-form';
import { HUBSPOT_FORM_ID } from '../../lib/constants'
import MetaData from '../../components/common/MetaData'
import { REACT_APP_API_URL } from '../../lib/constants'
import {   IoIosArrowForward, LuMoveRight   } from '../../components/OptimizedIcons';

const Career = ({ posts }) => {
  const [show, setShow] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setModalData(data);
  }
  const handleCloseApplyModal = () => setShowApplyModal(false);
  const handleShowApplyModal = (data) => setShowApplyModal(true);
  return (
    <>
      <MetaData title="Join Our Innovative Team | AppZoro Careers" description="Explore exciting career opportunities at AppZoro. Join a team of passionate developers, engineers, and innovators. Check out open positions and apply today!" url={`/career`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
      <MainHeader />
      <section className='page-title career-bg'>
        <Container>
          <div className='page-section-title'>
            <h1>Explore Amazing Career Possibilities with AppZoro</h1>
            <p>Join Us To Make A Difference Through Your Experience</p>
          </div>
        </Container>
      </section>
      <section className="career-intro">
        <Container>
          <h3>Careers at AppZoro Technologies</h3>
          <p>AppZoro Technologies Inc. is a leading Web Application and Mobile Application development company in Atlanta. With in-house SEO Services, we are one of the best mobile app development firm and software company in Atlanta.</p>
          <p>At AppZoro, we believe in the “Stay Digital, Stay Ahead” motto! Our work environment here is like that of Facebook or Google, wherein we encourage our employees to think of out of the box solutions like Visionaries!</p>
          <p>We believe in the skill development of our employees; so they may learn each and every day of their career here. If you are a creative one in your field then become a part of our Team and help us build Our Story! We are always open for creative peoples in the tech industry who loves innovations.</p>
          <p>Let's join our team of technology experts as mobile app developer, iOS app developer, Android app developer, Web developer, UI/UX designers, SEO Expert, Graphic designer, quality analyst, and more.</p>
        </Container>
      </section>
      <section className="career-list">
        <Container>
          <h3>Explore Our Current Openings</h3>
          <div className='career-requirement table-responsive'>
            <table>
              <thead>
                <tr>
                  <th width="30%">Profile required</th>
                  <th width="30%">Experience required</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  {/* <th>&nbsp;</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  posts?.length > 0 ?

                    posts?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.Title}</td>
                        <td>{item?.Experience}</td>
                        <td><button onClick={() => handleShow(item)} className="btn-style-arrow me-3 btn-theme-transparent">View Detail <span><LuMoveRight /></span></button></td>
                        <td className='text-end'><button onClick={() => handleShowApplyModal()} className="btn-style-arrow ms-3">Apply Now <span><LuMoveRight /></span> </button></td>
                        {/* <td><IoIosArrowForward /></td> */}
                      </tr>
                    ))
                    :
                    <tr>
                      <td>No Vancancy available!!</td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <TalkExpert />
      <Footer />
      {/* View detail modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='career-info'>
            <p>{modalData?.Details}</p>
            {modalData?.Responsibility &&
              <>
                <h3>Responsibilities:</h3>
                <ol>
                  {modalData?.Responsibility?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </>
            }
            {modalData?.Requirements &&
              <>
                <h3>Requirements:</h3>
                <ol>
                  {modalData?.Requirements?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-style-arrow me-3 btn-link theme-light-btn" onClick={handleClose}>
            Close <span><LuMoveRight /></span>
          </button>
          <button className="btn-style-arrow me-3 btn-link" onClick={handleClose}>OK <span><LuMoveRight /></span></button>
        </Modal.Footer>
      </Modal>
      {/* Apply Form Modal */}
      <Modal
        show={showApplyModal}
        onHide={handleCloseApplyModal}
        backdrop="static"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title><h5>Let's Discuss how we will build a winning product along!</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='career-info'>
            <h4 className="consult-message text-center mb-3">Someone will be in touch shortly!</h4>
            <script async charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
            <HubspotForm
              portalId={HUBSPOT_FORM_ID?.PORTAL_ID}
              formId={HUBSPOT_FORM_ID?.CAREER}
              // onSubmit={() => console.log('Submit!')}
              // onReady={form => console.log('Form ready!', form)}
              loading={
                <div className="loading-panel">
                  <div className="loading-text" data-text="Loading...">
                    Loading...
                  </div>
                </div>
              }
              cssClass="hubspot-link__container sproket"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${REACT_APP_API_URL}careers`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

export default Career