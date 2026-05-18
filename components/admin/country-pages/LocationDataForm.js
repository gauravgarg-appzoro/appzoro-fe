import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Image, Alert, Modal, InputGroup, Spinner } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaTimes, FaPlus, FaCog, FaEdit, FaPen, FaTrash, FaGripVertical, FaSyncAlt } from '../../OptimizedIcons';
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

const LocationDataForm = ({ initialData = {}, onChange }) => {
    const [formData, setFormData] = useState({
        location_title: initialData.location_title || '',
        section1_img: initialData.section1_img || null,
        section1_content: initialData.section1_content || '',
        section2_title: initialData.section2_title || '',
        section2_content: initialData.section2_content || '',
        service: initialData.service || '',
        // SEO Fields
        meta_title: initialData.meta_title || '',
        meta_description: initialData.meta_description || '',
        slug: initialData.slug || '',
        meta_keywords: initialData.meta_keywords || '',
        og_title: initialData.og_title || '',
        og_description: initialData.og_description || '',
        og_image: initialData.og_image || '',
        robots_meta: initialData.robots_meta || 'index, follow',
        schema_code: initialData.schema_code || '',
    });

    // Repeatable sections state (moved to original location below)

    // Repeatable sections
    // Initialize Features with previews
    const [locationsFeatures, setLocationsFeatures] = useState(
        (initialData.locations_features || []).map(f => ({
            ...f,
            preview_url: f.feature_image?.url ? `${STRAPI_IMAGE_BASE_URL}${f.feature_image.url}` : null
        }))
    );
    const [locationFaq, setLocationFaq] = useState(initialData.location_faq || []);

    useEffect(() => {
        if (onChange) {
            onChange({
                ...formData,
                locations_features: locationsFeatures,
                location_faq: locationFaq
            });
        }
    }, [formData, locationsFeatures, locationFaq, onChange]);

    // Image Previews State
    const [imagePreviews, setImagePreviews] = useState({
        section1_img: initialData.section1_img?.url
            ? `${STRAPI_IMAGE_BASE_URL}${initialData.section1_img.url}`
            : null,
    });
    const [uploading, setUploading] = useState(false);

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

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Show preview immediately
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setImagePreviews(prev => ({
                    ...prev,
                    [fieldName]: result
                }));
            };
            reader.readAsDataURL(file);

            // Upload via service
            try {
                setUploading(true);
                const result = await adminService.uploadImage(file);
                if (result.success && result.data) {
                    // Update formData with ID
                    setFormData(prev => ({
                        ...prev,
                        [fieldName]: result.data.id
                    }));
                }
            } catch (error) {
                console.error("Upload failed", error);
            } finally {
                setUploading(false);
            }
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
    };

    const handleImageMetadataChange = (fieldName, metaField, value) => {
        // Metadata editing likely needs specific implementation for ID-based images
        // For now, keeping generic
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                [metaField]: value
            }
        }));
    };

    // Feature handlers
    const addFeature = () => {
        setLocationsFeatures([...locationsFeatures, { feature_title: '', feature_content: '', feature_image: null, preview_url: null }]);
    };

    const removeFeature = (index) => {
        setLocationsFeatures(locationsFeatures.filter((_, i) => i !== index));
    };

    const updateFeature = (index, field, value) => {
        const updated = [...locationsFeatures];
        updated[index][field] = value;
        setLocationsFeatures(updated);
    };

    const handleFeatureImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateFeature(index, 'preview_url', reader.result);
            };
            reader.readAsDataURL(file);

            // Upload via service
            try {
                const result = await adminService.uploadImage(file);
                if (result.success && result.data) {
                    updateFeature(index, 'feature_image', result.data.id);
                }
            } catch (error) {
                console.error("Feature upload failed", error);
            }
        }
    };

    // FAQ handlers
    const addFaq = () => {
        setLocationFaq([...locationFaq, { faq_title: '', faq_content: '' }]);
    };

    const removeFaq = (index) => {
        setLocationFaq(locationFaq.filter((_, i) => i !== index));
    };

    const updateFaq = (index, field, value) => {
        const updated = [...locationFaq];
        updated[index][field] = value;
        setLocationFaq(updated);
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
                    <FormField
                        label="Location_title"
                        name="location_title"
                        value={formData.location_title}
                        onChange={handleChange}
                    />

                    <Row>
                        <Col md={6}>
                            <ImageUploadField label="Section1_img" fieldName="section1_img" />
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Section1_content</Form.Label>
                        <RichTextEditor
                            content={formData.section1_content}
                            onChange={(html) => setFormData(prev => ({ ...prev, section1_content: html }))}
                            minHeight="300px"
                        />
                        <div className="text-end mt-1">
                            <small className="text-muted" style={{ cursor: 'pointer' }}>Expand ⤢</small>
                        </div>
                    </div>

                    <FormField
                        label="Section2_title"
                        name="section2_title"
                        value={formData.section2_title}
                        onChange={handleChange}
                    />

                    <div className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Section2_content</Form.Label>
                        <RichTextEditor
                            content={formData.section2_content}
                            onChange={(html) => setFormData(prev => ({ ...prev, section2_content: html }))}
                            minHeight="300px"
                        />
                        <div className="text-end mt-1">
                            <small className="text-muted" style={{ cursor: 'pointer' }}>Expand ⤢</small>
                        </div>
                    </div>

                    {/* Locations Features Section */}
                    <div className="mb-5">
                        <h6 className="fw-bold mb-3">Locations_features ({locationsFeatures.length})</h6>
                        {locationsFeatures.map((feature, index) => (
                            <Card key={index} className="mb-3 border shadow-sm">
                                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <FaGripVertical className="text-secondary me-2" />
                                        <span className="small fw-bold">Feature {index + 1}</span>
                                    </div>
                                    <div>
                                        <Button variant="link" size="sm" className="text-primary p-0 me-2">
                                            <FaGripVertical />
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="text-danger p-0"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Feature_title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={feature.feature_title}
                                            onChange={(e) => updateFeature(index, 'feature_title', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Feature_content</Form.Label>
                                        <RichTextEditor
                                            content={feature.feature_content}
                                            onChange={(html) => updateFeature(index, 'feature_content', html)}
                                            minHeight="200px"
                                        />
                                        <div className="text-end mt-1">
                                            <small className="text-muted" style={{ cursor: 'pointer' }}>Expand ⤢</small>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Feature_image</Form.Label>
                                        {feature.preview_url ? (
                                            <div className="position-relative" style={{ maxWidth: '300px', height: '150px', backgroundColor: '#343a40' }}>
                                                <Image
                                                    src={feature.preview_url}
                                                    fluid
                                                    className="h-100 w-100"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="position-absolute top-0 end-0 m-2"
                                                    onClick={() => {
                                                        updateFeature(index, 'feature_image', null);
                                                        updateFeature(index, 'preview_url', null);
                                                    }}
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div
                                                className="border bg-dark text-white d-flex align-items-center justify-content-center"
                                                style={{ height: '150px', cursor: 'pointer', position: 'relative', maxWidth: '300px' }}
                                            >
                                                <div className="text-center">
                                                    <FaCloudUploadAlt size={24} className="mb-2 text-secondary" />
                                                    <p className="mb-0 small text-light">Click to select an asset or<br />drag & drop a file in this area</p>
                                                </div>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFeatureImageUpload(e, index)}
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
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        ))}

                        {locationsFeatures.length === 0 && (
                            <div className="text-center py-4 border rounded bg-light mb-3">
                                <p className="text-secondary mb-0 small">No entry yet. Click on the button below to add one.</p>
                            </div>
                        )}

                        <Button
                            variant="link"
                            className="text-primary text-decoration-none p-0"
                            onClick={addFeature}
                        >
                            <FaPlus className="me-2" size={12} /> ADD NEW ENTRY
                        </Button>
                    </div>

                    {/* Location FAQ Section */}
                    <div className="mb-5">
                        <h6 className="fw-bold mb-3">Location_faq ({locationFaq.length})</h6>
                        {locationFaq.map((faq, index) => (
                            <Card key={index} className="mb-3 border shadow-sm">
                                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <FaGripVertical className="text-secondary me-2" />
                                        <span className="small fw-bold">FAQ {index + 1}</span>
                                    </div>
                                    <div>
                                        <Button variant="link" size="sm" className="text-primary p-0 me-2">
                                            <FaGripVertical />
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="text-danger p-0"
                                            onClick={() => removeFaq(index)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Faq_title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={faq.faq_title}
                                            onChange={(e) => updateFaq(index, 'faq_title', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Faq_content</Form.Label>
                                        <RichTextEditor
                                            content={faq.faq_content}
                                            onChange={(html) => updateFaq(index, 'faq_content', html)}
                                            minHeight="200px"
                                        />
                                        <div className="text-end mt-1">
                                            <small className="text-muted" style={{ cursor: 'pointer' }}>Expand ⤢</small>
                                        </div>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        ))}

                        {locationFaq.length === 0 && (
                            <div className="text-center py-4 border rounded bg-light mb-3">
                                <p className="text-secondary mb-0 small">No entry yet. Click on the button below to add one.</p>
                            </div>
                        )}

                        <Button
                            variant="link"
                            className="text-primary text-decoration-none p-0"
                            onClick={addFaq}
                        >
                            <FaPlus className="me-2" size={12} /> ADD NEW ENTRY
                        </Button>
                    </div>

                    {/* SEO Settings */}
                    <h6 className="fw-bold mb-3 mt-5">SEO Settings</h6>

                    <FormField
                        label="Meta Title"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder="SEO optimized title (50-60 characters)"
                    />
                    <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                        {formData.meta_title.length}/60 characters
                    </Form.Text>

                    <FormField
                        label="Meta Description"
                        name="meta_description"
                        as="textarea"
                        rows={3}
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder="Brief description for search results (150-160 characters)"
                    />
                    <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                        {formData.meta_description.length}/160 characters
                    </Form.Text>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Slug</Form.Label>
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

                    <FormField
                        label="Meta Keywords"
                        name="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                        placeholder="keyword1, keyword2, keyword3"
                    />

                    <FormField
                        label="OG Title"
                        name="og_title"
                        value={formData.og_title}
                        onChange={handleChange}
                        placeholder="Open Graph title for social media sharing"
                    />

                    <FormField
                        label="OG Description"
                        name="og_description"
                        as="textarea"
                        rows={2}
                        value={formData.og_description}
                        onChange={handleChange}
                        placeholder="Open Graph description for social media sharing"
                    />

                    <FormField
                        label="OG Image URL"
                        name="og_image"
                        value={formData.og_image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />

                    <FormField
                        label="Robots Meta Tag"
                        name="robots_meta"
                        value={formData.robots_meta}
                        onChange={handleChange}
                        placeholder="index, follow"
                    />

                    <FormField
                        label="Schema Code"
                        name="schema_code"
                        as="textarea"
                        rows={6}
                        value={formData.schema_code}
                        onChange={handleChange}
                        placeholder='<script type="application/ld+json">{...}</script>'
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

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold small mb-2">Service</Form.Label>
                        <Form.Select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="bg-white"
                        >
                            <option value="">Add an item...</option>
                            <option value="web-development">Web Development</option>
                            <option value="mobile-app">Mobile App Development</option>
                            <option value="cloud-solutions">Cloud Solutions</option>
                        </Form.Select>
                    </Form.Group>

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

export default LocationDataForm;
