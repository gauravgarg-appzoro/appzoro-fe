import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Spinner, Modal, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { AdminPagination } from '../../../../components/admin/ui';
import { STRAPI_IMAGE_BASE_URL } from '../../../../lib/constants';
import {   FaPlus, FaEdit, FaTrash, FaSort   } from '../../../../components/OptimizedIcons';

const TechStacksList = () => {
    const [techStacks, setTechStacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('tech_name:ASC');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchTechStacks = async () => {
        setLoading(true);
        try {
            const [result, countResult] = await Promise.all([
                adminService.getTechStacks({ page, limit, sort }),
                adminService.getTechStacksCount(),
            ]);
            if (result.success) setTechStacks(result.data);
            else toast.error('Failed to fetch tech stacks');
            if (countResult.success) setTotal(countResult.count);
        } catch (error) {
            toast.error('An error occurred loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechStacks();
    }, [page, limit, sort]);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await adminService.deleteTechStack(deleteId);
        if (result.success) {
            toast.success('Tech stack deleted successfully');
            fetchTechStacks();
        } else {
            toast.error('Failed to delete tech stack');
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <AdminLayout title="Tech Stacks">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Tech Stacks</h2>
                    <p className="text-secondary mb-0 small">{total} entries found</p>
                </div>
                <Link href="/admin/portfolios/tech-stacks/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Tech Stack
                    </Button>
                </Link>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                            <th className="py-3 border-0 fw-bold">Icon</th>
                            <th className="py-3 border-0 fw-bold">
                                Name
                                <FaSort size={10} className="ms-1 text-secondary" style={{ cursor: 'pointer' }} onClick={() => setSort(sort === 'tech_name:ASC' ? 'tech_name:DESC' : 'tech_name:ASC')} />
                            </th>
                            <th className="py-3 border-0 fw-bold">Created At</th>
                            <th className="py-3 border-0 text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                        ) : techStacks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">No tech stacks found</td>
                            </tr>
                        ) : (
                            techStacks.map((stack) => (
                                <tr key={stack.id || stack._id} className="border-bottom">
                                    <td className="ps-3"><Form.Check type="checkbox" /></td>
                                    <td>
                                        {stack.techIcon?.url && (
                                            <Image
                                                src={`${STRAPI_IMAGE_BASE_URL}${stack.techIcon.url}`}
                                                width={30}
                                                height={30}
                                                className="rounded-circle"
                                                alt={stack.tech_name}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    </td>
                                    <td className="fw-medium text-dark">{stack.tech_name}</td>
                                    <td className="text-secondary small">{stack.createdAt ? new Date(stack.createdAt).toLocaleDateString() : '—'}</td>
                                    <td className="text-end pe-3">
                                        <Link href={`/admin/portfolios/tech-stacks/${stack.id || stack._id}`} passHref>
                                            <Button variant="link" className="p-0 me-3 text-secondary">
                                                <FaEdit size={14} />
                                            </Button>
                                        </Link>
                                        <Button variant="link" className="p-0 text-danger" onClick={() => confirmDelete(stack.id || stack._id)}>
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
                <Modal.Body>Are you sure you want to delete this tech stack?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default TechStacksList;
