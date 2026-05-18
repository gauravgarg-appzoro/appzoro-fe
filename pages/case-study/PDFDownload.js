import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Container, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
import HubspotFormService from "../../services/HubspotForm.service";
import Link from "next/link";
import Image from "next/image";
import { saveAs } from 'file-saver';
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import {   LuMoveRight   } from '../../components/OptimizedIcons';

const PDFDownload = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [donwloadProgress, setDownloadProgress] = useState(false);

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
    setCorrectAnswer(a + b);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setUserAnswer('');
  }
  const handleShowSuccess = () => {
    setShowSuccess(true)
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const onSubmit = async (data) => {
    if (parseInt(userAnswer) === correctAnswer) {
      setShowLoader(true);
      let [result] = await HubspotFormService.caseStudyDownloadEnquiry(data);
      if (result) {
        handleClose();
        setShowLoader(false);
        reset();
        setShowSuccess(true);
      } else {
        setShowLoader(false);
        setShowAlert(true);
      }
    } else {
      setCaptchaFailed(true);
      // Display error message or prevent submission
    }
    setSubmitted(true);
  };

  const handleDownload = (file) => {
    setDownloadProgress(true);
    const fileUrl = `${STRAPI_IMAGE_BASE_URL}${file}`;
    const pdfName = `${props?.portFolioName}.pdf`
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, pdfName);
        setDownloadProgress(false);
        setShowSuccess(false);
      })
      .catch(error => console.error('Error downloading the file:', error));
  }

  return (
    <>
      {showLoader && <Loader />}
      <section className="download-section text-center">
        <Container>
          <button className="theme-btn-normal" onClick={handleShow}>
            Download Case Study
          </button>
        </Container>
      </section>
      {/* Download Form Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* name,email, mobile, services */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_view">
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Something went wrong! Please try agin later!!
                </Alert>
              )}
              <Row>
                <Col md="12" xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="firstName"
                      {...register("firstName", {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                    {errors.firstName?.type === "required" && (
                      <p className="error-msg" role="alert">
                        Please enter your first name!
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12" xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      E-mail <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email Address"
                      name="email"
                      {...register("email", {
                        required: "Please enter an email!",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter valid email!",
                        },
                      })}
                    />
                    {errors.email?.message && (
                      <p className="error-msg" role="alert">
                        {errors.email?.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12" xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Mobile number <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      name="mobilephone"
                      {...register("mobilephone", {
                        required: "Please enter your contact number!",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter valid contact Number!",
                        },
                      })}
                    />
                    {errors.mobilephone?.message && (
                      <p className="error-msg" role="alert">
                        {errors.mobilephone?.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12" xs="12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Services <span>*</span>
                    </Form.Label>

                    <div className="custom_checkboxes">
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="webDevelopment"
                          {...register("services", { required: true })}
                        />
                        <span>Web Development</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="mobAppDev"
                          {...register("services", { required: true })}
                        />
                        <span>Mobile App Development</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="uiUxDesign"
                          {...register("services", { required: true })}
                        />
                        <span>UI/UX Design</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="maintainSupport"
                          {...register("services", { required: true })}
                        />
                        <span>Maintenance & Support</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="customSoftware"
                          {...register("services", { required: true })}
                        />
                        <span>Custom Software Development</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="qaService"
                          {...register("services", { required: true })}
                        />
                        <span>QA Services</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="services"
                          value="otherService"
                          {...register("services", { required: true })}
                        />
                        <span>Other Services</span>
                      </label>
                    </div>
                    {errors.services?.type === "required" && (
                      <p className="error-msg" role="alert">
                        Please select at least one service!
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="12" xs="12">
                  <Form.Group className="mb-3">
                    <Row className="align-items-center">
                      <Col md="3" xs="4">
                        {num1} + {num2} =
                      </Col>
                      <Col md="9" xs="8">
                        <input
                          type="text"
                          placeholder="Enter Captcha Value"
                          className="form-control"
                          name="captchaVal"
                          value={userAnswer}
                          onChange={handleChange}
                        />
                      </Col>
                      {captchaFailed && (
                        <Col md="12" xs="12">
                          <p className="error-msg mt-2">
                            Please Enter Valid Captcha value!
                          </p>
                        </Col>
                      )}
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <button className="btn_theme" type="submit">
              Submit{" "}
              <span>
                <LuMoveRight />
              </span>
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Download Link Modal */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title><h5 className="mb-0">Download Case Study</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="donwload-casestudy-modal">
            <Image
               src="/assets/images/done-icon.png" width={100} height={100} alt="case study download" />
            <h4>Thank you for requesting the case study.</h4>
            {/* <Link className="theme-btn-normal" onClick={handleCloseSuccess} href={`${STRAPI_IMAGE_BASE_URL}${postData?.data}`} target="_blank"  rel="noopener noreferrer" download="file.pdf">Click here to Download Case Study</Link> */}
            <button className="theme-btn-normal" onClick={() => handleDownload(props?.data)}>
              {donwloadProgress ? "Downloading..." : "Click here to Download Case Study"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PDFDownload;
