import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Image, Alert, InputGroup, Modal, Spinner } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { required, slugFormat, slugify } from '../../../lib/validation';

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaTimes, FaSyncAlt, FaCog, FaEdit, FaPen, FaCheck, FaTrash, FaExternalLinkAlt, FaSave } from '../../OptimizedIcons';
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

const ImageUploadField = ({ label, fieldName, imagePreviews, handleShowModal, removeImage, handleImageUpload }) => (
    <div className="mb-4">
        <Form.Label className="fw-bold small mb-2">
            {label}
        </Form.Label>
        {imagePreviews[fieldName] ? (
            <div>
                <div className="position-relative mb-3" style={{ maxWidth: '100%', height: '200px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
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
                            className="border shadow-sm"
                            onClick={() => handleShowModal(fieldName)}
                            title="Edit Details"
                        >
                            <FaPen size={12} />
                        </Button>
                        <Button
                            variant="light"
                            size="sm"
                            className="border shadow-sm"
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
                className="border bg-light d-flex align-items-center justify-content-center rounded"
                style={{
                    height: '200px',
                    cursor: 'pointer',
                    position: 'relative',
                    borderStyle: 'dashed !important'
                }}
            >
                <div className="text-center text-secondary">
                    <FaCloudUploadAlt size={32} className="mb-2" />
                    <p className="mb-0 small">Click to select an asset or<br />drag & drop a file in this area</p>
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

const CountryPageForm = ({ initialData = {}, onSubmit, saving = false }) => {
    // Helper to extract image ID
    const getImageId = (img) => (img && img._id ? img._id : img);

    const [formData, setFormData] = useState({
        title: initialData.title || '',
        slug: initialData.slug || initialData.SeoTitle || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',

        // Services
        ServicesFixedHeading: initialData.ServicesFixedHeading || '',
        ServicesDescription: initialData.ServicesDescription || '',

        Services1Title: initialData.Services1Title || '',
        Services1Image: getImageId(initialData.Services1Image) || null,
        Services1Des: initialData.Services1Des || '',

        Services2Title: initialData.Services2Title || '',
        Services2Image: getImageId(initialData.Services2Image) || null,
        Services2Des: initialData.Services2Des || '',

        Services3Title: initialData.Services3Title || '',
        Services3Image: getImageId(initialData.Services3Image) || null,
        Services3Des: initialData.Services3Des || '',

        SubDescription: initialData.SubDescription || '',

        // SEO (SeoTitle = SEO slug/title; when editing, show slug here if no SeoTitle)
        SeoTitle: initialData.SeoTitle || initialData.slug || '',
        SeoDescription: initialData.SeoDescription || '',
        status: initialData.status || (initialData.published_at ? 'published' : 'draft'),
    });

    // Initialize previews
    const getPreview = (img) => {
        if (!img) return null;
        if (img.url) return `${STRAPI_IMAGE_BASE_URL}${img.url}`;
        return null; // If it's just an ID, we can't show preview easily without fetching, but usually initialData has populated objects
    };

    const [imagePreviews, setImagePreviews] = useState({
        Services1Image: getPreview(initialData.Services1Image),
        Services2Image: getPreview(initialData.Services2Image),
        Services3Image: getPreview(initialData.Services3Image),
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

    const handleImageMetadataChange = (fieldName, metaField, value) => {
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                [metaField]: value
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (field, html) => {
        setFormData(prev => ({ ...prev, [field]: html }));
    };

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Show local preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews(prev => ({
                ...prev,
                [fieldName]: reader.result
            }));
        };
        reader.readAsDataURL(file);

        // 2. Upload to server
        try {
            const result = await adminService.uploadImage(file);
            if (result.success && result.data) {
                setFormData(prev => ({
                    ...prev,
                    [fieldName]: result.data.id // Store ID
                }));
                toast.success(`${fieldName} uploaded successfully`);

                // Update metadata (simplified)
                setImageMetadata(prev => ({
                    ...prev,
                    [fieldName]: {
                        filename: result.data.name,
                        size: result.data.size + 'KB',
                        date: new Date().toLocaleDateString(),
                        extension: result.data.ext
                    }
                }));

            } else {
                toast.error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Image upload error');
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

    const handleSubmit = (isDraft = false) => {
        const titleErr = required(formData.title, 'Title');
        if (titleErr) {
            toast.error(titleErr);
            return;
        }
        let slug = (formData.slug || '').trim();
        if (!slug && (formData.SeoTitle || formData.title || '').trim()) {
            slug = slugify(formData.SeoTitle || formData.title, 'page');
        }
        const slugErr = slug ? slugFormat(slug, 'Slug') : required(slug, 'Slug');
        if (slugErr) {
            toast.error(slugErr);
            return;
        }
        if (onSubmit) {
            onSubmit({ ...formData, slug }, isDraft);
        }
    };

    return (
        <Form>
            <div className="d-flex justify-content-end gap-2 mb-3 sticky-top bg-white p-2 border-bottom" style={{ zIndex: 100 }}>
                <Button variant="outline-secondary" onClick={() => handleSubmit(true)} disabled={saving}>
                    {saving ? <Spinner size="sm" className="me-2" /> : <FaSave className="me-2" />}
                    Save Draft
                </Button>
                <Button variant="primary" onClick={() => handleSubmit(false)} disabled={saving}>
                    {saving ? <Spinner size="sm" className="me-2" /> : <FaSave className="me-2" />}
                    {initialData?.id || initialData?._id ? 'Update' : 'Save & Publish'}
                </Button>
            </div>

            <Row>
                {/* Main Content Column */}
                <Col md={9}>
                    <div className="mb-4">
                        <FormField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <FormField
                        label="Subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />

                    <div className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Description</Form.Label>
                        <RichTextEditor
                            content={formData.description}
                            onChange={(html) => handleEditorChange('description', html)}
                            minHeight="300px"
                        />
                    </div>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="bg-white"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </Form.Select>
                    </Form.Group>

                    <br />
                    <h5 className="fw-bold mb-3">Services Section</h5>

                    <FormField
                        label="ServicesFixedHeading"
                        name="ServicesFixedHeading"
                        value={formData.ServicesFixedHeading}
                        onChange={handleChange}
                    />

                    <div className="mb-5">
                        <Form.Label className="fw-bold small mb-2">ServicesDescription</Form.Label>
                        <RichTextEditor
                            content={formData.ServicesDescription}
                            onChange={(html) => handleEditorChange('ServicesDescription', html)}
                            minHeight="200px"
                        />
                    </div>

                    {/* Service 1 */}
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Body>
                            <h6 className="fw-bold mb-3 text-primary">Service 1</h6>
                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="Title"
                                        name="Services1Title"
                                        value={formData.Services1Title}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField
                                        label="Image"
                                        fieldName="Services1Image"
                                        imagePreviews={imagePreviews}
                                        handleShowModal={handleShowModal}
                                        removeImage={removeImage}
                                        handleImageUpload={handleImageUpload}
                                    />
                                </Col>
                            </Row>

                            <div className="mb-2">
                                <Form.Label className="fw-bold small mb-2">Description</Form.Label>
                                <RichTextEditor
                                    content={formData.Services1Des}
                                    onChange={(html) => handleEditorChange('Services1Des', html)}
                                    minHeight="200px"
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Service 2 */}
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Body>
                            <h6 className="fw-bold mb-3 text-primary">Service 2</h6>
                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="Title"
                                        name="Services2Title"
                                        value={formData.Services2Title}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField
                                        label="Image"
                                        fieldName="Services2Image"
                                        imagePreviews={imagePreviews}
                                        handleShowModal={handleShowModal}
                                        removeImage={removeImage}
                                        handleImageUpload={handleImageUpload}
                                    />
                                </Col>
                            </Row>

                            <div className="mb-2">
                                <Form.Label className="fw-bold small mb-2">Description</Form.Label>
                                <RichTextEditor
                                    content={formData.Services2Des}
                                    onChange={(html) => handleEditorChange('Services2Des', html)}
                                    minHeight="200px"
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Service 3 */}
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Body>
                            <h6 className="fw-bold mb-3 text-primary">Service 3</h6>
                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="Title"
                                        name="Services3Title"
                                        value={formData.Services3Title}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField
                                        label="Image"
                                        fieldName="Services3Image"
                                        imagePreviews={imagePreviews}
                                        handleShowModal={handleShowModal}
                                        removeImage={removeImage}
                                        handleImageUpload={handleImageUpload}
                                    />
                                </Col>
                            </Row>

                            <div className="mb-2">
                                <Form.Label className="fw-bold small mb-2">Description</Form.Label>
                                <RichTextEditor
                                    content={formData.Services3Des}
                                    onChange={(html) => handleEditorChange('Services3Des', html)}
                                    minHeight="200px"
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="mb-5">
                        <Form.Label className="fw-bold small mb-2">SubDescription (Bottom)</Form.Label>
                        <RichTextEditor
                            content={formData.SubDescription}
                            onChange={(html) => handleEditorChange('SubDescription', html)}
                            minHeight="150px"
                        />
                    </div>

                    {/* SEO Settings */}
                    <h6 className="fw-bold mb-3 mt-4">SEO Settings</h6>

                    <FormField
                        label="Meta Title"
                        name="SeoTitle"
                        value={formData.SeoTitle}
                        onChange={handleChange}
                        placeholder="SEO optimized title"
                    />

                    <FormField
                        label="Meta Description"
                        name="SeoDescription"
                        as="textarea"
                        rows={3}
                        value={formData.SeoDescription}
                        onChange={handleChange}
                        placeholder="Brief description for search results"
                    />

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small mb-2">Slug</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </InputGroup>
                    </Form.Group>

                </Col>

                {/* Sidebar Column */}
                <Col md={3}>
                    <Card className="border-0 shadow-sm mb-3 position-sticky" style={{ top: '80px' }}>
                        <Card.Body>
                            <h6 className="fw-bold mb-3">Quick Actions</h6>
                            <div className="d-grid gap-2">
                                <Button variant="primary" onClick={handleSubmit} disabled={saving}>
                                    {saving ? <Spinner size="sm" /> : 'Save'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Image Details Modal */}
            <Modal show={showModal} onHide={() => handleCloseModal(false)} size="xl" centered>
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
                                {activeImageField && (
                                    <>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">Alternative text</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.alt_text || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'alt_text', e.target.value)}
                                            />
                                            <Form.Text className="text-muted small">This text will be displayed if the asset can&apos;t be shown.</Form.Text>
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
                    <Button variant="outline-secondary" onClick={() => handleCloseModal(false)}>Close</Button>
                    <Button variant="primary" className="bg-success border-success" onClick={() => handleCloseModal(true)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default CountryPageForm;
