import React from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/admin/AdminLayout';
import UrlRedirectionForm from '../../../../components/admin/seo/UrlRedirectionForm';

const UrlRedirectionEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    return (
        <AdminLayout title={isNew ? 'Add URL redirect' : 'Edit URL redirect'}>
            <div className="mb-4">
                <h2 className="fw-bold mb-0 text-dark">
                    {isNew ? 'Add URL redirect' : 'Edit URL redirect'}
                </h2>
            </div>

            {!router.isReady ? null : (
                <UrlRedirectionForm recordId={isNew ? null : id} />
            )}
        </AdminLayout>
    );
};

export default UrlRedirectionEdit;
