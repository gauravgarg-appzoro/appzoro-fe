import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert, Image, Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaSave, FaCloudUploadAlt, FaTimes, FaCog, FaEdit, FaTrashAlt, FaPen, FaTrash } from '../../OptimizedIcons';

const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

const PressForm = ({ initialData = {}, onChange }) => {
    const [formData, setFormData] = useState({
        title: '',
        PressDate: '',
        link: '',
        description: '',
        image: null,
        imageFileName: '',
        imageAltText: '',
        imageCaption: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (!initialData || Object.keys(initialData).length === 0) return;
        const title = initialData.PressTitle ?? initialData.title ?? '';
        const link = initialData.PressUrl ?? initialData.link ?? '';
        const description = initialData.PressDescription ?? initialData.description ?? '';
        const pressDate = initialData.PressDate ?? '';
        const img = Array.isArray(initialData.PressImage) && initialData.PressImage[0]
            ? initialData.PressImage[0]
            : initialData.PressImage && typeof initialData.PressImage === 'object'
                ? initialData.PressImage
                : null;
        const base = (STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '');
        const imagePreviewUrl = initialData.imagePreviewUrl
            || (img?.url ? (img.url.startsWith('http') ? img.url : `${base}${img.url.startsWith('/') ? img.url : `/${img.url}`}`) : null);
        setFormData(prev => ({
            ...prev,
            title,
            PressDate: pressDate,
            link,
            description,
            imageFileName: img?.name ?? initialData.imageFileName ?? prev.imageFileName,
            imageAltText: img?.alternativeText ?? initialData.imageAltText ?? prev.imageAltText,
            imageCaption: img?.caption ?? initialData.imageCaption ?? prev.imageCaption,
        }));
        setImagePreview(imagePreviewUrl || (img?.url ? img.url : null));
    }, [initialData]);

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = (persist = false) => {
        if (persist) {
            const fileId = formData.image;
            const meta = { alt_text: formData.imageAltText, caption: formData.imageCaption };
            if (fileId && (typeof fileId === 'number' || typeof fileId === 'string') && (meta.alt_text || meta.caption)) {
                adminService.updateFileInfo(fileId, {
                    alternativeText: meta.alt_text || '',
                    caption: meta.caption || '',
                });
            }
        }
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file,
                imageFileName: file.name
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imageFileName: '',
            imageAltText: '',
            imageCaption: ''
        }));
        setImagePreview(null);
    };

    return (
        <Form>
            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Label className="fw-bold small">PressImage</Form.Label>
                            {imagePreview ? (
                                <div className="position-relative mb-3" style={{ height: '200px' }}>
                                    <Image src={imagePreview} fluid className="w-100 h-100 rounded border" style={{ objectFit: 'cover' }} />
                                    <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            className="border"
                                            onClick={handleShowModal}
                                            title="Edit Details"
                                        >
                                            <FaPen size={12} />
                                        </Button>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            className="border"
                                            onClick={removeImage}
                                            title="Remove"
                                        >
                                            <FaTrash size={12} />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="border bg-light d-flex align-items-center justify-content-center" style={{ height: '200px', cursor: 'pointer', position: 'relative' }}>
                                    <div className="text-center text-muted">
                                        <FaCloudUploadAlt size={32} className="mb-2" />
                                        <p className="mb-0 small">Click to select an asset or drag & drop a file in this area</p>
                                    </div>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">PressDate</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="PressDate"
                                    value={formData.PressDate}
                                    onChange={handleChange}
                                    className="bg-light"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">PressTitle</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="bg-light"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">PressDescription</Form.Label>
                        <RichTextEditor
                            content={formData.description}
                            onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                            minHeight="300px"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small">PressUrl</Form.Label>
                        <Form.Control
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="bg-light"
                        />
                    </Form.Group>
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

            <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="h6 text-secondary">
                        <small>Selected files &gt; Details</small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 bg-light">
                    <Row>
                        <Col md={6}>
                            <div className="bg-dark rounded d-flex align-items-center justify-content-center mb-3" style={{ height: '400px', position: 'relative' }}>
                                {imagePreview && (
                                    <Image
                                        src={imagePreview}
                                        fluid
                                        style={{ maxHeight: '350px', maxWidth: '100%' }}
                                    />
                                )}
                                <div className="position-absolute top-0 end-0 p-3">
                                    <Button variant="light" size="sm" className="me-2" onClick={removeImage}><FaTrash /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="bg-white p-4 rounded shadow-sm h-100">
                                <Row className="mb-4">
                                    <Col xs={6}><small className="text-muted d-block">Size</small><span className="small fw-bold">Calculating...</span></Col>
                                    <Col xs={6}><small className="text-muted d-block">Date</small><span className="small fw-bold">{new Date().toLocaleDateString()}</span></Col>
                                    <Col xs={6} className="mt-3"><small className="text-muted d-block">Dimensions</small><span className="small fw-bold">-</span></Col>
                                    <Col xs={6} className="mt-3"><small className="text-muted d-block">Extension</small><span className="small fw-bold">webp</span></Col>
                                </Row>

                                <div className="mb-3">
                                    <Form.Label className="small fw-bold">File name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imageFileName"
                                        value={formData.imageFileName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="small fw-bold">Alt Text</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imageAltText"
                                        value={formData.imageAltText}
                                        onChange={handleChange}
                                    />
                                    <Form.Text className="text-muted small">This text will be displayed if the asset can't be shown.</Form.Text>
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="small fw-bold">Caption</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="imageCaption"
                                        value={formData.imageCaption}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => handleCloseModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="bg-success border-success" onClick={() => handleCloseModal(true)}>
                        Finish
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default PressForm;
