import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Row, Col, Image, Collapse, Modal, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { required, slugFormat, slugify } from '../../../lib/validation';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';
import autoSeedBlocks from '../../../components/page-builder/autoSeedBlocks';
import { AdminFormPageHeader, AdminCard, FormField } from '../../../components/admin/ui';
import {   FaCloudUploadAlt, FaTimes, FaPlus, FaTrash, FaChevronDown, FaChevronRight, FaPen   } from '../../../components/OptimizedIcons';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/common/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading Editor...</p> }
);
const PageBuilder = dynamic(
    () => import('../../../components/admin/PageBuilder'),
    { ssr: false }
);

const IndustryEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        Title: '',
        slug: '',
        IndustyShortDescription: '', // Typo in backend: Industy
        bannerShortDescription: '',
        industryDetailContent: '',
        whyChooseIndustryTitle: '',
        whyChooseIndustryDescription: '',
        industryFeatures: [], // Array of { featuresTitle, featuresDescription }
        seoTitle: '',
        seoDescription: '',
        pageBlocks: [],
        published_at: null,
        IndImage: null,
        banner_image: null,
        industryIcon: null,
        industryCTAImage: null
    });

    const [imagePreviews, setImagePreviews] = useState({});
    const [collapsedItems, setCollapsedItems] = useState({});
    const [imageMetadata, setImageMetadata] = useState({});
    const [activeImageField, setActiveImageField] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPageBuilderModal, setShowPageBuilderModal] = useState(false);

    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await adminService.getIndustry(id);
                const data = result && result.data ? result.data : result;

                if (data) {
                    setFormData({
                        Title: data.Title || '',
                        slug: data.slug || data.seoTitle || '',
                        IndustyShortDescription: data.IndustyShortDescription || '',
                        bannerShortDescription: data.bannerShortDescription || '',
                        industryDetailContent: data.industryDetailContent || '',
                        whyChooseIndustryTitle: data.whyChooseIndustryTitle || '',
                        whyChooseIndustryDescription: data.whyChooseIndustryDescription || '',
                        industryFeatures: Array.isArray(data.industryFeatures) ? data.industryFeatures : [],
                        pageBlocks: Array.isArray(data.pageBlocks) ? data.pageBlocks : [],
                        seoTitle: data.seoTitle || data.slug || '',
                        seoDescription: data.seoDescription || '',
                        published_at: data.published_at || null,
                        IndImage: data.IndImage ? (data.IndImage._id || data.IndImage.id) : null,
                        banner_image: data.banner_image ? (data.banner_image._id || data.banner_image.id) : null,
                        industryIcon: data.industryIcon ? (data.industryIcon._id || data.industryIcon.id) : null,
                        industryCTAImage: data.industryCTAImage ? (data.industryCTAImage._id || data.industryCTAImage.id) : null
                    });

                    // Auto-seed pageBlocks from existing data if empty
                    if (!data.pageBlocks || !Array.isArray(data.pageBlocks) || data.pageBlocks.length === 0) {
                        const seeded = autoSeedBlocks('industry', data);
                        if (seeded.length > 0) {
                            setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                        }
                    }

                    // Set previews
                    const newPreviews = {};
                    if (data.IndImage?.url) newPreviews.IndImage = `${STRAPI_IMAGE_BASE_URL}${data.IndImage.url}`;
                    if (data.banner_image?.url) newPreviews.banner_image = `${STRAPI_IMAGE_BASE_URL}${data.banner_image.url}`;
                    if (data.industryIcon?.url) newPreviews.industryIcon = `${STRAPI_IMAGE_BASE_URL}${data.industryIcon.url}`;
                    if (data.industryCTAImage?.url) newPreviews.industryCTAImage = `${STRAPI_IMAGE_BASE_URL}${data.industryCTAImage.url}`;
                    setImagePreviews(newPreviews);
                }
            } catch (err) {
                toast.error('Failed to load industry data');
                console.error(err);
            }
            setLoading(false);
        };

        fetchData();
    }, [id, isNew]);

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

    const handleModalMetadataChange = (e) => {
        const { name, value } = e.target;
        setImageMetadata(prev => ({
            ...prev,
            [activeImageField]: {
                ...prev[activeImageField],
                [name]: value
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setImagePreviews(prev => ({ ...prev, [fieldName]: result }));
        };
        reader.readAsDataURL(file);

        // Upload
        const uploadResult = await adminService.uploadImage(file);
        if (uploadResult.success && uploadResult.data) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: uploadResult.data.id || uploadResult.data._id
            }));
            toast.success('Image uploaded');
        } else {
            toast.error('Image upload failed');
        }
    };

    const removeImage = (fieldName) => {
        setFormData(prev => ({ ...prev, [fieldName]: null }));
        setImagePreviews(prev => ({ ...prev, [fieldName]: null }));
    };

    const toggleCollapse = (listName, index) => {
        const key = `${listName}-${index}`;
        setCollapsedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            industryFeatures: [...prev.industryFeatures, { featuresTitle: '', featuresDescription: '' }]
        }));
    };

    const updateFeature = (index, field, value) => {
        const updated = [...formData.industryFeatures];
        updated[index] = { ...updated[index], [field]: value };
        setFormData(prev => ({ ...prev, industryFeatures: updated }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            industryFeatures: prev.industryFeatures.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e, isDraft = false) => {
        if (e && e.preventDefault) e.preventDefault();
        const titleErr = required(formData.Title, 'Title');
        if (titleErr) { toast.error(titleErr); return; }
        let slug = (formData.slug || '').trim();
        if (!slug && (formData.seoTitle || '').trim()) slug = slugify(formData.seoTitle, '');
        if (!slug && formData.Title?.trim()) slug = slugify(formData.Title, 'industry');
        const slugErr = slug ? slugFormat(slug, 'Slug') : required(slug, 'Slug');
        if (slugErr) { toast.error(slugErr); return; }
        setSaving(true);
        try {
            const published_at = isDraft ? '' : (formData.published_at || new Date().toISOString());
            const payload = {
                ...formData,
                slug,
                published_at,
                // Always persist current Page Builder state.
                pageBlocks: Array.isArray(formData.pageBlocks) ? formData.pageBlocks : [],
            };
            const result = isNew
                ? await adminService.createIndustry(payload)
                : await adminService.updateIndustry(id, payload);
            const ok = await handleSaveSuccess({
                result,
                isCreate: isNew,
                isDraft,
                listPath: '/admin/industries',
                editPathPrefix: '/admin/industry/',
                toast,
                router,
                entityName: 'Industry',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'An error occurred while saving');
            setSaving(false);
        }
    };

    const ImageUploadField = ({ label, fieldName }) => {
        return (
            <div className="mb-4">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
                {imagePreviews[fieldName] ? (
                    <div className="position-relative mb-3" style={{ maxWidth: '100%', height: '200px' }}>
                        <Image src={imagePreviews[fieldName]} fluid className="border w-100 h-100" style={{ objectFit: 'cover' }} />
                        <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                            <Button variant="light" size="sm" className="border" onClick={() => handleShowModal(fieldName)} title="Edit Details">
                                <FaPen size={12} />
                            </Button>
                            <Button variant="light" size="sm" className="border" onClick={() => removeImage(fieldName)} title="Remove">
                                <FaTrash size={12} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border bg-dark d-flex align-items-center justify-content-center" style={{ height: '150px', cursor: 'pointer', position: 'relative', backgroundColor: '#343a40' }}>
                        <div className="text-center text-secondary">
                            <FaCloudUploadAlt size={32} className="mb-2" />
                            <p className="mb-0 small">Click to select an asset</p>
                        </div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, fieldName)}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                        />
                    </div>
                )}
            </div>
        );
    };

    if (loading) return <AdminLayout title="Loading..."><Spinner animation="border" /></AdminLayout>;

    return (
        <AdminLayout title={isNew ? 'Create Industry Page' : 'Edit Industry Page'}>
            <AdminFormPageHeader
                backHref="/admin/industries"
                title={isNew ? 'Create Industry Page' : 'Edit Industry Page'}
                subtitle="API ID : induustries"
                isNew={isNew}
                showDraftPublish={false}
                isDraft={!formData.published_at}
                saving={saving}
                onSaveDraft={() => handleSubmit(null, true)}
                onSavePrimary={() => handleSubmit(null, false)}
                primaryLabel={isNew ? 'Publish' : 'Update'}
            />

            <Row>
                <Col lg={9}>
                    <AdminCard>
                            <Row>
                                <Col md={6}>
                                    <FormField label="Title" name="Title" value={formData.Title} onChange={handleChange} />
                                </Col>
                                <Col md={6}>
                                    <FormField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                                </Col>
                            </Row>

                            <FormField label="Short Description (IndustyShortDescription)" name="IndustyShortDescription" as="textarea" rows={3} value={formData.IndustyShortDescription} onChange={handleChange} />

                            <FormField label="Banner Short Description" name="bannerShortDescription" as="textarea" rows={2} value={formData.bannerShortDescription} onChange={handleChange} />

                            <Row className="mb-4">
                                <Col md={6}>
                                    <ImageUploadField label="Banner Image" fieldName="banner_image" />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField label="List Image (IndImage)" fieldName="IndImage" />
                                </Col>
                            </Row>

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>Industry Detail Content</Form.Label>
                                <RichTextEditor content={formData.industryDetailContent} onChange={(html) => setFormData(prev => ({ ...prev, industryDetailContent: html }))} />
                            </div>

                            <Row className="mb-4">
                                <Col md={12}>
                                    <FormField label="Why Choose Us Title" name="whyChooseIndustryTitle" value={formData.whyChooseIndustryTitle} onChange={handleChange} />
                                </Col>
                                <Col md={12}>
                                    <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>Why Choose Us Description</Form.Label>
                                    <RichTextEditor content={formData.whyChooseIndustryDescription} onChange={(html) => setFormData(prev => ({ ...prev, whyChooseIndustryDescription: html }))} />
                                </Col>
                            </Row>

                            {/* Features Section */}
                            <div className="mb-4 p-3 bg-light rounded">
                                <Form.Label className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                                    Industry Features ({formData.industryFeatures.length})
                                    <Button variant="outline-primary" size="sm" onClick={addFeature}><FaPlus size={10} className="me-1" /> Add feature</Button>
                                </Form.Label>
                                {formData.industryFeatures.map((item, idx) => (
                                    <div key={idx} className="mb-3 bg-white border rounded">
                                        <div className="d-flex align-items-center justify-content-between p-2 border-bottom" style={{ cursor: 'pointer' }} onClick={() => toggleCollapse('features', idx)}>
                                            <div className="d-flex align-items-center gap-2">
                                                {collapsedItems[`features-${idx}`] ? <FaChevronRight size={10} /> : <FaChevronDown size={10} />}
                                                <span className="small fw-bold">{item.featuresTitle || `Feature ${idx + 1}`}</span>
                                            </div>
                                            <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeFeature(idx); }}><FaTrash size={12} /></Button>
                                        </div>
                                        <Collapse in={!collapsedItems[`features-${idx}`]}>
                                            <div className="p-3">
                                                <FormField label="Feature Title" value={item.featuresTitle} onChange={(e) => updateFeature(idx, 'featuresTitle', e.target.value)} />
                                                <div>
                                                    <Form.Label className="small mb-1">Feature Description (MD)</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        value={item.featuresDescription}
                                                        onChange={(e) => updateFeature(idx, 'featuresDescription', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}
                            </div>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <ImageUploadField label="Industry Icon" fieldName="industryIcon" />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField label="Industry CTA Image" fieldName="industryCTAImage" />
                                </Col>
                            </Row>

                            <hr className="my-4" />
                            <h5 className="fw-bold mb-3">SEO Details</h5>
                            <FormField label="SEO Title" name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
                            <FormField label="SEO Description" name="seoDescription" as="textarea" rows={3} value={formData.seoDescription} onChange={handleChange} />

                    </AdminCard>
                </Col>

                <Col lg={3}>
                    <AdminCard title="Information" bodyClassName="p-3" className="sticky-top" style={{ top: '20px' }}>
                        <div className="small mb-3">
                            <div className="text-muted mb-1">Status</div>
                            <div className="fw-bold">{formData.published_at ? 'Published' : 'Draft'}</div>
                        </div>
                        <Button variant="outline-secondary" className="w-100 mb-2" onClick={() => handleSubmit(null, true)} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Draft'}
                        </Button>
                        <Button variant="primary" className="w-100 mb-2" onClick={() => handleSubmit(null, false)} disabled={saving}>
                            {saving ? 'Saving...' : (isNew ? 'Publish' : 'Update')}
                        </Button>
                        <Button variant="outline-primary" className="w-100" onClick={() => setShowPageBuilderModal(true)}>
                            Open Page Builder
                        </Button>
                        <Button
                            variant="outline-dark"
                            className="w-100 mt-2"
                            disabled={!formData.slug}
                            onClick={() => window.open(`/industry/${formData.slug}`, '_blank', 'noopener,noreferrer')}
                        >
                            Preview
                        </Button>
                    </AdminCard>
                </Col>
            </Row>

            <Modal show={showPageBuilderModal} onHide={() => setShowPageBuilderModal(false)} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="h6 mb-0">Page Builder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted small mb-3">
                        Reorder existing sections, remove blocks, or add new blocks.
                    </p>
                    <Button variant="outline-secondary" size="sm" className="mb-3" onClick={() => {
                        if (window.confirm('This will replace current page blocks with auto-generated ones from existing data. Continue?')) {
                            const seeded = autoSeedBlocks('industry', formData);
                            setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                        }
                    }}>
                        Re-generate blocks from existing data
                    </Button>
                    <PageBuilder
                        blocks={formData.pageBlocks}
                        onChange={(newBlocks) => setFormData(prev => ({ ...prev, pageBlocks: newBlocks }))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowPageBuilderModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Image Detail Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="h6">Asset Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    {activeImageField && imagePreviews[activeImageField] && (
                        <Row>
                            <Col md={6} className="text-center">
                                <Image src={imagePreviews[activeImageField]} fluid className="rounded shadow-sm" style={{ maxHeight: '300px' }} />
                            </Col>
                            <Col md={6}>
                                <div className="bg-white p-3 rounded h-100">
                                    <FormField
                                        label="Alternative Text"
                                        name="alt_text"
                                        value={imageMetadata[activeImageField]?.alt_text || ''}
                                        onChange={handleModalMetadataChange}
                                    />
                                    <FormField
                                        label="Caption"
                                        name="caption"
                                        as="textarea"
                                        rows={2}
                                        value={imageMetadata[activeImageField]?.caption || ''}
                                        onChange={handleModalMetadataChange}
                                    />
                                </div>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => handleCloseModal(false)}>Close</Button>
                    <Button variant="primary" className="bg-success border-success" onClick={() => handleCloseModal(true)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default IndustryEdit;
