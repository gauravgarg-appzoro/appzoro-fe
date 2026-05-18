import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import CountryPageForm from '../../../components/admin/country-pages/CountryPageForm';
import adminService from '../../../services/admin.service';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';

const CountryPageEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isCreateMode = id === 'create';

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        if (isCreateMode) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await adminService.getCountryPage(id);
                if (response && (response._id || response.id)) {
                    setInitialData(response);
                } else if (response && response.data) {
                    setInitialData(response.data);
                } else {
                    toast.error('Country page not found');
                    router.push('/admin/country-pages');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch country page details');
                router.push('/admin/country-pages');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, id, isCreateMode]);

    const handleSave = async (formData, isDraft = false) => {
        setSaving(true);
        try {
            const payload = { ...formData };
            payload.status = isDraft ? 'draft' : 'published';
            payload.published_at = isDraft ? null : (formData.published_at || new Date().toISOString());
            const result = isCreateMode
                ? await adminService.createCountryPage(payload)
                : await adminService.updateCountryPage(id, payload);
            const ok = await handleSaveSuccess({
                result,
                isCreate: isCreateMode,
                isDraft,
                listPath: '/admin/country-pages',
                editPathPrefix: '/admin/country-pages/',
                toast,
                router,
                entityName: 'Country page',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || `Failed to ${isCreateMode ? 'create' : 'update'} country page`);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title={isCreateMode ? 'Create Country Page' : 'Edit Country Page'}>
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={isCreateMode ? 'Create Country Page' : 'Edit Country Page'}>
            <div className="mb-4">
                <h2 className="fw-bold mb-0">{isCreateMode ? 'New Country Page' : 'Edit Country Page'}</h2>
            </div>
            <CountryPageForm
                initialData={initialData || {}}
                onSubmit={handleSave}
                saving={saving}
            />
        </AdminLayout>
    );
};

export default CountryPageEdit;
