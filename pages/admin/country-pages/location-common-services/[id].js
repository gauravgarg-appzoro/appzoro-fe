import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../../components/admin/AdminLayout';
import LocationCommonServicesForm from '../../../../components/admin/country-pages/LocationCommonServicesForm';
import adminService from '../../../../services/admin.service';
import { handleSaveSuccess } from '../../../../lib/adminSaveHandler';
import Swal from 'sweetalert2';
import {   FaSave, FaArrowLeft   } from '../../../../components/OptimizedIcons';

const swalToast = { success: (m) => Swal.fire('Success', m, 'success'), error: (m) => Swal.fire('Error', m, 'error') };

const LocationCommonServicesEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isCreate = id === 'create';

    const [loading, setLoading] = useState(!isCreate);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (id && !isCreate) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await adminService.getLocationCommonService(id);
            if (result && result.id) {
                const data = result.data || result;
                setInitialData(data);
                setFormData(data);
            } else {
                Swal.fire('Error', 'Service not found', 'error');
                router.push('/admin/country-pages/location-common-services');
            }
        } catch (error) {
            console.error('Error fetching service:', error);
            Swal.fire('Error', 'Failed to fetch service', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (newData) => {
        setFormData(newData);
    };

    const handleSubmit = async (isDraft = false) => {
        try {
            setSaving(true);
            const data = new FormData();

            Object.keys(formData).forEach(key => {
                if (key === 'lcs_icon') {
                    if (formData[key] instanceof File) {
                        data.append(`files.${key}`, formData[key]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            });

            const result = isCreate
                ? await adminService.createLocationCommonService(data)
                : await adminService.updateLocationCommonService(id, data);
            const ok = await handleSaveSuccess({
                result,
                isCreate,
                isDraft,
                listPath: '/admin/country-pages/location-common-services',
                editPathPrefix: '/admin/country-pages/location-common-services/',
                toast: swalToast,
                router,
                entityName: 'Service',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
        } catch (error) {
            console.error('Error saving service:', error);
            swalToast.error(error.message || 'Failed to save');
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
        <AdminLayout title={isCreate ? 'Create Service' : 'Edit Service'}>
            <Container fluid className="py-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Button
                            variant="light"
                            className="me-3"
                            onClick={() => router.push('/admin/country-pages/location-common-services')}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </Button>
                        <h2 className="d-inline-block align-middle mb-0">
                            {isCreate ? 'Create Service' : 'Edit Service'}
                        </h2>
                    </Col>
                    <Col xs="auto" className="d-flex gap-2">
                        <Button variant="outline-secondary" onClick={() => handleSubmit(true)} disabled={saving} className="d-flex align-items-center">
                            {saving ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : <FaSave className="me-2" />}
                            Save as draft
                        </Button>
                        <Button variant="primary" onClick={() => handleSubmit(false)} disabled={saving} className="d-flex align-items-center">
                            {saving ? <><Spinner as="span" animation="border" size="sm" className="me-2" /> Saving...</> : <><FaSave className="me-2" /> {isCreate ? 'Publish' : 'Update'}</>}
                        </Button>
                    </Col>
                </Row>

                <LocationCommonServicesForm
                    initialData={initialData}
                    onChange={handleFormChange}
                />
            </Container>
        </AdminLayout>
    );
};

export default LocationCommonServicesEdit;
