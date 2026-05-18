import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Spinner, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import PressTable from '../../../components/admin/press/PressTable';
import adminService from '../../../services/admin.service';
import {   FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaTrash   } from '../../../components/OptimizedIcons';

const PressList = () => {
    const [presses, setPresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchPresses();
    }, [debouncedSearch, page, limit]);

    const fetchPresses = async () => {
        setLoading(true);
        try {
            const [listResult, countResult] = await Promise.all([
                adminService.getPressList({ page, limit, search: debouncedSearch }),
                adminService.getPressCount({ search: debouncedSearch }),
            ]);
            if (listResult.success) {
                setPresses(Array.isArray(listResult.data) ? listResult.data : []);
            }
            if (countResult.success) {
                setTotalCount(countResult.count || 0);
            }
        } catch (error) {
            toast.error('Failed to fetch press releases');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this press release?')) {
            const result = await adminService.deletePress(id);
            if (result.success) {
                toast.success('Press release deleted successfully');
                fetchPresses();
            } else {
                toast.error('Failed to delete press release');
            }
        }
    };

    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    return (
        <AdminLayout title="Press Release Management">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div className="mb-3 mb-md-0">
                    <h2 className="fw-bold mb-1">Press Releases</h2>
                    <p className="text-secondary mb-0 small">{totalCount} press release{totalCount !== 1 ? 's' : ''} found</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0">
                            <FaSearch className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search press releases..."
                            className="border-start-0 ps-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    <Link href="/admin/press/create" passHref>
                        <Button variant="primary" className="d-flex align-items-center px-4 text-nowrap">
                            <FaPlus className="me-2" size={12} /> Add New
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <PressTable presses={presses} onDelete={handleDelete} />
            )}

            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top rounded-bottom">
                <div className="d-flex align-items-center">
                    <Form.Select
                        size="sm"
                        value={limit}
                        onChange={(e) => { setLimit(Number(e.target.value)); setPage(0); }}
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
                    <span className="me-3 text-secondary small">
                        Page {page + 1} of {totalPages}
                    </span>
                    <Button
                        variant="white"
                        className="border rounded-start p-2"
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                    >
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <Button
                        variant="white"
                        className="border rounded-end p-2"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => p + 1)}
                    >
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PressList;
