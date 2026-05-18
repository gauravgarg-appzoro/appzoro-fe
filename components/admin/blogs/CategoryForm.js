import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { FaCog, FaEdit, FaSyncAlt } from '../../OptimizedIcons';

const CategoryForm = ({ initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        slug: initialData.slug || '',
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
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <Row>
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
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Sidebar Column */}
                <Col md={3}>
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

                    <Card className="border-0 shadow-sm mb-3">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Posts (0)</h6>
                            <Form.Select className="text-muted small" size="sm">
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

export default CategoryForm;
