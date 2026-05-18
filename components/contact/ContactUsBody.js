import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Alert } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import HubspotFormService from '../../services/HubspotForm.service';
import Loader from '../Loader';
import { LuMoveRight } from '../OptimizedIcons';

/**
 * Shared contact UI: left column (copy + awards + phone) + right column form.
 * Used on /contact-us and inside ContactModal.
 * @param {{ variant?: 'page' | 'modal', onSuccess?: () => void }} props
 */
export default function ContactUsBody({ variant = 'page', onSuccess }) {
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [captchaFailed, setCaptchaFailed] = useState(false);

    useEffect(() => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setNum1(a);
        setNum2(b);
        setCorrectAnswer(a + b);
    }, []);

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const isModal = variant === 'modal';

    const onSubmit = async (data) => {
        if (parseInt(userAnswer, 10) === correctAnswer) {
            setShowLoader(true);
            const [result] = await HubspotFormService.postFreeConsultation(data);
            if (result) {
                onSuccess?.();
                router.push('/thank-you');
            } else {
                setShowLoader(false);
                setShowAlert(true);
            }
        } else {
            setCaptchaFailed(true);
        }
    };

    const innerClass =
        variant === 'modal' ? 'contact-inner contact-inner--modal' : 'contact-inner';
    const sectionClass =
        variant === 'modal'
            ? 'contact-section contact-section--modal contact-us-body--modal'
            : 'contact-section';

    return (
        <>
            {showLoader && <Loader />}
            <section className={sectionClass}>
                <Container className={variant === 'modal' ? 'px-3 px-md-4' : ''}>
                    <div className={innerClass}>
                        <Row className={variant === 'modal' ? 'g-3 g-lg-4 align-items-stretch contact-us-modal__row' : ''}>
                            <Col
                                {...(variant === 'modal'
                                    ? { lg: 5, md: 12, xs: 12 }
                                    : { md: '7', xs: '12' })}
                                className={variant === 'modal' ? 'd-flex' : ''}
                            >
                                <div className={variant === 'modal' ? 'contact-info contact-info--modal-aside w-100' : 'contact-info'}>
                                    <div className="contact-info-title">
                                        {variant === 'modal' && (
                                            <p className="contact-us-modal__eyebrow">Get in touch</p>
                                        )}
                                        {variant === 'modal' ? (
                                            <h1 className="contact-modal__heading">
                                                <span className="contact-modal__heading-brand">Connect with Us</span>
                                                <span className="contact-modal__heading-rest"> And Go Digital</span>
                                            </h1>
                                        ) : (
                                            <h1><span>Connect with Us</span><br />And Go Digital</h1>
                                        )}
                                        <p className={variant === 'modal' ? 'fs-18 contact-modal__intro' : 'fs-18'}>Book a free consultation with Appzoro to understand your app development requirements. Our experts are ready to bring your ideas to life with innovative solutions. Contact us today and take the first step toward building your custom mobile or web app.</p>
                                    </div>
                                    <div className={variant === 'modal' ? 'awards_view awards_view--modal awards_view--modal-below-intro' : 'awards_view'}>
                                        <div className="contact_awards_view">
                                            <div className="award-view">
                                                <Image src="/assets/images/award/2.png" alt="award" width={160} height={138} />
                                            </div>
                                            <div className="award-view">
                                                <Image src="/assets/images/award/4.png" alt="award" width={160} height={138} />
                                            </div>
                                            <div className="award-view">
                                                <Image src="/assets/images/award/app-dev-us.png" alt="award" width={160} height={138} />
                                            </div>
                                            <div className="award-view">
                                                <Image src="/assets/images/award/aws_logo.png" alt="award" width={160} height={138} />
                                            </div>
                                            <div className="award-view">
                                                <Image src="/assets/images/award/b2b-companies-Georgia.png" alt="award" width={160} height={138} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={variant === 'modal' ? 'contact-enquiry contact-enquiry--modal contact-enquiry--modal-last' : 'contact-enquiry'}>
                                        <h3 className="contact-title">For sales Enquiry</h3>
                                        <div className="sales-address">
                                            {variant === 'modal' ? (
                                                <div className="add-view add-view--modal add-view--modal-inline">
                                                    <div className="contact-modal-sales-flag">
                                                        <Image
                                                            alt="United States"
                                                            src="/assets/images/usa-flag.png"
                                                            width={72}
                                                            height={38}
                                                            className="contact-modal-flag-img"
                                                        />
                                                    </div>
                                                    <div className="contact-modal-sales-text">
                                                        <a href="tel:678-462-4034" className="contact-modal-sales-phone">
                                                            678-462-4034
                                                        </a>
                                                        <p className="contact-modal-sales-address">
                                                            Atlanta Tech Village, 3423 Piedmont Rd NE, Suite 320
                                                            <br />
                                                            Atlanta, GA 30305
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="add-view">
                                                    <Image alt="Atlanta" src="/assets/images/usa-flag.png" width={250} height={132} />
                                                    <h4>678-462-4034</h4>
                                                    <p>Atlanta Tech Village 3423 Piedmont Rd NE, Suite 320 Atlanta, GA 30305</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                {...(variant === 'modal'
                                    ? { lg: 7, md: 12, xs: 12 }
                                    : { md: '5', xs: '12' })}
                                className={variant === 'modal' ? 'd-flex' : ''}
                            >
                                <div className={variant === 'modal' ? 'contact-page-form contact-page-form--modal w-100' : 'contact-page-form'}>
                                    <div className="book-content">Book a Free <span>Consultation </span></div>
                                    {showAlert && (
                                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                            Something went wrong! Please try agin later!!
                                        </Alert>
                                    )}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form_view">
                                            <Row>
                                                <Col md={variant === 'modal' ? 6 : 12} xs={12}>
                                                    <Form.Group className="mb-3" controlId="cu-firstName">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">First name <span className="text-danger" aria-hidden="true">*</span></Form.Label>
                                                        )}
                                                        <Form.Control type="text" placeholder="First name" name="firstName" {...register('firstName', { required: true, maxLength: 80 })} />
                                                        {errors.firstName?.type === 'required' && (
                                                            <p className="error-msg" role="alert">Please enter your first name!</p>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col md={variant === 'modal' ? 6 : 12} xs={12}>
                                                    <Form.Group className="mb-3" controlId="cu-lastName">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">Last name</Form.Label>
                                                        )}
                                                        <Form.Control type="text" placeholder="Last name" name="lastName" {...register('lastName', { maxLength: 80 })} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12" xs="12">
                                                    <Form.Group className="mb-3" controlId="cu-email">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">Email address <span className="text-danger" aria-hidden="true">*</span></Form.Label>
                                                        )}
                                                        <Form.Control type="text" placeholder="Email address" name="email" {...register('email', { required: 'Please enter an email!', pattern: { value: /^\S+@\S+$/i, message: 'Please enter valid email!' } })} />
                                                        {errors.email?.message && (
                                                            <p className="error-msg" role="alert">{errors.email?.message}</p>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12" xs="12">
                                                    <Form.Group className="mb-3" controlId="cu-phone">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">Phone number <span className="text-danger" aria-hidden="true">*</span></Form.Label>
                                                        )}
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Phone number"
                                                            name="mobilephone"
                                                            {...register('mobilephone', isModal ? {
                                                                required: 'Please enter your contact number!',
                                                                validate: (v) => {
                                                                    const digits = String(v || '').replace(/\D/g, '');
                                                                    return digits.length === 10 || 'Please enter valid contact Number!';
                                                                },
                                                            } : { required: 'Please enter your contact number!', pattern: { value: /^[0-9]{10}$/, message: 'Please enter valid contact Number!' } })}
                                                        />
                                                        {errors.mobilephone?.message && (
                                                            <p className="error-msg" role="alert">{errors.mobilephone?.message}</p>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12" xs="12">
                                                    <Form.Group className="mb-3" controlId="cu-company">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">Company name</Form.Label>
                                                        )}
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Company name"
                                                            name="company"
                                                            {...register('company', isModal ? { maxLength: 80 } : { required: true, maxLength: 80 })}
                                                        />
                                                        {!isModal && errors.company?.type === 'required' && (
                                                            <p className="error-msg" role="alert">Please enter your company name!</p>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12" xs="12">
                                                    <Form.Group className="mb-3" controlId="cu-services">
                                                        <Form.Label className={isModal ? 'contact-modal-field-label' : ''}>
                                                            Services{!isModal && <span className="text-danger" aria-hidden="true"> *</span>}
                                                        </Form.Label>
                                                        {isModal ? (
                                                            <Form.Select
                                                                className="contact-modal-services-select"
                                                                {...register('services')}
                                                            >
                                                                <option value="">Select a service</option>
                                                                <option value="webDev">Web Development</option>
                                                                <option value="mobAppDev">Mobile App Development</option>
                                                                <option value="uiUxDesign">UI/UX Design</option>
                                                                <option value="maintainSupport">Maintenance &amp; Support</option>
                                                                <option value="customSoftware">Custom Software Development</option>
                                                                <option value="qaService">QA Services</option>
                                                                <option value="eCommerceDevelopment">eCommerce Development</option>
                                                                <option value="aimlServices">AI/ML Services</option>
                                                                <option value="otherService">Other Services</option>
                                                            </Form.Select>
                                                        ) : (
                                                            <div className="custom_checkboxes">
                                                                <label>
                                                                    <input type="checkbox" name="services" value="webDev" {...register('services', { required: true })} />
                                                                    <span>Web Development</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="mobAppDev" {...register('services', { required: true })} />
                                                                    <span>Mobile App Development</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="uiUxDesign" {...register('services', { required: true })} />
                                                                    <span>UI/UX Design</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="maintainSupport" {...register('services', { required: true })} />
                                                                    <span>Maintenance & Support</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="customSoftware" {...register('services', { required: true })} />
                                                                    <span>Custom Software Development</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="qaService" {...register('services', { required: true })} />
                                                                    <span>QA Services</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="eCommerceDevelopment" {...register('services', { required: true })} />
                                                                    <span>eCommerce Development</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="aimlServices" {...register('services', { required: true })} />
                                                                    <span>AI/ML Services</span>
                                                                </label>
                                                                <label>
                                                                    <input type="checkbox" name="services" value="otherService" {...register('services', { required: true })} />
                                                                    <span>Other Services</span>
                                                                </label>
                                                            </div>
                                                        )}
                                                        {!isModal && errors.services && (
                                                            <p className="error-msg" role="alert">
                                                                {errors.services?.message || (errors.services?.type === 'required' ? 'Please select at least one service!' : '')}
                                                            </p>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12" xs="12">
                                                    <Form.Group className="mb-3" controlId="cu-message">
                                                        {isModal && (
                                                            <Form.Label className="contact-modal-field-label">Project requirement details <span className="text-danger" aria-hidden="true">*</span></Form.Label>
                                                        )}
                                                        <Form.Control
                                                            as="textarea"
                                                            placeholder="Project requirement details"
                                                            rows={isModal ? 2 : 3}
                                                            name="message"
                                                            {...register('message', { required: isModal ? 'Please enter your project requirements' : true })}
                                                        />
                                                        {errors.message && (
                                                            <p className="error-msg" role="alert">
                                                                {errors.message?.message || (errors.message?.type === 'required' ? 'Please enter your message!' : '')}
                                                            </p>
                                                        )}
                                                    </Form.Group>
                                                    <Form.Group className={`mb-3 ${isModal ? 'contact-modal-captcha' : ''}`}>
                                                        <Row className="align-items-center">
                                                            <Col md={isModal ? 4 : 3} xs={isModal ? 5 : 4}>{num1} + {num2} =</Col>
                                                            <Col md={isModal ? 8 : 9} xs={isModal ? 7 : 8}>
                                                                <input type="text" placeholder="Your answer" className="form-control" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                                                            </Col>
                                                            {captchaFailed && (
                                                                <Col md="12" xs="12">
                                                                    <p className="error-msg mt-2">Please Enter Valid Captcha value!</p>
                                                                </Col>
                                                            )}
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <button className="btn_theme" type="submit">
                                            Submit <span><LuMoveRight /></span>
                                        </button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
}
