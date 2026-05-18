import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import ClientReviewForm from '../../../components/admin/client-reviews/ClientReviewForm';
import adminService from '../../../services/admin.service';
import Swal from 'sweetalert2';
import {   FaSave, FaArrowLeft   } from '../../../components/OptimizedIcons';

const ClientReviewEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isCreate = id === 'create';

    const [loading, setLoading] = useState(!isCreate);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (id && !isCreate) {
            fetchReview();
        }
    }, [id]);

    const fetchReview = async () => {
        try {
            setLoading(true);
            const result = await adminService.getClientReview(id);
            if (result.success && result.data) {
                const data = result.data;
                setInitialData(data);
                setFormData(data);
            } else {
                Swal.fire('Error', 'Client review not found', 'error');
                router.push('/admin/client-reviews');
            }
        } catch (error) {
            console.error('Error fetching client review:', error);
            Swal.fire('Error', 'Failed to fetch client review', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (newData) => {
        setFormData(newData);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.name.trim()) {
            Swal.fire('Validation', 'Client name is required', 'warning');
            return;
        }

        try {
            setSaving(true);

            const payload = {
                name: formData.name,
                clientreview: formData.clientreview || '',
                designation: formData.designation || '',
            };

            if (formData.clientProfilePic) {
                payload.clientProfilePic = formData.clientProfilePic;
            }

            let result;
            if (isCreate) {
                result = await adminService.createClientReview(payload);
            } else {
                result = await adminService.updateClientReview(id, payload);
            }

            if (result.success) {
                await Swal.fire(
                    'Success',
                    `Client review ${isCreate ? 'created' : 'updated'} successfully`,
                    'success'
                );
                window.location.href = '/admin/client-reviews';
                return;
            }
            throw new Error(result.error || 'Failed to save client review');
        } catch (error) {
            console.error('Error saving client review:', error);
            Swal.fire('Error', error.message, 'error');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <Container className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </Container>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={isCreate ? 'Create Client Review' : 'Edit Client Review'}>
            <Container fluid className="py-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Button
                            variant="light"
                            className="me-3"
                            onClick={() => router.push('/admin/client-reviews')}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </Button>
                        <h2 className="d-inline-block align-middle mb-0">
                            {isCreate ? 'Create Client Review' : 'Edit Client Review'}
                        </h2>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={saving}
                            className="d-flex align-items-center"
                        >
                            {saving ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : <FaSave className="me-2" />}
                            {isCreate ? 'Save' : 'Update'}
                        </Button>
                    </Col>
                </Row>

                <ClientReviewForm
                    initialData={initialData}
                    onChange={handleFormChange}
                />
            </Container>
        </AdminLayout>
    );
};

export default ClientReviewEdit;
