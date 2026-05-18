import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { FaSave, FaCog, FaEdit } from '../../OptimizedIcons';

const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

const CareerForm = ({ initialData = {}, onSave, saving = false, isNew = true }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        experience: initialData.experience || '',
        details: initialData.details || '',
        responsibility: initialData.responsibility || '',
        published: initialData.published || false,
        requirements: initialData.requirements || ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDetailsChange = (html) => {
        setFormData(prev => ({ ...prev, details: html }));
    };

    const darkTextareaStyle = {
        backgroundColor: '#0c1e29', // Dark blue/black shade
        color: '#00d4ff', // Cyan text color
        fontFamily: 'monospace',
        border: 'none',
        resize: 'vertical'
    };

    return (
        <Form>
            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="bg-light"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Experience</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="bg-light"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Details</Form.Label>
                        <RichTextEditor
                            content={formData.details}
                            onChange={handleDetailsChange}
                            minHeight="300px"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label className="fw-bold small mb-0">Responsibility</Form.Label>
                        </div>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            name="responsibility"
                            value={formData.responsibility}
                            onChange={handleChange}
                            style={darkTextareaStyle}
                            className="p-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Published</Form.Label>
                        <div className="d-flex align-items-center">
                            <span className={`me-3 small fw-bold ${!formData.published ? 'text-primary' : 'text-muted'}`}>OFF</span>
                            <Form.Check
                                type="switch"
                                id="published-switch"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                            />
                            <span className={`ms-2 small fw-bold ${formData.published ? 'text-primary' : 'text-muted'}`}>ON</span>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Requirements</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            style={darkTextareaStyle}
                            className="p-3"
                        />
                    </Form.Group>
                </Col>

                {/* Sidebar Column */}
                <Col md={3}>
                    <h6 className="text-uppercase text-secondary mb-3" style={{ fontSize: '12px' }}>Publish</h6>
                    <div className="d-flex gap-2 mb-4">
                        <Button variant="outline-secondary" className="flex-grow-1" onClick={() => onSave && onSave(formData, true)} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Draft'}
                        </Button>
                        <Button variant="success" className="flex-grow-1 text-white" style={{ backgroundColor: '#8BC34A', borderColor: '#8BC34A' }} onClick={() => onSave && onSave(formData, false)} disabled={saving}>
                            {saving ? 'Saving...' : (isNew ? 'Save & Publish' : 'Update')}
                        </Button>
                    </div>

                    <Card className="border-0 shadow-sm mb-3">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Information</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted fw-bold">LAST UPDATE</small>
                                <small className="text-end">a few seconds ago</small>
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

export default CareerForm;
