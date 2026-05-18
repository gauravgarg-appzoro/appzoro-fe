import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Image, Alert, Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import adminService from '../../../services/admin.service';

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaCog, FaEdit, FaPen, FaTrash } from '../../OptimizedIcons';
const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

const FormField = ({ label, name, type = "text", as, rows, placeholder, value, onChange }) => (
    <div className="mb-4">
        <Form.Label className="fw-bold small mb-2">
            {label}
        </Form.Label>
        <Form.Control
            type={type}
            name={name}
            as={as}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-white"
        />
    </div>
);

const LocationCommonServicesForm = ({ initialData = {}, onChange }) => {
    const [formData, setFormData] = useState({
        lcs_icon: initialData.lcs_icon || null,
        lcs_title: initialData.lcs_title || '',
        lcs_content: initialData.lcs_content || '',
    });

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    const [imagePreviews, setImagePreviews] = useState({
        lcs_icon: initialData.lcs_icon || null,
    });

    const [imageMetadata, setImageMetadata] = useState({});
    const [activeImageField, setActiveImageField] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (fieldName) => {
        setActiveImageField(fieldName);
        setShowModal(true);
    };

    const handleCloseModal = (persist = false) => {
        if (persist && activeImageField) {
            const fileId = formData[activeImageField];
            const meta = imageMetadata?.[activeImageField];
            if (fileId && meta && (meta.alt_text || meta.caption)) {
                adminService.updateFileInfo(fileId, {
                    alternativeText: meta.alt_text || '',
                    caption: meta.caption || '',
                });
            }
        }
        setShowModal(false);
        setActiveImageField(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setImagePreviews(prev => ({
                    ...prev,
                    [fieldName]: result
                }));

                // Calculate metadata
                const sizeString = (file.size / 1024).toFixed(2) + ' KB';
                const extension = file.name.split('.').pop();

                // Get dimensions
                const img = new window.Image();
                img.onload = () => {
                    const dimensions = `${img.naturalWidth} x ${img.naturalHeight}`;
                    setImageMetadata(prev => ({
                        ...prev,
                        [fieldName]: {
                            ...prev[fieldName],
                            filename: file.name,
                            size: sizeString,
                            date: new Date().toLocaleDateString(),
                            extension: extension,
                            dimensions: dimensions
                        }
                    }));
                };
                img.src = result;
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null
        }));
        setImagePreviews(prev => ({
            ...prev,
            [fieldName]: null
        }));
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: { filename: '', alt_text: '', caption: '' }
        }));
    };

    const handleImageMetadataChange = (fieldName, metaField, value) => {
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                [metaField]: value
            }
        }));
    };

    // FormField moved outside
    const ImageUploadField = ({ label, fieldName }) => {
        return (
            <div className="mb-4">
                <Form.Label className="fw-bold small mb-2">
                    {label}
                </Form.Label>
                {imagePreviews[fieldName] ? (
                    <div>
                        <div className="position-relative mb-3" style={{ maxWidth: '100%', height: '200px', backgroundColor: '#343a40' }}>
                            <Image
                                src={imagePreviews[fieldName]}
                                fluid
                                className="h-100 w-100"
                                style={{ objectFit: 'contain' }}
                            />
                            <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={() => handleShowModal(fieldName)}
                                    title="Edit Details"
                                >
                                    <FaPen size={12} />
                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={() => removeImage(fieldName)}
                                    title="Remove"
                                >
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="border bg-dark text-white d-flex align-items-center justify-content-center"
                        style={{
                            height: '200px',
                            cursor: 'pointer',
                            position: 'relative',
                            backgroundColor: '#343a40'
                        }}
                    >
                        <div className="text-center">
                            <FaCloudUploadAlt size={32} className="mb-2 text-secondary" />
                            <p className="mb-0 small text-light">Click to select an asset or<br />drag & drop a file in this area</p>
                        </div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, fieldName)}
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
            </div>
        );
    };

    return (
        <Form>
            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <Row>
                        <Col md={6}>
                            <ImageUploadField label="Lcs_icon" fieldName="lcs_icon" />
                        </Col>
                        <Col md={6}>
                            <FormField
                                label="Lcs_title"
                                name="lcs_title"
                                value={formData.lcs_title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Lcs_content</Form.Label>
                        <RichTextEditor
                            content={formData.lcs_content}
                            onChange={(html) => setFormData(prev => ({ ...prev, lcs_content: html }))}
                            minHeight="300px"
                        />
                        <div className="text-end mt-1">
                            <small className="text-muted" style={{ cursor: 'pointer' }}>Expand ⤢</small>
                        </div>
                    </div>

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

            {/* Image Details Modal */}
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
                                {activeImageField && imagePreviews[activeImageField] && (
                                    <Image
                                        src={imagePreviews[activeImageField]}
                                        fluid
                                        style={{ maxHeight: '350px', maxWidth: '100%' }}
                                    />
                                )}
                                <div className="position-absolute top-0 end-0 p-3">
                                    <Button variant="light" size="sm" className="me-2" onClick={() => removeImage(activeImageField)}><FaTrash /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="bg-white p-4 rounded shadow-sm h-100">
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <small className="text-muted d-block">Size</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.size || 'Calculating...'}</span>
                                    </Col>
                                    <Col xs={6}>
                                        <small className="text-muted d-block">Date</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.date || new Date().toLocaleDateString()}</span>
                                    </Col>
                                    <Col xs={6} className="mt-3">
                                        <small className="text-muted d-block">Dimensions</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.dimensions || '-'}</span>
                                    </Col>
                                    <Col xs={6} className="mt-3">
                                        <small className="text-muted d-block">Extension</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.extension || 'webp'}</span>
                                    </Col>
                                </Row>

                                {activeImageField && (
                                    <>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">File name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.filename || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'filename', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">Alternative text</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.alt_text || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'alt_text', e.target.value)}
                                            />
                                            <Form.Text className="text-muted small">This text will be displayed if the asset can't be shown.</Form.Text>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">Caption</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.caption || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'caption', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
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

export default LocationCommonServicesForm;
