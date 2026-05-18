import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Badge, Spinner, Modal, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../../lib/constants';
import {   FaPlus, FaFilter, FaCog, FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaSort   } from '../../../../components/OptimizedIcons';

const BlogWriters = () => {
    const [writers, setWriters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('name:ASC');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchWriters = async () => {
        setLoading(true);
        try {
            const [dataResult, countResult] = await Promise.all([
                adminService.getWriters({ page, limit, sort }),
                adminService.getWritersCount()
            ]);

            if (dataResult.success) {
                setWriters(dataResult.data);
            } else {
                toast.error('Failed to fetch writers');
            }

            if (countResult.success) {
                setTotalCount(countResult.count);
            }
        } catch (error) {
            toast.error('An error occurred loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWriters();
    }, [page, limit, sort]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(totalCount / limit)) {
            setPage(newPage);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        const result = await adminService.deleteWriter(deleteId);
        if (result.success) {
            toast.success('Writer deleted successfully');
            fetchWriters();
        } else {
            toast.error('Failed to delete writer');
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <AdminLayout title="Writers">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Writers</h2>
                    <p className="text-secondary mb-0 small">{totalCount} entries found</p>
                </div>
                <Link href="/admin/blogs/writers/create" passHref>
                    <Button variant="primary" className="d-flex align-items-center px-4">
                        <FaPlus className="me-2" size={12} /> Add New Writer
                    </Button>
                </Link>
            </div>

            {/* Content Table */}
            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                            <th className="py-3 border-0 fw-bold">Avatar</th>
                            <th className="py-3 border-0 fw-bold">Name <FaSort size={10} className="ms-1 text-secondary" style={{ cursor: 'pointer' }} onClick={() => setSort(sort === 'name:ASC' ? 'name:DESC' : 'name:ASC')} /></th>
                            <th className="py-3 border-0 fw-bold">Email</th>
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
                        ) : writers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">No writers found</td>
                            </tr>
                        ) : (
                            writers.map((writer) => {
                                const avatarUrl = writer.picture?.url
                                    ? (writer.picture.url.startsWith('http') ? writer.picture.url : `${STRAPI_IMAGE_BASE_URL}${writer.picture.url}`)
                                    : 'https://via.placeholder.com/40';

                                return (
                                    <tr key={writer.id || writer._id} className="border-bottom">
                                        <td className="ps-3"><Form.Check type="checkbox" /></td>
                                        <td>
                                            <Image
                                                src={avatarUrl}
                                                roundedCircle
                                                width={40}
                                                height={40}
                                                className="border"
                                                alt={writer.name}
                                            />
                                        </td>
                                        <td className="fw-medium text-dark">{writer.name}</td>
                                        <td className="text-secondary small">{writer.email || '-'}</td>
                                        <td className="text-end pe-3">
                                            <Link href={`/admin/blogs/writers/${writer.id || writer._id}`} passHref>
                                                <Button variant="link" className="p-0 me-3 text-secondary">
                                                    <FaEdit size={14} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="link"
                                                className="p-0 text-danger"
                                                onClick={() => confirmDelete(writer.id || writer._id)}
                                            >
                                                <FaTrash size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Pagination Section */}
            <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top">
                <div className="d-flex align-items-center">
                    <Form.Select
                        size="sm"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(0);
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
                    <Button
                        variant="white"
                        className="border rounded-start p-2"
                        disabled={page === 0}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <FaChevronLeft size={12} className="text-secondary" />
                    </Button>
                    <div className="d-flex border-top border-bottom px-3 py-1 align-items-center">
                        <span className="small">Page {page + 1} of {totalPages || 1}</span>
                    </div>
                    <Button
                        variant="white"
                        className="border rounded-end p-2"
                        disabled={page >= totalPages - 1}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <FaChevronRight size={12} className="text-secondary" />
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this writer? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default BlogWriters;
