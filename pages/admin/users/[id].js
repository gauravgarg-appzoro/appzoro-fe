import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Card, Form, Button, Breadcrumb, Alert } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service.js';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';
import {   FaArrowLeft, FaSave, FaUserEdit, FaLock   } from '../../../components/OptimizedIcons';

const EditUserPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'Admin',
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const result = await adminService.getUserById(id);
            if (result.success) {
                setFormData({
                    username: result.data.username,
                    email: result.data.email,
                    role: result.data.role || 'Admin',
                });
            } else {
                setError(result.error || 'Failed to fetch user');
            }
        } catch (error) {
            setError('An error occurred while fetching the user');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const result = await adminService.updateUser(id, formData);
            if (result.success) {
                toast.success('User updated successfully');
            } else {
                toast.error(result.error || 'Failed to update user');
            }
        } catch (error) {
            toast.error('An error occurred while updating the user');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setSaving(true);
        try {
            const result = await adminService.updateUser(id, { password: passwordData.newPassword });
            if (result.success) {
                toast.success('Password updated successfully');
                setPasswordData({ newPassword: '', confirmPassword: '' });
            } else {
                toast.error(result.error || 'Failed to update password');
            }
        } catch (error) {
            toast.error('An error occurred while updating the password');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <Loader />;

    return (
        <AdminLayout title="Edit User">
            <div className="mb-4">
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/users">User Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit User</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex align-items-center gap-3">
                    <Link href="/admin/users" passHref legacyBehavior>
                        <Button variant="outline-secondary" size="sm">
                            <FaArrowLeft /> Back
                        </Button>
                    </Link>
                    <h2 className="fw-bold mb-0">Edit User</h2>
                </div>
            </div>

            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

            <Row>
                <Col lg={7}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <FaUserEdit className="text-primary" size={20} />
                                <h5 className="mb-0 fw-bold">General Information</h5>
                            </div>

                            <Form onSubmit={handleUpdateInfo}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="fw-bold small text-uppercase">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="fw-bold small text-uppercase">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="role">
                                    <Form.Label className="fw-bold small text-uppercase">Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Editor">Editor</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={saving}>
                                    {saving ? 'Saving...' : <><FaSave className="me-2" /> Save Changes</>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={5}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <FaLock className="text-warning" size={18} />
                                <h5 className="mb-0 fw-bold">Change Password</h5>
                            </div>

                            <Form onSubmit={handleUpdatePassword}>
                                <Form.Group className="mb-3" controlId="newPassword">
                                    <Form.Label className="fw-bold small text-uppercase">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        placeholder="Enter new password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength={6}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="confirmPassword">
                                    <Form.Label className="fw-bold small text-uppercase">Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength={6}
                                    />
                                </Form.Group>

                                <Button variant="warning" type="submit" disabled={saving}>
                                    {saving ? 'Updating...' : <><FaLock className="me-2" /> Update Password</>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default EditUserPage;
