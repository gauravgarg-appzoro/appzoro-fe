import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { toast } from 'react-toastify';
import {   FaPlus, FaFilter, FaCog, FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaSearch   } from '../../../../components/OptimizedIcons';

const IndustryNames = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log('Fetching Industry Names...');
            const result = await adminService.getIndustryNames({ page, limit, search });
            console.log('Industry Names Result:', result);

            if (result.success) {
                setData(result.data);
            } else if (Array.isArray(result)) {
                setData(result);
            } else if (result.data && Array.isArray(result.data)) {
                setData(result.data);
            }

            const count = await adminService.getIndustryNamesCount({ search });
            if (count.success) setTotal(count.count);
        } catch (error) {
            console.error('Error fetching industry names:', error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, limit, search]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await adminService.deleteIndustryName(id);
            fetchData();
        }
    };

    return (
        <AdminLayout title="Industry Names">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Industry Names</h2>
                    <p className="text-secondary mb-0 small">{total} entries found</p>
                </div>
                <Link href="/admin/industry/industry-names/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Entry
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-3 rounded shadow-sm mb-3">
                <div className="d-flex gap-3">
                    <div className="flex-grow-1 position-relative">
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="ps-5 bg-light border-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                            <th className="py-3 border-0 fw-bold">ID</th>
                            <th className="py-3 border-0 fw-bold">Name</th>
                            <th className="py-3 border-0 fw-bold">Created At</th>
                            <th className="py-3 border-0 fw-bold">Published At</th>
                            <th className="py-3 border-0 text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-5"><Spinner animation="border" /></td></tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">
                                    No content found
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="ps-3"><Form.Check type="checkbox" /></td>
                                    <td>{item.id || item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                                    <td>
                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill">Published</span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <Link href={`/admin/industry/industry-names/${item.id || item._id}`} passHref>
                                            <Button variant="link" className="p-0 me-2 text-secondary"><FaEdit /></Button>
                                        </Link>
                                        <Button variant="link" className="p-0 text-danger" onClick={() => handleDelete(item.id || item._id)}><FaTrash /></Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top rounded shadow-sm">
                <div className="d-flex align-items-center">
                    <Form.Select size="sm" className="me-2" style={{ width: '70px' }} value={limit} onChange={(e) => setLimit(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </Form.Select>
                    <span className="text-secondary small fst-italic">entries per page</span>
                </div>

                <div className="d-flex align-items-center">
                    <Button variant="white" className="border rounded-start p-2" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <div className="d-flex border-top border-bottom">
                        <span className="px-3 py-1 text-secondary small">Page {page + 1}</span>
                    </div>
                    <Button variant="white" className="border rounded-end p-2" onClick={() => setPage(p => p + 1)}>
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default IndustryNames;
