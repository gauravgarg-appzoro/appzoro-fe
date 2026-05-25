import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import { applySitePageDefaults } from '../../../lib/sitePageDefaults';
import { FaSave } from '../../../components/OptimizedIcons';

const AboutUsEdit = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        intro: '',
        mission: '',
        vision: '',
        history: '',
        seo_title: '',
        seo_description: '',
    });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const result = await adminService.getSitePage('about-us');
                const page = applySitePageDefaults(
                    'about-us',
                    result.success && result.data ? result.data : {},
                );
                setFormData({
                    title: page.title || '',
                    intro: page.intro || '',
                    mission: page.mission || '',
                    vision: page.vision || '',
                    history: page.history || '',
                    seo_title: page.seo_title || '',
                    seo_description: page.seo_description || '',
                });
                if (result.notFound) {
                    toast.info(
                        'Using default About Us copy — site-pages API is not on this server yet. Deploy the latest backend to save edits.',
                        { autoClose: 8000 },
                    );
                }
            } catch {
                const page = applySitePageDefaults('about-us', {});
                setFormData({
                    title: page.title || '',
                    intro: page.intro || '',
                    mission: page.mission || '',
                    vision: page.vision || '',
                    history: page.history || '',
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
        const result = await adminService.updateSitePage('about-us', formData);
        if (result.success) {
            toast.success('About Us page saved');
        } else if (result.notFound) {
            toast.warn(result.error);
        } else {
            toast.error(result.error || 'Save failed');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <AdminLayout title="About Us Page">
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="About Us Page">
            <div className="mb-4">
                <h2 className="fw-bold mb-0">Edit About Us Page</h2>
                <p className="text-secondary">Content appears on the public <a href="/about-us" target="_blank" rel="noreferrer">/about-us</a> page.</p>
            </div>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3 fw-bold">Main Content</Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hero Title</Form.Label>
                                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hero Introduction</Form.Label>
                                    <Form.Control as="textarea" rows={4} name="intro" value={formData.intro} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Our Mission</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="mission" value={formData.mission} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Our Vision</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="vision" value={formData.vision} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Additional Content (HTML allowed)</Form.Label>
                                    <Form.Control as="textarea" rows={8} name="history" value={formData.history} onChange={handleChange} />
                                    <Form.Text className="text-muted">Optional extended body below mission/vision blocks.</Form.Text>
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

export default AboutUsEdit;
