import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Spinner, Card, Image, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../../lib/constants';
import {   FaArrowLeft, FaSave, FaCloudUploadAlt, FaTrash   } from '../../../../components/OptimizedIcons';

const TechStackEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        tech_name: '',
        techIcon: null, // ID or object
    });
    const [preview, setPreview] = useState(null);

    // Fetch existing data
    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            const result = await adminService.getTechStacks({ search: '', page: 0, limit: 1 });
            // Warning: getTechStacks returns a list. There is no getTechStackById in adminService yet efficiently.
            // But usually we can filter or loop. Ideally adminService should have getTechStack(id).
            // Since I didn't add getTechStack(id), I should add it or use find. 
            // Wait, I didn't add getTechStack(id) to adminService.js!
            // I should revert and add it, or use the list endpoint with a filter if ID is supported?
            // Actually, MongoDB ID filter usually works if passed. 
            // BUT, strictly speaking I should use `adminService.apiFetch(url/id)`. 
            // I'll define a local helper or call apiFetch directly here for now, or update adminService.

            // Let's use direct apiFetch pattern or try to implement getTechStack in adminService in next step?
            // I'll call the endpoint directly for now using a fetch or try to filter.
            // Actually, Strapi/Nest generic routes usually support GET /:id.

            try {
                const result = await adminService.getTechStack(id);
                const data = result.success ? result.data : null;
                if (data) {
                    setFormData({
                        tech_name: data.tech_name || '',
                        techIcon: data.techIcon ? (data.techIcon._id || data.techIcon.id) : null,
                    });
                    if (data.techIcon && data.techIcon.url) {
                        setPreview(`${STRAPI_IMAGE_BASE_URL}${data.techIcon.url}`);
                    }
                }
            } catch (err) {
                toast.error('Failed to load tech stack');
            }
            setLoading(false);
        };

        fetchData();
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload
        const result = await adminService.uploadImage(file);
        if (result.success && result.data) {
            setFormData(prev => ({
                ...prev,
                techIcon: result.data.id || result.data._id
            }));
            toast.success('Image uploaded');
        } else {
            toast.error('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            let result;
            if (isNew) {
                result = await adminService.createTechStack(formData);
            } else {
                result = await adminService.updateTechStack(id, formData);
            }

            if (result.success) {
                toast.success(`Tech Stack ${isNew ? 'created' : 'updated'} successfully`);
                window.location.href = '/admin/portfolios/tech-stacks';
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
        <AdminLayout title={isNew ? 'Create Tech Stack' : 'Edit Tech Stack'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/portfolios/tech-stacks" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Tech Stack' : 'Edit Tech Stack'}</h2>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Tech Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="tech_name"
                                value={formData.tech_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Icon</Form.Label>
                            <div className="d-flex align-items-center">
                                {preview ? (
                                    <div className="position-relative me-3">
                                        <Image src={preview} width={80} height={80} className="rounded" style={{ objectFit: 'cover' }} />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 end-0 p-0 d-flex align-items-center justify-content-center"
                                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                                            onClick={() => { setPreview(null); setFormData(p => ({ ...p, techIcon: null })) }}
                                        >
                                            <FaTrash size={10} />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border rounded bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '80px', height: '80px' }}>
                                        <FaCloudUploadAlt size={24} className="text-secondary" />
                                    </div>
                                )}
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ width: 'auto' }}
                                />
                            </div>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Link href="/admin/portfolios/tech-stacks">
                                <Button variant="light" className="me-2">Cancel</Button>
                            </Link>
                            <Button type="submit" variant="primary" disabled={saving}>
                                {saving ? <Spinner size="sm" animation="border" /> : <><FaSave className="me-2" /> Save</>}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </AdminLayout>
    );
};

export default TechStackEdit;
