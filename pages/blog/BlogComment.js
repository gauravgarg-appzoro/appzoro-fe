
import { useForm } from 'react-hook-form';
import { Col, Container, Form, Row } from 'react-bootstrap'
import HubspotFormService from '../../services/HubspotForm.service';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import {   LuMoveRight   } from '../../components/OptimizedIcons';

const BlogComment = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    let [result] = await HubspotFormService.postSendComment(data);
    if (result) {
      setShowAlert(true)
      reset(); 
    }
  };


  return (
    <div className="comment-form mt-4 mb-5">
      <h3 className='blog-block-title'>Leave a Comment</h3>
      <div className='contact-form poppins-font'>
        {showAlert && show &&
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Thanks for submitting the comment
          </Alert>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form_view'>
            <Row>
              <Col md="6" xs="12">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter your name" name="firstname" {...register("firstname", { required: true, maxLength: 80 })} />
                  {errors.firstname?.type === "required" && (
                    <p className='error-msg' role="alert">Please enter your name!</p>
                  )}
                </Form.Group>
              </Col>
              <Col md="6" xs="12">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter your E-mail" name="email" {...register("email", { required: 'Please enter an email!', pattern: { value: /^\S+@\S+$/i, message: "Please enter valid email!" } })} />
                  {errors.email?.message && (
                    <p className='error-msg' role="alert">{errors.email?.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md="12" xs="12">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Website" name="website" {...register("website", { required: false, pattern: { value: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g, message: "Please enter valid domain!" } })} />
                  {errors.website?.message && (
                    <p className='error-msg' role="alert">{errors.website?.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md="12" xs="12">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control as="textarea" placeholder='Enter Your Comment' rows={3} name="message" {...register("message", { required: true })} />
                  {errors.message?.type === "required" && (
                    <p className='error-msg' role="alert">Please enter your comment!
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>
          <button className="btn-style-arrow me-3 arrow-btn-style" type='submit'>
            Submit <span><LuMoveRight /></span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogComment