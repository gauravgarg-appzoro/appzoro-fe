import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import { applySitePageDefaults } from '../../../lib/sitePageDefaults';
import { FaSave } from '../../../components/OptimizedIcons';

const ContactUsEdit = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        headline_primary: '',
        headline_secondary: '',
        intro: '',
        seo_title: '',
        seo_description: '',
    });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const result = await adminService.getSitePage('contact-us');
                const page = applySitePageDefaults(
                    'contact-us',
                    result.success && result.data ? result.data : {},
                );
                setFormData({
                    headline_primary: page.headline_primary || '',
                    headline_secondary: page.headline_secondary || '',
                    intro: page.intro || '',
                    seo_title: page.seo_title || '',
                    seo_description: page.seo_description || '',
                });
                if (result.notFound) {
                    toast.info(
                        'Using default Contact Us copy — site-pages API is not on this server yet. Deploy the latest backend to save edits.',
                        { autoClose: 8000 },
                    );
                }
            } catch {
                const page = applySitePageDefaults('contact-us', {});
                setFormData({
                    headline_primary: page.headline_primary || '',
                    headline_secondary: page.headline_secondary || '',
                    intro: page.intro || '',
                    seo_title: page.seo_title || '',
                    seo_description: page.seo_description || '',
                });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const result = await adminService.updateSitePage('contact-us', formData);
        if (result.success) {
            toast.success('Contact Us page saved');
        } else if (result.notFound) {
            toast.warn(result.error);
        } else {
            toast.error(result.error || 'Save failed');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <AdminLayout title="Contact Us">
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Contact Us">
            <div className="mb-4">
                <h2 className="fw-bold mb-0">Edit Contact Us Page</h2>
                <p className="text-secondary">
                    Updates headline and SEO on <a href="/contact-us" target="_blank" rel="noreferrer">/contact-us</a>.
                    The HubSpot form is unchanged.
                </p>
            </div>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3 fw-bold">Page Copy</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Headline (first line)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="headline_primary"
                                                value={formData.headline_primary}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Headline (second line)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="headline_secondary"
                                                value={formData.headline_secondary}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Introduction</Form.Label>
                                    <Form.Control as="textarea" rows={4} name="intro" value={formData.intro} onChange={handleChange} />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3 fw-bold">SEO</Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Title</Form.Label>
                                    <Form.Control type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="seo_description" value={formData.seo_description} onChange={handleChange} />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <Button variant="primary" type="submit" className="w-100" disabled={saving}>
                                    {saving ? <Spinner size="sm" className="me-2" /> : <FaSave className="me-2" />}
                                    Save Changes
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </AdminLayout>
    );
};

export default ContactUsEdit;
