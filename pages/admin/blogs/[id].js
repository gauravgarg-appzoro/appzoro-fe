import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import BlogForm from '../../../components/admin/blogs/BlogForm';
import adminService from '../../../services/admin.service';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';
import {   FaArrowLeft   } from '../../../components/OptimizedIcons';

/**
 * Blog Edit/Create Page
 * 
 * Handles both creating new posts and editing existing ones.
 * Route: /admin/blogs/[id]
 * - id = 'create' -> Create mode
 * - id = ObjectId -> Edit mode
 */
const BlogEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';

    const [loading, setLoading] = useState(!isNew);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState(null);
    const [saving, setSaving] = useState(false);

    // Fetch post data for edit mode
    useEffect(() => {
        if (!id || isNew) return;

        const fetchPost = async () => {
            setLoading(true);
            const result = await adminService.getPostById(id);

            if (result.success && result.data) {
                setPostData(result.data);
            } else {
                setError(result.error || 'Post not found');
                toast.error('Failed to load post');
            }
            setLoading(false);
        };

        fetchPost();
    }, [id, isNew]);

    // Handle form submit
    const handleSubmit = async (formData, isDraft = false) => {
        setSaving(true);

        // Prepare data - only set published_at if publishing
        const data = {
            ...formData,
            // Set published_at based on save type
            published_at: isDraft ? null : (formData.published_at || new Date().toISOString()),
        };

        try {
            const result = isNew
                ? await adminService.createPost(data)
                : await adminService.updatePost(id, data);
            const ok = await handleSaveSuccess({
                result,
                isCreate: isNew,
                isDraft,
                listPath: '/admin/blogs',
                editPathPrefix: '/admin/blogs/',
                toast,
                router,
                entityName: 'Post',
            });
            if (ok) return; // redirect in progress — do not setSaving(false) to avoid re-render killing navigation
            setSaving(false);
        } catch (err) {
            toast.error(err?.message || 'An error occurred');
            setSaving(false);
        }
    };

    // Page title
    const pageTitle = isNew
        ? 'Create New Post'
        : postData?.title
            ? `Edit: ${postData.title.substring(0, 30)}${postData.title.length > 30 ? '...' : ''}`
            : 'Edit Post';

    return (
        <AdminLayout title={pageTitle}>
            <div className="d-flex align-items-center mb-4">
                <Link href="/admin/blogs" passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <h2 className="fw-bold mb-0">{isNew ? 'Create New Post' : 'Edit Post'}</h2>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white rounded p-5 text-center">
                    <Spinner animation="border" variant="primary" className="mb-3" />
                    <p className="text-secondary mb-0">Loading post...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-white rounded p-5 text-center">
                    <p className="text-danger mb-3">{error}</p>
                    <Link href="/admin/blogs" passHref>
                        <Button variant="outline-primary">Back to Posts</Button>
                    </Link>
                </div>
            )}

            {/* Form */}
            {!loading && !error && (
                <BlogForm
                    initialData={postData || {}}
                    onSubmit={handleSubmit}
                    saving={saving}
                    isNew={isNew}
                />
            )}
        </AdminLayout>
    );
};

// Force server-side rendering for admin pages
export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default BlogEdit;
