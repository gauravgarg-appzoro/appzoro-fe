import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import {   FaPlus, FaFilter, FaEdit, FaTrash, FaSort   } from '../../../../components/OptimizedIcons';

const IndustriesList = () => {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('name:ASC');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchIndustries = async () => {
        setLoading(true);
        try {
            const result = await adminService.getIndustryNames({ page, limit, sort });
            if (result.success) {
                setIndustries(result.data);
            } else {
                toast.error('Failed to fetch industries');
            }
        } catch (error) {
            toast.error('An error occurred loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIndustries();
    }, [page, limit, sort]);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await adminService.deleteIndustryName(deleteId);
        if (result.success) {
            toast.success('Industry deleted successfully');
            fetchIndustries();
        } else {
            toast.error('Failed to delete industry');
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <AdminLayout title="Industries">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Industries</h2>
                    <p className="text-secondary mb-0 small">Manage portfolio industries</p>
                </div>
                <Link href="/admin/portfolios/industries/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Industry
                    </Button>
                </Link>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                            <th className="py-3 border-0 fw-bold">Name <FaSort size={10} className="ms-1 text-secondary" style={{ cursor: 'pointer' }} onClick={() => setSort(sort === 'name:ASC' ? 'name:DESC' : 'name:ASC')} /></th>
                            <th className="py-3 border-0 text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                        ) : industries.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-muted">No industries found</td>
                            </tr>
                        ) : (
                            industries.map((ind) => (
                                <tr key={ind.id || ind._id} className="border-bottom">
                                    <td className="ps-3"><Form.Check type="checkbox" /></td>
                                    <td className="fw-medium text-dark">{ind.name}</td>
                                    <td className="text-end pe-3">
                                        <Link href={`/admin/portfolios/industries/${ind.id || ind._id}`} passHref>
                                            <Button variant="link" className="p-0 me-3 text-secondary">
                                                <FaEdit size={14} />
                                            </Button>
                                        </Link>
                                        <Button variant="link" className="p-0 text-danger" onClick={() => confirmDelete(ind.id || ind._id)}>
                                            <FaTrash size={14} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this industry?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default IndustriesList;
