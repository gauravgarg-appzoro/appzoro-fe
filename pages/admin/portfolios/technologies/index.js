import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { AdminPagination } from '../../../../components/admin/ui';
import {   FaPlus, FaEdit, FaTrash, FaSort   } from '../../../../components/OptimizedIcons';

const TechnologiesList = () => {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('techTitle:ASC');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchTechnologies = async () => {
        setLoading(true);
        try {
            const [result, countResult] = await Promise.all([
                adminService.getTechnologies({ page, limit, sort }),
                adminService.getTechnologiesCount(),
            ]);
            if (result.success) setTechnologies(result.data);
            else toast.error('Failed to fetch technologies');
            if (countResult.success) setTotal(countResult.count);
        } catch (error) {
            toast.error('An error occurred loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnologies();
    }, [page, limit, sort]);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await adminService.deleteTechnology(deleteId);
        if (result.success) {
            toast.success('Technology deleted successfully');
            fetchTechnologies();
        } else {
            toast.error('Failed to delete technology');
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <AdminLayout title="Technologies">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Technologies</h2>
                    <p className="text-secondary mb-0 small">{total} entries found</p>
                </div>
                <Link href="/admin/portfolios/technologies/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Technology
                    </Button>
                </Link>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                            <th className="py-3 border-0 fw-bold">
                                Title
                                <FaSort size={10} className="ms-1 text-secondary" style={{ cursor: 'pointer' }} onClick={() => setSort(sort === 'techTitle:ASC' ? 'techTitle:DESC' : 'techTitle:ASC')} />
                            </th>
                            <th className="py-3 border-0 fw-bold">Slug</th>
                            <th className="py-3 border-0 fw-bold">Description</th>
                            <th className="py-3 border-0 fw-bold">Created At</th>
                            <th className="py-3 border-0 text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                        ) : technologies.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">No technologies found</td>
                            </tr>
                        ) : (
                            technologies.map((tech) => (
                                <tr key={tech.id || tech._id} className="border-bottom">
                                    <td className="ps-3"><Form.Check type="checkbox" /></td>
                                    <td className="fw-medium text-dark">{tech.techTitle}</td>
                                    <td className="text-secondary small">{tech.slug}</td>
                                    <td className="text-secondary small text-truncate" style={{ maxWidth: '200px' }}>{tech.techShortDescription}</td>
                                    <td className="text-secondary small">{tech.createdAt ? new Date(tech.createdAt).toLocaleDateString() : '-'}</td>
                                    <td className="text-end pe-3">
                                        <Link href={`/admin/portfolios/technologies/${tech.id || tech._id}`} passHref>
                                            <Button variant="link" className="p-0 me-3 text-secondary">
                                                <FaEdit size={14} />
                                            </Button>
                                        </Link>
                                        <Button variant="link" className="p-0 text-danger" onClick={() => confirmDelete(tech.id || tech._id)}>
                                            <FaTrash size={14} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <AdminPagination
                page={page}
                total={total}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={(newLimit) => { setLimit(newLimit); setPage(0); }}
            />

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this technology?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default TechnologiesList;
