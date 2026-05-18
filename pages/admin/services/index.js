import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Modal } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import ServicesTable from '../../../components/admin/services/ServicesTable';
import { AdminServiceProvider, useAdminService } from '../../../components/admin/services/AdminServiceContext';
import {   FaPlus, FaCog, FaFilter, FaChevronLeft, FaChevronRight, FaTimes   } from '../../../components/OptimizedIcons';

/**
 * Filter Modal Component
 */
const FilterModal = ({ show, onHide }) => {
    const { filters, setFilters, resetFilters } = useAdminService();
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        if (show) {
            setLocalFilters(filters);
        }
    }, [show, filters]);

    const handleApply = () => {
        setFilters(localFilters);
        onHide();
    };

    const handleReset = () => {
        resetFilters();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Filter Services</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Search by Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title to search..."
                        value={localFilters.serviceTitle || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, serviceTitle: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Search by Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter slug to search..."
                        value={localFilters.search || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-0">
                    <Form.Check
                        type="switch"
                        id="services-show-drafts"
                        label="Show Drafts"
                        checked={!!localFilters.includeDrafts}
                        onChange={(e) => setLocalFilters({ ...localFilters, includeDrafts: e.target.checked })}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="primary" onClick={handleApply}>
                    Apply Filters
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/**
 * Active Filters Display
 */
const ActiveFilters = () => {
    const { filters, setFilters } = useAdminService();
    const activeFilters = [];

    if (filters.search) {
        activeFilters.push({
            label: `Slug: "${filters.search}"`,
            onRemove: () => setFilters({ ...filters, search: '' }),
        });
    }

    if (filters.serviceTitle) {
        activeFilters.push({
            label: `Title: "${filters.serviceTitle}"`,
            onRemove: () => setFilters({ ...filters, serviceTitle: '' }),
        });
    }

    if (filters.includeDrafts) {
        activeFilters.push({
            label: 'Showing drafts',
            onRemove: () => setFilters({ ...filters, includeDrafts: false }),
        });
    }

    if (activeFilters.length === 0) return null;

    return (
        <div className="d-flex flex-wrap gap-2 mb-3">
            {activeFilters.map((filter, idx) => (
                <span key={idx} className="badge bg-light text-dark border d-flex align-items-center py-2 px-3">
                    {filter.label}
                    <Button
                        variant="link"
                        className="p-0 ms-2 text-dark"
                        onClick={filter.onRemove}
                    >
                        <FaTimes size={10} />
                    </Button>
                </span>
            ))}
        </div>
    );
};

/**
 * Pagination Component
 */
const Pagination = () => {
    const { currentPage, entriesPerPage, totalServices, setPage, setEntriesPerPage } = useAdminService();
    const totalPages = Math.ceil(totalServices / entriesPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            pages.push(0);
            if (currentPage > 2) pages.push('...');

            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages - 2, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 3) pages.push('...');
            pages.push(totalPages - 1);
        }
        return pages;
    };

    return (
        <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top">
            <div className="d-flex align-items-center">
                <Form.Select
                    size="sm"
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="me-2"
                    style={{ width: '70px' }}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </Form.Select>
                <span className="text-secondary small fst-italic">entries per page</span>
            </div>

            <div className="d-flex align-items-center">
                <Button
                    variant="white"
                    className="border rounded-start p-2"
                    disabled={currentPage === 0}
                    onClick={handlePrevious}
                >
                    <FaChevronLeft size={12} className="text-secondary" />
                </Button>
                <div className="d-flex border-top border-bottom">
                    {getPageNumbers().map((page, idx) => (
                        page === '...' ? (
                            <span key={idx} className="px-3 py-1 text-secondary">...</span>
                        ) : (
                            <Button
                                key={idx}
                                variant={page === currentPage ? 'primary' : 'white'}
                                className={`rounded-0 ${page !== currentPage ? 'border-start border-end-0 text-secondary' : 'border-0'} px-3 py-1`}
                                onClick={() => setPage(page)}
                            >
                                {page + 1}
                            </Button>
                        )
                    ))}
                </div>
                <Button
                    variant="white"
                    className="border rounded-end p-2"
                    disabled={currentPage >= totalPages - 1}
                    onClick={handleNext}
                >
                    <FaChevronRight size={12} className="text-secondary" />
                </Button>
            </div>
        </div>
    );
};

/**
 * Services List Content (inside provider)
 */
const ServicesListContent = () => {
    const { totalServices, fetchServices, currentPage, entriesPerPage, sort, filters } = useAdminService();
    const [showFilters, setShowFilters] = useState(false);

    // Fetch services on mount and when dependencies change
    useEffect(() => {
        fetchServices();
    }, [currentPage, entriesPerPage, sort, filters, fetchServices]);

    return (
        <AdminLayout title="Services Management">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Services</h2>
                    <p className="text-secondary mb-0 small">{totalServices} entries found</p>
                </div>
                <Link href="/admin/services/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Services
                    </Button>
                </Link>
            </div>

            {/* Filter and Settings Bar */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button
                    variant="light"
                    className="border d-flex align-items-center bg-white"
                    onClick={() => setShowFilters(true)}
                >
                    <FaFilter className="me-2 text-secondary" size={12} /> Filters
                </Button>
                <Button variant="light" className="border d-flex align-items-center bg-white p-2">
                    <FaCog className="text-secondary" />
                </Button>
            </div>

            {/* Active Filters */}
            <ActiveFilters />

            {/* Content Table */}
            <ServicesTable />

            {/* Pagination Section */}
            <Pagination />

            {/* Filter Modal */}
            <FilterModal show={showFilters} onHide={() => setShowFilters(false)} />
        </AdminLayout>
    );
};

/**
 * Services List Page
 * 
 * Wraps content with AdminServiceProvider for state management.
 */
const ServicesList = () => {
    return (
        <AdminServiceProvider>
            <ServicesListContent />
        </AdminServiceProvider>
    );
};

// Force server-side rendering for admin pages
export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default ServicesList;
