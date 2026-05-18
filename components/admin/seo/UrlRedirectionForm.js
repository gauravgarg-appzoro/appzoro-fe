import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import adminService from '../../../services/admin.service';

const UrlRedirectionForm = ({ recordId = null }) => {
    const router = useRouter();
    const isNew = !recordId || recordId === 'create';
    const [loading, setLoading] = useState(!isNew);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        sourceUrl: '',
        targetUrl: '',
        statusCode: 301,
        isActive: true,
    });

    useEffect(() => {
        if (isNew) return;
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError('');
            try {
                const raw = await adminService.getUrlRedirectionItem(recordId);
                if (cancelled) return;
                setFormData({
                    sourceUrl: raw.sourceUrl || '',
                    targetUrl: raw.targetUrl || '',
                    statusCode: raw.statusCode || 301,
                    isActive: raw.isActive !== false,
                });
            } catch (e) {
                if (!cancelled) setError(e.message || 'Failed to load redirect');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [recordId, isNew]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            const patch = {
                ...prev,
                [name]: type === 'checkbox' ? checked : (name === 'statusCode' ? Number(value) : value),
            };
            if (name === 'statusCode' && Number(value) === 410) {
                patch.targetUrl = '';
            }
            return patch;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const statusCode = Number(formData.statusCode) || 301;
        const payload = {
            sourceUrl: formData.sourceUrl.trim(),
            targetUrl: statusCode === 410 ? '' : formData.targetUrl.trim(),
            statusCode,
            isActive: formData.isActive,
        };
        if (!payload.sourceUrl) {
            setError('Source URL is required.');
            return;
        }
        if (statusCode !== 410 && !payload.targetUrl) {
            setError('Target URL is required unless status is 410 Gone.');
            return;
        }
        try {
            if (isNew) {
                const res = await adminService.createUrlRedirection(payload);
                if (!res.success) throw new Error(res.error || 'Create failed');
            } else {
                const res = await adminService.updateUrlRedirection(recordId, payload);
                if (!res.success) throw new Error(res.error || 'Update failed');
            }
            router.push('/admin/seo/url-redirections');
        } catch (err) {
            setError(err.message || 'Save failed');
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <Card className="border-0 shadow-sm" style={{ maxWidth: '700px' }}>
            <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">
                            Source URL <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="sourceUrl"
                            value={formData.sourceUrl}
                            onChange={handleChange}
                            required
                            className="bg-white"
                            placeholder="/old-path or blog/old-slug"
                        />
                        <Form.Text className="text-muted">
                            Path visitors hit (leading slash optional). Example: /blog/old-post
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">
                            Target URL{' '}
                            {formData.statusCode !== 410 && (
                                <span className="text-danger">*</span>
                            )}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="targetUrl"
                            value={formData.targetUrl}
                            onChange={handleChange}
                            required={formData.statusCode !== 410}
                            disabled={formData.statusCode === 410}
                            className="bg-white"
                            placeholder="/blog/new-post or https://example.com/page"
                        />
                        <Form.Text className="text-muted">
                            {formData.statusCode === 410
                                ? 'Not used for 410 Gone — the URL is removed with no redirect.'
                                : 'Full URL or site path to send users to.'}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">HTTP status</Form.Label>
                        <Form.Select
                            name="statusCode"
                            value={formData.statusCode}
                            onChange={handleChange}
                        >
                            <option value={301}>301 — Permanent redirect</option>
                            <option value={302}>302 — Temporary redirect</option>
                            <option value={307}>307 — Temporary (method preserved)</option>
                            <option value={308}>308 — Permanent (method preserved)</option>
                            <option value={410}>410 — Gone (no redirect; URL permanently removed)</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Check
                            type="switch"
                            id="url-redir-active"
                            name="isActive"
                            label="Active"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => router.push('/admin/seo/url-redirections')}
                        >
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            {isNew ? 'Create' : 'Save'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UrlRedirectionForm;
