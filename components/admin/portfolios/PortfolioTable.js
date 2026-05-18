import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { FaEdit, FaTrash, FaCopy } from '../../OptimizedIcons';

const PortfolioTable = ({ portfolios, onDelete }) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>
                        <th className="border-0 py-3 fw-bold">Title</th>
                        <th className="border-0 py-3 fw-bold">Description</th>
                        <th className="border-0 py-3 fw-bold">State</th>
                        <th className="border-0 py-3 text-end fw-bold pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolios.length > 0 ? (
                        portfolios.map((item, idx) => (
                            <tr key={item.id || idx}>
                                <td className="fw-medium text-dark">{item.Title || item.title || 'Untitled'}</td>
                                <td className="text-secondary" style={{ maxWidth: '300px' }}>
                                    <div className="text-truncate">
                                        {item.Banner_short_description || item.description || '-'}
                                    </div>
                                </td>
                                <td>
                                    <StatusBadge status={item.published_at ? 'Published' : 'Draft'} />
                                </td>
                                <td className="text-end pe-3">
                                    <Link href={`/admin/portfolios/${item.id}`} passHref>
                                        <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                            <FaEdit size={14} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="link"
                                        className="p-0 text-danger"
                                        title="Delete"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        <FaTrash size={14} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-secondary">
                                No portfolios found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PortfolioTable;
