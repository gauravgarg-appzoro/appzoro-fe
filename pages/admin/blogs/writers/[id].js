import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Spinner, Card, Image, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../../lib/constants';
import {   FaArrowLeft, FaSave, FaCloudUploadAlt, FaTimes   } from '../../../../components/OptimizedIcons';

const WriterEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        linkedin_profile_url: '',
        picture: null, // { id: '...', url: '...' }
    });

    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            const result = await adminService.getWriter(id);
            if (result.success && result.data) {
                setFormData({
                    name: result.data.name || '',
                    email: result.data.email || '',
                    bio: result.data.bio || '',
                    linkedin_profile_url: result.data.linkedin_profile_url || '',
                    picture: result.data.picture || null,
                });
            } else {
                toast.error('Failed to load writer');
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

        setUploading(true);
        try {
            const result = await adminService.uploadImage(file);
            if (result.success && result.data) {
                // Strapi upload returns object with id, url, etc.
                setFormData(prev => ({
                    ...prev,
                    picture: result.data
                }));
                toast.success('Image uploaded successfully');
            } else {
                toast.error('Failed to upload image');
            }
        } catch (error) {
            toast.error('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            picture: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Prepare payload - ensure picture is just ID or object depending on backend expectation
        // Mongoose backend likely expects just the ID for the relation if it's using populates
        // But let's check what it expects. The entity has @Prop({ type: Types.ObjectId, ref: 'Media' })
        // so it expects an ID.

        const payload = {
            ...formData,
            picture: formData.picture ? (formData.picture._id || formData.picture.id) : null
        };

        try {
            let result;
            if (isNew) {
                result = await adminService.createWriter(payload);
            } else {
                result = await adminService.updateWriter(id, payload);
            }

            if (result.success) {
                toast.success(`Writer ${isNew ? 'created' : 'updated'} successfully`);
                window.location.href = '/admin/blogs/writers';
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

    const imageUrl = formData.picture?.url
        ? (formData.picture.url.startsWith('http') ? formData.picture.url : `${STRAPI_IMAGE_BASE_URL}${formData.picture.url}`)
        : null;

    return (
        <AdminLayout title={isNew ? 'Create Writer' : 'Edit Writer'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/blogs/writers" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Writer' : 'Edit Writer'}</h2>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>LinkedIn Profile URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        name="linkedin_profile_url"
                                        value={formData.linkedin_profile_url}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-end">
                                    <Link href="/admin/blogs/writers">
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
                                                <FaSave className="me-2" /> Save Writer
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Body className="p-4 text-center">
                            <h6 className="fw-bold mb-3 text-start">Profile Picture</h6>

                            {imageUrl ? (
                                <div className="position-relative d-inline-block mb-3">
                                    <Image
                                        src={imageUrl}
                                        roundedCircle
                                        width={150}
                                        height={150}
                                        alt="Writer"
                                        className="border shadow-sm"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 start-100 translate-middle rounded-circle p-1"
                                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onClick={removeImage}
                                    >
                                        <FaTimes size={12} />
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-secondary" style={{ width: '150px', height: '150px' }}>
                                    <FaArrowLeft size={40} className="text-secondary opacity-25" />
                                </div>
                            )}

                            <div className="d-grid">
                                <Form.Label htmlFor="writer-image-upload" className="btn btn-outline-primary btn-sm mb-0">
                                    {uploading ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt className="me-2" />
                                            {imageUrl ? 'Change Picture' : 'Upload Picture'}
                                        </>
                                    )}
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    id="writer-image-upload"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </AdminLayout>
    );
};

export default WriterEdit;
