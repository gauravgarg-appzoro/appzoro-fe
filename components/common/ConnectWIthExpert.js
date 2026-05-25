import Image from "next/image";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HubspotFormService from "../../services/HubspotForm.service";
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import Loader from "../Loader";
import { LuMoveRight } from '../OptimizedIcons';

const ConnectWIthExpert = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
    setCorrectAnswer(a + b);
  }, []);

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    if (parseInt(userAnswer) === correctAnswer) {
      setShowLoader(true);
      let [result] = await HubspotFormService.servicePageConsulation(data);
      if (result) {
        router.push("/thank-you")
      } else {
        setShowLoader(false);
        setShowAlert(true);
      }
    } else {
      setCaptchaFailed(true)
      // Display error message or prevent submission
    }
    setSubmitted(true);
  };

  return (
    <section className="connect-section" id="expertConnect">
      {showLoader && <Loader />}
      <Container>
        <Row>
          <Col xs="12" md="6">
            <div className="expert-sec-left">
              <h3>Let's Connect With Our Experts</h3>
              <p>
                Get valuable consultation from our professionals to discuss your
                mobile application development project. We are here to help you
                with all of your queries.
              </p>
              <h4>Revolutionize Your Business</h4>
              <p>
                Collaborate with us and become a trendsetter with our reliable
                mobile application development company.
              </p>
              <div className="expert-truested-icons">
                <Image
                  src="/assets/images/clutch-2020.png"
                  width="65"
                  height="70"
                  alt="Clutch"
                  
                />
                <Image
                  src="/assets/images/appfutrrra.png"
                  width="94"
                  height="70"
                  alt="appFutura"
                  
                />
                <Image
                  src="/assets/images/aws-black.png"
                  width="189"
                  height="70"
                  alt="amazon web servcies"
                  
                />
                <Image
                  src="/assets/images/csdc.png"
                  width="70"
                  height="70"
                  alt="App development US"
                  
                />
              </div>
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="expert-sec-right">
              <div className="esr-title">Get in Touch Now!</div>
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Something went wrong! Please try agin later!!
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_view">
                  <Row>
                    <Col md="12" xs="12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        {/* <Form.Label>Name <span>*</span></Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="First Name"
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
                        {/* <Form.Label>Name <span>*</span></Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          {...register("lastName", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                        {errors.lastName?.type === "required" && (
                          <p className="error-msg" role="alert">
                            Please enter your last name!
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="12" xs="12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        {/* <Form.Label>E-mail <span>*</span></Form.Label> */}
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
                        {/* <Form.Label>Mobile number <span>*</span></Form.Label> */}
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
                        {/* <Form.Label>Name <span>*</span></Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="Company Name"
                          name="company"
                          {...register("company", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                        {errors.companyName?.type === "required" && (
                          <p className="error-msg" role="alert">
                            Please enter your company name!
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    {/* <Col md="12" xs="12">
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
                              value="webDev"
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
                    </Col> */}
                    <Col md="12" xs="12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        {/* <Form.Label>Tell us in more detail about the product you need help with.<span>*</span></Form.Label> */}
                        <Form.Control
                          as="textarea"
                          placeholder="Project Requirement Details "
                          rows={3}
                          name="message"
                          {...register("message", { required: true })}
                        />
                        {errors.message?.type === "required" && (
                          <p className="error-msg" role="alert">
                            Please enter your message!
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row className="align-items-center">
                          <Col md="3" xs="4">
                            {num1 !== null && num2 !== null ? `${num1} + ${num2} =` : ' '}
                          </Col>
                          <Col md="9" xs="8">
                            <input
                              type="text"
                              placeholder="Enter Captcha Value"
                              className="form-control"
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
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ConnectWIthExpert;
