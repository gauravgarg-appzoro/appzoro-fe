import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import SitemapForm from '../../../../components/admin/seo/SitemapForm';
import {   FaArrowLeft   } from '../../../../components/OptimizedIcons';

const SitemapEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const mockData = isNew ? {} : {
        url: 'https://appzoro.com/10-mobile-app-development',
        lastmod: 'Friday, October 22nd 2021 22:30',
        priority: '0.9',
    };

    return (
        <AdminLayout title={isNew ? 'Create Sitemap' : 'Edit Sitemap'}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Link href="/admin/seo/sitemaps" passHref>
                        <Button variant="link" className="text-dark p-0 me-3">
                            <FaArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="fw-bold mb-0 text-dark">{isNew ? 'Create an entry' : 'Edit Sitemap'}</h2>
                        <p className="text-secondary mb-0 small">API ID : sitemap</p>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="light" className="px-4 border" disabled>Publish</Button>
                    <Button variant="light" className="px-4 border" disabled>Save</Button>
                </div>
            </div>

            <SitemapForm initialData={mockData} />
        </AdminLayout>
    );
};

export default SitemapEdit;
