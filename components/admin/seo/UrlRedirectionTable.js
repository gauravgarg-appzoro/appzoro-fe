import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { FaPen, FaTrash } from '../../OptimizedIcons';
import adminService from '../../../services/admin.service';

const UrlRedirectionTable = ({ searchTerm = '' }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        const res = await adminService.getUrlRedirectionList({
            search: searchTerm,
            limit: 500,
            sort: 'createdAt:DESC',
        });
        setRows(res.success && Array.isArray(res.data) ? res.data : []);
        setLoading(false);
    }, [searchTerm]);

    useEffect(() => {
        load();
    }, [load]);

    const handleDelete = async (id) => {
        if (!id || !window.confirm('Delete this redirect?')) return;
        const res = await adminService.deleteUrlRedirection(id);
        if (res.success) load();
        else alert(res.error || 'Delete failed');
    };

    const rowId = (r) => r._id || r.id;

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" size="sm" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded shadow-sm">
            <Table hover responsive className="mb-0">
                <thead className="bg-light">
                    <tr>
                        <th style={{ width: '80px' }}>ID</th>
                        <th>Source URL</th>
                        <th>Target URL</th>
                        <th style={{ width: '90px' }}>Status</th>
                        <th style={{ width: '100px' }}>Active</th>
                        <th style={{ width: '160px' }}>Updated</th>
                        <th style={{ width: '100px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center text-muted py-4">
                                No URL redirects yet. Add one to map a source path to a target.
                            </td>
                        </tr>
                    ) : (
                        rows.map((r) => {
                            const id = rowId(r);
                            const updated = r.updatedAt || r.createdAt;
                            const updatedStr = updated
                                ? new Date(updated).toLocaleString()
                                : '—';
                            return (
                                <tr key={id}>
                                    <td className="small text-muted">{String(id).slice(-8)}</td>
                                    <td className="small">{r.sourceUrl}</td>
                                    <td className="small text-muted">
                                        {Number(r.statusCode) === 410 ? '— (410 Gone)' : r.targetUrl}
                                    </td>
                                    <td className="small">{r.statusCode || 301}</td>
                                    <td>
                                        <Badge bg={r.isActive !== false ? 'success' : 'secondary'}>
                                            {r.isActive !== false ? 'Yes' : 'No'}
                                        </Badge>
                                    </td>
                                    <td className="small">{updatedStr}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link
                                                href={`/admin/seo/url-redirections/${id}`}
                                                className="btn btn-primary btn-sm px-2 py-1"
                                                title="Edit"
                                            >
                                                <FaPen size={12} />
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="px-2 py-1"
                                                title="Delete"
                                                onClick={() => handleDelete(id)}
                                            >
                                                <FaTrash size={12} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UrlRedirectionTable;
