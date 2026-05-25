import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Table, Badge, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import adminService from '../../../../services/admin.service';
import { FaExternalLinkAlt, FaSort } from '../../../../components/OptimizedIcons';

const BlogArchives = () => {
    const [archives, setArchives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('name:DESC');

    const fetchArchives = async () => {
        setLoading(true);
        try {
            const dataResult = await adminService.getArchives({ page: 0, limit: 200, sort });
            if (dataResult.success) {
                setArchives(Array.isArray(dataResult.data) ? dataResult.data : []);
            } else {
                toast.error('Failed to fetch archives');
            }
        } catch {
            toast.error('An error occurred loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArchives();
    }, [sort]);

    return (
        <AdminLayout title="Archives">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Blog Archives</h2>
                    <p className="text-secondary mb-0 small">
                        Archives are generated automatically from blog post publish dates. Edit posts to change which month they appear under.
                    </p>
                </div>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <Table hover className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 border-0 fw-bold">
                                Month
                                <FaSort
                                    size={10}
                                    className="ms-1 text-secondary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSort(sort === 'name:ASC' ? 'name:DESC' : 'name:ASC')}
                                />
                            </th>
                            <th className="py-3 border-0 fw-bold">Slug</th>
                            <th className="py-3 border-0 fw-bold">Posts</th>
                            <th className="py-3 border-0 text-end pe-4">View on site</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-5">
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                        ) : archives.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-muted">
                                    No archives yet. Publish blog posts to create monthly archives.
                                </td>
                            </tr>
                        ) : (
                            archives.map((archive) => (
                                <tr key={archive.slug} className="border-bottom">
                                    <td className="fw-medium text-dark">{archive.name}</td>
                                    <td className="text-secondary small font-monospace">{archive.slug}</td>
                                    <td>
                                        <Badge bg="light" text="dark">
                                            {archive.count ?? 0} posts
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-3">
                                        <Link href={`/blog/archives/${archive.slug}`} target="_blank" passHref>
                                            <Button variant="outline-primary" size="sm" className="rounded-pill">
                                                <FaExternalLinkAlt size={12} className="me-1" /> View
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </AdminLayout>
    );
};

export default BlogArchives;
