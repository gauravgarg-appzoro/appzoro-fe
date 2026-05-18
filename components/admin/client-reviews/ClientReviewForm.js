import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Card, Alert, Image, Button } from 'react-bootstrap';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaCloudUploadAlt, FaTrash } from '../../OptimizedIcons';

const ClientReviewForm = ({ initialData = {}, onChange }) => {
    const existingPicUrl = (() => {
        const pic = initialData.clientProfilePic;
        if (!pic) return null;
        if (typeof pic === 'string') return pic;
        if (pic.url) {
            return pic.url.startsWith('http') ? pic.url : `${STRAPI_IMAGE_BASE_URL || ''}${pic.url}`;
        }
        return null;
    })();

    const [formData, setFormData] = useState({
        name: initialData.name || '',
        clientreview: initialData.clientreview || '',
        designation: initialData.designation || '',
        clientProfilePic: initialData.clientProfilePic?._id || initialData.clientProfilePic?.id || initialData.clientProfilePic || null,
    });

    const [imagePreview, setImagePreview] = useState(existingPicUrl);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (onChange) onChange(formData);
    }, [formData, onChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        setUploading(true);
        try {
            const result = await adminService.uploadImage(file);
            if (result.success && result.data) {
                const mediaId = result.data._id || result.data.id;
                setFormData(prev => ({ ...prev, clientProfilePic: mediaId }));
            }
        } catch (err) {
            console.error('Image upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, clientProfilePic: null }));
        setImagePreview(null);
    };

    return (
        <Form>
            <Row>
                <Col md={9}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Label className="fw-bold small">Profile Picture</Form.Label>
                            {imagePreview ? (
                                <div className="position-relative mb-3" style={{ height: '200px' }}>
                                    <Image src={imagePreview} fluid className="w-100 h-100 rounded border" style={{ objectFit: 'cover' }} />
                                    <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                        <Button variant="light" size="sm" className="border" onClick={removeImage} title="Remove">
                                            <FaTrash size={12} />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border bg-light d-flex align-items-center justify-content-center" style={{ height: '200px', cursor: 'pointer', position: 'relative' }}>
                                    <div className="text-center text-muted">
                                        <FaCloudUploadAlt size={32} className="mb-2" />
                                        <p className="mb-0 small">
                                            {uploading ? 'Uploading...' : 'Click to select an image'}
                                        </p>
                                    </div>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        style={{
                                            position: 'absolute', top: 0, left: 0,
                                            width: '100%', height: '100%', opacity: 0, cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Client Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-light"
                            placeholder="e.g. John Doe"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Designation</Form.Label>
                        <Form.Control
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="bg-light"
                            placeholder="e.g. CEO, Acme Corp"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="clientreview"
                            value={formData.clientreview}
                            onChange={handleChange}
                            className="bg-light"
                            placeholder="Client's testimonial text..."
                        />
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Card className="border-0 shadow-sm mb-3">
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Information</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted fw-bold">LAST UPDATE</small>
                                <small>{initialData.updatedAt ? new Date(initialData.updatedAt).toLocaleDateString() : '—'}</small>
                            </div>
                        </Card.Body>
                    </Card>

                    <Alert variant="primary" className="d-flex align-items-center border-0 bg-primary bg-opacity-10 text-primary py-2 mb-3">
                        <span className="me-2 text-primary fw-bold">&bull;</span>
                        <small className="fw-bold">{initialData.id || initialData._id ? 'Editing' : 'Creating new'}</small>
                    </Alert>
                </Col>
            </Row>
        </Form>
    );
};

export default ClientReviewForm;
