import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import RobotsTxtForm from '../../../components/admin/seo/RobotsTxtForm';

const RobotsTxtPage = () => {
    return (
        <AdminLayout title="Robot page content Edit">
            <div className="mb-4">
                <h2 className="fw-bold mb-0 text-dark">Robot page content Edit</h2>
            </div>

            <RobotsTxtForm />
        </AdminLayout>
    );
};

export default RobotsTxtPage;
