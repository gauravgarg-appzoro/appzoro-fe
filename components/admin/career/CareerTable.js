import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { FaEdit, FaTrash, FaSort } from '../../OptimizedIcons';

const CareerTable = ({ careers = [], onDelete }) => {
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
                        <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                        <th className="py-3 border-0 fw-bold">Id</th>
                        <th className="py-3 border-0 fw-bold">CreatedAt</th>
                        <th className="py-3 border-0 fw-bold">Title <FaSort size={10} className="ms-1 text-secondary" /></th>
                        <th className="py-3 border-0 fw-bold">Experience</th>
                        <th className="py-3 border-0 fw-bold">State</th>
                        <th className="py-3 border-0 text-end pe-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {careers.length === 0 ? (
                        <tr><td colSpan="7" className="text-center text-muted py-4">No careers found</td></tr>
                    ) : careers.map((item) => (
                        <tr key={item._id || item.id} className="border-bottom">
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td className="text-secondary small font-monospace">{(item._id || item.id || '').slice(0, 24)}...</td>
                            <td className="text-secondary small">{formatDate(item.createdAt)}</td>
                            <td className="fw-medium text-dark">{item.Title}</td>
                            <td className="text-secondary small">{item.Experience}</td>
                            <td><StatusBadge status={getState(item)} /></td>
                            <td className="text-end pe-3">
                                <Link href={`/admin/career/${item._id || item.id}`} passHref>
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

export default CareerTable;
