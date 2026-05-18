import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import PortfolioForm from '../../../components/admin/portfolios/PortfolioForm';
import adminService from '../../../services/admin.service';
import { AdminFormPageHeader } from '../../../components/admin/ui';

const PortfolioEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';
    const formRef = useRef(null);
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = useState(false);

    React.useEffect(() => {
        if (!router.isReady) return;

        const fetchData = async () => {
            if (isNew) {
                setLoading(false);
                return;
            }
            try {
                const result = await adminService.getPortfolio(id);
                if (result?.data) setData(result.data);
                else if (result && (result._id || result.id)) setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isNew, router.isReady]);

    if (loading) return <AdminLayout title="Loading..."><div className="p-4 text-center"><Spinner animation="border" /></div></AdminLayout>;

    return (
        <AdminLayout title={isNew ? 'Create New Portfolio' : 'Edit Portfolio'}>
            <AdminFormPageHeader
                backHref="/admin/portfolios"
                title={isNew ? 'Create New Portfolio' : 'Edit Portfolio'}
                isNew={isNew}
                showDraftPublish={false}
                saving={saving}
                onSaveDraft={() => formRef.current?.submit(true)}
                onSavePrimary={() => formRef.current?.submit(false)}
                primaryLabel={isNew ? 'Publish' : 'Update'}
            />

            <PortfolioForm ref={formRef} initialData={data} onSavingChange={setSaving} />
        </AdminLayout>
    );
};

export default PortfolioEdit;
