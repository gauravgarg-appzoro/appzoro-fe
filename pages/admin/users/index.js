import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Row, Col, Button, Form, Table, Card, Badge, Pagination } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service.js';
import { toast } from 'react-toastify';
import {   FaPlus, FaSearch, FaEdit, FaTrash, FaUserShield, FaUserCircle   } from '../../../components/OptimizedIcons';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const [usersRes, countRes] = await Promise.all([
                adminService.getAllUsers({ page, limit, search: searchTerm }),
                adminService.getUsersCount({ search: searchTerm })
            ]);

            if (usersRes.success) {
                setUsers(usersRes.data);
            }
            if (countRes.success) {
                setTotalCount(countRes.count);
            }
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (id, username) => {
        if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
            try {
                const result = await adminService.deleteUser(id);
                if (result.success) {
                    toast.success('User deleted successfully');
                    fetchUsers();
                } else {
                    toast.error(result.error || 'Failed to delete user');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the user');
            }
        }
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <AdminLayout title="User Management">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0">User Management</h2>
                    <p className="text-secondary small">Manage admin and moderator access</p>
                </div>
                <Link href="/admin/users/create" passHref legacyBehavior>
                    <Button variant="primary" className="d-flex align-items-center gap-2">
                        <FaPlus /> Create User
                    </Button>
                </Link>
            </div>

            <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-0">
                    <div className="p-3 border-bottom">
                        <Row className="align-items-center">
                            <Col md={4}>
                                <div className="position-relative">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by username..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setPage(0);
                                        }}
                                        className="ps-5"
                                    />
                                    <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Table responsive hover className="mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 text-uppercase small fw-bold">User</th>
                                <th className="py-3 text-uppercase small fw-bold">Email</th>
                                <th className="py-3 text-uppercase small fw-bold">Role</th>
                                <th className="py-3 text-center text-uppercase small fw-bold" style={{ width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                        Loading users...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="ps-4 py-3 align-middle">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light rounded-circle p-2 text-primary">
                                                    <FaUserCircle size={24} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{user.username}</div>
                                                    <div className="text-muted small">ID: {user._id.substring(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 align-middle">{user.email}</td>
                                        <td className="py-3 align-middle">
                                            <Badge bg="info" className="text-dark py-2 px-3 fw-normal">
                                                <FaUserShield className="me-1" /> {user.role || 'Admin'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 align-middle text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link href={`/admin/users/${user._id}`} passHref legacyBehavior>
                                                    <Button variant="outline-primary" size="sm" title="Edit">
                                                        <FaEdit />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    title="Delete"
                                                    onClick={() => handleDelete(user._id, user.username)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>

                    {totalPages > 1 && (
                        <div className="p-3 d-flex justify-content-between align-items-center bg-light border-top">
                            <div className="text-muted small">
                                Showing {users.length} of {totalCount} users
                            </div>
                            <Pagination className="mb-0">
                                <Pagination.Prev
                                    disabled={page === 0}
                                    onClick={() => setPage(page - 1)}
                                />
                                {[...Array(totalPages)].map((_, i) => (
                                    <Pagination.Item
                                        key={i}
                                        active={i === page}
                                        onClick={() => setPage(i)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    disabled={page === totalPages - 1}
                                    onClick={() => setPage(page + 1)}
                                />
                            </Pagination>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </AdminLayout>
    );
};

export default UserListPage;
