import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProductForm from '../../../components/admin/products/ProductForm';
import adminService from '../../../services/admin.service';
import { mapProductApiToForm, mapProductFormToApi } from '../../../lib/productMapper';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';
import autoSeedBlocks from '../../../components/page-builder/autoSeedBlocks';
import Swal from 'sweetalert2';
import {   FaSave, FaArrowLeft   } from '../../../components/OptimizedIcons';

const swalToast = {
    success: (msg) => Swal.fire('Success', msg, 'success'),
    error: (msg) => Swal.fire('Error', msg, 'error'),
};

const ProductEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isCreate = id === 'create';

    const [loading, setLoading] = useState(!isCreate);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ pageBlocks: [] });
    const [initialData, setInitialData] = useState({});
    const rawApiDataRef = useRef(null);

    useEffect(() => {
        if (id && !isCreate) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const result = await adminService.getProduct(id);
            // API may return product directly or { data: product }
            const raw = result && (result.data !== undefined ? result.data : result);
            if (raw && (raw.id || raw._id)) {
                rawApiDataRef.current = raw;
                const formShape = mapProductApiToForm(raw);
                setInitialData(formShape);
                setFormData({
                    ...formShape,
                    pageBlocks: Array.isArray(raw.pageBlocks) ? raw.pageBlocks : [],
                });

                // Auto-seed pageBlocks from existing data if empty
                if (!raw.pageBlocks || !Array.isArray(raw.pageBlocks) || raw.pageBlocks.length === 0) {
                    const seeded = autoSeedBlocks('product', raw);
                    if (seeded.length > 0) {
                        setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                    }
                }
            } else {
                Swal.fire('Error', 'Product not found', 'error');
                router.push('/admin/products');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            Swal.fire('Error', 'Failed to fetch product', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (newData) => {
        setFormData(prev => ({
            ...newData,
            pageBlocks: Array.isArray(prev.pageBlocks) ? prev.pageBlocks : [],
        }));
    };

    const uploadIfFile = async (fileOrNull, existingId, meta = {}) => {
        if (!fileOrNull) return null;
        if (fileOrNull instanceof File) {
            try {
                const result = await adminService.uploadImage(fileOrNull, {
                    alternativeText: meta.alt_text || meta.alternativeText || '',
                    caption: meta.caption || '',
                });
                if (result && result.success) {
                    if (result.data?.id) return result.data.id;
                    if (Array.isArray(result.data) && result.data[0]?.id) return result.data[0].id;
                }
            } catch (err) {
                console.error('File upload failed', err);
                swalToast.error(`Warning: Failed to upload ${fileOrNull.name}`);
            }
            return existingId;
        }
        if (existingId && (meta.alt_text || meta.caption)) {
            adminService.updateFileInfo(existingId, {
                alternativeText: meta.alt_text || '',
                caption: meta.caption || '',
            });
        }
        return existingId;
    };

    const handleSubmit = async (overrideData = null, isDraft = false) => {
        try {
            setSaving(true);
            const dataToUse = {
                ...(overrideData || formData),
                // ProductForm save callback sends only form fields; keep pageBlocks from parent state.
                pageBlocks: Array.isArray(formData.pageBlocks) ? formData.pageBlocks : [],
            };
            const updatedForm = JSON.parse(JSON.stringify(dataToUse));

            // JSON.stringify drops File objects, so manually copy over any File objects 
            Object.keys(dataToUse).forEach(k => {
                if (dataToUse[k] instanceof File) updatedForm[k] = dataToUse[k];
                if (Array.isArray(dataToUse[k])) {
                    dataToUse[k].forEach((item, index) => {
                        Object.keys(item).forEach(j => {
                            if (item[j] instanceof File) updatedForm[k][index][j] = item[j];
                        });
                    });
                }
            });

            // Upload top-level images
            if (updatedForm.image instanceof File) {
                updatedForm.image = await uploadIfFile(updatedForm.image, null);
            }
            if (updatedForm.brandsLogo instanceof File) {
                updatedForm.brandsLogo = await uploadIfFile(updatedForm.brandsLogo, null);
            }

            // Upload nested images for arrays
            const sectionsWithImages = [
                { key: 'section2_boxes', fields: ['icon', 'image'] },
                { key: 'section3_entries', fields: ['image'] },
                { key: 'section4_boxes', fields: ['image'] },
                { key: 'section5_boxes', fields: ['image'] },
                { key: 'section6_boxes', fields: ['image'] },
                { key: 'section7_boxes', fields: ['image'] }
            ];

            for (const { key, fields } of sectionsWithImages) {
                if (Array.isArray(updatedForm[key])) {
                    for (let i = 0; i < updatedForm[key].length; i++) {
                        const item = updatedForm[key][i];
                        for (const field of fields) {
                            if (item[field] instanceof File) {
                                const meta = {
                                    alt_text: item[`${field}_alt_text`] || '',
                                    caption: item[`${field}_caption`] || ''
                                };
                                const newId = await uploadIfFile(item[field], null, meta);
                                updatedForm[key][i][field] = newId;
                            }
                        }
                    }
                }
            }

            const payload = mapProductFormToApi(updatedForm);
            if (Array.isArray(updatedForm.pageBlocks)) {
                payload.pageBlocks = updatedForm.pageBlocks;
            }
            payload.published_at = isDraft ? null : (payload.published_at || new Date().toISOString());

            const result = isCreate
                ? await adminService.createProduct(payload)
                : await adminService.updateProduct(id, payload);

            const ok = await handleSaveSuccess({
                result,
                isCreate,
                isDraft,
                listPath: '/admin/products',
                editPathPrefix: '/admin/products/',
                toast: swalToast,
                router,
                entityName: 'Product',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
        } catch (error) {
            console.error('Error saving product:', error);
            swalToast.error(error.message || 'Failed to save product');
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
        <AdminLayout>
            <Container fluid className="py-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Button
                            variant="light"
                            className="me-3"
                            onClick={() => router.push('/admin/products')}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </Button>
                        <h2 className="d-inline-block align-middle mb-0">
                            {isCreate ? 'Create Product' : 'Edit Product'}
                        </h2>
                    </Col>
                    {/* Header 'Save' button removed as requested */}
                </Row>

                <ProductForm
                    key={id || 'create'}
                    initialData={initialData}
                    onChange={handleFormChange}
                    onSave={handleSubmit}
                    saving={saving}
                    pageBlocks={formData.pageBlocks}
                    onPageBlocksChange={(newBlocks) => setFormData(prev => ({ ...prev, pageBlocks: newBlocks }))}
                    onRegenerateBlocks={() => {
                        if (window.confirm('This will replace current page blocks with auto-generated ones from existing data. Continue?')) {
                            const seeded = autoSeedBlocks('product', rawApiDataRef.current || formData);
                            setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                        }
                    }}
                />
            </Container>
        </AdminLayout>
    );
};

export default ProductEdit;
