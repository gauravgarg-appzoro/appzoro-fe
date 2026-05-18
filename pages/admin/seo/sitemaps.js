import React, { useState } from 'react';
import { Button, Row, Col, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import SitemapTable from '../../../components/admin/seo/SitemapTable';
import {   FaFilter, FaCog, FaChevronLeft, FaChevronRight   } from '../../../components/OptimizedIcons';

const SitemapsPage = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalEntries = 210;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    return (
        <AdminLayout title="Sitemaps">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0 text-dark">Sitemaps</h2>
                    <p className="text-secondary mb-0 small">{totalEntries} entries found</p>
                </div>
                <Link href="/admin/seo/sitemaps/create" passHref>
                    <Button variant="primary" className="px-4">
                        Add New Sitemaps
                    </Button>
                </Link>
            </div>

            {/* Filters and Settings Bar */}
            <Row className="mb-3 align-items-center">
                <Col md={6}>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="border bg-white text-dark d-flex align-items-center"
                            style={{ fontSize: '14px' }}
                        >
                            <FaFilter className="me-2" size={12} />
                            Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>All</Dropdown.Item>
                            <Dropdown.Item>Published</Dropdown.Item>
                            <Dropdown.Item>Draft</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                    <Button variant="link" className="text-secondary p-0">
                        <FaCog size={18} />
                    </Button>
                </Col>
            </Row>

            {/* Table */}
            <SitemapTable />

            {/* Pagination */}
            <Row className="mt-4 align-items-center">
                <Col md={6}>
                    <div className="d-flex align-items-center">
                        <span className="me-2 small text-secondary">Entries per page:</span>
                        <Form.Select
                            size="sm"
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                            style={{ width: '80px' }}
                            className="bg-white"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Form.Select>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <Button
                            variant="link"
                            size="sm"
                            className="text-secondary p-1"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <FaChevronLeft size={12} />
                        </Button>

                        <div className="d-flex gap-1">
                            {[1, 2, 21].map((page, idx) => (
                                <React.Fragment key={page}>
                                    {idx === 2 && <span className="px-2">...</span>}
                                    <Button
                                        variant={currentPage === page ? 'primary' : 'light'}
                                        size="sm"
                                        className={`px-3 ${currentPage === page ? '' : 'border'}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                </React.Fragment>
                            ))}
                        </div>

                        <Button
                            variant="link"
                            size="sm"
                            className="text-secondary p-1"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <FaChevronRight size={12} />
                        </Button>
                    </div>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default SitemapsPage;
