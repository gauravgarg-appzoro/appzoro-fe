import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Spinner, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import {   FaArrowLeft, FaSave   } from '../../../../components/OptimizedIcons';

const CategoryEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
    });

    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            const result = await adminService.getCategory(id);
            if (result.success && result.data) {
                setFormData({
                    name: result.data.name || '',
                    slug: result.data.slug || '',
                });
            } else {
                toast.error('Failed to load category');
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

    // Auto-generate slug from name if slug is empty
    const handleNameBlur = () => {
        if (!formData.slug && formData.name) {
            const slug = formData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            let result;
            if (isNew) {
                result = await adminService.createCategory(formData);
            } else {
                result = await adminService.updateCategory(id, formData);
            }

            if (result.success) {
                toast.success(`Category ${isNew ? 'created' : 'updated'} successfully`);
                window.location.href = '/admin/blogs/categories';
                return;
            }
            toast.error(`Failed to save: ${result.error}`);
            setSaving(false);
        } catch (error) {
            toast.error('An error occurred');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Loading...">
                <div className="text-center p-5">
                    <Spinner animation="border" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={isNew ? 'Create Category' : 'Edit Category'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/blogs/categories" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Category' : 'Edit Category'}</h2>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleNameBlur}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-muted">
                                URL-friendly version of the name.
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Link href="/admin/blogs/categories">
                                <Button variant="light" className="me-2">Cancel</Button>
                            </Link>
                            <Button type="submit" variant="primary" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="me-2" /> Save Category
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </AdminLayout>
    );
};

export default CategoryEdit;
