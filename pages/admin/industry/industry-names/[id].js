import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import IndustryNameForm from '../../../../components/admin/industry/IndustryNameForm';
import adminService from '../../../../services/admin.service';
import {   FaArrowLeft   } from '../../../../components/OptimizedIcons';

const IndustryNameEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isEdit = id && id !== 'create';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchData = async () => {
                const result = await adminService.getIndustryName(id);
                if (result.success) {
                    setData(result.data);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [id, isEdit]);

    if (loading) return <AdminLayout><Spinner /></AdminLayout>;

    return (
        <AdminLayout title="Industry Names">
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/industry/industry-names" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isEdit ? 'Edit Industry Name' : 'New Industry Name'}</h2>
            </div>

            <IndustryNameForm initialData={data} isEdit={isEdit} />
        </AdminLayout>
    );
};

export default IndustryNameEdit;
