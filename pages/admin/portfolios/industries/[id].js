import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Spinner, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import {   FaArrowLeft, FaSave   } from '../../../../components/OptimizedIcons';

const IndustryEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        if (!id || isNew) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await adminService.getIndustryName(id);
                const data = result.success ? result.data : null;
                if (data) {
                    setFormData({
                        name: data.name || ''
                    });
                }
            } catch (err) {
                toast.error('Failed to load industry');
            }
            setLoading(false);
        };

        fetchData();
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            let result;
            if (isNew) {
                result = await adminService.createIndustryName(formData);
            } else {
                result = await adminService.updateIndustryName(id, formData);
            }

            if (result.success) {
                toast.success(`Industry ${isNew ? 'created' : 'updated'} successfully`);
                window.location.href = '/admin/portfolios/industries';
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
        <AdminLayout title={isNew ? 'Create Industry' : 'Edit Industry'}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/portfolios/industries" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create Industry' : 'Edit Industry'}</h2>
            </div>

            <Card className="shadow-sm border-0" style={{ maxWidth: '600px' }}>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Industry Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Healthcare"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Link href="/admin/portfolios/industries">
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

export default IndustryEdit;
