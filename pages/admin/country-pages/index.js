import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import CountryPageTable from '../../../components/admin/country-pages/CountryPageTable';
import adminService from '../../../services/admin.service';
import {   FaPlus, FaFilter, FaCog, FaChevronLeft, FaChevronRight   } from '../../../components/OptimizedIcons';

const CountryPages = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [countryPages, setCountryPages] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(0);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchCountryPages();
    }, [currentPage, entriesPerPage, debouncedSearch]);

    const fetchCountryPages = async () => {
        setLoading(true);
        try {
            const [listResult, countResult] = await Promise.all([
                adminService.getCountryPages({
                    page: currentPage,
                    limit: Number(entriesPerPage) || 10,
                    search: debouncedSearch,
                }),
                adminService.getCountryPagesCount({ search: debouncedSearch }),
            ]);
            if (listResult.success) {
                setCountryPages(Array.isArray(listResult.data) ? listResult.data : []);
            }
            if (countResult.success) {
                setTotalCount(countResult.count ?? 0);
            }
        } catch (error) {
            toast.error('Failed to fetch country pages');
            console.error(error);
            setCountryPages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await adminService.deleteCountryPage(id);
                toast.success('Country page deleted successfully');
                fetchCountryPages();
            } catch (error) {
                toast.error('Failed to delete country page');
                console.error(error);
            }
        }
    };

    return (
        <AdminLayout title="Country Pages">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Country Pages</h2>
                    <p className="text-secondary mb-0 small">{totalCount} entries found</p>
                </div>
                <Link href="/admin/country-pages/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New CountryPages
                    </Button>
                </Link>
            </div>

            {/* Filter and Settings Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Control
                    type="search"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-auto"
                    style={{ maxWidth: '280px' }}
                />
                <Button variant="light" className="border d-flex align-items-center bg-white p-2">
                    <FaCog className="text-secondary" />
                </Button>
            </div>

            {/* Content Table */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <CountryPageTable countryPages={countryPages} onDelete={handleDelete} />
            )}

            {/* Pagination Section */}
            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top">
                <div className="d-flex align-items-center">
                    <Form.Select
                        size="sm"
                        value={entriesPerPage}
                        onChange={(e) => {
                            setEntriesPerPage(Number(e.target.value) || 10);
                            setCurrentPage(0);
                        }}
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
                    {(() => {
                        const totalPages = Math.max(1, Math.ceil(totalCount / (Number(entriesPerPage) || 10)));
                        return (
                            <>
                                <Button
                                    variant="white"
                                    className="border rounded-start p-2"
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                >
                                    <FaChevronLeft size={12} className="text-secondary" />
                                </Button>
                                <span className="px-3 py-1 text-secondary small">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <Button
                                    variant="white"
                                    className="border rounded-end p-2"
                                    disabled={currentPage >= totalPages - 1}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                >
                                    <FaChevronRight size={12} className="text-secondary" />
                                </Button>
                            </>
                        );
                    })()}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CountryPages;
