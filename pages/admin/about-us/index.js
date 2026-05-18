import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import {   FaSave, FaCloudUploadAlt   } from '../../../components/OptimizedIcons';

const AboutUsEdit = () => {
    return (
        <AdminLayout title="About Us Page">
            <div className="mb-4">
                <h2 className="fw-bold mb-0">Edit About Us Page</h2>
                <p className="text-secondary">Manage your company's about us page content</p>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-white py-3 fw-bold">Main Content</Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Page Title</Form.Label>
                                <Form.Control type="text" defaultValue="About AppZoro Technologies" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Introduction</Form.Label>
                                <Form.Control as="textarea" rows={4} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Our Mission</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Our Vision</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Company History</Form.Label>
                                <Form.Control as="textarea" rows={6} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body>
                            <Button variant="primary" className="w-100">
                                <FaSave className="me-2" /> Save Changes
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3 fw-bold">Company Images</Card.Header>
                        <Card.Body className="text-center">
                            <div className="border border-dashed p-4 rounded bg-light mb-3">
                                <FaCloudUploadAlt size={32} className="text-muted mb-2" />
                                <p className="small text-muted mb-0">Upload office photos</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default AboutUsEdit;
