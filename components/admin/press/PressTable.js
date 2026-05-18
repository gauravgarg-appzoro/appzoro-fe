import React from 'react';
import { Table, Button, Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaEdit, FaTrash, FaSort } from '../../OptimizedIcons';

const PressTable = ({ presses = [], onDelete }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch { return dateStr; }
    };

    const getState = (item) => item.published_at ? 'Published' : 'Draft';

    const getImageUrl = (item) => {
        if (!item.PressImage) return null;
        if (typeof item.PressImage === 'string') return item.PressImage;
        if (item.PressImage.url) {
            const url = item.PressImage.url;
            return url.startsWith('http') ? url : `${STRAPI_IMAGE_BASE_URL || ''}${url}`;
        }
        return null;
    };

    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>
                        <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                        <th className="py-3 border-0 fw-bold">Id</th>
                        <th className="py-3 border-0 fw-bold">PressImage</th>
                        <th className="py-3 border-0 fw-bold">PressTitle <FaSort size={10} className="ms-1 text-secondary" /></th>
                        <th className="py-3 border-0 fw-bold">CreatedAt</th>
                        <th className="py-3 border-0 fw-bold">State</th>
                        <th className="py-3 border-0 text-end pe-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {presses.length === 0 ? (
                        <tr><td colSpan="7" className="text-center text-muted py-4">No press releases found</td></tr>
                    ) : presses.map((press) => (
                        <tr key={press._id || press.id} className="border-bottom">
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td className="text-secondary small font-monospace">{(press._id || press.id || '').slice(0, 24)}...</td>
                            <td>
                                {getImageUrl(press) ? (
                                    <Image src={getImageUrl(press)} rounded style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <span className="text-muted small" style={{ fontSize: '8px' }}>IMG</span>
                                    </div>
                                )}
                            </td>
                            <td className="fw-medium text-dark">{(press.PressTitle || '').slice(0, 30)}{(press.PressTitle || '').length > 30 ? '...' : ''}</td>
                            <td className="text-secondary small">{formatDate(press.createdAt)}</td>
                            <td><StatusBadge status={getState(press)} /></td>
                            <td className="text-end pe-3">
                                <Link href={`/admin/press/${press._id || press.id}`} passHref>
                                    <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button variant="link" className="p-0 text-danger" title="Delete" onClick={() => onDelete && onDelete(press._id || press.id)}>
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

export default PressTable;
