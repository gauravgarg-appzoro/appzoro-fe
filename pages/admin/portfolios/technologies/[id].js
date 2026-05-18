import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Spinner, Card, Image, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../../lib/constants';

// Dynamic import for RichTextEditor
import {   FaArrowLeft, FaSave, FaCloudUploadAlt, FaTrash   } from '../../../../components/OptimizedIcons';
const RichTextEditor = dynamic(
    () => import('../../../../components/admin/common/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading Editor...</p> }
);

const TechnologyEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        techTitle: '',
        slug: '',
        techShortDescription: '',
        techOverview: '',
        techBanner: [], // Array of IDs
        seo_title: '',
        seo_description: ''
    });
    const [bannerPreview, setBannerPreview] = useState(null);

    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await adminService.getTechnology(id);
                const data = result.success ? result.data : null;
                if (data) {
                    setFormData({
                        techTitle: data.techTitle || '',
                        slug: data.tech_slug || data.slug || '',
                        techShortDescription: data.techShortDescription || '',
                        techOverview: data.techOverview || '',
                        techBanner: data.techBanner ? data.techBanner.map(img => img._id || img.id) : [],
                        seo_title: data.seo_title || '',
                        seo_description: data.seo_description || ''
                    });

                    if (data.techBanner && data.techBanner.length > 0 && data.techBanner[0].url) {
                        setBannerPreview(`${STRAPI_IMAGE_BASE_URL}${data.techBanner[0].url}`);
                    }
                }
            } catch (err) {
                toast.error('Failed to load technology');
            }
            setLoading(false);
        };

        fetchData();
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, techOverview: content }));
    };

    const handleNameBlur = () => {
        if (!formData.slug && formData.techTitle) {
            const slug = formData.techTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setBannerPreview(reader.result);
        reader.readAsDataURL(file);

        const result = await adminService.uploadImage(file);
        if (result.success && result.data) {
            setFormData(prev => ({
                ...prev,
                techBanner: [result.data.id || result.data._id] // Store as array of 1 ID
            }));
            toast.success('Banner uploaded');
        } else {
            toast.error('Upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            let result;
            if (isNew) {
                result = await adminService.createTechnology(formData);
            } else {
                result = await adminService.updateTechnology(id, formData);
            }

            if (result.success) {
                toast.success(`Technology ${isNew ? 'created' : 'updated'} successfully`);
                window.location.href = '/admin/portfolios/technologies';
                return;
            }
            toast.error(`Failed to save: ${result.error}`);
            setSaving(false);
        } catch (error) {
            toast.error('An error occurred');
            setSaving(false);
        }
    };

    if (loading) return <AdminLayout title="Loading..."><Spinner animation="border" /></AdminLayout>;

    return (
        <AdminLayout title={isNew ? 'Create Technology' : 'Edit Technology'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/portfolios/technologies" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Technology' : 'Edit Technology'}</h2>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="techTitle"
                                        value={formData.techTitle}
                                        onChange={handleChange}
                                        onBlur={handleNameBlur}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="techShortDescription"
                                        value={formData.techShortDescription}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Overview</Form.Label>
                                    <div className="border rounded">
                                        <RichTextEditor
                                            content={formData.techOverview}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-3 bg-light border-0">
                                    <Card.Body>
                                        <h6 className="fw-bold mb-3">Banner Image</h6>
                                        <Form.Group className="mb-3">
                                            {bannerPreview ? (
                                                <div className="mb-2 position-relative">
                                                    <Image src={bannerPreview} fluid className="rounded" />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="position-absolute top-0 end-0 m-1"
                                                        onClick={() => { setBannerPreview(null); setFormData(p => ({ ...p, techBanner: [] })) }}
                                                    >
                                                        <FaTrash size={12} />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="text-center p-3 border border-dashed rounded mb-2 bg-white">
                                                    <FaCloudUploadAlt className="text-muted mb-2" size={24} />
                                                    <div className="small text-muted">No image selected</div>
                                                </div>
                                            )}
                                            <Form.Control type="file" onChange={handleImageUpload} accept="image/*" size="sm" />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mb-3 bg-light border-0">
                                    <Card.Body>
                                        <h6 className="fw-bold mb-3">SEO Settings</h6>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small">SEO Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="seo_title"
                                                value={formData.seo_title}
                                                onChange={handleChange}
                                                size="sm"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small">SEO Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="seo_description"
                                                value={formData.seo_description}
                                                onChange={handleChange}
                                                size="sm"
                                            />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end mt-4 border-top pt-3">
                            <Link href="/admin/portfolios/technologies">
                                <Button variant="light" className="me-2">Cancel</Button>
                            </Link>
                            <Button type="submit" variant="primary" disabled={saving}>
                                {saving ? <Spinner size="sm" animation="border" /> : <><FaSave className="me-2" /> Save Technology</>}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </AdminLayout>
    );
};

export default TechnologyEdit;
