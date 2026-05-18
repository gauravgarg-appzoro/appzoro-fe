import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import PressForm from '../../../components/admin/press/PressForm';
import adminService from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { required } from '../../../lib/validation';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import {   FaSave, FaArrowLeft   } from '../../../components/OptimizedIcons';

function normalizePressForForm(apiPress) {
    if (!apiPress) return {};
    const img = Array.isArray(apiPress.PressImage) && apiPress.PressImage[0]
        ? apiPress.PressImage[0]
        : apiPress.PressImage && typeof apiPress.PressImage === 'object'
            ? apiPress.PressImage
            : null;
    const imageUrl = img && img.url
        ? (img.url.startsWith('http') ? img.url : `${(STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '')}${img.url.startsWith('/') ? img.url : `/${img.url}`}`)
        : null;
    const pressDate = apiPress.PressDate;
    const dateStr = pressDate
        ? (typeof pressDate === 'string' ? pressDate.slice(0, 10) : new Date(pressDate).toISOString().slice(0, 10))
        : '';
    return {
        ...apiPress,
        id: apiPress.id || apiPress._id,
        title: apiPress.PressTitle ?? apiPress.title ?? '',
        link: apiPress.PressUrl ?? apiPress.link ?? '',
        description: apiPress.PressDescription ?? apiPress.description ?? '',
        PressDate: dateStr,
        imagePreviewUrl: imageUrl,
        imageFileName: img?.name ?? apiPress.imageFileName ?? '',
        imageAltText: img?.alternativeText ?? apiPress.imageAltText ?? '',
        imageCaption: img?.caption ?? apiPress.imageCaption ?? '',
    };
}

const PressEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isCreate = id === 'create';

    const [loading, setLoading] = useState(!isCreate);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (id && !isCreate) {
            fetchPress();
        }
    }, [id]);

    const fetchPress = async () => {
        try {
            setLoading(true);
            const result = await adminService.getPressItem(id);
            const raw = result?.data ?? result;
            if (raw && (raw.id || raw._id)) {
                const data = normalizePressForForm(raw);
                setInitialData(data);
                setFormData(data);
            } else {
                Swal.fire('Error', 'Press entry not found', 'error');
                router.push('/admin/press');
            }
        } catch (error) {
            console.error('Error fetching press:', error);
            Swal.fire('Error', 'Failed to fetch press entry', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (newData) => {
        setFormData(newData);
    };

    const handleSubmit = async (isDraft = false) => {
        const titleErr = required(formData.title, 'Title');
        if (titleErr) {
            Swal.fire('Validation', titleErr, 'warning');
            return;
        }
        try {
            setSaving(true);
            let pressImageIds = [];
            if (formData.image instanceof File) {
                const uploadRes = await adminService.uploadImage(formData.image, {
                    alternativeText: formData.imageAltText,
                    caption: formData.imageCaption,
                    name: formData.imageFileName || formData.image.name,
                });
                if (uploadRes?.success && uploadRes?.data) {
                    const fid = uploadRes.data._id || uploadRes.data.id;
                    if (fid) pressImageIds = [fid];
                }
            } else if (initialData.PressImage) {
                const arr = Array.isArray(initialData.PressImage) ? initialData.PressImage : [initialData.PressImage];
                pressImageIds = arr.map((m) => m._id || m.id).filter(Boolean);
            }

            const payload = {
                PressTitle: formData.title ?? '',
                PressUrl: formData.link ?? '',
                PressDescription: formData.description ?? '',
                PressDate: formData.PressDate || null,
                published_at: isDraft ? '' : (formData.published_at || new Date().toISOString()),
                ...(pressImageIds.length > 0 ? { PressImage: pressImageIds } : {}),
            };

            let result;
            if (isCreate) {
                result = await adminService.createPress(payload);
            } else {
                result = await adminService.updatePress(id, payload);
            }

            if (result.success) {
                await Swal.fire(
                    'Success',
                    isDraft ? 'Press entry saved as draft' : `Press entry ${isCreate ? 'created' : 'updated'} successfully`,
                    'success'
                );
                window.location.href = '/admin/press';
                return;
            }
            throw new Error(result.error || 'Failed to save press entry');
        } catch (error) {
            console.error('Error saving press:', error);
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
        <AdminLayout title={isCreate ? 'Create Press Release' : 'Edit Press Release'}>
            <Container fluid className="py-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Button
                            variant="light"
                            className="me-3"
                            onClick={() => router.push('/admin/press')}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </Button>
                        <h2 className="d-inline-block align-middle mb-0">
                            {isCreate ? 'Create Press Release' : 'Edit Press Release'}
                        </h2>
                    </Col>
                    <Col xs="auto" className="d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            onClick={() => handleSubmit(true)}
                            disabled={saving}
                            className="d-flex align-items-center"
                        >
                            {saving ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : <FaSave className="me-2" />}
                            Save Draft
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleSubmit(false)}
                            disabled={saving}
                            className="d-flex align-items-center"
                        >
                            {saving ? <Spinner as="span" animation="border" size="sm" className="me-2" /> : <FaSave className="me-2" />}
                            {initialData?.id || initialData?._id ? 'Update' : 'Save & Publish'}
                        </Button>
                    </Col>
                </Row>

                <PressForm
                    initialData={initialData}
                    onChange={handleFormChange}
                />
            </Container>
        </AdminLayout>
    );
};

export default PressEdit;
