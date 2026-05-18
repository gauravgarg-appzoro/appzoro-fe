import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { FaEdit, FaTrash, FaCopy, FaSort } from '../../OptimizedIcons';

const CountryPageTable = ({ countryPages = [], onDelete }) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>
                        <th className="py-3 ps-3" style={{ width: '40px' }}><Form.Check type="checkbox" /></th>
                        <th className="py-3 border-0 fw-bold">Title <FaSort size={10} className="ms-1 text-secondary" /></th>
                        <th className="py-3 border-0 fw-bold">Slug</th>
                        <th className="py-3 border-0 fw-bold">State</th>
                        <th className="py-3 border-0 text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countryPages.length > 0 ? (
                        countryPages.map((page, index) => (
                            <tr key={page._id || page.id || index} className="border-bottom">
                                <td className="ps-3"><Form.Check type="checkbox" /></td>
                                <td className="fw-medium text-dark">{page.title}</td>
                                <td className="text-secondary small">{page.slug}</td>
                                <td>
                                    <StatusBadge status={page.status || 'Draft'} />
                                </td>
                                <td className="text-end pe-3">
                                    <Link href={`/admin/country-pages/${page._id || page.id}`} passHref>
                                        <Button variant="link" className="p-0 me-2 text-primary" title="Edit">
                                            <FaEdit size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="link"
                                        className="p-0 text-danger"
                                        onClick={() => onDelete && onDelete(page._id || page.id)}
                                        title="Delete"
                                    >
                                        <FaTrash size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">No country pages found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default CountryPageTable;
