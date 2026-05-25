import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import adminService from '../../../services/admin.service';

const RobotsTxtForm = () => {
    const [robotContent, setRobotContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const result = await adminService.getRobotsTxt();
            if (result.success && result.data) {
                setRobotContent(result.data.robots_txt || '');
            } else {
                toast.error('Failed to load robots.txt');
            }
            setLoading(false);
        };
        load();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const result = await adminService.updateRobotsTxt(robotContent);
        if (result.success) {
            toast.success('robots.txt saved. Live site serves it from /robots.txt (API).');
        } else {
            toast.error(result.error || 'Save failed');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
                <Alert variant="info" className="small">
                    Changes are served at <strong>/robots.txt</strong> from the API. A built-in fallback is used if the API is down.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold mb-3">Robot Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={20}
                            value={robotContent}
                            onChange={(e) => setRobotContent(e.target.value)}
                            className="bg-white"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '13px',
                                lineHeight: '1.6',
                            }}
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit" className="px-4" disabled={saving}>
                            {saving ? 'Saving…' : 'Update'}
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            className="px-4"
                            onClick={() => window.open('/robots.txt', '_blank', 'noopener,noreferrer')}
                        >
                            Preview live
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RobotsTxtForm;
