import React from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { useAdminService } from './AdminServiceContext';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaEdit, FaTrash, FaCopy, FaSort, FaSortUp, FaSortDown } from '../../OptimizedIcons';

/**
 * Truncate text with ellipsis
 */
const truncate = (str, maxLength = 25) => {
    if (!str) return '-';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

/**
 * Get sort icon for column
 */
const SortIcon = ({ field, currentSort }) => {
    const [currentField, currentOrder] = currentSort.split(':');
    if (currentField !== field) {
        return <FaSort size={10} className="ms-1 text-secondary" />;
    }
    return currentOrder === 'DESC'
        ? <FaSortDown size={10} className="ms-1 text-primary" />
        : <FaSortUp size={10} className="ms-1 text-primary" />;
};

/**
 * Services Table Component
 * 
 * Displays list of services with sorting, selection, and actions.
 * Integrated with AdminServiceContext for state management.
 */
const ServicesTable = () => {
    const {
        services,
        loading,
        error,
        sort,
        toggleSort,
        deleteService,
        duplicateService,
        selectServiceForEdit,
    } = useAdminService();

    // Handle delete with confirmation
    const handleDelete = async (service) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${service.serviceTitle}"?`);
        if (confirmed) {
            const success = await deleteService(service.id);
            if (success) {
                toast.success('Service deleted successfully');
            } else {
                toast.error('Failed to delete service. Please try again.');
            }
        }
    };

    // Copy slug to clipboard
    const handleCopySlug = (slug) => {
        navigator.clipboard.writeText(slug);
        toast.info('Slug copied to clipboard');
    };

    const handleDuplicate = async (service) => {
        const confirmed = window.confirm(`Duplicate "${service.serviceTitle}" as a new draft copy?`);
        if (!confirmed) return;
        const result = await duplicateService(service.id);
        if (result.success) {
            toast.success('Service duplicated as draft');
        } else {
            toast.error(result.error || 'Failed to duplicate service');
        }
    };

    // Get service status
    const getStatus = (service) => {
        if (!service.published_at) return 'Draft';
        return 'Published';
    };

    // Get service icon URL
    const getIconUrl = (service) => {
        if (service.serviceicon?.url) {
            return `${STRAPI_IMAGE_BASE_URL}${service.serviceicon.url}`;
        }
        return null;
    };

    // Loading state
    if (loading && services.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <p className="text-secondary mb-0">Loading services...</p>
            </div>
        );
    }

    // Error state
    if (error && services.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <p className="text-danger mb-0">Error: {error}</p>
            </div>
        );
    }

    // Empty state
    if (services.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <p className="text-secondary mb-0">No services found. Create your first service!</p>
            </div>
        );
    }

    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            {loading && (
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1 }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                    <tr>

                        <th className="border-0 py-3 fw-bold">Id</th>
                        <th className="border-0 py-3 fw-bold">ServiceIcon</th>
                        <th
                            className="border-0 py-3 fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleSort('serviceTitle')}
                        >
                            ServiceTitle <SortIcon field="serviceTitle" currentSort={sort} />
                        </th>
                        <th className="border-0 py-3 fw-bold">ServiceShortDescription</th>
                        <th className="border-0 py-3 fw-bold">State</th>
                        <th className="border-0 py-3 text-end fw-bold pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((svc) => (
                        <tr key={svc.id} className="border-bottom">

                            <td className="text-secondary small font-monospace">{truncate(svc.id, 20)}</td>
                            <td>
                                {getIconUrl(svc) ? (
                                    <img
                                        src={getIconUrl(svc)}
                                        alt={svc.serviceTitle}
                                        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                                        className="rounded-circle border"
                                    />
                                ) : (
                                    <div className="rounded-circle border d-flex align-items-center justify-content-center"
                                        style={{ width: '32px', height: '32px', backgroundColor: '#f8f9fa' }}>
                                        <span className="text-secondary" style={{ fontSize: '10px' }}>N/A</span>
                                    </div>
                                )}
                            </td>
                            <td className="fw-medium text-dark">{truncate(svc.serviceTitle, 30)}</td>
                            <td className="text-secondary">{truncate(svc.ServiceShortDescription, 35)}</td>
                            <td>
                                <StatusBadge status={getStatus(svc)} />
                            </td>
                            <td className="text-end pe-3">
                                <Button
                                    variant="link"
                                    className="p-0 me-2 text-secondary"
                                    onClick={() => handleCopySlug(svc.slug)}
                                    title="Copy slug"
                                >
                                    <FaCopy size={14} />
                                </Button>
                                <Button
                                    variant="link"
                                    className="p-0 me-2 text-primary"
                                    onClick={() => handleDuplicate(svc)}
                                    title="Duplicate service"
                                >
                                    <FaCopy size={14} />
                                </Button>
                                <Link href={`/admin/services/${svc.id}`} passHref>
                                    <Button
                                        variant="link"
                                        className="p-0 me-2 text-primary"
                                        onClick={() => selectServiceForEdit(svc)}
                                        title="Edit service"
                                    >
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="link"
                                    className="p-0 text-danger"
                                    onClick={() => handleDelete(svc)}
                                    title="Delete service"
                                >
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

export default ServicesTable;
