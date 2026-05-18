import React, { useState } from 'react';
import { Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaCog, FaEdit } from '../../OptimizedIcons';

const FormField = ({ label, name, type = "text", value, onChange, step, min, max }) => (
    <div className="mb-4">
        <Form.Label className="fw-bold small mb-2">
            {label}
        </Form.Label>
        <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            className="bg-white"
        />
    </div>
);

const SitemapForm = ({ initialData = {} }) => {
    const [formData, setFormData] = useState({
        url: initialData.url || '',
        lastmod: initialData.lastmod || '',
        priority: initialData.priority || '0.9',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // FormField moved outside

    return (
        <Form>
            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <FormField
                        label="Url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />

                    <Row>
                        <Col md={6}>
                            <FormField
                                label="Lastmod"
                                name="lastmod"
                                type="datetime-local"
                                value={formData.lastmod}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <FormField
                        label="Priority"
                        name="priority"
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={formData.priority}
                        onChange={handleChange}
                    />
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

                    <Alert variant="primary" className="d-flex align-items-center border-0 bg-primary bg-opacity-10 text-primary py-2 mb-3">
                        <span className="me-2 text-primary fw-bold">&bull;</span>
                        <small className="fw-bold">Editing draft version</small>
                    </Alert>

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

export default SitemapForm;
