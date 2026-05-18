import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import authService from '../../services/auth.service.js';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authService.isAuthenticated()) {
            router.push('/admin');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await authService.login(email, password);
            if (result.success) {
                router.push('/admin');
            } else {
                setError(result.error || 'Invalid email or password');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Login | AppZoro Admin</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="admin-login-page">
                <div className="admin-login-bg" />
                <Container className="position-relative">
                    <Row className="min-vh-100 align-items-center justify-content-center py-5">
                        <Col xs={11} sm={10} md={8} lg={5} xl={4}>
                            <div className="admin-login-card">
                                <div className="admin-login-card-inner">
                                    <div className="text-center mb-4">
                                        <div className="admin-login-logo-wrap">
                                            <Image
                                                src="/assets/images/appzoro-logo.svg"
                                                alt="AppZoro"
                                                width={200}
                                                height={66}
                                                priority
                                                
                                            />
                                        </div>
                                        <p className="admin-login-subtitle mt-3 mb-0">Admin Control Panel</p>
                                    </div>

                                    <Card className="admin-login-form-card border-0 shadow">
                                        <Card.Body className="p-4 p-md-5">
                                            <h4 className="text-center mb-4 fw-bold">Sign in</h4>

                                            {error && (
                                                <Alert variant="danger" className="rounded-3" dismissible onClose={() => setError('')}>
                                                    {error}
                                                </Alert>
                                            )}

                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="email">
                                                    <Form.Label className="fw-medium">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="admin@appzoro.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        autoFocus
                                                        className="form-control-lg rounded-3 border-2"
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-4" controlId="password">
                                                    <Form.Label className="fw-medium">Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        className="form-control-lg rounded-3 border-2"
                                                    />
                                                </Form.Group>

                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-100 fw-semibold rounded-3 py-3 admin-login-btn"
                                                >
                                                    {loading ? 'Signing in…' : 'Sign in'}
                                                </Button>

                                                <p className="text-center text-muted small mt-4 mb-0">
                                                    Need access? Contact the super admin.
                                                </p>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <style jsx global>{`
                .admin-login-page {
                    min-height: 100vh;
                    position: relative;
                    background: linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                }
                .admin-login-bg {
                    position: fixed;
                    inset: 0;
                    background-image: radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
                    pointer-events: none;
                }
                .admin-login-card {
                    position: relative;
                    z-index: 1;
                }
                .admin-login-card-inner {
                    animation: adminLoginFade 0.5s ease-out;
                }
                @keyframes adminLoginFade {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .admin-login-logo-wrap {
                    filter: brightness(0) invert(1);
                }
                .admin-login-logo-wrap :global(img) {
                    object-fit: contain;
                }
                .admin-login-subtitle {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.95rem;
                }
                .admin-login-form-card .form-control.border-2 {
                    border-color: #e2e8f0;
                }
                .admin-login-form-card .form-control.border-2:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
                }
                .admin-login-btn {
                    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                    border: none;
                }
                .admin-login-btn:hover:not(:disabled) {
                    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
                    transform: translateY(-1px);
                }
            `}</style>
        </>
    );
};

export default LoginPage;
