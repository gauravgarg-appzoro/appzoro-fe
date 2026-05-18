import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Spinner, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import CareerTable from '../../../components/admin/career/CareerTable';
import adminService from '../../../services/admin.service';
import {   FaPlus, FaSearch, FaChevronLeft, FaChevronRight   } from '../../../components/OptimizedIcons';

const CareerList = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchCareers();
    }, [page, limit, debouncedSearch]);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const [listResult, countResult] = await Promise.all([
                adminService.getCareers({ page, limit, search: debouncedSearch }),
                adminService.getCareersCount({ search: debouncedSearch }),
            ]);
            if (listResult.success) {
                setCareers(Array.isArray(listResult.data) ? listResult.data : []);
            }
            if (countResult.success) {
                setTotalCount(countResult.count || 0);
            }
        } catch (error) {
            toast.error('Failed to fetch careers');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this career?')) {
            const result = await adminService.deleteCareer(id);
            if (result.success) {
                toast.success('Career deleted successfully');
                fetchCareers();
            } else {
                toast.error('Failed to delete career');
            }
        }
    };

    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    return (
        <AdminLayout title="Careers">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Careers</h2>
                    <p className="text-secondary mb-0 small">{totalCount} entries found</p>
                </div>
                <Link href="/admin/career/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Career
                    </Button>
                </Link>
            </div>

            <div className="mb-3">
                <InputGroup style={{ maxWidth: '280px' }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <FaSearch className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        type="search"
                        placeholder="Search by job title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <CareerTable careers={careers} onDelete={handleDelete} />
            )}

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top">
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
                    <Button variant="white" className="border rounded-start p-2" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <div className="d-flex border-top border-bottom">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                            <Button
                                key={i}
                                variant={page === i ? 'primary' : 'white'}
                                className={`rounded-0 border-0 px-3 py-1 ${page !== i ? 'text-secondary' : ''}`}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button variant="white" className="border rounded-end p-2" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CareerList;
