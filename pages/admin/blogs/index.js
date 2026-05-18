import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Row, Col, Button, Dropdown, Form, Modal } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import BlogTable from '../../../components/admin/blogs/BlogTable';
import { AdminBlogProvider, useAdminBlog } from '../../../components/admin/blogs/AdminBlogContext';
import { FaPlus, FaFilter, FaCog, FaChevronLeft, FaChevronRight, FaTimes } from '../../../components/OptimizedIcons';

/**
 * Filter Modal Component
 */
const FilterModal = ({ show, onHide }) => {
    const { filters, setFilters, resetFilters, categories, fetchDropdowns } = useAdminBlog();
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        if (show) {
            fetchDropdowns();
            setLocalFilters(filters);
        }
    }, [show, fetchDropdowns, filters]);

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
                <Modal.Title>Filter Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group className="mb-3">
                    <Form.Label>Search by Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter search term..."
                        value={localFilters.search}
                        onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={localFilters.category}
                        onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Archive (Month & Year)</Form.Label>
                    <Form.Control
                        type="month"
                        value={(() => {
                            // Convert slug (february-2026) back to YYYY-MM for input
                            if (!localFilters.archive) return '';
                            const parts = localFilters.archive.split('-');
                            if (parts.length !== 2) return '';
                            const monthName = parts[0];
                            const year = parts[1];
                            const months = [
                                "january", "february", "march", "april", "may", "june",
                                "july", "august", "september", "october", "november", "december"
                            ];
                            const monthIndex = months.indexOf(monthName.toLowerCase());
                            if (monthIndex === -1) return '';
                            // Month is 0-indexed, pad with leading zero
                            const monthStr = (monthIndex + 1).toString().padStart(2, '0');
                            return `${year}-${monthStr}`;
                        })()}
                        onChange={(e) => {
                            // Convert YYYY-MM back to slug (february-2026)
                            const val = e.target.value;
                            if (!val) {
                                setLocalFilters({ ...localFilters, archive: '' });
                                return;
                            }
                            const [year, month] = val.split('-');
                            const months = [
                                "january", "february", "march", "april", "may", "june",
                                "july", "august", "september", "october", "november", "december"
                            ];
                            const monthName = months[parseInt(month, 10) - 1];
                            const slug = `${monthName}-${year}`;
                            setLocalFilters({ ...localFilters, archive: slug });
                        }}
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
    const { filters, setFilters, categories } = useAdminBlog();
    const activeFilters = [];

    if (filters.status !== 'all') {
        activeFilters.push({
            label: `Status: ${filters.status}`,
            onRemove: () => setFilters({ status: 'all' }),
        });
    }
    if (filters.search) {
        activeFilters.push({
            label: `Search: "${filters.search}"`,
            onRemove: () => setFilters({ search: '' }),
        });
    }
    if (filters.category) {
        const cat = categories.find(c => c.id === filters.category);
        activeFilters.push({
            label: `Category: ${cat?.name || filters.category}`,
            onRemove: () => setFilters({ category: '' }),
        });
    }
    if (filters.archive) {
        // Parse slug (february-2026) to friendly name (February 2026)
        let label = filters.archive;
        const parts = filters.archive.split('-');
        if (parts.length === 2) {
            const month = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const year = parts[1];
            label = `${month} ${year}`;
        }

        activeFilters.push({
            label: `Archive: ${label}`,
            onRemove: () => setFilters({ archive: '' }),
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
    const { currentPage, entriesPerPage, totalPosts, setPage, setEntriesPerPage } = useAdminBlog();
    const totalPages = Math.ceil(totalPosts / entriesPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setPage(currentPage + 1);
    };

    // Generate page numbers to show
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
 * Blog List Content (inside provider)
 */
const BlogListContent = () => {
    const { totalPosts, fetchPosts, currentPage, entriesPerPage, sort, filters } = useAdminBlog();
    const [showFilters, setShowFilters] = useState(false);

    // Fetch posts on mount and when dependencies change
    useEffect(() => {
        fetchPosts();
    }, [currentPage, entriesPerPage, sort, filters, fetchPosts]);

    return (
        <AdminLayout title="Blog Management">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Posts</h2>
                    <p className="text-secondary mb-0 small">{totalPosts} entries found</p>
                </div>
                <Link href="/admin/blogs/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Posts
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
            <BlogTable />

            {/* Pagination Section */}
            <Pagination />

            {/* Filter Modal */}
            <FilterModal show={showFilters} onHide={() => setShowFilters(false)} />
        </AdminLayout>
    );
};

/**
 * Blog List Page
 * 
 * Wraps content with AdminBlogProvider for state management.
 */
const BlogList = () => {
    return (
        <AdminBlogProvider>
            <BlogListContent />
        </AdminBlogProvider>
    );
};

// Force server-side rendering for admin pages
export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default BlogList;
