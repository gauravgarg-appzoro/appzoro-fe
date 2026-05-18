import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaEdit, FaTrash, FaCopy, FaSort } from '../../OptimizedIcons';

const LocationCommonServicesTable = ({ services = [], onDelete }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });
        } catch { return dateStr; }
    };

    const getState = (item) => item.published_at ? 'Published' : 'Draft';

    const getIconUrl = (item) => {
        if (!item.lcs_icon) return null;
        if (typeof item.lcs_icon === 'object' && item.lcs_icon.url) {
            const url = item.lcs_icon.url;
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
                        <th className="border-0 py-3 fw-bold">Id</th>
                        <th className="border-0 py-3 fw-bold">Lcs_icon</th>
                        <th className="border-0 py-3 fw-bold">Lcs_title <FaSort size={10} className="ms-1 text-secondary" /></th>
                        <th className="border-0 py-3 fw-bold">CreatedAt</th>
                        <th className="border-0 py-3 fw-bold">State</th>
                        <th className="border-0 py-3 text-end fw-bold pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length === 0 ? (
                        <tr><td colSpan="7" className="text-center text-muted py-4">No location common services found</td></tr>
                    ) : services.map((item) => (
                        <tr key={item._id || item.id} className="border-bottom">
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td className="text-secondary small font-monospace">{(item._id || item.id || '').slice(0, 24)}...</td>
                            <td>
                                {getIconUrl(item) ? (
                                    <img src={getIconUrl(item)} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                ) : (
                                    <div className="rounded-circle border border-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <span className="text-danger small" style={{ fontSize: '10px' }}>ICO</span>
                                    </div>
                                )}
                            </td>
                            <td className="fw-medium text-dark">{item.lcs_title || '—'}</td>
                            <td className="text-secondary small">{formatDate(item.createdAt)}</td>
                            <td><StatusBadge status={getState(item)} /></td>
                            <td className="text-end pe-3">
                                <Link href={`/admin/country-pages/location-common-services/${item._id || item.id}`} passHref>
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

export default LocationCommonServicesTable;
