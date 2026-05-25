import React from 'react';
import Link from 'next/link';
import { Button, Card, ListGroup } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaExternalLinkAlt } from '../../../components/OptimizedIcons';

const SitemapsPage = () => (
    <AdminLayout title="Sitemaps">
        <div className="mb-4">
            <h2 className="fw-bold mb-1 text-dark">XML Sitemap</h2>
            <p className="text-secondary mb-0">
                AppZoro builds the sitemap automatically from published content. No manual URL list is required.
            </p>
        </div>

        <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
                <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item>
                        <strong>Live sitemap:</strong>{' '}
                        <a href="/sitemap.xml" target="_blank" rel="noreferrer">
                            https://appzoro.com/sitemap.xml
                        </a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Includes blogs, services, portfolios, industries, locations, careers, press, and static pages.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Updates on each request — new publishes appear without rebuilding the frontend.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Submit or resubmit this URL in Google Search Console after major content changes.
                    </ListGroup.Item>
                </ListGroup>

                <div className="d-flex flex-wrap gap-2">
                    <Link href="/sitemap.xml" passHref>
                        <Button variant="primary">
                            <FaExternalLinkAlt className="me-2" size={12} />
                            Open sitemap.xml
                        </Button>
                    </Link>
                    <Link href="/sitemap" passHref>
                        <Button variant="outline-secondary">HTML sitemap page</Button>
                    </Link>
                    <Link href="/admin/seo/url-redirections" passHref>
                        <Button variant="outline-primary">Manage URL redirects</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    </AdminLayout>
);

export default SitemapsPage;
