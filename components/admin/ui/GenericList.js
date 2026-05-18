import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaPlus } from '../../OptimizedIcons';

const GenericList = ({ title, addNewLabel, createPath, children }) => {
    return (
        <AdminLayout title={title}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{title}</h2>
                <Link href={createPath} passHref>
                    <Button variant="primary" className="d-flex align-items-center">
                        <FaPlus className="me-2" /> {addNewLabel}
                    </Button>
                </Link>
            </div>

            <div className="border border-secondary p-4 rounded shadow-sm">
                {children || <p className="text-secondary mb-0">No items yet. Click "Add New" to create one.</p>}
            </div>
        </AdminLayout>
    );
};

export default GenericList;
