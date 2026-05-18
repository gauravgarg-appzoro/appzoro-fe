import React from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import StatusBadge from '../ui/StatusBadge';
import { useAdminBlog } from './AdminBlogContext';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { FaEdit, FaTrash, FaCopy, FaSort, FaSortUp, FaSortDown } from '../../OptimizedIcons';

/**
 * Format date for display
 */
const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
};

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
 * Blog Table Component
 * 
 * Displays list of blog posts with sorting, selection, and actions.
 * Integrated with AdminBlogContext for state management.
 */
const BlogTable = () => {
    const {
        posts,
        loading,
        error,
        sort,
        toggleSort,
        deletePost,
        selectPostForEdit,
    } = useAdminBlog();

    // Handle delete with confirmation
    const handleDelete = async (post) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${post.title}"?`);
        if (confirmed) {
            const success = await deletePost(post.id);
            if (success) {
                toast.success('Post deleted successfully');
            } else {
                toast.error('Failed to delete post. Please try again.');
            }
        }
    };

    // Copy slug to clipboard
    const handleCopySlug = (slug) => {
        navigator.clipboard.writeText(slug);
        toast.info('Slug copied to clipboard');
    };

    // Get post status
    const getStatus = (post) => {
        if (!post.published_at) return 'Draft';
        return 'Published';
    };

    // Get archive name (Dynamic from published_at)
    const getArchiveName = (post) => {
        if (!post.published_at) return '-';
        try {
            const date = new Date(post.published_at);
            return date.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return '-';
        }
    };

    // Loading state
    if (loading && posts.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <p className="text-secondary mb-0">Loading posts...</p>
            </div>
        );
    }

    // Error state
    if (error && posts.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <p className="text-danger mb-0">Error: {error}</p>
            </div>
        );
    }

    // Empty state
    if (posts.length === 0) {
        return (
            <div className="bg-white rounded shadow-sm p-5 text-center">
                <p className="text-secondary mb-0">No posts found. Create your first post!</p>
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

                        <th className="py-3 border-0 fw-bold">Id</th>
                        <th
                            className="py-3 border-0 fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleSort('title')}
                        >
                            Title <SortIcon field="title" currentSort={sort} />
                        </th>
                        <th className="py-3 border-0 fw-bold">Slug</th>
                        <th
                            className="py-3 border-0 fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleSort('publishedAt')}
                        >
                            PublishedAt <SortIcon field="publishedAt" currentSort={sort} />
                        </th>
                        <th className="py-3 border-0 fw-bold">Archive</th>
                        <th className="py-3 border-0 fw-bold">State</th>
                        <th className="py-3 border-0 text-end pe-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="border-bottom">

                            <td className="text-secondary small">
                                {truncate(post.id, 20)}
                            </td>
                            <td className="fw-medium text-dark">
                                {truncate(post.title, 25)}
                            </td>
                            <td className="text-secondary small">
                                {truncate(post.slug, 25)}
                            </td>
                            <td className="text-secondary small">
                                {console.log('Post Date Debug:', post.id, post.publishedAt, post.published_at, post.createdAt)}
                                {truncate(formatDate(post.publishedAt || post.published_at || post.createdAt), 25)}
                            </td>
                            <td className="text-secondary small">
                                {getArchiveName(post)}
                            </td>
                            <td>
                                <StatusBadge status={getStatus(post)} />
                            </td>
                            <td className="text-end pe-3">
                                <Button
                                    variant="link"
                                    className="p-0 me-2 text-secondary"
                                    onClick={() => handleCopySlug(post.slug)}
                                    title="Copy slug"
                                >
                                    <FaCopy size={14} />
                                </Button>
                                <Link href={`/admin/blogs/${post.id}`} passHref>
                                    <Button
                                        variant="link"
                                        className="p-0 me-2 text-secondary"
                                        onClick={() => selectPostForEdit(post)}
                                        title="Edit post"
                                    >
                                        <FaEdit size={14} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="link"
                                    className="p-0 text-secondary"
                                    onClick={() => handleDelete(post)}
                                    title="Delete post"
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

export default BlogTable;
