import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Card, Image, Collapse, Modal, Dropdown } from 'react-bootstrap';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import adminService from '../../../services/admin.service';
import { slugify } from '../../../lib/validation';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import autoSeedBlocks from '../../page-builder/autoSeedBlocks';
const PageBuilder = dynamic(() => import('../PageBuilder'), { ssr: false });

// Dynamic import to prevent SSR issues with TipTap
import { FaCloudUploadAlt, FaSave, FaTimes, FaPlus, FaChevronDown, FaChevronRight, FaTrash, FaGripVertical, FaPen, FaExternalLinkAlt, FaCog } from '../../OptimizedIcons';
const RichTextEditor = dynamic(
    () => import('../common/RichTextEditor'),
    { ssr: false }
);

/** Strip HTML from rich-text fields so stored content doesn't show literal <p> tags on frontend. content_section_info is stored as HTML to preserve formatting. */
const htmlToPlainText = (html) => {
    if (!html || typeof html !== 'string') return '';
    return html
        .replace(/<img[^>]*\/?>/gi, ' [Image] ')
        .replace(/<\/(p|div|h[1-6]|li|br)>\s*/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/\n\s*\n/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
};

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

const ImageUploadField = ({ label, fieldName, imagePreviews, handleShowModal, removeImage, handleImageUpload }) => {
    return (
        <div className="mb-4">
            <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                {label}
            </Form.Label>
            {imagePreviews[fieldName] ? (
                <div>
                    <div className="position-relative mb-3" style={{ maxWidth: '400px' }}>
                        <Image
                            src={imagePreviews[fieldName]}
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
                                onClick={() => removeImage(fieldName)}
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
                        onChange={(e) => handleImageUpload(e, fieldName)}
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

const PortfolioForm = forwardRef(({ initialData = {}, onSavingChange }, ref) => {
    const router = useRouter();
    const d = initialData;
    const [formData, setFormData] = useState({
        // Basic Info (entity: Title, is_featured, if_feature_background_img, project_logo)
        is_featured: d.is_featured || false,
        featured_background_img: d.featured_background_img || d.if_feature_background_img || null,
        project_logo: d.project_logo || null,
        title: d.title || d.Title || '',
        subtitle: d.subtitle || '',
        slug: d.slug || d.seo_title || '',

        // Listing (entity: listing_intro, listingColorCode)
        listing_intro: d.listing_intro || '',
        listing_color_code: d.listing_color_code || d.listingColorCode || '#000000',

        // Banner (entity: Banner_short_description, Banner_Image)
        banner_short_description: d.banner_short_description || d.Banner_short_description || '',
        banner_image: d.banner_image || d.Banner_Image || null,

        // Location & Links (entity: Country, platform_ios/android/web)
        country: d.country || d.Country || '',
        ios_enabled: d.ios_enabled || d.platform_ios || false,
        ios_link: d.ios_link || '',
        android_enabled: d.android_enabled || d.platform_android || false,
        android_link: d.android_link || '',
        web_enabled: d.web_enabled || d.platform_web || false,
        web_link: d.web_link || '',

        // Content Sections
        intro_content: d.intro_content || '',
        content_section_title: d.content_section_title || '',
        content_section_info: d.content_section_info || '',

        // Secondary Block
        secondary_block_title: d.secondary_block_title || '',
        secondary_block_content: d.secondary_block_content || '',
        secondary_block_img: d.secondary_block_img || null,

        // Mission
        mission_title: d.mission_title || '',
        mission_content: d.mission_content || '',
        mission_img: d.mission_img || null,

        // Challenges
        challenges_title: d.challenges_title || '',
        challenges_content: d.challenges_content || '',
        challenges_image: d.challenges_image || null,

        // Project Strategy
        project_strategy_title: d.project_strategy_title || '',
        project_strategy_content: d.project_strategy_content || '',
        project_strategy_phases: d.project_strategy_phases || [
            { phase_title: '', phase_content: '' },
            { phase_title: '', phase_content: '' },
            { phase_title: '', phase_content: '' },
            { phase_title: '', phase_content: '' },
            { phase_title: '', phase_content: '' },
        ],

        // Client Testimonial (entity: Client_review_img_link)
        client_img: d.client_img || null,
        client_comment: d.client_comment || '',
        client_name: d.client_name || '',
        client_designation: d.client_designation || '',
        client_review_img: d.client_review_img || null,
        client_review_img_link: d.client_review_img_link || d.Client_review_img_link || '',
        client_linkedin_profile_url: d.client_linkedin_profile_url || '',

        // SEO & Additional
        seo_title: d.seo_title || d.slug || '',
        seo_description: d.seo_description || '',
        case_study_pdf: d.case_study_pdf || null,
        schema_code: d.schema_code || '',

        // Dropdowns: normalize to string IDs so select/chips match (API may return objects or ObjectIds)
        industry_name: String((typeof d.industry_name === 'object' && d.industry_name) ? (d.industry_name._id ?? d.industry_name.id) : (d.industry_name ?? '')),
        tech_stacks: (d.tech_stacks || []).map(t => (typeof t === 'object' ? (t._id || t.id) : t)).filter(Boolean).map(id => String(id)),
        technologies: (d.technologies || []).map(t => (typeof t === 'object' ? (t._id || t.id) : t)).filter(Boolean).map(id => String(id)),
        pageBlocks: Array.isArray(d.pageBlocks) ? d.pageBlocks : [],
        pageBlocks: Array.isArray(d.pageBlocks) ? d.pageBlocks : [],
    });

    const [availableIndustries, setAvailableIndustries] = useState([]);
    const [availableTechStacks, setAvailableTechStacks] = useState([]);
    const [availableTechnologies, setAvailableTechnologies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [indRes, stackRes, techRes] = await Promise.all([
                    adminService.getIndustryNames(),
                    adminService.getTechStacks(),
                    adminService.getTechnologies(),
                ]);

                if (indRes.success) setAvailableIndustries(indRes.data || []);
                if (stackRes.success) setAvailableTechStacks(stackRes.data || []);
                if (techRes.success) setAvailableTechnologies(techRes.data || []);
            } catch (error) {
                console.error("Failed to fetch dropdown data:", error);
            }
        };

        fetchData();
    }, []);

    // Sync form state when initialData loads (e.g. edit mode after fetch)
    useEffect(() => {
        const id = initialData?.id || initialData?._id;
        if (!id) return;

        const d = initialData;
        setFormData({
            is_featured: d.is_featured ?? false,
            featured_background_img: d.featured_background_img || d.if_feature_background_img || null,
            project_logo: d.project_logo || null,
            title: d.title || d.Title || '',
            subtitle: d.subtitle || '',
            slug: d.slug || d.seo_title || '',
            listing_intro: d.listing_intro || '',
            listing_color_code: d.listing_color_code || d.listingColorCode || '#000000',
            banner_short_description: d.banner_short_description || d.Banner_short_description || '',
            banner_image: d.banner_image || d.Banner_Image || null,
            country: d.country || d.Country || '',
            ios_enabled: d.ios_enabled ?? d.platform_ios ?? false,
            ios_link: d.ios_link || '',
            android_enabled: d.android_enabled ?? d.platform_android ?? false,
            android_link: d.android_link || '',
            web_enabled: d.web_enabled ?? d.platform_web ?? false,
            web_link: d.web_link || '',
            intro_content: d.intro_content || '',
            content_section_title: d.content_section_title || '',
            content_section_info: d.content_section_info || '',
            secondary_block_title: d.secondary_block_title || '',
            secondary_block_content: d.secondary_block_content || '',
            secondary_block_img: d.secondary_block_img || null,
            mission_title: d.mission_title || '',
            mission_content: d.mission_content || '',
            mission_img: d.mission_img || null,
            challenges_title: d.challenges_title || '',
            challenges_content: d.challenges_content || '',
            challenges_image: d.challenges_image || null,
            project_strategy_title: d.project_strategy_title || '',
            project_strategy_content: d.project_strategy_content || '',
            project_strategy_phases: d.project_strategy_phases || [
                { phase_title: '', phase_content: '' },
                { phase_title: '', phase_content: '' },
                { phase_title: '', phase_content: '' },
                { phase_title: '', phase_content: '' },
                { phase_title: '', phase_content: '' },
            ],
            client_img: d.client_img || null,
            client_comment: d.client_comment || '',
            client_name: d.client_name || '',
            client_designation: d.client_designation || '',
            client_review_img: d.client_review_img || null,
            client_review_img_link: d.client_review_img_link || d.Client_review_img_link || '',
            client_linkedin_profile_url: d.client_linkedin_profile_url || '',
            seo_title: d.seo_title || d.slug || '',
            seo_description: d.seo_description || '',
            case_study_pdf: d.case_study_pdf || null,
            schema_code: d.schema_code || '',
            industry_name: (() => {
                const ind = d.industry_name;
                if (!ind) return '';
                if (typeof ind === 'string') return ind;
                // populated object — extract actual ObjectId
                const oid = ind._id || ind.id;
                return oid ? String(oid) : '';
            })(),
            tech_stacks: (d.tech_stacks || []).map(t => (typeof t === 'object' ? (t._id || t.id) : t)).filter(Boolean).map(id => String(id)),
            technologies: (d.technologies || []).map(t => (typeof t === 'object' ? (t._id || t.id) : t)).filter(Boolean).map(id => String(id)),
            pageBlocks: Array.isArray(d.pageBlocks) ? d.pageBlocks : [],
            pageBlocks: Array.isArray(d.pageBlocks) ? d.pageBlocks : [],
        });
    }, [initialData?.id, initialData?._id]);

    useEffect(() => {
        if (!initialData) return;

        const fileFieldMap = {
            featured_background_img: 'if_feature_background_img',
            project_logo: 'project_logo',
            banner_image: 'Banner_Image',
            secondary_block_img: 'secondary_block_img',
            mission_img: 'mission_img',
            challenges_image: 'challenges_image',
            client_img: 'client_img',
            client_review_img: 'client_review_img',
            case_study_pdf: 'case_study_pdf',
        };

        const initialPreviews = {};
        const initialMetadata = {};

        Object.entries(fileFieldMap).forEach(([formField, entityField]) => {
            const img = initialData[formField] || initialData[entityField];
            const field = formField;
            const imgObj = Array.isArray(img) ? img[0] : img;

            if (imgObj && imgObj.url) {
                const base = (STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '');
                const urlPath = (imgObj.url || '').replace(/^\//, '');
                initialPreviews[field] = urlPath ? `${base}/${urlPath}` : `${base}${imgObj.url}`;
                initialMetadata[field] = {
                    filename: imgObj.name || '',
                    alt_text: imgObj.alternativeText || '',
                    caption: imgObj.caption || '',
                    size: imgObj.size ? `${imgObj.size} KB` : '',
                    date: new Date(imgObj.createdAt || Date.now()).toLocaleDateString(),
                    dimensions: imgObj.width && imgObj.height ? `${imgObj.width} x ${imgObj.height}` : '',
                    extension: imgObj.ext ? imgObj.ext.replace('.', '') : (imgObj.url && imgObj.url.toLowerCase().endsWith('.pdf') ? 'pdf' : '')
                };
            }
        });

        setImagePreviews(prev => ({ ...prev, ...initialPreviews }));
        setImageMetadata(prev => ({ ...prev, ...initialMetadata }));
    }, [initialData]);

    useEffect(() => {
        setFormData((prev) => {
            if ((prev.pageBlocks || []).length > 0) return prev;
            if (!(prev.title || prev.banner_short_description || prev.intro_content)) return prev;
            const seeded = autoSeedBlocks('portfolio', {
                Title: prev.title,
                Banner_short_description: prev.banner_short_description,
                Banner_Image: prev.banner_image,
                subtitle: prev.subtitle,
                intro_content: prev.intro_content,
                content_section_title: prev.content_section_title,
                content_section_info: prev.content_section_info,
            });
            if (!seeded.length) return prev;
            return { ...prev, pageBlocks: seeded };
        });
    }, [initialData]);

    const [imagePreviews, setImagePreviews] = useState({});
    const [collapsedPhases, setCollapsedPhases] = useState({});
    const [imageMetadata, setImageMetadata] = useState({});
    const [activeImageField, setActiveImageField] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (fieldName) => {
        setActiveImageField(fieldName);
        setShowModal(true);
    };

    const handleCloseModal = (persist = false) => {
        if (persist && activeImageField) {
            const fileId = formData[activeImageField];
            const meta = imageMetadata[activeImageField];
            if (fileId && meta && (meta.alt_text || meta.caption)) {
                adminService.updateFileInfo(fileId, {
                    alternativeText: meta.alt_text || '',
                    caption: meta.caption || '',
                });
            }
        }
        setShowModal(false);
        setActiveImageField(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhaseChange = (index, field, value) => {
        const updatedPhases = [...formData.project_strategy_phases];
        updatedPhases[index][field] = value;
        setFormData(prev => ({
            ...prev,
            project_strategy_phases: updatedPhases
        }));
    };

    const addNewPhase = () => {
        setFormData(prev => ({
            ...prev,
            project_strategy_phases: [...prev.project_strategy_phases, { phase_title: '', phase_content: '' }]
        }));
    };

    const removePhase = (index) => {
        setFormData(prev => ({
            ...prev,
            project_strategy_phases: prev.project_strategy_phases.filter((_, i) => i !== index)
        }));
    };

    const togglePhaseCollapse = (index) => {
        setCollapsedPhases(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Immediate Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews(prev => ({ ...prev, [fieldName]: reader.result }));
        };
        reader.readAsDataURL(file);

        // Upload
        try {
            const result = await adminService.uploadImage(file);
            if (result.success && result.data) {
                const imgData = result.data;
                const imgId = imgData.id || imgData._id;

                // Update FormData with ID directly
                setFormData(prev => ({
                    ...prev,
                    [fieldName]: imgId
                }));

                // Update Metadata
                setImageMetadata(prev => ({
                    ...prev,
                    [fieldName]: {
                        filename: imgData.name,
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
                            [fieldName]: {
                                ...prev[fieldName],
                                dimensions: `${img.naturalWidth} x ${img.naturalHeight}`
                            }
                        }));
                    };
                }

            } else {
                alert('Image upload failed: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Image upload error');
        }
    };

    const removeImage = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null
        }));
        setImagePreviews(prev => ({
            ...prev,
            [fieldName]: null
        }));
        setImageMetadata(prev => ({
            ...prev,
            [fieldName]: { filename: '', alt_text: '', caption: '' }
        }));
    };

    const handlePdfUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            toast.error('Please select a PDF file.');
            return;
        }
        try {
            const result = await adminService.uploadImage(file);
            if (result.success && result.data) {
                const data = result.data;
                const id = data.id || data._id;
                setFormData(prev => ({ ...prev, case_study_pdf: id }));
                const url = data.url ? `${STRAPI_IMAGE_BASE_URL}${data.url}` : null;
                setImagePreviews(prev => ({ ...prev, case_study_pdf: url }));
                setImageMetadata(prev => ({
                    ...prev,
                    case_study_pdf: {
                        filename: data.name || file.name,
                        alt_text: '',
                        caption: '',
                        size: data.size ? `${data.size} KB` : `${(file.size / 1024).toFixed(2)} KB`,
                        date: new Date(data.createdAt || Date.now()).toLocaleDateString(),
                        dimensions: '',
                        extension: 'pdf'
                    }
                }));
                toast.success('PDF uploaded. Save the portfolio to keep it.');
            } else {
                toast.error(result.error || 'PDF upload failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('PDF upload error');
        }
        e.target.value = '';
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

    const addItem = (field, id) => {
        if (!id) return;
        const normalizedId = (field === 'tech_stacks' || field === 'technologies' || field === 'industry_name') ? String(id) : id;
        setFormData(prev => {
            if (field === 'industry_name') {
                return { ...prev, industry_name: normalizedId };
            }
            const current = prev[field] || [];
            if (!Array.isArray(current) || current.some((x) => String(x) === String(normalizedId))) return prev;
            return { ...prev, [field]: [...current, normalizedId] };
        });
    };

    const removeItem = (field, id) => {
        setFormData(prev => {
            if (field === 'industry_name') {
                return { ...prev, industry_name: '' };
            }
            const current = prev[field] || [];
            if (!Array.isArray(current)) return prev;
            return { ...prev, [field]: current.filter(item => String(item) !== String(id)) };
        });
    };

    const [saving, setSaving] = useState(false);
    const [showPageBuilderModal, setShowPageBuilderModal] = useState(false);
    const isUpdate = !!(initialData._id || initialData.id);

    const handleSubmit = async (isDraft = false) => {
        try {
            setSaving(true);
            onSavingChange?.(true);

            if (!(formData.slug || '').trim() && (formData.seo_title || '').trim()) {
                formData.slug = slugify(formData.seo_title, 'portfolio');
            }

            const ensureArrayId = (val) => {
                if (!val) return null;
                if (Array.isArray(val)) return val.map(v => (typeof v === 'object' ? v.id || v._id : v));
                if (typeof val === 'object' && !(val instanceof File)) return [val.id || val._id];
                if (typeof val === 'string') return [val];
                return null;
            };

            // Map form fields → backend entity fields (strip HTML from rich-text to avoid <p> on frontend)
            const payload = {
                Title: formData.title,
                subtitle: formData.subtitle,
                slug: formData.slug,
                Banner_short_description: htmlToPlainText(formData.banner_short_description),
                Country: formData.country,
                is_featured: formData.is_featured,
                listing_intro: htmlToPlainText(formData.listing_intro),
                listingColorCode: formData.listing_color_code,
                platform_ios: formData.ios_enabled,
                platform_android: formData.android_enabled,
                platform_web: formData.web_enabled,
                ios_link: formData.ios_link,
                android_link: formData.android_link,
                web_link: formData.web_link,
                intro_content: htmlToPlainText(formData.intro_content),
                content_section_title: formData.content_section_title,
                content_section_info: (formData.content_section_info != null && typeof formData.content_section_info === 'string') ? formData.content_section_info : '',
                secondary_block_title: formData.secondary_block_title,
                secondary_block_content: htmlToPlainText(formData.secondary_block_content),
                mission_title: formData.mission_title,
                mission_content: htmlToPlainText(formData.mission_content),
                challenges_title: formData.challenges_title,
                challenges_content: htmlToPlainText(formData.challenges_content),
                project_strategy_title: formData.project_strategy_title,
                project_strategy_content: htmlToPlainText(formData.project_strategy_content),
                project_strategy_phases: (formData.project_strategy_phases || []).map((p) => ({
                    phase_title: p.phase_title,
                    phase_content: htmlToPlainText(p.phase_content),
                })),
                client_comment: htmlToPlainText(formData.client_comment),
                client_name: formData.client_name,
                client_designation: formData.client_designation,
                Client_review_img_link: formData.client_review_img_link,
                client_linkedin_profile_url: formData.client_linkedin_profile_url,
                seo_title: formData.seo_title,
                seo_description: formData.seo_description,
                schema_code: formData.schema_code,
                published_at: isDraft ? '' : (formData.published_at || new Date().toISOString()),

                // Images → entity field names, as arrays of IDs
                if_feature_background_img: ensureArrayId(formData.featured_background_img),
                project_logo: ensureArrayId(formData.project_logo),
                Banner_Image: ensureArrayId(formData.banner_image),
                secondary_block_img: ensureArrayId(formData.secondary_block_img),
                mission_img: ensureArrayId(formData.mission_img),
                challenges_image: ensureArrayId(formData.challenges_image),
                client_img: ensureArrayId(formData.client_img),
                client_review_img: ensureArrayId(formData.client_review_img),
                case_study_pdf: ensureArrayId(formData.case_study_pdf),

                // Relations
                tech_stacks: (formData.tech_stacks || []).map(t => (typeof t === 'object' ? t._id || t.id : t)),
                technologies: (formData.technologies || []).map(t => (typeof t === 'object' ? t._id || t.id : t)),
                industry_name: formData.industry_name && typeof formData.industry_name === 'object'
                    ? (formData.industry_name._id || formData.industry_name.id)
                    : (formData.industry_name || undefined),
                pageBlocks: Array.isArray(formData.pageBlocks) ? formData.pageBlocks : [],
            };

            const portfolioId = initialData._id || initialData.id;

            const result = isUpdate
                ? await adminService.updatePortfolio(portfolioId, payload)
                : await adminService.createPortfolio(payload);

            const ok = await handleSaveSuccess({
                result,
                isCreate: !isUpdate,
                isDraft,
                listPath: '/admin/portfolios',
                editPathPrefix: '/admin/portfolios/',
                toast,
                router,
                entityName: 'Portfolio',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
            onSavingChange?.(false);
        } catch (error) {
            console.error('Submission error', error);
            toast.error(error?.message || 'An error occurred during submission.');
            setSaving(false);
            onSavingChange?.(false);
        }
    };

    useImperativeHandle(ref, () => ({ submit: handleSubmit }));

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <Form>
                <Row>
                    <Col lg={8}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px' }}>
                            {/* Featured Toggle */}
                            <div className="mb-4">
                                <Form.Check
                                    type="switch"
                                    id="is_featured"
                                    label="Featured Project"
                                    name="is_featured"
                                    checked={formData.is_featured}
                                    onChange={handleChange}
                                    style={{ fontSize: '14px' }}
                                />
                            </div>

                            <ImageUploadField label="Featured_background_img" fieldName="featured_background_img" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />
                            <ImageUploadField label="Project_logo" fieldName="project_logo" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />

                            <Row>
                                <Col md={6}>
                                    <FormField
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="ADR Boost"
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormField
                                        label="Subtitle"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <FormField
                                label="Listing_intro"
                                name="listing_intro"
                                as="textarea"
                                rows={3}
                                value={formData.listing_intro}
                                onChange={handleChange}
                                placeholder="ADR Boost is an innovative AI-driven platform designed to revolutionize the hol..."
                            />

                            <FormField
                                label="Banner_short_description"
                                name="banner_short_description"
                                as="textarea"
                                rows={3}
                                value={formData.banner_short_description}
                                onChange={handleChange}
                                placeholder="ADR Boost: Harnessing AI to Transform Hotel Revenue Management"
                            />

                            <ImageUploadField label="Banner_Image" fieldName="banner_image" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />

                            <FormField
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="USA"
                            />

                            <FormField
                                label="Slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="adr-boost"
                            />

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Listing Color Code
                                </Form.Label>
                                <Form.Control
                                    type="color"
                                    name="listing_color_code"
                                    value={formData.listing_color_code}
                                    onChange={handleChange}
                                    style={{ width: '100px', height: '40px' }}
                                />
                            </div>

                            {/* Platform Links */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3">Platform Links</h6>

                                <div className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="ios_enabled"
                                        label="iOS App"
                                        name="ios_enabled"
                                        checked={formData.ios_enabled}
                                        onChange={handleChange}
                                        style={{ fontSize: '14px' }}
                                    />
                                    {formData.ios_enabled && (
                                        <Form.Control
                                            type="url"
                                            name="ios_link"
                                            value={formData.ios_link}
                                            onChange={handleChange}
                                            placeholder="https://apps.apple.com/..."
                                            className="mt-2"
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                padding: '10px 12px'
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="android_enabled"
                                        label="Android App"
                                        name="android_enabled"
                                        checked={formData.android_enabled}
                                        onChange={handleChange}
                                        style={{ fontSize: '14px' }}
                                    />
                                    {formData.android_enabled && (
                                        <Form.Control
                                            type="url"
                                            name="android_link"
                                            value={formData.android_link}
                                            onChange={handleChange}
                                            placeholder="https://play.google.com/..."
                                            className="mt-2"
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                padding: '10px 12px'
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="web_enabled"
                                        label="Web App"
                                        name="web_enabled"
                                        checked={formData.web_enabled}
                                        onChange={handleChange}
                                        style={{ fontSize: '14px' }}
                                    />
                                    {formData.web_enabled && (
                                        <Form.Control
                                            type="url"
                                            name="web_link"
                                            value={formData.web_link}
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                            className="mt-2"
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                padding: '10px 12px'
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Intro_content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.intro_content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, intro_content: html }))}
                                    placeholder="Write intro content here..."
                                    minHeight="300px"
                                />
                            </div>

                            <FormField
                                label="Content_section_title"
                                name="content_section_title"
                                value={formData.content_section_title}
                                onChange={handleChange}
                            />

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Content_section_info
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.content_section_info}
                                    onChange={(html) => setFormData(prev => ({ ...prev, content_section_info: html }))}
                                    placeholder="Write content section info here..."
                                    minHeight="250px"
                                />
                            </div>

                            {/* Secondary Block */}
                            <h6 className="fw-bold mb-3 mt-4">Secondary Block</h6>
                            <FormField
                                label="Secondary_block_title"
                                name="secondary_block_title"
                                value={formData.secondary_block_title}
                                onChange={handleChange}
                            />
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Secondary_block_content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.secondary_block_content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, secondary_block_content: html }))}
                                    placeholder="Write secondary block content here..."
                                    minHeight="250px"
                                />
                            </div>
                            <ImageUploadField label="Secondary_block_img" fieldName="secondary_block_img" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />

                            {/* Mission */}
                            <h6 className="fw-bold mb-3 mt-4">Mission</h6>
                            <FormField
                                label="Mission_title"
                                name="mission_title"
                                value={formData.mission_title}
                                onChange={handleChange}
                            />
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Mission_content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.mission_content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, mission_content: html }))}
                                    placeholder="Write mission content here..."
                                    minHeight="250px"
                                />
                            </div>
                            <ImageUploadField label="Mission_img" fieldName="mission_img" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />

                            {/* Challenges */}
                            <h6 className="fw-bold mb-3 mt-4">Challenges</h6>
                            <FormField
                                label="Challenges_title"
                                name="challenges_title"
                                value={formData.challenges_title}
                                onChange={handleChange}
                            />
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Challenges_content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.challenges_content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, challenges_content: html }))}
                                    placeholder="Write challenges content here..."
                                    minHeight="250px"
                                />
                            </div>
                            <ImageUploadField label="Challenges_image" fieldName="challenges_image" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />

                            {/* Project Strategy */}
                            <h6 className="fw-bold mb-3 mt-4">Project Strategy</h6>
                            <FormField
                                label="Project_strategy_title"
                                name="project_strategy_title"
                                value={formData.project_strategy_title}
                                onChange={handleChange}
                            />
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Project_strategy_content
                                </Form.Label>
                                <RichTextEditor
                                    content={formData.project_strategy_content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, project_strategy_content: html }))}
                                    placeholder="Write project strategy content here..."
                                    minHeight="250px"
                                />
                            </div>

                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-3" style={{ fontSize: '13px' }}>
                                    Project_strategy_phases ({formData.project_strategy_phases.length})
                                </Form.Label>

                                {formData.project_strategy_phases.map((phase, index) => (
                                    <div key={index} className="mb-2">
                                        <div
                                            className="d-flex align-items-center justify-content-between p-3 border bg-white"
                                            style={{
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-2 flex-grow-1" onClick={() => togglePhaseCollapse(index)}>
                                                <span className="text-muted">
                                                    {collapsedPhases[index] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                </span>
                                                <span style={{ fontSize: '14px' }}>
                                                    {phase.phase_title || `Phase ${index + 1}`}
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-muted"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removePhase(index);
                                                    }}
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                                <span className="text-muted" style={{ cursor: 'grab' }}>
                                                    <FaGripVertical size={12} />
                                                </span>
                                            </div>
                                        </div>

                                        <Collapse in={!collapsedPhases[index]}>
                                            <div className="border border-top-0 p-3" style={{ borderRadius: '0 0 4px 4px', backgroundColor: '#fafafa' }}>
                                                <FormField
                                                    label="Phase_title"
                                                    name={`phase_title_${index}`}
                                                    value={phase.phase_title}
                                                    onChange={(e) => handlePhaseChange(index, 'phase_title', e.target.value)}
                                                    placeholder={`Phase ${index + 1} title`}
                                                />
                                                <div className="mb-3">
                                                    <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                        Phase_content
                                                    </Form.Label>
                                                    <RichTextEditor
                                                        content={phase.phase_content}
                                                        onChange={(html) => handlePhaseChange(index, 'phase_content', html)}
                                                        placeholder={`Phase ${index + 1} content`}
                                                        minHeight="200px"
                                                    />
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}

                                <Button
                                    variant="link"
                                    className="text-decoration-none w-100 text-center p-3 border"
                                    style={{
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#0d6efd'
                                    }}
                                    onClick={addNewPhase}
                                >
                                    <FaPlus size={12} className="me-2" /> ADD NEW ENTRY
                                </Button>
                            </div>

                            {/* Client Testimonial */}
                            <h6 className="fw-bold mb-3 mt-4">Client Testimonial</h6>
                            <ImageUploadField label="Client_img" fieldName="client_img" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />
                            <FormField
                                label="Client_comment"
                                name="client_comment"
                                as="textarea"
                                rows={4}
                                value={formData.client_comment}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Client_name"
                                name="client_name"
                                value={formData.client_name}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Client_designation"
                                name="client_designation"
                                value={formData.client_designation}
                                onChange={handleChange}
                            />
                            <ImageUploadField label="Client_review_img" fieldName="client_review_img" imagePreviews={imagePreviews} handleShowModal={handleShowModal} removeImage={removeImage} handleImageUpload={handleImageUpload} />
                            <FormField
                                label="Client_review_img_link"
                                name="client_review_img_link"
                                type="url"
                                value={formData.client_review_img_link}
                                onChange={handleChange}
                            />
                            <FormField
                                label="Client_linkedin_profile_url"
                                name="client_linkedin_profile_url"
                                type="url"
                                value={formData.client_linkedin_profile_url}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                            />

                            {/* SEO Settings */}
                            <h6 className="fw-bold mb-3 mt-4">SEO Settings</h6>

                            <FormField
                                label="Meta Title"
                                name="seo_title"
                                value={formData.seo_title}
                                onChange={handleChange}
                                placeholder="SEO optimized title (50-60 characters)"
                            />
                            <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                {formData.seo_title.length}/60 characters
                            </Form.Text>

                            <FormField
                                label="Meta Description"
                                name="seo_description"
                                as="textarea"
                                rows={3}
                                value={formData.seo_description}
                                onChange={handleChange}
                                placeholder="Brief description for search results (150-160 characters)"
                            />
                            <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                {formData.seo_description.length}/160 characters
                            </Form.Text>

                            <FormField
                                label="Meta Keywords"
                                name="meta_keywords"
                                value={formData.meta_keywords || ''}
                                onChange={handleChange}
                                placeholder="keyword1, keyword2, keyword3"
                            />

                            <FormField
                                label="Robots Meta Tag"
                                name="robots_meta"
                                value={formData.robots_meta || 'index, follow'}
                                onChange={handleChange}
                                placeholder="index, follow"
                            />

                            <hr className="my-4" />
                            <h6 className="fw-bold mb-3">Open Graph (Facebook/LinkedIn)</h6>

                            <FormField
                                label="OG Title"
                                name="og_title"
                                value={formData.og_title || ''}
                                onChange={handleChange}
                                placeholder="Title for social media sharing"
                            />

                            <FormField
                                label="OG Description"
                                name="og_description"
                                as="textarea"
                                rows={2}
                                value={formData.og_description || ''}
                                onChange={handleChange}
                                placeholder="Description for social media sharing"
                            />

                            <FormField
                                label="OG Image URL"
                                name="og_image"
                                type="url"
                                value={formData.og_image || ''}
                                onChange={handleChange}
                                placeholder="https://example.com/og-image.jpg"
                            />

                            <hr className="my-4" />
                            <h6 className="fw-bold mb-3">Twitter Card</h6>

                            <FormField
                                label="Twitter Title"
                                name="twitter_title"
                                value={formData.twitter_title || ''}
                                onChange={handleChange}
                                placeholder="Title for Twitter sharing"
                            />

                            <FormField
                                label="Twitter Description"
                                name="twitter_description"
                                as="textarea"
                                rows={2}
                                value={formData.twitter_description || ''}
                                onChange={handleChange}
                                placeholder="Description for Twitter sharing"
                            />

                            <FormField
                                label="Twitter Image URL"
                                name="twitter_image"
                                type="url"
                                value={formData.twitter_image || ''}
                                onChange={handleChange}
                                placeholder="https://example.com/twitter-image.jpg"
                            />

                            <hr className="my-4" />
                            <h6 className="fw-bold mb-3">Schema Markup</h6>

                            <FormField
                                label="Schema Code (JSON-LD)"
                                name="schema_code"
                                as="textarea"
                                rows={10}
                                value={formData.schema_code}
                                onChange={handleChange}
                                placeholder={`{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Portfolio Project Name",
  "description": "Project description",
  "applicationCategory": "BusinessApplication"
}`}
                            />
                            <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                Add JSON-LD structured data for better search engine understanding
                            </Form.Text>

                            {/* Case Study PDF */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Case_study_pdf
                                </Form.Label>
                                {(formData.case_study_pdf || imagePreviews.case_study_pdf) && (
                                    <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                        <a
                                            href={imagePreviews.case_study_pdf || (typeof formData.case_study_pdf === 'object' && formData.case_study_pdf?.url ? `${(STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '')}/${String(formData.case_study_pdf.url).replace(/^\//, '')}` : null)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary small"
                                        >
                                            {imageMetadata.case_study_pdf?.filename || (typeof formData.case_study_pdf === 'object' && formData.case_study_pdf?.name) || 'View PDF'}
                                        </a>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeImage('case_study_pdf')}
                                        >
                                            <FaTimes size={12} /> Remove
                                        </Button>
                                    </div>
                                )}
                                <Form.Control
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handlePdfUpload}
                                    style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        padding: '10px 12px'
                                    }}
                                />
                                <Form.Text className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                                    Upload a PDF for the case study download. Save the portfolio after uploading.
                                </Form.Text>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className="bg-white p-4 mb-3" style={{ borderRadius: '4px', position: 'sticky', top: '20px' }}>
                            <Button variant="primary" className="w-100 mb-2" style={{ padding: '12px' }} onClick={() => handleSubmit(false)} disabled={saving}>
                                <FaSave className="me-2" /> {isUpdate ? 'Update' : 'Publish'}
                            </Button>
                            <Button variant="outline-secondary" className="w-100" style={{ padding: '12px' }} onClick={() => handleSubmit(true)} disabled={saving}>
                                <FaSave className="me-2" /> Save as Draft
                            </Button>
                            <Button variant="outline-primary" className="w-100 mt-2" style={{ padding: '12px' }} onClick={() => setShowPageBuilderModal(true)}>
                                Open Page Builder
                            </Button>
                            <Button
                                variant="outline-dark"
                                className="w-100 mt-2"
                                style={{ padding: '12px' }}
                                disabled={!formData.slug}
                                onClick={() => window.open(`/case-study/${formData.slug}`, '_blank', 'noopener,noreferrer')}
                            >
                                Preview
                            </Button>

                            <hr className="my-4" />

                            {/* Technologies - same pattern as Tech stacks: dropdown + selected chips with names */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Technologies ({formData.technologies.length})
                                </Form.Label>
                                <div className="border p-2" style={{ borderRadius: '4px' }}>
                                    <div className="mb-2">
                                        <Dropdown onSelect={(eventKey) => addItem('technologies', eventKey)}>
                                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100 text-start d-flex align-items-center justify-content-between" style={{ fontSize: '13px' }}>
                                                + Add Technology...
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="w-100" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {availableTechnologies
                                                    .filter(tech => !(formData.technologies || []).some(id => String(id) === String(tech.id || tech._id)))
                                                    .map(tech => (
                                                        <Dropdown.Item key={tech.id || tech._id} eventKey={String(tech.id || tech._id)} className="d-flex align-items-center">
                                                            <span style={{ fontSize: '13px' }}>{tech.techTitle || tech.tech_title || '—'}</span>
                                                        </Dropdown.Item>
                                                    ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {formData.technologies.map((techId) => {
                                            const tech = availableTechnologies.find(t => String(t.id || t._id) === String(techId));
                                            return (
                                                <div key={techId} className="d-flex align-items-center justify-content-between bg-light px-2 py-1" style={{ fontSize: '12px', borderRadius: '3px' }}>
                                                    <span>{tech ? (tech.techTitle || tech.tech_title || '—') : `ID: ${techId}`}</span>
                                                    <FaTimes
                                                        size={10}
                                                        className="text-muted ms-2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => removeItem('technologies', techId)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stacks - dropdown + selected chips with names; already-selected shown */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Tech_stacks ({formData.tech_stacks.length})
                                </Form.Label>
                                <div className="border p-2" style={{ borderRadius: '4px' }}>
                                    <div className="mb-2">
                                        <Dropdown onSelect={(eventKey) => addItem('tech_stacks', eventKey)}>
                                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100 text-start d-flex align-items-center justify-content-between" style={{ fontSize: '13px' }}>
                                                + Add Tech Stack...
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="w-100" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {availableTechStacks
                                                    .filter(stack => !(formData.tech_stacks || []).some(id => String(id) === String(stack.id || stack._id)))
                                                    .map(stack => {
                                                        const imgUrl = stack.techIcon?.url ? `${STRAPI_IMAGE_BASE_URL}${stack.techIcon.url}` : null;
                                                        return (
                                                            <Dropdown.Item key={stack.id || stack._id} eventKey={String(stack.id || stack._id)} className="d-flex align-items-center">
                                                                {imgUrl && (
                                                                    <Image
                                                                        src={imgUrl}
                                                                        alt={stack.tech_name}
                                                                        width={20}
                                                                        height={20}
                                                                        className="me-2 rounded-circle"
                                                                        style={{ objectFit: 'cover' }}
                                                                    />
                                                                )}
                                                                <span style={{ fontSize: '13px' }}>{stack.tech_name}</span>
                                                            </Dropdown.Item>
                                                        );
                                                    })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {formData.tech_stacks.map((stackId) => {
                                            const stack = availableTechStacks.find(t => String(t.id || t._id) === String(stackId));
                                            return (
                                                <div key={stackId} className="d-flex align-items-center justify-content-between bg-light px-2 py-1" style={{ fontSize: '12px', borderRadius: '3px' }}>
                                                    <span>{stack ? stack.tech_name : `ID: ${stackId}`}</span>
                                                    <FaTimes
                                                        size={10}
                                                        className="text-muted ms-2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => removeItem('tech_stacks', stackId)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Industry - same pattern as Tech stacks: dropdown + selected chip */}
                            <div className="mb-4">
                                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                    Industry_name ({formData.industry_name ? 1 : 0})
                                </Form.Label>
                                <div className="border p-2" style={{ borderRadius: '4px' }}>
                                    <div className="mb-2">
                                        <Dropdown onSelect={(eventKey) => addItem('industry_name', eventKey)}>
                                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100 text-start d-flex align-items-center justify-content-between" style={{ fontSize: '13px' }}>
                                                + Add Industry...
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="w-100" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {availableIndustries.map(ind => (
                                                    <Dropdown.Item key={ind.id || ind._id} eventKey={String(ind.id || ind._id)} className="d-flex align-items-center">
                                                        <span style={{ fontSize: '13px' }}>{ind.name || ind.ind_name || ind.title || '—'}</span>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {formData.industry_name ? (() => {
                                            const ind = availableIndustries.find(i => String(i.id || i._id) === String(formData.industry_name));
                                            return (
                                                <div key={formData.industry_name} className="d-flex align-items-center justify-content-between bg-light px-2 py-1" style={{ fontSize: '12px', borderRadius: '3px' }}>
                                                    <span>{ind ? (ind.name || ind.ind_name || ind.title || '—') : `ID: ${formData.industry_name}`}</span>
                                                    <FaTimes
                                                        size={10}
                                                        className="text-muted ms-2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => removeItem('industry_name', formData.industry_name)}
                                                    />
                                                </div>
                                            );
                                        })() : null}
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex flex-column gap-2">
                                <Button variant="link" className="text-decoration-none text-dark p-0 text-start" style={{ fontSize: '13px' }}>
                                    ⚙️ Configure the view
                                </Button>
                                <Button variant="link" className="text-decoration-none text-dark p-0 text-start" style={{ fontSize: '13px' }}>
                                    ✏️ Edit the fields
                                </Button>
                                <Button variant="link" className="text-decoration-none text-danger p-0 text-start" style={{ fontSize: '13px' }}>
                                    🗑️ Delete this entry
                                </Button>
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
                        onClick={() => {
                            if (window.confirm('This will replace current page blocks with auto-generated ones from existing data. Continue?')) {
                                const seeded = autoSeedBlocks('portfolio', formData);
                                setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                            }
                        }}
                    >
                        Re-generate blocks from existing data
                    </Button>
                    <PageBuilder
                        blocks={formData.pageBlocks}
                        onChange={(newBlocks) => setFormData(prev => ({ ...prev, pageBlocks: newBlocks }))}
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
                    <Row>
                        <Col md={6}>
                            <div className="bg-dark rounded d-flex align-items-center justify-content-center mb-3" style={{ height: '400px', position: 'relative' }}>
                                {activeImageField && imagePreviews[activeImageField] && (
                                    <Image
                                        src={imagePreviews[activeImageField]}
                                        fluid
                                        style={{ maxHeight: '350px', maxWidth: '100%' }}
                                    />
                                )}
                                <div className="position-absolute top-0 end-0 p-3">
                                    <Button variant="light" size="sm" className="me-2" onClick={() => removeImage(activeImageField)}><FaTrash /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="bg-white p-4 rounded shadow-sm h-100">
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <small className="text-muted d-block">Size</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.size || 'Calculating...'}</span>
                                    </Col>
                                    <Col xs={6}>
                                        <small className="text-muted d-block">Date</small>
                                        <span className="small fw-bold">
                                            {imageMetadata[activeImageField]?.date || new Date().toLocaleDateString()}
                                        </span>
                                    </Col>
                                    <Col xs={6} className="mt-3">
                                        <small className="text-muted d-block">Dimensions</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.dimensions || '-'}</span>
                                    </Col>
                                    <Col xs={6} className="mt-3">
                                        <small className="text-muted d-block">Extension</small>
                                        <span className="small fw-bold">{imageMetadata[activeImageField]?.extension || '-'}</span>
                                    </Col>
                                </Row>

                                {activeImageField && (
                                    <>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">File name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.filename || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'filename', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">Alternative text</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.alt_text || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'alt_text', e.target.value)}
                                            />
                                            <Form.Text className="text-muted small">This text will be displayed if the asset can't be shown.</Form.Text>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label className="small fw-bold">Caption</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={imageMetadata[activeImageField]?.caption || ''}
                                                onChange={(e) => handleImageMetadataChange(activeImageField, 'caption', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
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
});

PortfolioForm.displayName = 'PortfolioForm';

export default PortfolioForm;
