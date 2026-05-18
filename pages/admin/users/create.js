import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service.js';
import { toast } from 'react-toastify';
import {   FaArrowLeft, FaSave, FaUserPlus   } from '../../../components/OptimizedIcons';

const CreateUserPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Admin',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await adminService.createUser(formData);
            if (result.success) {
                toast.success('User created successfully');
                window.location.href = '/admin/users';
                return;
            }
            toast.error(result.error || 'Failed to create user');
            setLoading(false);
        } catch (error) {
            toast.error('An error occurred while creating the user');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AdminLayout title="Create User">
            <div className="mb-4">
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/users">User Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create User</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex align-items-center gap-3">
                    <Link href="/admin/users" passHref legacyBehavior>
                        <Button variant="outline-secondary" size="sm">
                            <FaArrowLeft /> Back
                        </Button>
                    </Link>
                    <h2 className="fw-bold mb-0">Create New User</h2>
                </div>
            </div>

            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <FaUserPlus className="text-primary" size={20} />
                                <h5 className="mb-0 fw-bold">User Information</h5>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="username">
                                            <Form.Label className="fw-bold small text-uppercase">Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                placeholder="Enter username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label className="fw-bold small text-uppercase">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="user@appzoro.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group controlId="password">
                                            <Form.Label className="fw-bold small text-uppercase">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength={6}
                                            />
                                            <Form.Text className="text-muted">
                                                Minimum 6 characters.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="role">
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
                                    </Col>
                                </Row>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-end gap-2">
                                    <Link href="/admin/users" passHref legacyBehavior>
                                        <Button variant="light" disabled={loading}>Cancel</Button>
                                    </Link>
                                    <Button variant="primary" type="submit" disabled={loading} className="px-4">
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <FaSave className="me-2" /> Create User
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default CreateUserPage;
