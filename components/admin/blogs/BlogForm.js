import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Collapse, Modal, Spinner } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { required, slugFormat, slugify } from '../../../lib/validation';

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaSave, FaTimes, FaPlus, FaChevronDown, FaChevronRight, FaTrash, FaGripVertical, FaPen, FaExternalLinkAlt, FaCog } from '../../OptimizedIcons';
const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

/**
 * BlogForm Component
 */
const FormField = ({ label, name, type = "text", as, rows, placeholder, value, onChange }) => (
    <div className="mb-4">
        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
            {label}
        </Form.Label>
        <Form.Control
            type={type}
            name={name}
            as={as}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                padding: '10px 12px'
            }}
        />
    </div>
);

// Helper functions (moved outside component for better performance/Fast Refresh)
const formatForInput = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // Adjust to local time ISO string for input
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);
        return localISOTime;
    } catch (e) {
        return '';
    }
};

// Helper to process content for Editor (Relative -> Absolute)
// Also handles generic Markdown -> HTML conversion for legacy content
const processContentLoad = (html) => {
    if (!html) return '';

    let content = html;

    // Detect if content is likely Markdown (no block-level HTML tags)
    // Simple check: if it doesn't have <p>, <div>, <h1>-<h6>, <ul>, <ol>, <blockquote>
    const hasHtmlBlocks = /<(p|div|h[1-6]|ul|ol|blockquote|table)/i.test(content);

    if (!hasHtmlBlocks) {
        // Convert Common Markdown to HTML

        // Images: ![alt](url) -> <img src="url" alt="alt" />
        content = content.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

        // Linked Images: [![alt](imgUrl)](linkUrl) -> <a href="linkUrl"><img src="imgUrl" alt="alt" /></a>
        // Note: The previous regex consumes the inner image, so we need to handle links carefully or run this before.
        // Actually, let's reset and do Linked Images FIRST.
        content = html; // Start fresh

        // Linked Images: [![alt](imgUrl)](linkUrl)
        content = content.replace(/\[!\[(.*?)\]\((.*?)\)\]\((.*?)\)/g, '<a href="$3" target="_blank"><img src="$2" alt="$1" /></a>');

        // Images: ![alt](url) (that weren't part of a link)
        content = content.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

        // Links: [text](url)
        content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Headers
        content = content.replace(/^#{6}\s+(.*)$/gm, '<h6>$1</h6>');
        content = content.replace(/^#{5}\s+(.*)$/gm, '<h5>$1</h5>');
        content = content.replace(/^#{4}\s+(.*)$/gm, '<h4>$1</h4>');
        content = content.replace(/^#{3}\s+(.*)$/gm, '<h3>$1</h3>');
        content = content.replace(/^#{2}\s+(.*)$/gm, '<h2>$1</h2>');
        content = content.replace(/^#{1}\s+(.*)$/gm, '<h1>$1</h1>');

        // Bold
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Italic
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        content = content.replace(/_(.*?)_/g, '<em>$1</em>');

        // Lists (unordered) - - item or * item
        content = content.replace(/^\s*[-*]\s+(.*)$/gm, '<ul><li>$1</li></ul>');
        // Fix consecutive lists (simple merge)
        content = content.replace(/<\/ul>\s*<ul>/g, '');

        // Paragraphs: logic is tricky with regex, but usually double newline = new paragraph.
        // For now, wrap any text not in a tag with <p>? 
        // TipTap prefers <p> wrapping.
        // Let's wrap lines that don't start with < in <p>
        content = content.split('\n').map(line => {
            if (line.trim() === '') return '';
            if (!line.trim().startsWith('<')) return `<p>${line}</p>`;
            return line;
        }).join('');
    }

    // First normalize: remove existing BASE URL if present (handling previously saved absolute URLs)
    content = content.split(STRAPI_IMAGE_BASE_URL).join('');
    // Then convert relative to absolute for Editor to display correctly
    return content.replace(/\/uploads/g, `${STRAPI_IMAGE_BASE_URL}/uploads`);
};

// Helper to process content for Save (Absolute -> Relative)
const processContentSave = (html) => {
    if (!html) return '';
    return html.split(STRAPI_IMAGE_BASE_URL).join('');
};

// Helper: Convert HTML to Markdown (for BlogFaq which expects Markdown)
const htmlToMarkdown = (html) => {
    if (!html) return '';
    let md = html;

    // Normalization: Remove STRAPI_IMAGE_BASE_URL first
    md = md.split(STRAPI_IMAGE_BASE_URL).join('');

    // Replace <p> with newlines
    md = md.replace(/<p>(.*?)<\/p>/g, '$1\n\n');

    // Bold
    md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    md = md.replace(/<b>(.*?)<\/b>/g, '**$1**');

    // Italic
    md = md.replace(/<em>(.*?)<\/em>/g, '*$1*');
    md = md.replace(/<i>(.*?)<\/i>/g, '*$1*');

    // Links: <a href="url">text</a> -> [text](url)
    md = md.replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)');

    // Lists (unordered)
    // Handle <ul><li>item</li></ul>
    md = md.replace(/<ul>([\s\S]*?)<\/ul>/g, function (match, p1) {
        return p1.replace(/<li>(.*?)<\/li>/g, '* $1\n');
    });

    // Lists (ordered)
    md = md.replace(/<ol>([\s\S]*?)<\/ol>/g, function (match, p1) {
        let index = 1;
        return p1.replace(/<li>(.*?)<\/li>/g, function (subMatch, subP1) {
            return `${index++}. ${subP1}\n`;
        });
    });

    // Images
    md = md.replace(/<img src="(.*?)".*?alt="(.*?)".*?\/>/g, '![$2]($1)');

    // Headings
    md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n');
    md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n');
    md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n');
    md = md.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n');
    md = md.replace(/<h5>(.*?)<\/h5>/g, '##### $1\n');
    md = md.replace(/<h6>(.*?)<\/h6>/g, '###### $1\n');

    // Line breaks
    md = md.replace(/<br\s*\/?>/g, '\n');

    // Decoding common entities
    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&amp;/g, '&');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');

    // Clean up excessive newlines
    md = md.replace(/\n\s*\n\s*\n/g, '\n\n');

    // Strip remaining tags (safety) - Optional, but might remove content if regex missed something.
    // Let's keep it lenient for now, or strip tags to avoid "dfshdfgh" issues?
    // If the user wants specific tags, stripping might be bad.
    // But ReactMarkdown will escape regex-missed tags anyway.
    md = md.replace(/<[^>]*>/g, '');

    return md.trim();
};

const BlogForm = ({ initialData = {}, onSubmit, saving = false, isNew = true }) => {
    // Helper to carefully extract ID string
    const getId = (val) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return val.id || val._id || '';
    };

    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        slug: initialData.slug || '',
        publishedAt: initialData.publishedAt ? formatForInput(initialData.publishedAt) : (initialData.published_at ? formatForInput(initialData.published_at) : ''),
        content: processContentLoad(initialData.content),
        image: initialData.image || null,
        tags: initialData.tags || [],
        post_takeaways: Array.isArray(initialData.post_takeaways) ? initialData.post_takeaways : [],

        // Blog Questions
        blogQuestion: initialData.blogQuestion?.map(q => ({
            ...q,
            blogAnswerField: processContentLoad(q.blogAnswerField)
        })) || [],

        // SEO Settings
        meta_title: initialData.meta_title || '',
        meta_description: initialData.meta_description || '',
        post_schema: initialData.post_schema || '',
        slug_seo: initialData.slug_seo || initialData.slug || '',

        // OG Tags
        og_title: initialData.og_title || '',
        og_description: initialData.og_description || '',
        og_image: initialData.og_image || '',
        og_type: initialData.og_type || 'article',
        // Sidebar selections
        writer: getId(initialData.writer),

        categories: initialData.categories?.map(getId) || [],
    });

    const [imagePreview, setImagePreview] = useState(
        initialData.image?.[0]?.url
            ? (initialData.image[0].url.startsWith('http') ? initialData.image[0].url : `${STRAPI_IMAGE_BASE_URL}${initialData.image[0].url}`)
            : null
    );
    const [uploadedImageId, setUploadedImageId] = useState(
        initialData.image?.[0]?.id || initialData.image?.[0]?._id || null
    );
    const [uploading, setUploading] = useState(false);
    const [collapsedQuestions, setCollapsedQuestions] = useState({});
    const [tagInput, setTagInput] = useState('');

    // Dropdown data
    const [categories, setCategories] = useState([]);

    const [writers, setWriters] = useState([]);

    // Image Metadata State
    const [imageMetadata, setImageMetadata] = useState(() => {
        const img = initialData.image?.[0];
        if (img) {
            return {
                image: {
                    filename: img.name || '',
                    alt_text: img.alternativeText || '',
                    caption: img.caption || '',
                    size: img.size ? `${img.size} KB` : '',
                    date: new Date(img.createdAt || img.updatedAt || Date.now()).toLocaleDateString(),
                    dimensions: img.width && img.height ? `${img.width} x ${img.height}` : '',
                    extension: img.ext ? img.ext.replace('.', '') : ''
                }
            };
        }
        return { image: { filename: '', alt_text: '', caption: '' } };
    });
    const [activeImageField, setActiveImageField] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch dropdown data on mount
    useEffect(() => {
        const fetchDropdowns = async () => {
            const [catRes, writerRes] = await Promise.all([
                adminService.getCategories(),
                adminService.getWriters(),
            ]);
            if (catRes.success) setCategories(catRes.data || []);
            if (writerRes.success) setWriters(writerRes.data || []);
        };
        fetchDropdowns();
    }, []);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        // Upload to server
        setUploading(true);
        const result = await adminService.uploadImage(file);
        setUploading(false);

        if (result.success && result.data) {
            setUploadedImageId(result.data.id || result.data._id);

            // Update metadata
            const imgData = result.data;
            setImageMetadata(prev => ({
                ...prev,
                image: {
                    filename: imgData.name || file.name,
                    alt_text: imgData.alternativeText || '',
                    caption: imgData.caption || '',
                    size: imgData.size ? `${imgData.size} KB` : (file.size / 1024).toFixed(2) + ' KB',
                    date: new Date(imgData.createdAt || Date.now()).toLocaleDateString(),
                    dimensions: imgData.width && imgData.height ? `${imgData.width} x ${imgData.height}` : '',
                    extension: imgData.ext ? imgData.ext.replace('.', '') : file.name.split('.').pop()
                }
            }));

            // Fallback for dimensions if not in response
            if (!imgData.width || !imgData.height) {
                const img = new window.Image();
                img.src = reader.result;
                img.onload = () => {
                    setImageMetadata(prev => ({
                        ...prev,
                        image: {
                            ...prev.image,
                            dimensions: `${img.naturalWidth} x ${img.naturalHeight}`
                        }
                    }));
                };
            }

            toast.success('Image uploaded successfully');
        } else {
            toast.error('Failed to upload image: ' + (result.error || 'Unknown error'));
        }
    };

    // Handle form submit
    const handleSave = (isDraft = false) => {
        const titleErr = required(formData.title, 'Title');
        if (titleErr) {
            toast.error(titleErr);
            return;
        }

        // SEO slug (slug_seo) maps to slug: when user fills slug_seo, that becomes the URL slug
        const slugSeoVal = (formData.slug_seo || '').trim();
        let slug = slugSeoVal ? slugify(formData.slug_seo, '') : (formData.slug || '').trim();
        if (!slug && formData.title?.trim()) slug = slugify(formData.title, 'post');
        const slugErr = slug ? slugFormat(slug, 'Slug') : required(slug, 'Slug');
        if (slugErr) {
            toast.error(slugErr);
            return;
        }

        // Build clean data object, filtering out empty strings
        const cleanData = {
            title: formData.title.trim(),
            slug,
            description: formData.description?.trim() || undefined,
            content: processContentSave(formData.content) || undefined,
            published_at: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined,
            publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined, // Include both for safety

            // SEO fields
            meta_title: formData.meta_title?.trim() || undefined,
            meta_description: formData.meta_description?.trim() || undefined,
            post_schema: formData.post_schema?.trim() || undefined,
            slug_seo: formData.slug_seo?.trim() || undefined,

            // OG tags
            og_title: formData.og_title?.trim() || undefined,
            og_description: formData.og_description?.trim() || undefined,
            og_image: formData.og_image?.trim() || undefined,
            og_type: formData.og_type || undefined,

            // Blog Questions (filter empty ones)
            // Use htmlToMarkdown for answers because frontend expects Markdown
            blogQuestion: formData.blogQuestion?.filter(q => q.blogQuestionField?.trim() || q.blogAnswerField?.trim()).map(q => ({
                ...q,
                blogAnswerField: htmlToMarkdown(q.blogAnswerField)
            })) || undefined,
            post_takeaways: formData.post_takeaways
                ?.map(item => (item || '').trim())
                .filter(Boolean) || undefined,

            tags: formData.tags?.length ? formData.tags : undefined,

            // Image (as array of IDs; backend expects string[] for ObjectId cast)
            // Preserve existing image when editing without re-uploading
            image: (() => {
                const imgId = uploadedImageId
                    || (initialData.image?.[0]?.id || initialData.image?.[0]?._id || null);
                return imgId ? [String(imgId)] : undefined;
            })(),

            // Relations - ONLY include if they have a valid value (not empty string)
            writer: typeof formData.writer === 'string' && formData.writer.trim() ? formData.writer : undefined,

            categories: formData.categories?.filter(c => c && typeof c === 'string' && c.trim()) || undefined,
        };

        // Remove undefined values
        Object.keys(cleanData).forEach(key => {
            if (cleanData[key] === undefined) {
                delete cleanData[key];
            }
        });

        if (onSubmit) {
            onSubmit(cleanData, isDraft);
        }
    };

    const handleShowModal = (fieldName) => {
        setActiveImageField(fieldName);
        setShowModal(true);
    };

    const handleCloseModal = (persist = false) => {
        if (persist && uploadedImageId && imageMetadata?.image) {
            const meta = imageMetadata.image;
            adminService.updateFileInfo(uploadedImageId, {
                alternativeText: meta.alt_text || '',
                caption: meta.caption || '',
            });
        }
        setShowModal(false);
        setActiveImageField(null);
    };

    const handleImageMetadataChange = (fieldName, metaField, value) => {
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                [metaField]: value
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null
        }));
        setImagePreview(null);
        setUploadedImageId(null);
        setImageMetadata(prev => ({
            ...prev,
            image: { filename: '', alt_text: '', caption: '' }
        }));
    };

    const addBlogQuestion = () => {
        setFormData(prev => ({
            ...prev,
            blogQuestion: [...(prev.blogQuestion || []), { blogQuestionField: '', blogAnswerField: '' }]
        }));
    };

    const removeBlogQuestion = (index) => {
        setFormData(prev => ({
            ...prev,
            blogQuestion: prev.blogQuestion.filter((_, i) => i !== index)
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...(formData.blogQuestion || [])];
        if (updated[index]) {
            updated[index][field] = value;
            setFormData(prev => ({
                ...prev,
                blogQuestion: updated
            }));
        }
    };

    const toggleQuestionCollapse = (index) => {
        setCollapsedQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleAddTag = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...(prev.tags || []), tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const addTakeaway = () => {
        setFormData(prev => ({
            ...prev,
            post_takeaways: [...(prev.post_takeaways || []), '']
        }));
    };

    const removeTakeaway = (index) => {
        setFormData(prev => ({
            ...prev,
            post_takeaways: (prev.post_takeaways || []).filter((_, i) => i !== index)
        }));
    };

    const handleTakeawayChange = (index, value) => {
        setFormData(prev => {
            const updated = [...(prev.post_takeaways || [])];
            updated[index] = value;
            return { ...prev, post_takeaways: updated };
        });
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <Form>
                <Row>
                    <Col lg={8}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <FormField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                            />

                            <FormField
                                label="Description"
                                name="description"
                                as="textarea"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief description of the blog post"
                            />

                            <FormField
                                label="PublishedAt"
                                name="publishedAt"
                                type="datetime-local"
                                value={formData.publishedAt}
                                onChange={handleChange}
                            />

                            {/* Content - Rich Text Editor */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                                    placeholder="Write your blog content here..."
                                    minHeight="400px"
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Image
                                </Form.Label>
                                {imagePreview ? (
                                    <div className="position-relative mb-3" style={{ maxWidth: '400px' }}>
                                        <Image
                                            src={imagePreview}
                                            fluid
                                            className="border"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="border"
                                                onClick={() => handleShowModal('image')}
                                                title="Edit Details"
                                            >
                                                <FaPen size={12} />
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="border"
                                                onClick={removeImage}
                                                title="Remove"
                                            >
                                                <FaTrash size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="border bg-light d-flex align-items-center justify-content-center"
                                        style={{
                                            height: '200px',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        <div className="text-center text-muted">
                                            <FaCloudUploadAlt size={32} className="mb-2" />
                                            <p className="mb-0 small">Click to upload</p>
                                        </div>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Tags
                                </Form.Label>
                                <div className="d-flex gap-2 mb-2 flex-wrap">
                                    {formData.tags?.map((tag, index) => (
                                        <span key={index} className="badge bg-primary d-flex align-items-center gap-2 p-2" style={{ fontSize: '12px' }}>
                                            {tag}
                                            <FaTimes
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleRemoveTag(tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Type tag and press Enter"
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            padding: '10px 12px'
                                        }}
                                    />
                                    <Button variant="outline-primary" onClick={handleAddTag} size="sm">
                                        Add
                                    </Button>
                                </div>
                            </div>

                            {/* Key Takeaways */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                    Key Takeaways ({(formData.post_takeaways || []).length})
                                </Form.Label>
                                {(formData.post_takeaways || []).map((item, index) => (
                                    <div key={`takeaway-${index}`} className="d-flex gap-2 mb-2">
                                        <Form.Control
                                            type="text"
                                            value={item || ''}
                                            onChange={(e) => handleTakeawayChange(index, e.target.value)}
                                            placeholder={`Takeaway point ${index + 1}`}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                padding: '10px 12px'
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline-danger"
                                            onClick={() => removeTakeaway(index)}
                                            title="Remove takeaway"
                                        >
                                            <FaTrash size={12} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-decoration-none w-100 text-center p-3 border mt-2"
                                    style={{
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#0d6efd'
                                    }}
                                    onClick={addTakeaway}
                                >
                                    <FaPlus size={12} className="me-2" /> ADD TAKEAWAY POINT
                                </Button>
                            </div>

                            {/* Blog Questions */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                    BlogQuestion ({(formData.blogQuestion || []).length})
                                </Form.Label>

                                {(formData.blogQuestion || []).length === 0 ? (
                                    <div className="text-center text-muted py-4 border" style={{ borderRadius: '4px', backgroundColor: '#fafafa' }}>
                                        <p className="mb-3">No entry yet. Click on the button below to add one.</p>
                                    </div>
                                ) : (
                                    formData.blogQuestion.map((q, index) => (
                                        <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                            {/* Header */}
                                            <div
                                                className="d-flex align-items-center justify-content-between p-3"
                                                style={{
                                                    backgroundColor: '#d4e9f7',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => toggleQuestionCollapse(index)}
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="text-primary">
                                                        {collapsedQuestions[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <Button
                                                        variant="link"
                                                        className="p-0 text-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeBlogQuestion(index);
                                                        }}
                                                        style={{ fontSize: '14px' }}
                                                    >
                                                        <FaTrash size={14} />
                                                    </Button>
                                                    <span className="text-primary" style={{ cursor: 'grab' }}>
                                                        <FaGripVertical size={14} />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <Collapse in={!collapsedQuestions[index]}>
                                                <div className="p-4 bg-white">
                                                    <div className="mb-4">
                                                        <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                            BlogQuestionField
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={q.blogQuestionField || ''}
                                                            onChange={(e) => handleQuestionChange(index, 'blogQuestionField', e.target.value)}
                                                            placeholder="Enter question"
                                                            style={{
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '4px',
                                                                fontSize: '14px',
                                                                padding: '10px 12px'
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                            BlogAnswerField
                                                        </Form.Label>

                                                        <RichTextEditor
                                                            content={q.blogAnswerField || ''}
                                                            onChange={(html) => handleQuestionChange(index, 'blogAnswerField', html)}
                                                            placeholder="Write your answer here..."
                                                            minHeight="300px"
                                                        />
                                                    </div>

                                                    {/* Expand Button */}
                                                    <div className="text-end">
                                                        <Button
                                                            variant="link"
                                                            className="text-decoration-none text-dark p-0"
                                                            style={{ fontSize: '13px' }}
                                                        >
                                                            Expand ⤢
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))
                                )}

                                <Button
                                    variant="link"
                                    className="text-decoration-none w-100 text-center p-3 border mt-2"
                                    style={{
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#0d6efd'
                                    }}
                                    onClick={addBlogQuestion}
                                >
                                    <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                </Button>
                            </div>

                        </div>

                        {/* SEO Section */}
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <h5 className="mb-4">SEO Settings</h5>
                            <FormField
                                label="Meta Title"
                                name="meta_title"
                                value={formData.meta_title}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Meta Description"
                                name="meta_description"
                                as="textarea"
                                rows={3}
                                value={formData.meta_description}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Slug SEO"
                                name="slug_seo"
                                value={formData.slug_seo}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Post Schema"
                                name="post_schema"
                                as="textarea"
                                rows={4}
                                value={formData.post_schema}
                                onChange={handleChange}
                            />
                        </div>

                        {/* OG Tags Section */}
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <h5 className="mb-4">OG Tags</h5>
                            <FormField
                                label="OG Title"
                                name="og_title"
                                value={formData.og_title}
                                onChange={handleChange}
                            />
                            <FormField
                                label="OG Description"
                                name="og_description"
                                as="textarea"
                                rows={3}
                                value={formData.og_description}
                                onChange={handleChange}
                            />
                            <FormField
                                label="OG Image (URL)"
                                name="og_image"
                                value={formData.og_image}
                                onChange={handleChange}
                            />
                            <FormField
                                label="OG Type"
                                name="og_type"
                                value={formData.og_type}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <h6 className="text-uppercase text-secondary mb-3" style={{ fontSize: '12px' }}>Publish</h6>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-secondary"
                                    className="flex-grow-1"
                                    onClick={() => handleSave(true)}
                                    disabled={saving}
                                >
                                    Save Draft
                                </Button>
                                <Button
                                    variant="success"
                                    className="flex-grow-1"
                                    onClick={() => handleSave(false)}
                                    disabled={saving}
                                >
                                    {saving ? 'Publishing...' : (isNew ? 'Publish' : 'Update')}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <h6 className="text-uppercase text-secondary mb-3" style={{ fontSize: '12px' }}>Writer</h6>
                            <Form.Select
                                name="writer"
                                value={formData.writer}
                                onChange={handleChange}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    padding: '10px 12px'
                                }}
                            >
                                <option value="">Select Writer</option>
                                {writers.map(w => (
                                    <option key={w.id} value={w.id}>{w.name}</option>
                                ))}
                            </Form.Select>
                        </div>

                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            <h6 className="text-uppercase text-secondary mb-3" style={{ fontSize: '12px' }}>Categories</h6>
                            <Form.Select
                                name="categoryId"
                                value={formData.categories[0] || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, categories: [e.target.value] }))}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    padding: '10px 12px'
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.categoryName ?? c.name ?? 'Unnamed'}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
            </Form>

            {/* Image Metadata Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{activeImageField === 'image' ? 'Image Details' : 'Details'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activeImageField === 'image' && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Alternative Text</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={imageMetadata.image.alt_text}
                                    onChange={(e) => handleImageMetadataChange('image', 'alt_text', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Caption</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={imageMetadata.image.caption}
                                    onChange={(e) => handleImageMetadataChange('image', 'caption', e.target.value)}
                                />
                            </Form.Group>
                            <div className="text-muted small">
                                <p>File: {imageMetadata.image.filename}</p>
                                <p>Size: {imageMetadata.image.size}</p>
                                <p>Dimensions: {imageMetadata.image.dimensions}</p>
                                <p>Type: {imageMetadata.image.extension}</p>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCloseModal(true)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BlogForm;
