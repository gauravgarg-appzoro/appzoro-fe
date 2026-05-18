import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import {   FaArrowLeft, FaSave, FaCloudUploadAlt   } from '../../../components/OptimizedIcons';

const TechnologyEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    return (
        <AdminLayout title={isNew ? 'Create Technology' : 'Edit Technology'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/technology" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Technology' : 'Edit Technology'}</h2>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Technology Name</Form.Label>
                                <Form.Control type="text" placeholder="e.g., React Native, Flutter, Node.js" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select>
                                    <option>Select category...</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="database">Database</option>
                                    <option value="cloud">Cloud</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={8} placeholder="Technology description and use cases" />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body>
                            <Button variant="primary" className="w-100">
                                <FaSave className="me-2" /> Save Technology
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3 fw-bold">Technology Logo</Card.Header>
                        <Card.Body className="text-center">
                            <div className="border border-dashed p-4 rounded bg-light">
                                <FaCloudUploadAlt size={32} className="text-muted mb-2" />
                                <p className="small text-muted mb-0">Upload logo</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default TechnologyEdit;
