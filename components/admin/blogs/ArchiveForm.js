import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert, InputGroup } from 'react-bootstrap';
import { FaSave, FaCog, FaEdit, FaSyncAlt } from '../../OptimizedIcons';

const ArchiveForm = ({ initialData = {} }) => {
    const [formData, setFormData] = useState({
        slug: initialData.slug || '',
        name: initialData.name || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Form>
            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Slug</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="bg-white border-end-0"
                                    />
                                    <InputGroup.Text className="bg-white border-start-0 text-secondary" style={{ cursor: 'pointer' }}>
                                        <FaSyncAlt size={12} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-white"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>

                {/* Sidebar Column */}
                <Col md={3}>
                    <div className="d-flex mb-4">
                        <Button variant="light" className="flex-grow-1 me-2 border bg-white text-secondary" disabled>Publish</Button>
                        <Button variant="light" className="flex-grow-1 border bg-white text-secondary">Save</Button>
                    </div>

                    <Card className="border-0 shadow-sm mb-3">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Information</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted fw-bold">LAST UPDATE</small>
                                <small>-</small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted fw-bold">BY</small>
                                <small>-</small>
                            </div>
                        </Card.Body>
                    </Card>

                    <Alert variant="primary" className="d-flex align-items-center border-0 bg-primary bg-opacity-10 text-primary py-2 mb-3">
                        <span className="me-2 text-primary fw-bold">&bull;</span>
                        <small className="fw-bold">Editing draft version</small>
                    </Alert>

                    <Card className="border-0 shadow-sm mb-3">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Posts (0)</h6>
                            <Form.Select className="text-muted small" disabled>
                                <option>Add an item...</option>
                            </Form.Select>
                        </Card.Body>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-0">
                            <div className="d-flex align-items-center p-3 border-bottom" style={{ cursor: 'pointer' }}>
                                <FaCog className="text-muted me-3" />
                                <small className="fw-bold text-dark">Configure the view</small>
                            </div>
                            <div className="d-flex align-items-center p-3" style={{ cursor: 'pointer' }}>
                                <FaEdit className="text-muted me-3" />
                                <small className="fw-bold text-dark">Edit the fields</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default ArchiveForm;
