import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import UrlRedirectionTable from '../../../components/admin/seo/UrlRedirectionTable';

const UrlRedirectionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <AdminLayout title="Url Redirection Management">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0 text-dark">Url Redirection Management</h2>
                </div>
                <Link href="/admin/seo/url-redirections/create" passHref>
                    <Button variant="primary" className="px-4">
                        Add Url Redirection
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <Row className="mb-3">
                <Col md={12}>
                    <div className="d-flex justify-content-end">
                        <Form.Control
                            type="text"
                            placeholder="Search:"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '300px' }}
                            className="bg-white"
                        />
                    </div>
                </Col>
            </Row>

            {/* Table */}
            <UrlRedirectionTable searchTerm={searchTerm} />
        </AdminLayout>
    );
};

export default UrlRedirectionsPage;
