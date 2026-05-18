import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../../components/admin/AdminLayout';
import LocationDataForm from '../../../../components/admin/country-pages/LocationDataForm';
import adminService from '../../../../services/admin.service';
import { handleSaveSuccess } from '../../../../lib/adminSaveHandler';
import Swal from 'sweetalert2';
import {   FaSave, FaArrowLeft   } from '../../../../components/OptimizedIcons';

const swalToast = { success: (m) => Swal.fire('Success', m, 'success'), error: (m) => Swal.fire('Error', m, 'error') };

const LocationDataEdit = () => {
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
            const result = await adminService.getLocationDataById(id);
            if (result.success && result.data) {
                const data = result.data;
                setInitialData(data);
                setFormData(data);
            } else {
                Swal.fire('Error', 'Location not found', 'error');
                router.push('/admin/country-pages/location-data');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            Swal.fire('Error', 'Failed to fetch location data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = useCallback((newData) => {
        setFormData(newData);
    }, []);

    const handleSubmit = async (isDraft = false) => {
        try {
            setSaving(true);

            // Prepare clean JSON payload
            const payload = {
                ...formData,
                // Handle main image: extract ID if object, or use ID if already ID (from upload)
                section1_img: formData.section1_img?.id || formData.section1_img || null,

                // Handle features
                locations_features: (formData.locations_features || []).map(f => ({
                    feature_title: f.feature_title,
                    feature_content: f.feature_content,
                    // Ensure image is ID
                    feature_image: f.feature_image?.id || f.feature_image || null
                })),

                // Handle FAQ
                location_faq: formData.location_faq || [],
            };

            // Remove system fields and undefined
            ['createdAt', 'updatedAt', 'publishedAt', 'id', '_id'].forEach(key => delete payload[key]);
            Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

            const result = isCreate
                ? await adminService.createLocationData(payload)
                : await adminService.updateLocationData(id, payload);
            const ok = await handleSaveSuccess({
                result,
                isCreate,
                isDraft,
                listPath: '/admin/country-pages/location-data',
                editPathPrefix: '/admin/country-pages/location-data/',
                toast: swalToast,
                router,
                entityName: 'Location data',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
        } catch (error) {
            console.error('Error saving location:', error);
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
        <AdminLayout title={isCreate ? 'Create Location Data' : 'Edit Location Data'}>
            <Container fluid className="py-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Button
                            variant="light"
                            className="me-3"
                            onClick={() => router.push('/admin/country-pages/location-data')}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </Button>
                        <h2 className="d-inline-block align-middle mb-0">
                            {isCreate ? 'Create Location Data' : 'Edit Location Data'}
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

                <LocationDataForm
                    initialData={initialData}
                    onChange={handleFormChange}
                />
            </Container>
        </AdminLayout>
    );
};

export default LocationDataEdit;
