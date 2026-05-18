import React from 'react';
import { Table, Button, Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaEdit, FaTrash, FaSort } from '../../OptimizedIcons';

const ClientReviewTable = ({ reviews = [], onDelete }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch { return dateStr; }
    };

    const getImageUrl = (item) => {
        const pic = item.clientProfilePic;
        if (!pic) return null;
        if (typeof pic === 'string') return pic;
        if (pic.url) {
            const url = pic.url;
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
                        <th className="py-3 border-0 fw-bold">Photo</th>
                        <th className="py-3 border-0 fw-bold">Name <FaSort size={10} className="ms-1 text-secondary" /></th>
                        <th className="py-3 border-0 fw-bold">Designation</th>
                        <th className="py-3 border-0 fw-bold">CreatedAt</th>
                        <th className="py-3 border-0 text-end pe-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length === 0 ? (
                        <tr><td colSpan="7" className="text-center text-muted py-4">No client reviews found</td></tr>
                    ) : reviews.map((review) => (
                        <tr key={review._id || review.id} className="border-bottom">
                            <td className="ps-3"><Form.Check type="checkbox" /></td>
                            <td className="text-secondary small font-monospace">{(review._id || review.id || '').slice(0, 8)}...</td>
                            <td>
                                {getImageUrl(review) ? (
                                    <Image src={getImageUrl(review)} rounded style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <span className="text-muted small" style={{ fontSize: '8px' }}>IMG</span>
                                    </div>
                                )}
                            </td>
                            <td className="fw-medium text-dark">{(review.name || '').slice(0, 30)}{(review.name || '').length > 30 ? '...' : ''}</td>
                            <td className="text-secondary small">{(review.designation || '—').slice(0, 40)}</td>
                            <td className="text-secondary small">{formatDate(review.createdAt)}</td>
                            <td className="text-end pe-3">
                                <Link href={`/admin/client-reviews/${review._id || review.id}`} passHref>
                                    <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button variant="link" className="p-0 text-danger" title="Delete" onClick={() => onDelete && onDelete(review._id || review.id)}>
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

export default ClientReviewTable;
