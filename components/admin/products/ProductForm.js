import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Collapse, Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
const PageBuilder = dynamic(() => import('../PageBuilder'), { ssr: false });
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { required, slugFormat, slugify } from '../../../lib/validation';
import { toast } from 'react-toastify';

/** Build preview URL: use as-is if absolute, else prepend STRAPI_IMAGE_BASE_URL (public route uses same pattern) */
function imagePreviewUrl(url) {
    if (!url) return '';
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) return url;
    const base = (STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '');
    const path = typeof url === 'string' && url.startsWith('/') ? url : `/${url || ''}`;
    return base ? `${base}${path}` : url;
}

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaSave, FaTimes, FaPlus, FaChevronDown, FaChevronRight, FaTrash, FaGripVertical, FaPen, FaExternalLinkAlt, FaCog } from '../../OptimizedIcons';
const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

// FormField is already outside
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

const ProductForm = ({ initialData = {}, onChange, onSave, saving, pageBlocks = [], onPageBlocksChange, onRegenerateBlocks }) => {
    const [formData, setFormData] = useState({
        layout: initialData.layout || '',
        heading: initialData.heading || '',
        shortDescription: initialData.shortDescription || '',
        image: initialData.image || initialData.Image || null,
        brandsLogo: initialData.brandsLogo || initialData.BrandsLogo || null,

        // Section 2
        section2_heading: initialData.section2_heading || '',
        section2_shortDescription: initialData.section2_shortDescription || '',
        section2_boxes: initialData.section2_boxes || [],

        // Section 3
        section3_entries: initialData.section3_entries || [],

        // Section 4
        section4_heading: initialData.section4_heading || '',
        section4_shortDescription: initialData.section4_shortDescription || '',
        section4_boxes: initialData.section4_boxes || [],

        // Section 5
        section5_heading: initialData.section5_heading || '',
        section5_shortDescription: initialData.section5_shortDescription || '',
        section5_boxes: initialData.section5_boxes || [],

        // Section 6
        section6_heading: initialData.section6_heading || '',
        section6_shortDescription: initialData.section6_shortDescription || '',
        section6_boxes: initialData.section6_boxes || [],

        // Section 7
        section7_heading: initialData.section7_heading || '',
        section7_shortDescription: initialData.section7_shortDescription || '',
        section7_boxes: initialData.section7_boxes || [],

        // FAQ Section
        faqList: initialData.faqList || [],

        // SEO Settings (slug = URL; when editing, show slug or meta_title in slug field)
        meta_title: initialData.meta_title || '',
        meta_description: initialData.meta_description || '',
        slug: initialData.slug || initialData.meta_title || '',
        schema: initialData.schema || '',
        og_title: initialData.og_title || '',
        og_description: initialData.og_description || '',
        og_image: initialData.og_image || '',
        og_type: initialData.og_type || 'website',
        publishedAt: initialData.publishedAt || initialData.published_at || null,
    });

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    const handleSave = (isDraft = false) => {
        const headingErr = required(formData.heading, 'Heading');
        if (headingErr) {
            toast.error(headingErr);
            return;
        }
        let slug = (formData.slug || '').trim();
        if (!slug && (formData.meta_title || formData.heading || '').trim()) {
            slug = slugify(formData.meta_title || formData.heading, 'product');
        }
        const slugErr = slug ? slugFormat(slug, 'Slug') : required(slug, 'Slug');
        if (slugErr) {
            toast.error(slugErr);
            return;
        }
        if (onSave) {
            onSave({ ...formData, slug }, isDraft);
        }
    };

    useEffect(() => {
        if (initialData) {
            const newPreviews = {};

            // Image (API: Image or image; public uses postData?.Image?.url)
            const img = initialData.image || initialData.Image;
            if (img && img.url) {
                newPreviews.image = imagePreviewUrl(img.url);
            }

            // BrandsLogo (API: array; public uses postData?.BrandsLogo[].url)
            const logos = initialData.brandsLogo || initialData.BrandsLogo;
            if (logos) {
                if (Array.isArray(logos) && logos.length > 0 && logos[0] && logos[0].url) {
                    newPreviews.brandsLogo = imagePreviewUrl(logos[0].url);
                } else if (!Array.isArray(logos) && logos && logos.url) {
                    newPreviews.brandsLogo = imagePreviewUrl(logos.url);
                }
            }

            // Section 2 Boxes (public: item?.icon?.url, item?.image?.url)
            if (initialData.section2_boxes && Array.isArray(initialData.section2_boxes)) {
                initialData.section2_boxes.forEach((box, index) => {
                    if (box && box.icon && box.icon.url) {
                        newPreviews[`section2_boxes_${index}_icon`] = imagePreviewUrl(box.icon.url);
                    }
                    if (box && box.image && box.image.url) {
                        newPreviews[`section2_boxes_${index}_image`] = imagePreviewUrl(box.image.url);
                    }
                });
            }

            // Section 3 Entries (public: section3?.image?.url)
            if (initialData.section3_entries && Array.isArray(initialData.section3_entries)) {
                initialData.section3_entries.forEach((entry, index) => {
                    if (entry && entry.image && entry.image.url) {
                        newPreviews[`section3_entries_${index}_image`] = imagePreviewUrl(entry.image.url);
                    }
                });
            }

            // Section 4 Boxes (public: item?.icon?.url; mapper exposes as image too)
            if (initialData.section4_boxes && Array.isArray(initialData.section4_boxes)) {
                initialData.section4_boxes.forEach((box, index) => {
                    if (box && (box.image?.url || box.icon?.url)) {
                        newPreviews[`section4_boxes_${index}_image`] = imagePreviewUrl((box.image || box.icon).url);
                    }
                });
            }

            // Section 5 Boxes (public: item?.icon?.url)
            if (initialData.section5_boxes && Array.isArray(initialData.section5_boxes)) {
                initialData.section5_boxes.forEach((box, index) => {
                    if (box && (box.image?.url || box.icon?.url)) {
                        newPreviews[`section5_boxes_${index}_image`] = imagePreviewUrl((box.image || box.icon).url);
                    }
                });
            }

            // Section 6 Boxes (public: item?.image?.url)
            if (initialData.section6_boxes && Array.isArray(initialData.section6_boxes)) {
                initialData.section6_boxes.forEach((box, index) => {
                    if (box && box.image && box.image.url) {
                        newPreviews[`section6_boxes_${index}_image`] = imagePreviewUrl(box.image.url);
                    }
                });
            }

            // Section 7 Boxes / points (public: item?.image?.url)
            if (initialData.section7_boxes && Array.isArray(initialData.section7_boxes)) {
                initialData.section7_boxes.forEach((box, index) => {
                    if (box && box.image && box.image.url) {
                        newPreviews[`section7_boxes_${index}_image`] = imagePreviewUrl(box.image.url);
                    }
                });
            }

            setImagePreviews(prev => ({ ...prev, ...newPreviews }));
        }
    }, [initialData]);

    const [imagePreviews, setImagePreviews] = useState({});
    const [imageMetadata, setImageMetadata] = useState({});
    const [imageFileIds, setImageFileIds] = useState({});
    const [activeImageField, setActiveImageField] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPageBuilderModal, setShowPageBuilderModal] = useState(false);

    useEffect(() => {
        if (!initialData) return;
        const ids = {};
        const img = initialData.image || initialData.Image;
        if (img?.id) ids.image = img.id;
        const logos = initialData.brandsLogo || initialData.BrandsLogo;
        if (Array.isArray(logos) && logos[0]?.id) ids.brandsLogo = logos[0].id;
        else if (logos?.id) ids.brandsLogo = logos.id;
        setImageFileIds(prev => ({ ...prev, ...ids }));
    }, [initialData]);

    const handleShowModal = (fieldInfo) => {
        setActiveImageField(fieldInfo);
        setShowModal(true);
    };

    const handleCloseModal = (persist = false) => {
        if (persist && activeImageField) {
            let fileId = null;
            let meta = {};
            if (typeof activeImageField === 'string') {
                fileId = imageFileIds[activeImageField];
                meta = imageMetadata[activeImageField] || {};
            } else if (activeImageField?.listName) {
                const { listName, index, fieldName } = activeImageField;
                const item = formData[listName]?.[index];
                fileId = item?.[`${fieldName}_id`];
                meta = { alt_text: item?.[`${fieldName}_alt_text`], caption: item?.[`${fieldName}_caption`] };
            }
            if (fileId && (meta.alt_text || meta.caption)) {
                adminService.updateFileInfo(fileId, {
                    alternativeText: meta.alt_text || '',
                    caption: meta.caption || '',
                });
            }
        }
        setShowModal(false);
        setActiveImageField(null);
    };

    const handleListImageUpload = (e, listName, index, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;

                setImagePreviews(prev => ({
                    ...prev,
                    [`${listName}_${index}_${fieldName}`]: result
                }));

                const img = new window.Image();
                img.src = result;
                img.onload = () => {
                    setFormData(prev => {
                        const updatedList = [...prev[listName]];
                        updatedList[index] = {
                            ...updatedList[index],
                            [fieldName]: file,
                            [`${fieldName}_filename`]: file.name,
                            [`${fieldName}_size`]: (file.size / 1024).toFixed(2) + ' KB',
                            [`${fieldName}_date`]: new Date().toLocaleDateString(),
                            [`${fieldName}_extension`]: file.name.split('.').pop(),
                            [`${fieldName}_dimensions`]: `${img.naturalWidth} x ${img.naturalHeight}`
                        };
                        return { ...prev, [listName]: updatedList };
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveListImage = (listName, index, fieldName) => {
        const updatedList = [...formData[listName]];
        updatedList[index][fieldName] = null;
        // Also clear metadata
        updatedList[index][`${fieldName}_filename`] = '';
        updatedList[index][`${fieldName}_alt_text`] = '';
        updatedList[index][`${fieldName}_caption`] = '';
        setFormData(prev => ({ ...prev, [listName]: updatedList }));

        const previewKey = `${listName}_${index}_${fieldName}`;
        setImagePreviews(prev => {
            const newState = { ...prev };
            delete newState[previewKey];
            return newState;
        });
    };

    const handleModalMetadataChange = (field, value) => {
        if (!activeImageField) return;

        // Check if activeImageField is a string (top level) or object (list)
        if (typeof activeImageField === 'string') {
            handleImageMetadataChange(activeImageField, field, value);
        } else {
            const { listName, index, fieldName } = activeImageField;
            const updatedList = [...formData[listName]];
            // Construct the property name, e.g. icon_filename, image_alt
            updatedList[index][`${fieldName}_${field}`] = value;
            setFormData(prev => ({ ...prev, [listName]: updatedList }));
        }
    };

    const handleModalRemoveImage = () => {
        if (!activeImageField) return;

        if (typeof activeImageField === 'string') {
            setFormData(prev => ({ ...prev, [activeImageField]: null }));
            setImagePreviews(prev => ({ ...prev, [activeImageField]: null }));
            setImageMetadata(prev => ({
                ...prev,
                [activeImageField]: { filename: '', alt_text: '', caption: '' }
            }));
        } else {
            const { listName, index, fieldName } = activeImageField;
            const updatedList = [...formData[listName]];
            updatedList[index][fieldName] = null;
            updatedList[index][`${fieldName}_filename`] = '';
            updatedList[index][`${fieldName}_alt`] = '';
            updatedList[index][`${fieldName}_caption`] = '';
            setFormData(prev => ({ ...prev, [listName]: updatedList }));
            setImagePreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[`${listName}_${index}_${fieldName}`];
                return newPreviews;
            });
        }
    };

    // Collapsed state for entire sections
    const [collapsedSection2, setCollapsedSection2] = useState(false);
    const [collapsedSection3, setCollapsedSection3] = useState(false);
    const [collapsedSection4, setCollapsedSection4] = useState(false);
    const [collapsedSection5, setCollapsedSection5] = useState(false);
    const [collapsedSection6, setCollapsedSection6] = useState(false);
    const [collapsedSection7, setCollapsedSection7] = useState(false);

    // Collapsed state for individual entries within sections
    const [collapsedSection2Boxes, setCollapsedSection2Boxes] = useState({});
    const [collapsedSection3Entries, setCollapsedSection3Entries] = useState({});
    const [collapsedSection4Boxes, setCollapsedSection4Boxes] = useState({});
    const [collapsedSection5Boxes, setCollapsedSection5Boxes] = useState({});
    const [collapsedSection6Boxes, setCollapsedSection6Boxes] = useState({});
    const [collapsedSection7Boxes, setCollapsedSection7Boxes] = useState({});
    const [collapsedFaqList, setCollapsedFaqList] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setImagePreviews(prev => ({ ...prev, [fieldName]: result }));

                const img = new window.Image();
                img.src = result;
                img.onload = () => {
                    setImageMetadata(prev => ({
                        ...prev,
                        [fieldName]: {
                            filename: file.name,
                            alt_text: '',
                            caption: '',
                            size: (file.size / 1024).toFixed(2) + ' KB',
                            date: new Date().toLocaleDateString(),
                            extension: file.name.split('.').pop(),
                            dimensions: `${img.naturalWidth} x ${img.naturalHeight}`
                        }
                    }));
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null
        }));
        setImagePreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[fieldName];
            return newPreviews;
        });
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: { filename: '', alt_text: '', caption: '' }
        }));
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

    // Section 2 Boxes Management
    const addSection2Box = () => {
        setFormData(prev => ({
            ...prev,
            section2_boxes: [...prev.section2_boxes, {
                heading: '',
                icon: null,
                description_back: '',
                image: null,
                // Metadata
                icon_filename: '', icon_alt: '', icon_caption: '',
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection2Box = (index) => {
        setFormData(prev => ({
            ...prev,
            section2_boxes: prev.section2_boxes.filter((_, i) => i !== index)
        }));
    };

    const handleSection2BoxChange = (index, field, value) => {
        const updated = [...formData.section2_boxes];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section2_boxes: updated
        }));
    };

    const toggleSection2BoxCollapse = (index) => {
        setCollapsedSection2Boxes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 3 Entries Management
    const addSection3Entry = () => {
        setFormData(prev => ({
            ...prev,
            section3_entries: [...prev.section3_entries, {
                subHeading: '', heading: '', description: '', image: null,
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection3Entry = (index) => {
        setFormData(prev => ({
            ...prev,
            section3_entries: prev.section3_entries.filter((_, i) => i !== index)
        }));
    };

    const handleSection3EntryChange = (index, field, value) => {
        const updated = [...formData.section3_entries];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section3_entries: updated
        }));
    };

    const toggleSection3EntryCollapse = (index) => {
        setCollapsedSection3Entries(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 4 Boxes Management
    const addSection4Box = () => {
        setFormData(prev => ({
            ...prev,
            section4_boxes: [...prev.section4_boxes, {
                heading: '', description: '', image: null,
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection4Box = (index) => {
        setFormData(prev => ({
            ...prev,
            section4_boxes: prev.section4_boxes.filter((_, i) => i !== index)
        }));
    };

    const handleSection4BoxChange = (index, field, value) => {
        const updated = [...formData.section4_boxes];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section4_boxes: updated
        }));
    };

    const toggleSection4BoxCollapse = (index) => {
        setCollapsedSection4Boxes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 5 Boxes Management
    const addSection5Box = () => {
        setFormData(prev => ({
            ...prev,
            section5_boxes: [...prev.section5_boxes, {
                heading: '', description: '', image: null,
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection5Box = (index) => {
        setFormData(prev => ({
            ...prev,
            section5_boxes: prev.section5_boxes.filter((_, i) => i !== index)
        }));
    };

    const handleSection5BoxChange = (index, field, value) => {
        const updated = [...formData.section5_boxes];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section5_boxes: updated
        }));
    };

    const toggleSection5BoxCollapse = (index) => {
        setCollapsedSection5Boxes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 6 Boxes Management
    const addSection6Box = () => {
        setFormData(prev => ({
            ...prev,
            section6_boxes: [...prev.section6_boxes, {
                heading: '', description: '', image: null,
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection6Box = (index) => {
        setFormData(prev => ({
            ...prev,
            section6_boxes: prev.section6_boxes.filter((_, i) => i !== index)
        }));
    };

    const handleSection6BoxChange = (index, field, value) => {
        const updated = [...formData.section6_boxes];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section6_boxes: updated
        }));
    };

    const toggleSection6BoxCollapse = (index) => {
        setCollapsedSection6Boxes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 7 Boxes Management
    const addSection7Box = () => {
        setFormData(prev => ({
            ...prev,
            section7_boxes: [...prev.section7_boxes, {
                heading: '', description: '', image: null,
                image_filename: '', image_alt: '', image_caption: ''
            }]
        }));
    };

    const removeSection7Box = (index) => {
        setFormData(prev => ({
            ...prev,
            section7_boxes: prev.section7_boxes.filter((_, i) => i !== index)
        }));
    };

    const handleSection7BoxChange = (index, field, value) => {
        const updated = [...formData.section7_boxes];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            section7_boxes: updated
        }));
    };

    const toggleSection7BoxCollapse = (index) => {
        setCollapsedSection7Boxes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // FAQ List Management
    const addFaqEntry = () => {
        setFormData(prev => ({
            ...prev,
            faqList: [...prev.faqList, { serviceFaqTitle: '', serviceFaqDetails: '' }]
        }));
    };

    const removeFaqEntry = (index) => {
        setFormData(prev => ({
            ...prev,
            faqList: prev.faqList.filter((_, i) => i !== index)
        }));
    };

    const handleFaqChange = (index, field, value) => {
        const updated = [...formData.faqList];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            faqList: updated
        }));
    };

    const toggleFaqCollapse = (index) => {
        setCollapsedFaqList(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Section 7 Boxes Management (continued)

    // FormField is already outside

    const ImageUploadField = ({ label, preview, onUpload, onRemove, fieldName, handleShowModal }) => {
        return (
            <div className="mb-4">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                    {label}
                </Form.Label>
                {preview ? (
                    <div className="mb-3">
                        <div className="position-relative mb-3" style={{ maxWidth: '400px' }}>
                            <Image
                                src={preview}
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
                                    onClick={() => handleShowModal(fieldName)}
                                    title="Edit Details"
                                >
                                    <FaPen size={12} />
                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={onRemove}
                                    title="Remove"
                                >
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="border bg-light d-flex align-items-center justify-content-center"
                        style={{
                            height: '150px',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div className="text-center text-muted">
                            <FaCloudUploadAlt size={24} className="mb-2" />
                            <p className="mb-0 small">Click to upload</p>
                        </div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={onUpload}
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
        );
    };

    const ListImageUploadField = ({ label, listName, index, fieldName, imagePreviews, handleShowModal, handleListImageUpload, handleRemoveListImage }) => {
        const previewKey = `${listName}_${index}_${fieldName}`;
        // For lists, we rely on imagePreviews state for the URL.
        const previewUrl = imagePreviews[previewKey];

        return (
            <div className="mb-4">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                    {label}
                </Form.Label>
                {previewUrl ? (
                    <div className="mb-3">
                        <div className="position-relative mb-3" style={{ maxWidth: '400px' }}>
                            <Image
                                src={previewUrl}
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
                                    onClick={() => handleShowModal({ type: 'list', listName, index, fieldName })}
                                    title="Edit Details"
                                >
                                    <FaPen size={12} />
                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={() => handleRemoveListImage(listName, index, fieldName)}
                                    title="Remove"
                                >
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="border bg-light d-flex align-items-center justify-content-center"
                        style={{
                            height: '150px',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div className="text-center text-muted">
                            <FaCloudUploadAlt size={24} className="mb-2" />
                            <p className="mb-0 small">Click to upload</p>
                        </div>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleListImageUpload(e, listName, index, fieldName)}
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
        );
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <Form>
                <Row>
                    <Col lg={8}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            {/* Layout Selector */}
                            <Row>
                                <Col md={6}>
                                    <div className="mb-4">
                                        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                            Layout
                                        </Form.Label>
                                        <Form.Select
                                            name="layout"
                                            value={formData.layout}
                                            onChange={handleChange}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                padding: '10px 12px',
                                                color: formData.layout ? '#000' : '#6c757d'
                                            }}
                                        >
                                            <option value="">Choose here</option>
                                            <option value="layout_1">Layout 1</option>
                                            <option value="layout_2">Layout 2</option>
                                        </Form.Select>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <FormField
                                        label="Heading"
                                        name="heading"
                                        value={formData.heading}
                                        onChange={handleChange}
                                        placeholder="Enter product heading"
                                    />
                                </Col>
                            </Row>

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Short Description
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.shortDescription}
                                    onChange={(html) => setFormData(prev => ({ ...prev, shortDescription: html }))}
                                    placeholder="Brief description of the product"
                                    minHeight="150px"
                                />
                            </div>


                            <Row>
                                <Col md={6}>
                                    <ImageUploadField
                                        label="Image"
                                        preview={imagePreviews.image}
                                        onUpload={(e) => handleImageUpload(e, 'image')}
                                        onRemove={() => removeImage('image')}
                                        fieldName="image"
                                        handleShowModal={handleShowModal}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ImageUploadField
                                        label="Brands Logo"
                                        preview={imagePreviews.brandsLogo}
                                        onUpload={(e) => handleImageUpload(e, 'brandsLogo')}
                                        onRemove={() => removeImage('brandsLogo')}
                                        fieldName="brandsLogo"
                                        handleShowModal={handleShowModal}
                                    />
                                </Col>
                            </Row>


                            {/* Section 2 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection2 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection2(!collapsedSection2)}
                                >
                                    <h6 className="fw-bold mb-0">Section2</h6>
                                    <span className="text-primary">
                                        {collapsedSection2 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection2}>
                                    <div className="p-4 bg-white">
                                        <FormField
                                            label="Heading"
                                            name="section2_heading"
                                            value={formData.section2_heading}
                                            onChange={handleChange}
                                            placeholder="Section 2 heading"
                                        />

                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                Short Description
                                            </Form.Label>
                                            <RichTextEditor
                                                content={formData.section2_shortDescription}
                                                onChange={(html) => setFormData(prev => ({ ...prev, section2_shortDescription: html }))}
                                                placeholder="Section 2 short description"
                                                minHeight="150px"
                                            />
                                        </div>

                                        {/* Section 2 Boxes */}
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Section Boxes ({formData.section2_boxes.length})
                                            </Form.Label>

                                            {formData.section2_boxes.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section2_boxes.map((box, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        {/* Header */}
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection2BoxCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection2Boxes[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                                <span className="text-dark" style={{ fontSize: '14px' }}>Box {index + 1}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection2Box(index);
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
                                                        <Collapse in={!collapsedSection2Boxes[index]}>
                                                            <div className="p-4 bg-white">
                                                                <div className="mb-4">
                                                                    <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                        Heading
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={box.heading}
                                                                        onChange={(e) => handleSection2BoxChange(index, 'heading', e.target.value)}
                                                                        placeholder="Enter heading"
                                                                        style={{
                                                                            border: '1px solid #e0e0e0',
                                                                            borderRadius: '4px',
                                                                            fontSize: '14px',
                                                                            padding: '10px 12px'
                                                                        }}
                                                                    />
                                                                </div>

                                                                <ListImageUploadField
                                                                    label="Icon"
                                                                    listName="section2_boxes"
                                                                    index={index}
                                                                    fieldName="icon"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />

                                                                <div className="mb-4">
                                                                    <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                        Description Back
                                                                    </Form.Label>
                                                                    <RichTextEditor
                                                                        content={box.description_back}
                                                                        onChange={(html) => handleSection2BoxChange(index, 'description_back', html)}
                                                                        placeholder="Enter description"
                                                                        minHeight="150px"
                                                                    />
                                                                </div>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section2_boxes"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection2Box}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>


                            {/* Section 3 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection3 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection3(!collapsedSection3)}
                                >
                                    <h6 className="fw-bold mb-0">Section3</h6>
                                    <span className="text-primary">
                                        {collapsedSection3 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection3}>
                                    <div className="p-4 bg-white">
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Section 3 Entries ({formData.section3_entries.length})
                                            </Form.Label>

                                            {formData.section3_entries.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section3_entries.map((entry, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        {/* Header */}
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection3EntryCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection3Entries[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                                <span className="text-dark" style={{ fontSize: '14px' }}>Entry {index + 1}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection3Entry(index);
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
                                                        <Collapse in={!collapsedSection3Entries[index]}>
                                                            <div className="p-4 bg-white">
                                                                <div className="mb-4">
                                                                    <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                        Sub Heading
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={entry.subHeading}
                                                                        onChange={(e) => handleSection3EntryChange(index, 'subHeading', e.target.value)}
                                                                        placeholder="Enter sub heading"
                                                                        style={{
                                                                            border: '1px solid #e0e0e0',
                                                                            borderRadius: '4px',
                                                                            fontSize: '14px',
                                                                            padding: '10px 12px'
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="mb-4">
                                                                    <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                        Heading
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={entry.heading}
                                                                        onChange={(e) => handleSection3EntryChange(index, 'heading', e.target.value)}
                                                                        placeholder="Enter heading"
                                                                        style={{
                                                                            border: '1px solid #e0e0e0',
                                                                            borderRadius: '4px',
                                                                            fontSize: '14px',
                                                                            padding: '10px 12px'
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="mb-4">
                                                                    <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                        Description
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={4}
                                                                        value={entry.description}
                                                                        onChange={(e) => handleSection3EntryChange(index, 'description', e.target.value)}
                                                                        placeholder="Enter description"
                                                                        style={{
                                                                            border: '1px solid #e0e0e0',
                                                                            borderRadius: '4px',
                                                                            fontSize: '14px',
                                                                            padding: '10px 12px'
                                                                        }}
                                                                    />
                                                                </div>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section3_entries"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection3Entry}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            {/* Section 4 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection4 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection4(!collapsedSection4)}
                                >
                                    <h6 className="fw-bold mb-0">Section4</h6>
                                    <span className="text-primary">
                                        {collapsedSection4 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection4}>
                                    <div className="p-4 bg-white">
                                        <FormField
                                            label="Heading"
                                            name="section4_heading"
                                            value={formData.section4_heading}
                                            onChange={handleChange}
                                            placeholder="Section 4 heading"
                                        />

                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                Short Description
                                            </Form.Label>
                                            <RichTextEditor
                                                content={formData.section4_shortDescription}
                                                onChange={(html) => setFormData(prev => ({ ...prev, section4_shortDescription: html }))}
                                                placeholder="Section 4 short description"
                                                minHeight="150px"
                                            />
                                        </div>

                                        {/* Section 4 Boxes */}
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Boxes ({formData.section4_boxes.length})
                                            </Form.Label>

                                            {formData.section4_boxes.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section4_boxes.map((box, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection4BoxCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection4Boxes[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection4Box(index);
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

                                                        <Collapse in={!collapsedSection4Boxes[index]}>
                                                            <div className="p-4 bg-white">
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Heading
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={box.heading}
                                                                                onChange={(e) => handleSection4BoxChange(index, 'heading', e.target.value)}
                                                                                placeholder="Enter heading"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Description
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                rows={3}
                                                                                value={box.description}
                                                                                onChange={(e) => handleSection4BoxChange(index, 'description', e.target.value)}
                                                                                placeholder="Enter description"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section4_boxes"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection4Box}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>



                            {/* Section 5 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection5 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection5(!collapsedSection5)}
                                >
                                    <h6 className="fw-bold mb-0">Section5</h6>
                                    <span className="text-primary">
                                        {collapsedSection5 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection5}>
                                    <div className="p-4 bg-white">
                                        <FormField
                                            label="Heading"
                                            name="section5_heading"
                                            value={formData.section5_heading}
                                            onChange={handleChange}
                                            placeholder="Section 5 heading"
                                        />

                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                Short Description
                                            </Form.Label>
                                            <RichTextEditor
                                                content={formData.section5_shortDescription}
                                                onChange={(html) => setFormData(prev => ({ ...prev, section5_shortDescription: html }))}
                                                placeholder="Section 5 short description"
                                                minHeight="150px"
                                            />
                                        </div>

                                        {/* Section 5 Boxes */}
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Boxes ({formData.section5_boxes.length})
                                            </Form.Label>

                                            {formData.section5_boxes.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section5_boxes.map((box, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection5BoxCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection5Boxes[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection5Box(index);
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

                                                        <Collapse in={!collapsedSection5Boxes[index]}>
                                                            <div className="p-4 bg-white">
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Heading
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={box.heading}
                                                                                onChange={(e) => handleSection5BoxChange(index, 'heading', e.target.value)}
                                                                                placeholder="Enter heading"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Description
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                rows={3}
                                                                                value={box.description}
                                                                                onChange={(e) => handleSection5BoxChange(index, 'description', e.target.value)}
                                                                                placeholder="Enter description"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section5_boxes"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection5Box}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>


                            {/* Section 6 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection6 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection6(!collapsedSection6)}
                                >
                                    <h6 className="fw-bold mb-0">Section6</h6>
                                    <span className="text-primary">
                                        {collapsedSection6 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection6}>
                                    <div className="p-4 bg-white">
                                        <FormField
                                            label="Heading"
                                            name="section6_heading"
                                            value={formData.section6_heading}
                                            onChange={handleChange}
                                            placeholder="Section 6 heading"
                                        />

                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                Short Description
                                            </Form.Label>
                                            <RichTextEditor
                                                content={formData.section6_shortDescription}
                                                onChange={(html) => setFormData(prev => ({ ...prev, section6_shortDescription: html }))}
                                                placeholder="Section 6 short description"
                                                minHeight="150px"
                                            />
                                        </div>

                                        {/* Section 6 Boxes */}
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Boxes ({formData.section6_boxes.length})
                                            </Form.Label>

                                            {formData.section6_boxes.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section6_boxes.map((box, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection6BoxCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection6Boxes[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection6Box(index);
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

                                                        <Collapse in={!collapsedSection6Boxes[index]}>
                                                            <div className="p-4 bg-white">
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Heading
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={box.heading}
                                                                                onChange={(e) => handleSection6BoxChange(index, 'heading', e.target.value)}
                                                                                placeholder="Enter heading"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Description
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                rows={3}
                                                                                value={box.description}
                                                                                onChange={(e) => handleSection6BoxChange(index, 'description', e.target.value)}
                                                                                placeholder="Enter description"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section6_boxes"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection6Box}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            {/* Section 7 */}
                            <div className="mb-4 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    className="d-flex align-items-center justify-content-between p-3"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                        borderBottom: collapsedSection7 ? 'none' : '1px solid #dee2e6'
                                    }}
                                    onClick={() => setCollapsedSection7(!collapsedSection7)}
                                >
                                    <h6 className="fw-bold mb-0">Section7</h6>
                                    <span className="text-primary">
                                        {collapsedSection7 ? <FaChevronRight size={16} /> : <FaChevronDown size={16} />}
                                    </span>
                                </div>

                                <Collapse in={!collapsedSection7}>
                                    <div className="p-4 bg-white">

                                        <FormField
                                            label="Heading"
                                            name="section7_heading"
                                            value={formData.section7_heading}
                                            onChange={handleChange}
                                            placeholder="Section 7 heading"
                                        />

                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                Short Description
                                            </Form.Label>
                                            <RichTextEditor
                                                content={formData.section7_shortDescription}
                                                onChange={(html) => setFormData(prev => ({ ...prev, section7_shortDescription: html }))}
                                                placeholder="Section 7 short description"
                                                minHeight="150px"
                                            />
                                        </div>

                                        {/* Section 7 Boxes */}
                                        <div className="mb-4">
                                            <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                                Boxes ({formData.section7_boxes.length})
                                            </Form.Label>

                                            {formData.section7_boxes.length === 0 ? (
                                                <div className="text-muted small mb-2 fst-italic">
                                                    No entry yet. Click on the button below to add one.
                                                </div>
                                            ) : (
                                                formData.section7_boxes.map((box, index) => (
                                                    <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-3"
                                                            style={{
                                                                backgroundColor: '#d4e9f7',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => toggleSection7BoxCollapse(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-primary">
                                                                    {collapsedSection7Boxes[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <Button
                                                                    variant="link"
                                                                    className="p-0 text-danger"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeSection7Box(index);
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

                                                        <Collapse in={!collapsedSection7Boxes[index]}>
                                                            <div className="p-4 bg-white">
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Heading
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={box.heading}
                                                                                onChange={(e) => handleSection7BoxChange(index, 'heading', e.target.value)}
                                                                                placeholder="Enter heading"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-4">
                                                                            <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                                                Description
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                rows={3}
                                                                                value={box.description}
                                                                                onChange={(e) => handleSection7BoxChange(index, 'description', e.target.value)}
                                                                                placeholder="Enter description"
                                                                                style={{
                                                                                    border: '1px solid #e0e0e0',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '14px',
                                                                                    padding: '10px 12px'
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <ListImageUploadField
                                                                    label="Image"
                                                                    listName="section7_boxes"
                                                                    index={index}
                                                                    fieldName="image"
                                                                    imagePreviews={imagePreviews}
                                                                    handleShowModal={handleShowModal}
                                                                    handleListImageUpload={handleListImageUpload}
                                                                    handleRemoveListImage={handleRemoveListImage}
                                                                />
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
                                                onClick={addSection7Box}
                                            >
                                                <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                            {/* FAQ Section */}
                            <h6 className="fw-bold mb-3 mt-4">FAQ Section</h6>

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                    FaqList ({formData.faqList.length})
                                </Form.Label>

                                {formData.faqList.length === 0 ? (
                                    <div className="text-muted small mb-2 fst-italic">
                                        No entry yet. Click on the button below to add one.
                                    </div>
                                ) : (
                                    formData.faqList.map((faq, index) => (
                                        <div key={index} className="mb-3 border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                            {/* Header */}
                                            <div
                                                className="d-flex align-items-center justify-content-between p-3"
                                                style={{
                                                    backgroundColor: '#d4e9f7',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => toggleFaqCollapse(index)}
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="text-primary">
                                                        {collapsedFaqList[index] ? <FaChevronRight size={14} /> : <FaChevronDown size={14} />}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <Button
                                                        variant="link"
                                                        className="p-0 text-danger"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeFaqEntry(index);
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
                                            <Collapse in={!collapsedFaqList[index]}>
                                                <div className="p-4 bg-white">
                                                    <div className="mb-4">
                                                        <Form.Label className="text-dark mb-2" style={{ fontSize: '13px' }}>
                                                            ServiceFaqTitle
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            value={faq.serviceFaqTitle}
                                                            onChange={(e) => handleFaqChange(index, 'serviceFaqTitle', e.target.value)}
                                                            placeholder="Enter FAQ title"
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
                                                            ServiceFaqDetails
                                                        </Form.Label>

                                                        <RichTextEditor
                                                            content={faq.serviceFaqDetails}
                                                            onChange={(html) => handleFaqChange(index, 'serviceFaqDetails', html)}
                                                            placeholder="Write FAQ details here..."
                                                            minHeight="300px"
                                                        />

                                                        {/* Expand Button */}
                                                        <div className="text-end mt-2">
                                                            <Button
                                                                variant="link"
                                                                className="text-decoration-none text-dark p-0"
                                                                style={{ fontSize: '13px' }}
                                                            >
                                                                Expand ⤢
                                                            </Button>
                                                        </div>
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
                                    onClick={addFaqEntry}
                                >
                                    <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                </Button>
                            </div>

                            {/* SEO Settings */}
                            <h6 className="fw-bold mb-3 mt-4">SEO Settings</h6>

                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="Meta Title"
                                        name="meta_title"
                                        value={formData.meta_title}
                                        onChange={handleChange}
                                        placeholder="SEO optimized title"
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormField
                                        label="Slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="url-friendly-slug"
                                    />
                                </Col>
                            </Row>

                            <FormField
                                label="Meta Description"
                                name="meta_description"
                                as="textarea"
                                rows={3}
                                value={formData.meta_description}
                                onChange={handleChange}
                                placeholder="SEO optimized description"
                            />

                            <FormField
                                label="Schema"
                                name="schema"
                                as="textarea"
                                rows={8}
                                value={formData.schema}
                                onChange={handleChange}
                                placeholder={`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product Description"
}`}
                            />


                            {/* OG Tags */}
                            <h6 className="fw-bold mb-3 mt-4">OG Tags</h6>

                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="OG Title"
                                        name="og_title"
                                        value={formData.og_title}
                                        onChange={handleChange}
                                        placeholder="Open Graph title"
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormField
                                        label="OG Type"
                                        name="og_type"
                                        value={formData.og_type}
                                        onChange={handleChange}
                                        placeholder="website"
                                    />
                                </Col>
                            </Row>

                            <FormField
                                label="OG Description"
                                name="og_description"
                                as="textarea"
                                rows={2}
                                value={formData.og_description}
                                onChange={handleChange}
                                placeholder="Open Graph description"
                            />

                            <FormField
                                label="OG Image URL"
                                name="og_image"
                                type="url"
                                value={formData.og_image}
                                onChange={handleChange}
                                placeholder="https://example.com/og-image.jpg"
                            />

                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px', position: 'sticky', top: '20px' }}>
                            <h6 className="text-uppercase text-secondary mb-3" style={{ fontSize: '12px' }}>Publish</h6>
                            <div className="d-flex gap-2 w-100 mb-4">
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
                                    className="flex-grow-1 text-white"
                                    onClick={() => handleSave(false)}
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : ((initialData?.id || initialData?._id) ? 'Update' : 'Save & Publish')}
                                </Button>
                            </div>
                            <Button
                                variant="outline-primary"
                                className="w-100 mb-3"
                                onClick={() => setShowPageBuilderModal(true)}
                            >
                                Open Page Builder
                            </Button>
                            <Button
                                variant="outline-dark"
                                className="w-100 mb-3"
                                disabled={!formData.slug}
                                onClick={() => window.open(`/${formData.slug}`, '_blank', 'noopener,noreferrer')}
                            >
                                Preview
                            </Button>

                            {/* Information Section */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Information</h6>
                                <div className="mb-2">
                                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>LAST UPDATE</small>
                                    <small className="text-dark" style={{ fontSize: '12px' }}>
                                        {initialData.updatedAt ? new Date(initialData.updatedAt).toLocaleDateString() : '-'}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <small className="text-muted d-block" style={{ fontSize: '11px' }}>BY</small>
                                    <small className="text-dark" style={{ fontSize: '12px' }}>
                                        {initialData.updatedBy ? `${initialData.updatedBy.firstname} ${initialData.updatedBy.lastname}` : '-'}
                                    </small>
                                </div>
                                <div className="p-2 bg-light border" style={{ borderRadius: '4px' }}>
                                    <small className="text-primary" style={{ fontSize: '12px' }}>
                                        {(initialData.publishedAt || initialData.published_at) ? (
                                            <><FaPen className="me-2" /> Editing published version</>
                                        ) : (
                                            <><FaPlus className="me-2" /> Editing draft version</>
                                        )}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
            <Modal show={showPageBuilderModal} onHide={() => setShowPageBuilderModal(false)} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="h6 mb-0">Page Builder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted small mb-3">
                        Reorder existing sections, remove blocks, or add new blocks.
                    </p>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="mb-3"
                        onClick={() => onRegenerateBlocks && onRegenerateBlocks()}
                    >
                        Re-generate blocks from existing data
                    </Button>
                    <PageBuilder
                        blocks={pageBlocks}
                        onChange={(newBlocks) => onPageBlocksChange && onPageBlocksChange(newBlocks)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowPageBuilderModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            {/* Image Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="h6 text-secondary">
                        <small>Selected files &gt; Details</small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 bg-light">
                    {(() => {
                        let meta = {};
                        let isList = false;
                        if (activeImageField) {
                            if (typeof activeImageField === 'string') {
                                meta = imageMetadata[activeImageField] || {};
                            } else {
                                isList = true;
                                const { listName, index, fieldName } = activeImageField;
                                const item = formData[listName][index] || {};
                                meta = {
                                    size: item[`${fieldName}_size`],
                                    date: item[`${fieldName}_date`],
                                    dimensions: item[`${fieldName}_dimensions`],
                                    extension: item[`${fieldName}_extension`],
                                    filename: item[`${fieldName}_filename`],
                                    alt_text: item[`${fieldName}_alt`],
                                    caption: item[`${fieldName}_caption`]
                                };
                            }
                        }

                        return (
                            <Row>
                                <Col md={6}>
                                    <div className="bg-dark rounded d-flex align-items-center justify-content-center mb-3" style={{ height: '400px', position: 'relative' }}>
                                        {activeImageField && (
                                            <Image
                                                src={
                                                    typeof activeImageField === 'string'
                                                        ? imagePreviews[activeImageField]
                                                        : imagePreviews[`${activeImageField.listName}_${activeImageField.index}_${activeImageField.fieldName}`]
                                                }
                                                fluid
                                                style={{ maxHeight: '350px', maxWidth: '100%' }}
                                            />
                                        )}
                                        <div className="position-absolute top-0 end-0 p-3">
                                            <Button variant="light" size="sm" className="me-2" onClick={handleModalRemoveImage}><FaTrash /></Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="bg-white p-4 rounded shadow-sm h-100">
                                        <Row className="mb-4">
                                            <Col xs={6}>
                                                <small className="text-muted d-block">Size</small>
                                                <span className="small fw-bold">{meta.size || 'Calculating...'}</span>
                                            </Col>
                                            <Col xs={6}>
                                                <small className="text-muted d-block">Date</small>
                                                <span className="small fw-bold">{meta.date || new Date().toLocaleDateString()}</span>
                                            </Col>
                                            <Col xs={6} className="mt-3">
                                                <small className="text-muted d-block">Dimensions</small>
                                                <span className="small fw-bold">{meta.dimensions || '-'}</span>
                                            </Col>
                                            <Col xs={6} className="mt-3">
                                                <small className="text-muted d-block">Extension</small>
                                                <span className="small fw-bold">{meta.extension || '-'}</span>
                                            </Col>
                                        </Row>

                                        {activeImageField && (
                                            <>
                                                <div className="mb-3">
                                                    <Form.Label className="small fw-bold">File name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={meta.filename || ''}
                                                        onChange={(e) => handleModalMetadataChange('filename', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Form.Label className="small fw-bold">Alternative text</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={meta.alt_text || ''}
                                                        onChange={(e) => handleModalMetadataChange(isList ? 'alt' : 'alt_text', e.target.value)}
                                                    />
                                                    <Form.Text className="text-muted small">This text will be displayed if the asset can't be shown.</Form.Text>
                                                </div>
                                                <div className="mb-3">
                                                    <Form.Label className="small fw-bold">Caption</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={meta.caption || ''}
                                                        onChange={(e) => handleModalMetadataChange('caption', e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        );
                    })()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => handleCloseModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="bg-success border-success" onClick={() => handleCloseModal(true)}>
                        Finish
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductForm;
