import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import IndustryNameForm from '../../../../components/admin/industry/IndustryNameForm';
import {   FaArrowLeft   } from '../../../../components/OptimizedIcons';

const IndustryNameCreate = () => {
    return (
        <AdminLayout title="Industry Names">
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/industry/industry-names" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">Industry Names</h2>
            </div>

            <IndustryNameForm />
        </AdminLayout>
    );
};

export default IndustryNameCreate;
