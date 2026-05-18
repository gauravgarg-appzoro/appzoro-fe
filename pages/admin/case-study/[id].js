import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import {   FaArrowLeft, FaSave   } from '../../../components/OptimizedIcons';

const CaseStudyEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    return (
        <AdminLayout title={isNew ? 'Create Case Study' : 'Edit Case Study'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/case-study" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Case Study' : 'Edit Case Study'}</h2>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Case study title" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control type="text" placeholder="Client name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Challenge</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Describe the challenge..." />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Solution</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Describe the solution..." />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Results</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Describe the results..." />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <Button variant="primary" className="w-100">
                                <FaSave className="me-2" /> Save Case Study
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default CaseStudyEdit;
