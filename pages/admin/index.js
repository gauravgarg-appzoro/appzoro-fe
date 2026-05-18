import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import adminService from '../../services/admin.service';
import {   FaBlog, FaBriefcase, FaNewspaper, FaUsers, FaBox, FaCogs, FaBuilding, FaGlobe, FaArrowRight, FaChevronRight   } from '../../components/OptimizedIcons';

const STATS_CONFIG = [
    { key: 'posts', title: 'Blog Posts', path: '/admin/blogs', color: '#6366f1', icon: FaBlog },
    { key: 'products', title: 'Products', path: '/admin/products', color: '#3b82f6', icon: FaBox },
    { key: 'services', title: 'Services', path: '/admin/services', color: '#10b981', icon: FaCogs },
    { key: 'portfolios', title: 'Portfolios', path: '/admin/portfolios', color: '#f59e0b', icon: FaBriefcase },
    { key: 'users', title: 'Users', path: '/admin/users', color: '#8b5cf6', icon: FaUsers },
    { key: 'press', title: 'Press', path: '/admin/press', color: '#ef4444', icon: FaNewspaper },
    { key: 'careers', title: 'Careers', path: '/admin/career', color: '#06b6d4', icon: FaBriefcase },
    { key: 'industries', title: 'Industries', path: '/admin/industries', color: '#059669', icon: FaBuilding },
    { key: 'countryPages', title: 'Country Pages', path: '/admin/country-pages', color: '#7c3aed', icon: FaGlobe },
];

const QUICK_ACTIONS = [
    { label: 'Add New Blog Post', href: '/admin/blogs/create', icon: FaBlog },
    { label: 'Add New Portfolio', href: '/admin/portfolios/create', icon: FaBriefcase },
    { label: 'Add New Product', href: '/admin/products/create', icon: FaBox },
    { label: 'Add New Service', href: '/admin/services/create', icon: FaCogs },
    { label: 'Add New Industry', href: '/admin/industry/create', icon: FaBuilding },
];

/** Modules shown in the top hero – do not duplicate in Content & modules grid */
const HERO_KEYS = ['posts', 'portfolios', 'products'];

const AdminDashboard = () => {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [countsResult, postsResult] = await Promise.all([
                    (async () => {
                        try {
                            const [
                                postsRes,
                                productsRes,
                                servicesRes,
                                portfoliosRes,
                                usersRes,
                                pressRes,
                                careersRes,
                                industriesRes,
                                countryPagesRes,
                            ] = await Promise.all([
                                adminService.getPostsCount(),
                                adminService.getProductsCount(),
                                adminService.getServicesCount(),
                                adminService.getPortfoliosCount(),
                                adminService.getUsersCount?.() ?? Promise.resolve({ success: false, count: 0 }),
                                adminService.getPressCount(),
                                adminService.getCareersCount?.() ?? Promise.resolve({ success: false, count: 0 }),
                                adminService.getIndustriesCount(),
                                adminService.getCountryPagesCount(),
                            ]);
                            return {
                                posts: postsRes.success ? postsRes.count : 0,
                                products: productsRes.success ? productsRes.count : 0,
                                services: servicesRes.success ? servicesRes.count : 0,
                                portfolios: portfoliosRes.success ? portfoliosRes.count : 0,
                                users: usersRes.success ? (usersRes.count ?? 0) : 0,
                                press: pressRes.success ? pressRes.count : 0,
                                careers: careersRes.success ? careersRes.count : 0,
                                industries: industriesRes.success ? industriesRes.count : 0,
                                countryPages: countryPagesRes.success ? countryPagesRes.count : 0,
                            };
                        } catch (e) {
                            return {};
                        }
                    })(),
                    adminService.getAllPosts?.({ limit: 5, page: 0 }).catch(() => ({ success: false, data: [] })),
                ]);
                setCounts(countsResult || {});
                if (postsResult?.success && Array.isArray(postsResult.data)) {
                    setRecentPosts(postsResult.data.slice(0, 5));
                } else if (Array.isArray(postsResult)) {
                    setRecentPosts(postsResult.slice(0, 5));
                }
            } catch (err) {
                console.error('Dashboard load error:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <AdminLayout title="Dashboard">
            <div className="admin-dashboard-wrap">
                <div className="admin-dashboard-header mb-4">
                    <h1 className="admin-dashboard-title">Dashboard</h1>
                    <p className="admin-dashboard-subtitle">Welcome back. Here’s an overview of your content.</p>
                </div>

                {loading ? (
                    <div className="admin-dashboard-loading text-center py-5">
                        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                        <p className="text-secondary mt-3 mb-0">Loading dashboard…</p>
                    </div>
                ) : (
                    <>
                        {/* Hero: Blog, Portfolios, Products – not duplicated in Content & modules below */}
                        <section className="admin-hero mb-4">
                            <Card className="admin-hero-card border-0 shadow-sm overflow-hidden">
                                <Card.Body className="p-0">
                                    <div className="admin-hero-inner">
                                        {HERO_KEYS.map((key) => {
                                            const item = STATS_CONFIG.find((c) => c.key === key);
                                            if (!item) return null;
                                            const Icon = item.icon;
                                            return (
                                                <Link key={key} href={item.path} passHref legacyBehavior>
                                                    <a className="admin-hero-item">
                                                        <span className="admin-hero-icon" style={{ background: `${item.color}20`, color: item.color }}>
                                                            <Icon size={22} />
                                                        </span>
                                                        <span className="admin-hero-value">{counts[key] ?? '–'}</span>
                                                        <span className="admin-hero-label">{item.title}</span>
                                                        <span className="admin-hero-arrow"><FaChevronRight size={12} /></span>
                                                    </a>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </Card.Body>
                            </Card>
                        </section>

                        {/* Content & modules: only other modules (no duplicate of hero items) */}
                        <section className="mb-4">
                            <Card className="admin-modules-card border-0 shadow-sm">
                                <Card.Header className="admin-modules-header bg-white border-0 py-3">
                                    <h5 className="mb-0 fw-bold">Content &amp; modules</h5>
                                    <span className="text-muted small">Click to open</span>
                                </Card.Header>
                                <Card.Body className="pt-0 pb-4">
                                    <div className="admin-modules-grid">
                                        {STATS_CONFIG.filter(({ key }) => !HERO_KEYS.includes(key)).map(({ key, title, path, color, icon: Icon }) => (
                                            <Link key={key} href={path} passHref legacyBehavior>
                                                <a className="admin-module-tile">
                                                    <span className="admin-module-tile-icon" style={{ background: `${color}18`, color }}><Icon size={18} /></span>
                                                    <span className="admin-module-tile-count">{counts[key] ?? '–'}</span>
                                                    <span className="admin-module-tile-title">{title}</span>
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </section>

                        {/* Recent posts + Quick actions */}
                        <Row>
                            <Col lg={8} className="mb-4 mb-lg-0">
                                <Card className="admin-dashboard-card border-0 shadow-sm h-100">
                                    <Card.Header className="admin-dashboard-card-header bg-white border-0 py-4">
                                        <h5 className="mb-0 fw-bold">Recent blog posts</h5>
                                        <Link href="/admin/blogs" className="btn btn-sm btn-outline-primary rounded-pill">
                                            View all
                                        </Link>
                                    </Card.Header>
                                    <Card.Body className="pt-0">
                                        {recentPosts.length === 0 ? (
                                            <div className="text-center py-5">
                                                <p className="text-secondary mb-3">No posts yet.</p>
                                                <Link href="/admin/blogs/create" className="btn btn-primary rounded-pill">
                                                    Create your first post
                                                </Link>
                                            </div>
                                        ) : (
                                            <ul className="list-group list-group-flush admin-recent-list">
                                                {recentPosts.map((post) => {
                                                    const id = post.id ?? post._id;
                                                    const title = post.title ?? post.Title ?? 'Untitled';
                                                    return (
                                                        <li key={id} className="list-group-item admin-recent-item px-0 py-3 border-0 border-bottom">
                                                            <span className="text-truncate d-inline-block me-2">{title}</span>
                                                            <Link href={`/admin/blogs/${id}`} className="btn btn-sm btn-outline-primary rounded-pill ms-auto flex-shrink-0">
                                                                Edit <FaArrowRight size={10} />
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className="admin-dashboard-card border-0 shadow-sm h-100">
                                    <Card.Header className="admin-dashboard-card-header bg-white border-0 py-4">
                                        <h5 className="mb-0 fw-bold">Quick actions</h5>
                                    </Card.Header>
                                    <Card.Body className="pt-0">
                                        <div className="d-grid gap-2">
                                            {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                                                <Link key={href} href={href} passHref legacyBehavior>
                                                    <a className="admin-quick-action btn btn-outline-primary rounded-3 text-start d-flex align-items-center py-3">
                                                        <Icon className="me-3 text-primary" size={18} />
                                                        {label}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </div>

            <style jsx global>{`
                .admin-dashboard-wrap { max-width: 1400px; }
                .admin-dashboard-title { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; }
                .admin-dashboard-subtitle { color: #64748b; margin-bottom: 0; font-size: 1rem; }

                .admin-hero-card { border-radius: 16px; }
                .admin-hero-inner {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0;
                }
                .admin-hero-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem 1rem;
                    text-decoration: none;
                    color: inherit;
                    border-right: 1px solid #f1f5f9;
                    transition: background 0.2s ease;
                }
                .admin-hero-item:last-child { border-right: 0; }
                .admin-hero-item:hover { background: #f8fafc; }
                .admin-hero-icon {
                    width: 48px; height: 48px;
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 0.5rem;
                }
                .admin-hero-value { font-size: 1.75rem; font-weight: 700; color: #0f172a; line-height: 1.2; }
                .admin-hero-label { font-size: 0.85rem; color: #64748b; margin-top: 0.15rem; }
                .admin-hero-arrow { margin-top: 0.35rem; color: #94a3b8; opacity: 0; transition: opacity 0.2s; }
                .admin-hero-item:hover .admin-hero-arrow { opacity: 1; }
                @media (max-width: 767px) {
                    .admin-hero-inner { grid-template-columns: 1fr; }
                    .admin-hero-item { border-right: 0; border-bottom: 1px solid #f1f5f9; }
                    .admin-hero-item:last-child { border-bottom: 0; }
                }
                .admin-modules-card { border-radius: 16px; overflow: hidden; }
                .admin-modules-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .admin-modules-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 0.75rem;
                }
                .admin-module-tile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem 0.75rem;
                    border-radius: 12px;
                    text-decoration: none;
                    color: inherit;
                    border: 1px solid #f1f5f9;
                    background: #fafafa;
                    transition: all 0.2s ease;
                }
                .admin-module-tile:hover {
                    background: #fff;
                    border-color: #e2e8f0;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                    transform: translateY(-2px);
                }
                .admin-module-tile-icon {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 0.5rem;
                }
                .admin-module-tile-count { font-size: 1.25rem; font-weight: 700; color: #0f172a; }
                .admin-module-tile-title { font-size: 0.75rem; color: #64748b; text-align: center; line-height: 1.2; margin-top: 0.15rem; }

                .admin-dashboard-card { border-radius: 16px; overflow: hidden; }
                .admin-dashboard-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .admin-recent-list { --bs-list-group-border-color: #f1f5f9; }
                .admin-recent-item { display: flex; align-items: center; }
                .admin-quick-action { transition: all 0.2s ease; }
                .admin-quick-action:hover { background: rgba(59, 130, 246, 0.08); border-color: #3b82f6; transform: translateX(4px); }
            `}</style>
        </AdminLayout>
    );
};

export default AdminDashboard;
