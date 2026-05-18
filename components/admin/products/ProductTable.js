import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { FaEdit, FaTrash, FaCopy } from '../../OptimizedIcons';

const ProductTable = ({ products = [], onDelete }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch { return dateStr; }
    };

    const getState = (item) => item.published_at ? 'Published' : 'Draft';

    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>
                        <th className="border-0 py-3 fw-bold">Id</th>
                        <th className="border-0 py-3 fw-bold">Heading</th>
                        <th className="border-0 py-3 fw-bold">Slug</th>
                        <th className="border-0 py-3 text-secondary text-uppercase small fw-bold">UpdatedAt</th>
                        <th className="border-0 py-3 fw-bold">State</th>
                        <th className="border-0 py-3 text-end fw-bold pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr><td colSpan="6" className="text-center text-muted py-4">No products found</td></tr>
                    ) : products.map((item) => (
                        <tr key={item._id || item.id}>
                            <td className="text-secondary small font-monospace">{(item._id || item.id || '').slice(0, 24)}...</td>
                            <td className="fw-medium text-dark">{(item.heading || '').slice(0, 35)}{(item.heading || '').length > 35 ? '...' : ''}</td>
                            <td className="text-secondary small">{item.slug || '—'}</td>
                            <td className="text-secondary small">{formatDate(item.updatedAt)}</td>
                            <td><StatusBadge status={getState(item)} /></td>
                            <td className="text-end pe-3">
                                <Link href={`/admin/products/${item._id || item.id}`} passHref>
                                    <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button variant="link" className="p-0 text-danger" title="Delete" onClick={() => onDelete && onDelete(item._id || item.id)}>
                                    <FaTrash size={14} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductTable;
