import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Card, Row, Col, Image, Collapse, Modal, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import adminService from '../../../services/admin.service';
import { STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { required, slugFormat } from '../../../lib/validation';
import { handleSaveSuccess } from '../../../lib/adminSaveHandler';
import autoSeedBlocks from '../../../components/page-builder/autoSeedBlocks';
import dynamic from 'next/dynamic';
import {   FaArrowLeft, FaSave, FaCloudUploadAlt, FaTimes, FaPlus, FaTrash, FaChevronDown, FaChevronRight, FaGripVertical, FaPen, FaExternalLinkAlt, FaCog, FaCopy   } from '../../../components/OptimizedIcons';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/common/RichTextEditor'),
    { ssr: false }
);

const PageBuilder = dynamic(
    () => import('../../../components/admin/PageBuilder'),
    { ssr: false }
);

const FormField = ({ label, name, type = "text", as, rows, value, onChange }) => (
    <div className="mb-4">
        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
        <Form.Control type={type} name={name} as={as} rows={rows} value={value} onChange={onChange} style={{ border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '14px', padding: '10px 12px' }} />
    </div>
);

/** Strip HTML (e.g. <p> tags) and return plain text for storage — used for serviceInfoDescription, tabs/parents/faqs content. content_section_info is stored as HTML to preserve formatting. */
const htmlToPlainText = (html) => {
    if (!html || typeof html !== 'string') return '';
    let text = html
        .replace(/<img[^>]*\/?>/gi, ' [Image] ')
        .replace(/<\/(p|div|h[1-6]|li|br)>\s*/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
    return text.replace(/\n\s*\n/g, '\n').replace(/[ \t]+/g, ' ').trim();
};

const ServiceEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNew = id === 'create';
    const rawApiDataRef = useRef(null);

    const [formData, setFormData] = useState({
        service_icon: null,
        service_title: '',
        service_short_description: '',
        service_banner: null,
        service_info_title: '',
        service_info_media: null,
        service_info_description: '',

        service_tab_section_title: '',
        service_tab_section_sub_title: '',
        service_tabs: [],

        parent_service_title: '',
        parent_services: [],

        service_faqs_list: [],

        content_section_title: '',
        content_section_info: '',
        content_sections: [{ title: '', info: '' }],

        az_diff_title: '',
        az_diff_subtitle: '',
        az_diff_info: '',
        az_diff_list: [],

        // SEO
        seo_title: '',
        seo_description: '',
        slug: '',
        meta_keywords: '',
        robots_meta: 'index, follow',
        schema_code: '',

        // OG Tags
        og_title: '',
        og_type: '',
        og_description: '',
        og_image: '',

        // Twitter Card
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',

        // ── Modern template (Jayesh-branch) fields ──
        template_type: 'default',
        // hero_badges removed — static in component
        service_cards_title: '',
        service_cards: [],                      // [{ title, description }]
        cta_sections: [],                       // [{ title, subtitle, buttonText, buttonLink, bg_image_url, bg_image_file }]
        flip_cards_title: '',
        flip_cards: [],                         // [{ title, description }]
        slide_cards_title: '',
        slide_cards: [],                        // [{ title, description }]
        // awards removed — static in component
        process_section_title: '',
        process_section_subtitle: '',
        process_steps: [],                      // [{ stepNumber, title, description }]
        why_choose_title: '',
        why_choose_cards: [],                   // [{ title, description, image_url, image_file }]
        industries_title: '',
        industries: [],                         // [{ name }]
        stats_title: '',
        stats_subtitle: '',
        stats_items: [],                        // [{ value, label }]
        tech_stack_categories: [],              // [{ name, items: [{name, logo}] }]
        benefits_title: '',
        benefits_accordion: [],                 // [{ title, description }]
        faq_categories_title: '',
        faq_category_list: [],                  // [{ name, faqs: [{question, answer}] }]
        pageBlocks: [],
    });

    const [imagePreviews, setImagePreviews] = useState({});
    const [collapsedItems, setCollapsedItems] = useState({});
    const [imageMetadata, setImageMetadata] = useState({});
    const [activeImageContext, setActiveImageContext] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPageBuilderModal, setShowPageBuilderModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [serviceMetadata, setServiceMetadata] = useState(null);

    /**
     * Field mapping: API (backend) → Form (frontend)
     * Bridges the 14 naming mismatches between backend entity and admin form.
     */
    const mapApiToForm = (apiData) => {
        const legacyContent = {
            title: apiData.content_section_title || '',
            info: apiData.content_section_info || ''
        };
        const apiContentSections =
            Array.isArray(apiData.content_sections) && apiData.content_sections.length > 0
                ? apiData.content_sections
                : [legacyContent];

        const content_sections = apiContentSections.map(cs => ({
            _id: cs._id || cs.id || undefined,
            title: cs.title ?? cs.content_section_title ?? '',
            info: cs.info ?? cs.content_section_info ?? ''
        }));

        return {
            service_icon: null, // Will set preview from URL instead
            service_icon_id: apiData.serviceicon?.id || null,
            service_title: apiData.serviceTitle || '',
            service_short_description: apiData.ServiceShortDescription || '',
            service_banner: null,
            service_banner_id: apiData.serviceBanner?.id || null,
            service_info_title: apiData.serviceInfoTitle || '',
            service_info_media: null,
            service_info_media_id: apiData.serviceInfoMedia?.[0]?.id || null,
            service_info_description: apiData.serviceInfoDescription || '',
            service_tab_section_title: apiData.serviceTabSectionTitlte || '',
            service_tab_section_sub_title: apiData.serviceTabSectionSubTitle || '',
            service_tabs: (apiData.service_tabs || []).map(tab => {
                const media = tab.mediaItem?.[0];
                return {
                    _id: tab.id,
                    name: tab.name || '',
                    content: tab.content || '',
                    media_item: null,
                    media_item_id: media?.id || null,
                    media_item_filename: media?.name || '',
                    media_item_alt: media?.alternativeText || '',
                    media_item_caption: media?.caption || '',
                    media_item_size: media?.size ? `${media.size} KB` : '',
                    media_item_date: media ? new Date(media.createdAt || media.updatedAt).toLocaleDateString() : '',
                    media_item_dimensions: media?.width && media?.height ? `${media.width} x ${media.height}` : '',
                    media_item_extension: media?.ext ? media.ext.replace('.', '') : ''
                };
            }),
            parent_service_title: apiData.parentServiceTitle || '',
            parent_services: (apiData.parentServices || []).map(ps => {
                const media = ps.mediaItem?.[0];
                return {
                    _id: ps.id,
                    name: ps.name || '',
                    content: ps.content || '',
                    media_item: null,
                    media_item_id: media?.id || null,
                    media_item_filename: media?.name || '',
                    media_item_alt: media?.alternativeText || '',
                    media_item_caption: media?.caption || '',
                    media_item_size: media?.size ? `${media.size} KB` : '',
                    media_item_date: media ? new Date(media.createdAt || media.updatedAt).toLocaleDateString() : '',
                    media_item_dimensions: media?.width && media?.height ? `${media.width} x ${media.height}` : '',
                    media_item_extension: media?.ext ? media.ext.replace('.', '') : ''
                };
            }),
            service_faqs_list: (apiData.servicesFaqsList || []).map(faq => ({
                _id: faq.id,
                service_faq_title: faq.serviceFaqTitle || '',
                service_faq_details: faq.serviceFaqDetails || '',
            })),
            // Legacy single-section fields (kept in sync with the first item)
            content_section_title: content_sections?.[0]?.title || '',
            content_section_info: content_sections?.[0]?.info || '',
            // New multi-section fields
            content_sections: content_sections?.length ? content_sections : [legacyContent],
            az_diff_title: apiData.az_diff_title || '',
            az_diff_subtitle: apiData.az_diff_subtitle || '',
            az_diff_info: apiData.az_diff_info || '',
            az_diff_list: (apiData.az_diff_list || []).map(diff => ({
                _id: diff.id,
                az_diff_list_title: diff.az_diff_list_title || '',
                az_diff_list_content: diff.az_diff_list_content || '',
            })),
            seo_title: apiData.seoTitle || '',
            seo_description: apiData.seoDescription || '',
            slug: apiData.slug || '',
            meta_keywords: '',
            robots_meta: 'index, follow',
            schema_code: apiData.schema_script || '',
            og_title: '', og_type: '', og_description: '', og_image: '',
            twitter_title: '', twitter_description: '', twitter_image: '',

            // ── Modern template fields ──
            template_type: apiData.templateType || 'default',
            service_cards_title: apiData.serviceCardsTitle || '',
            service_cards: (apiData.serviceCards || []).map(c => ({ title: c.title || '', description: c.description || '', image_url: c.image || '', image_file: null, image_file_id: c.image_id || null, image_file_alt: c.image_alt || '', image_file_caption: c.image_caption || '', image_file_filename: c.image_name || '' })),
            cta_sections: (apiData.ctaSections || []).map(c => ({ title: c.title || '', subtitle: c.subtitle || '', buttonText: c.buttonText || '', buttonLink: c.buttonLink || '', bg_image_url: c.backgroundImage || '', bg_image_file: null, bg_image_file_id: c.bg_image_id || null, bg_image_file_alt: c.bg_image_alt || '', bg_image_file_caption: c.bg_image_caption || '', bg_image_file_filename: c.bg_image_name || '' })),
            flip_cards_title: apiData.flipCardsTitle || '',
            flip_cards: (apiData.flipCards || []).map(c => ({ title: c.title || '', description: c.description || '', iconSvg: c.iconSvg || '', icon_url: c.iconImage || '', icon_file: null, icon_file_id: c.icon_id || null, icon_file_alt: c.icon_alt || '', icon_file_caption: c.icon_caption || '', icon_file_filename: c.icon_name || '', image_url: c.backgroundImage || '', image_file: null, image_file_id: c.image_id || null, image_file_alt: c.image_alt || '', image_file_caption: c.image_caption || '', image_file_filename: c.image_name || '' })),
            slide_cards_title: apiData.slideCardsTitle || '',
            slide_cards: (apiData.slideCards || []).map(c => ({ title: c.title || '', description: c.description || '', iconSvg: c.iconSvg || '', icon_url: c.iconImage || '', icon_file: null, icon_file_id: c.icon_id || null, icon_file_alt: c.icon_alt || '', icon_file_caption: c.icon_caption || '', icon_file_filename: c.icon_name || '', image_url: c.backgroundImage || '', image_file: null, image_file_id: c.image_id || null, image_file_alt: c.image_alt || '', image_file_caption: c.image_caption || '', image_file_filename: c.image_name || '' })),
            process_section_title: apiData.processSectionTitle || '',
            process_section_subtitle: apiData.processSectionSubtitle || '',
            process_steps: (apiData.processSteps || []).map(s => ({ stepNumber: s.stepNumber || '', title: s.title || '', description: s.description || '' })),
            why_choose_title: apiData.whyChooseTitle || '',
            why_choose_cards: (apiData.whyChooseCards || []).map(c => ({ title: c.title || '', description: c.description || '', image_url: c.image || '', image_file: null, image_file_id: c.image_id || null, image_file_alt: c.image_alt || '', image_file_caption: c.image_caption || '', image_file_filename: c.image_name || '' })),
            industries_title: apiData.industriesTitle || '',
            industries: (apiData.industries || []).map(i => ({ name: i.name || '', icon_url: i.icon || '', icon_file: null, icon_file_id: i.icon_id || null, icon_file_alt: i.icon_alt || '', icon_file_caption: i.icon_caption || '', icon_file_filename: i.icon_name || '' })),
            stats_title: apiData.statsSection?.title || '',
            stats_subtitle: apiData.statsSection?.subtitle || '',
            stats_items: (apiData.statsSection?.stats || []).map(s => ({ value: s.value || '', label: s.label || '' })),
            tech_stack_categories: (apiData.techStackTabs?.categories || []).map(cat => ({
                name: cat.name || '',
                items: (cat.items || []).map(item => ({ name: item.name || '', logo: item.logo || '', logo_file: null, logo_file_id: item.logo_id || null, logo_file_alt: item.logo_alt || '', logo_file_caption: item.logo_caption || '', logo_file_filename: item.logo_name || '' }))
            })),
            benefits_title: apiData.benefitsTitle || '',
            benefits_accordion: (apiData.benefitsAccordion || []).map(b => ({ title: b.title || '', description: b.description || '' })),
            faq_categories_title: apiData.faqCategories?.title || '',
            faq_category_list: (apiData.faqCategories?.categories || []).map(cat => ({
                name: cat.name || '',
                faqs: (cat.faqs || []).map(f => ({ question: f.question || '', answer: f.answer || '' }))
            })),
            pageBlocks: Array.isArray(apiData.pageBlocks) ? apiData.pageBlocks : [],
        };
    };

    /**
     * Field mapping: Form (frontend) → API (backend)
     */
    const mapFormToApi = (form) => {
        const contentSections = (form.content_sections || []).map(cs => ({
            _id: cs._id,
            title: cs.title ?? '',
            info: (cs.info != null && typeof cs.info === 'string') ? cs.info : (cs.content_section_info != null ? cs.content_section_info : '')
        }));

        const payload = {
            serviceTitle: form.service_title,
            slug: form.slug,
            ServiceShortDescription: form.service_short_description,
            serviceInfoTitle: form.service_info_title,
            serviceInfoDescription: htmlToPlainText(form.service_info_description),
            serviceTabSectionTitlte: form.service_tab_section_title,
            serviceTabSectionSubTitle: form.service_tab_section_sub_title,
            parentServiceTitle: form.parent_service_title,
            // Multi-section persisted to content_sections; legacy fields stay in sync (first item).
            // When all sections removed, clear legacy fields (do not fall back to stale form values).
            content_section_title: contentSections.length
                ? (contentSections[0]?.title ?? '')
                : '',
            content_section_info: contentSections.length
                ? ((contentSections[0]?.info != null && typeof contentSections[0].info === 'string')
                    ? contentSections[0].info
                    : '')
                : '',
            az_diff_title: form.az_diff_title,
            az_diff_subtitle: form.az_diff_subtitle,
            az_diff_info: form.az_diff_info,
            seoTitle: form.seo_title,
            seoDescription: form.seo_description,
            schema_script: form.schema_code,
        };

        payload.content_sections = contentSections;

        // Media IDs
        if (form.service_icon_id) payload.serviceicon = [form.service_icon_id];
        if (form.service_banner_id) payload.serviceBanner = [form.service_banner_id];
        if (form.service_info_media_id) payload.serviceInfoMedia = [form.service_info_media_id];

        // Components — strip HTML from rich-text content so no <p> tags are stored
        payload.serviceTab = form.service_tabs.map(tab => {
            const obj = { name: tab.name, content: htmlToPlainText(tab.content) };
            if (tab._id) obj._id = tab._id;
            if (tab.media_item_id) obj.mediaItem = [tab.media_item_id];
            return obj;
        });

        payload.parentServices = form.parent_services.map(ps => {
            const obj = { name: ps.name, content: htmlToPlainText(ps.content) };
            if (ps._id) obj._id = ps._id;
            if (ps.media_item_id) obj.mediaItem = [ps.media_item_id];
            return obj;
        });

        payload.servicesFaqsList = form.service_faqs_list.map(faq => {
            const obj = { serviceFaqTitle: faq.service_faq_title, serviceFaqDetails: htmlToPlainText(faq.service_faq_details) };
            if (faq._id) obj._id = faq._id;
            return obj;
        });

        payload.az_diff_list = form.az_diff_list.map(diff => {
            const obj = { az_diff_list_title: diff.az_diff_list_title, az_diff_list_content: diff.az_diff_list_content };
            if (diff._id) obj._id = diff._id;
            return obj;
        });

        // ── Modern template fields ──
        payload.templateType = form.template_type || 'default';
        // heroBadges — static in component, not saved
        // awards — static in component, not saved
        payload.serviceCardsTitle = form.service_cards_title;
        payload.serviceCards = form.service_cards.map(c => ({ title: c.title, description: c.description, image: c.image_url || '', image_id: c.image_file_id || null, image_alt: c.image_file_alt || '', image_caption: c.image_file_caption || '', image_name: c.image_file_filename || '' }));
        payload.ctaSections = form.cta_sections.map(c => ({ title: c.title, subtitle: c.subtitle, buttonText: c.buttonText, buttonLink: c.buttonLink, backgroundImage: c.bg_image_url || '', bg_image_id: c.bg_image_file_id || null, bg_image_alt: c.bg_image_file_alt || '', bg_image_caption: c.bg_image_file_caption || '', bg_image_name: c.bg_image_file_filename || '' }));
        payload.flipCardsTitle = form.flip_cards_title;
        payload.flipCards = form.flip_cards.map(c => ({ title: c.title, description: c.description, iconSvg: c.iconSvg || '', iconImage: c.icon_url || '', icon_id: c.icon_file_id || null, icon_alt: c.icon_file_alt || '', icon_caption: c.icon_file_caption || '', icon_name: c.icon_file_filename || '', backgroundImage: c.image_url || '', image_id: c.image_file_id || null, image_alt: c.image_file_alt || '', image_caption: c.image_file_caption || '', image_name: c.image_file_filename || '' }));
        payload.slideCardsTitle = form.slide_cards_title;
        payload.slideCards = form.slide_cards.map(c => ({ title: c.title, description: c.description, iconSvg: c.iconSvg || '', iconImage: c.icon_url || '', icon_id: c.icon_file_id || null, icon_alt: c.icon_file_alt || '', icon_caption: c.icon_file_caption || '', icon_name: c.icon_file_filename || '', backgroundImage: c.image_url || '', image_id: c.image_file_id || null, image_alt: c.image_file_alt || '', image_caption: c.image_file_caption || '', image_name: c.image_file_filename || '' }));
        payload.processSectionTitle = form.process_section_title;
        payload.processSectionSubtitle = form.process_section_subtitle;
        payload.processSteps = form.process_steps.map((s, i) => ({ stepNumber: Number(s.stepNumber) || i + 1, title: s.title, description: s.description }));
        payload.whyChooseTitle = form.why_choose_title;
        payload.whyChooseCards = form.why_choose_cards.map(c => ({ title: c.title, description: c.description, image: c.image_url || '', image_id: c.image_file_id || null, image_alt: c.image_file_alt || '', image_caption: c.image_file_caption || '', image_name: c.image_file_filename || '' }));
        payload.industriesTitle = form.industries_title;
        payload.industries = form.industries.filter(i => i.name).map(i => ({ name: i.name, icon: i.icon_url || '', icon_id: i.icon_file_id || null, icon_alt: i.icon_file_alt || '', icon_caption: i.icon_file_caption || '', icon_name: i.icon_file_filename || '' }));
        payload.statsSection = {
            title: form.stats_title,
            subtitle: form.stats_subtitle,
            stats: form.stats_items.map(s => ({ value: s.value, label: s.label })),
        };
        payload.techStackTabs = {
            categories: form.tech_stack_categories.map(cat => ({
                name: cat.name,
                items: (cat.items || []).map(item => ({ name: item.name, logo: item.logo, logo_id: item.logo_file_id || null, logo_alt: item.logo_file_alt || '', logo_caption: item.logo_file_caption || '', logo_name: item.logo_file_filename || '' }))
            }))
        };
        payload.benefitsTitle = form.benefits_title;
        payload.benefitsAccordion = form.benefits_accordion.map(b => ({ title: b.title, description: b.description }));
        payload.faqCategories = {
            title: form.faq_categories_title,
            categories: form.faq_category_list.map(cat => ({
                name: cat.name,
                faqs: (cat.faqs || []).map(f => ({ question: f.question, answer: f.answer }))
            }))
        };

        if (Array.isArray(form.pageBlocks)) {
            payload.pageBlocks = form.pageBlocks;
        }

        return payload;
    };

    /**
     * Load service data in edit mode
     */
    useEffect(() => {
        if (!router.isReady) return;
        if (isNew) return;

        const loadService = async () => {
            setLoadingData(true);
            const result = await adminService.getServiceById(id);
            if (result.success && result.data) {
                rawApiDataRef.current = result.data;
                const mapped = mapApiToForm(result.data);
                setFormData(mapped);

                // Auto-seed pageBlocks from existing data if empty
                const apiData = result.data;
                if (!apiData.pageBlocks || !Array.isArray(apiData.pageBlocks) || apiData.pageBlocks.length === 0) {
                    const seeded = autoSeedBlocks('service', apiData);
                    if (seeded.length > 0) {
                        setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                    }
                }

                const imageMeta = {};
                // Helper to set meta
                const setMeta = (key, img) => {
                    if (img) {
                        imageMeta[key] = {
                            filename: img.name || '',
                            alt_text: img.alternativeText || '',
                            caption: img.caption || '',
                            size: img.size ? `${img.size} KB` : 'Unknown',
                            date: new Date(img.createdAt || img.updatedAt || Date.now()).toLocaleDateString(),
                            dimensions: img.width && img.height ? `${img.width} x ${img.height}` : 'Unknown',
                            extension: img.ext ? img.ext.replace('.', '') : 'jpg'
                        };
                    }
                };

                // Set image previews from API URLs
                const previews = {};
                if (result.data.serviceicon) {
                    previews.service_icon = `${STRAPI_IMAGE_BASE_URL}${result.data.serviceicon.url}`;
                    setMeta('service_icon', result.data.serviceicon);
                }
                if (result.data.serviceBanner) {
                    previews.service_banner = `${STRAPI_IMAGE_BASE_URL}${result.data.serviceBanner.url}`;
                    setMeta('service_banner', result.data.serviceBanner);
                }
                if (result.data.serviceInfoMedia?.[0]) {
                    previews.service_info_media = `${STRAPI_IMAGE_BASE_URL}${result.data.serviceInfoMedia[0].url}`;
                    setMeta('service_info_media', result.data.serviceInfoMedia[0]);
                }
                // Tab media previews
                (result.data.service_tabs || []).forEach((tab, idx) => {
                    if (tab.mediaItem?.[0]?.url) {
                        previews[`service_tabs_${idx}_media_item`] = `${STRAPI_IMAGE_BASE_URL}${tab.mediaItem[0].url}`;
                    }
                });
                // Parent service media previews
                (result.data.parentServices || []).forEach((ps, idx) => {
                    if (ps.mediaItem?.[0]?.url) {
                        previews[`parent_services_${idx}_media_item`] = `${STRAPI_IMAGE_BASE_URL}${ps.mediaItem[0].url}`;
                    }
                });
                setImagePreviews(previews);
                setImageMetadata(imageMeta);
                setServiceMetadata({
                    createdAt: result.data.createdAt,
                    updatedAt: result.data.updatedAt,
                    publishedAt: result.data.publishedAt || result.data.published_at,
                    createdBy: result.data.createdBy ? `${result.data.createdBy.firstname} ${result.data.createdBy.lastname}` : '-',
                    updatedBy: result.data.updatedBy ? `${result.data.updatedBy.firstname} ${result.data.updatedBy.lastname}` : '-'
                });
            } else {
                toast.error('Failed to load service data');
            }
            setLoadingData(false);
        };

        loadService();
    }, [router.isReady, id, isNew]);

    /**
     * Upload a file and return the URL path (not ID). Used for modern-template array image fields.
     */
    const uploadIfFileGetUrl = async (fileOrNull, existingUrl) => {
        if (fileOrNull instanceof File) {
            const result = await adminService.uploadImage(fileOrNull, {});
            if (result.success && result.data) {
                return result.data.url || null;
            }
            return null;
        }
        return existingUrl || null;
    };

    /**
     * Upload a file and return both URL and ID. Also updates metadata. Used for modern-template array image fields.
     */
    const uploadIfFileGetFull = async (fileOrNull, existingId, existingUrl, meta = {}) => {
        if (fileOrNull instanceof File) {
            const result = await adminService.uploadImage(fileOrNull, {
                alternativeText: meta.alt_text || meta.alternativeText || '',
                caption: meta.caption || '',
                name: meta.filename || ''
            });
            if (result.success && result.data) {
                const doc = Array.isArray(result.data) ? result.data[0] : result.data;
                return { id: doc.id, url: doc.url || null };
            }
            return { id: null, url: null };
        }
        if (existingId && (meta.alt_text || meta.caption || meta.filename)) {
            adminService.updateFileInfo(existingId, {
                alternativeText: meta.alt_text || '',
                caption: meta.caption || '',
                name: meta.filename || ''
            });
        }
        return { id: existingId || null, url: existingUrl || null };
    };

    /**
     * Upload a file if it's a File object, return already-stored ID if not.
     */
    const uploadIfFile = async (fileOrNull, existingId, meta = {}) => {
        if (fileOrNull instanceof File) {
            const result = await adminService.uploadImage(fileOrNull, {
                alternativeText: meta.alt_text || meta.alternativeText || '',
                caption: meta.caption || '',
            });
            if (result.success) {
                if (result.data?.id) return result.data.id;
                if (Array.isArray(result.data) && result.data[0]?.id) return result.data[0].id;
            }
            return null;
        }
        if (existingId && (meta.alt_text || meta.caption)) {
            adminService.updateFileInfo(existingId, {
                alternativeText: meta.alt_text || '',
                caption: meta.caption || '',
            });
        }
        return existingId || null;
    };

    /**
     * Handle Save (draft) or Save & Publish – same pattern as blog module
     */
    const handleSubmit = async (isDraft = false) => {
        const titleErr = required(formData.service_title, 'Service title');
        const slugErr = slugFormat(formData.slug, 'Slug');
        if (titleErr) {
            toast.error(titleErr);
            return;
        }
        if (slugErr) {
            toast.error(slugErr);
            return;
        }
        setSaving(true);
        try {
            const iconId = await uploadIfFile(formData.service_icon, formData.service_icon_id, imageMetadata.service_icon || {});
            const bannerId = await uploadIfFile(formData.service_banner, formData.service_banner_id, imageMetadata.service_banner || {});
            const infoMediaId = await uploadIfFile(formData.service_info_media, formData.service_info_media_id, imageMetadata.service_info_media || {});

            const updatedForm = {
                ...formData,
                service_icon_id: iconId,
                service_banner_id: bannerId,
                service_info_media_id: infoMediaId,
            };

            for (let i = 0; i < updatedForm.service_tabs.length; i++) {
                const tab = updatedForm.service_tabs[i];
                if (tab.media_item instanceof File) {
                    const mediaId = await uploadIfFile(tab.media_item, tab.media_item_id);
                    updatedForm.service_tabs[i] = { ...tab, media_item: null, media_item_id: mediaId };
                }
            }
            for (let i = 0; i < updatedForm.parent_services.length; i++) {
                const ps = updatedForm.parent_services[i];
                if (ps.media_item instanceof File) {
                    const mediaId = await uploadIfFile(ps.media_item, ps.media_item_id);
                    updatedForm.parent_services[i] = { ...ps, media_item: null, media_item_id: mediaId };
                }
            }

            // Upload images for modern-template CTA sections (only field with dynamic images)
            for (let i = 0; i < updatedForm.cta_sections.length; i++) {
                const c = updatedForm.cta_sections[i];
                const uploaded = await uploadIfFileGetFull(c.bg_image_file, c.bg_image_file_id, c.bg_image_url, { alt_text: c.bg_image_file_alt, caption: c.bg_image_file_caption, filename: c.bg_image_file_filename });
                updatedForm.cta_sections[i] = { ...c, bg_image_url: uploaded.url || c.bg_image_url, bg_image_file_id: uploaded.id || c.bg_image_file_id, bg_image_file: null };
            }

            // Upload service card images
            for (let i = 0; i < updatedForm.service_cards.length; i++) {
                const c = updatedForm.service_cards[i];
                const uploaded = await uploadIfFileGetFull(c.image_file, c.image_file_id, c.image_url, { alt_text: c.image_file_alt, caption: c.image_file_caption, filename: c.image_file_filename });
                updatedForm.service_cards[i] = { ...c, image_url: uploaded.url || c.image_url, image_file_id: uploaded.id || c.image_file_id, image_file: null };
            }
            // Upload flip card images
            for (let i = 0; i < updatedForm.flip_cards.length; i++) {
                const c = updatedForm.flip_cards[i];
                const uploaded = await uploadIfFileGetFull(c.image_file, c.image_file_id, c.image_url, { alt_text: c.image_file_alt, caption: c.image_file_caption, filename: c.image_file_filename });
                const uploadedIcon = await uploadIfFileGetFull(c.icon_file, c.icon_file_id, c.icon_url, { alt_text: c.icon_file_alt, caption: c.icon_file_caption, filename: c.icon_file_filename });
                updatedForm.flip_cards[i] = { ...c, image_url: uploaded.url || c.image_url, image_file_id: uploaded.id || c.image_file_id, image_file: null, icon_url: uploadedIcon.url || c.icon_url, icon_file_id: uploadedIcon.id || c.icon_file_id, icon_file: null };
            }
            // Upload slide card images
            for (let i = 0; i < updatedForm.slide_cards.length; i++) {
                const c = updatedForm.slide_cards[i];
                const uploaded = await uploadIfFileGetFull(c.image_file, c.image_file_id, c.image_url, { alt_text: c.image_file_alt, caption: c.image_file_caption, filename: c.image_file_filename });
                const uploadedIcon = await uploadIfFileGetFull(c.icon_file, c.icon_file_id, c.icon_url, { alt_text: c.icon_file_alt, caption: c.icon_file_caption, filename: c.icon_file_filename });
                updatedForm.slide_cards[i] = { ...c, image_url: uploaded.url || c.image_url, image_file_id: uploaded.id || c.image_file_id, image_file: null, icon_url: uploadedIcon.url || c.icon_url, icon_file_id: uploadedIcon.id || c.icon_file_id, icon_file: null };
            }
            // Upload why-choose card images
            for (let i = 0; i < updatedForm.why_choose_cards.length; i++) {
                const c = updatedForm.why_choose_cards[i];
                const uploaded = await uploadIfFileGetFull(c.image_file, c.image_file_id, c.image_url, { alt_text: c.image_file_alt, caption: c.image_file_caption, filename: c.image_file_filename });
                updatedForm.why_choose_cards[i] = { ...c, image_url: uploaded.url || c.image_url, image_file_id: uploaded.id || c.image_file_id, image_file: null };
            }
            // Upload industry icons
            for (let i = 0; i < updatedForm.industries.length; i++) {
                const ind = updatedForm.industries[i];
                const uploaded = await uploadIfFileGetFull(ind.icon_file, ind.icon_file_id, ind.icon_url, { alt_text: ind.icon_file_alt, caption: ind.icon_file_caption, filename: ind.icon_file_filename });
                updatedForm.industries[i] = { ...ind, icon_url: uploaded.url || ind.icon_url, icon_file_id: uploaded.id || ind.icon_file_id, icon_file: null };
            }

            // Upload tech stack logo images
            for (let ci = 0; ci < updatedForm.tech_stack_categories.length; ci++) {
                const cat = updatedForm.tech_stack_categories[ci];
                for (let ii = 0; ii < (cat.items || []).length; ii++) {
                    const item = cat.items[ii];
                    const uploaded = await uploadIfFileGetFull(item.logo_file, item.logo_file_id, item.logo, { alt_text: item.logo_file_alt, caption: item.logo_file_caption, filename: item.logo_file_filename });
                    updatedForm.tech_stack_categories[ci].items[ii] = { ...item, logo: uploaded.url || item.logo, logo_file_id: uploaded.id || item.logo_file_id, logo_file: null };
                }
            }

            const payload = mapFormToApi(updatedForm);
            // Always persist current Page Builder state from top-level form state.
            // This prevents accidental drops if any intermediate mapper omits pageBlocks.
            payload.pageBlocks = Array.isArray(formData.pageBlocks) ? formData.pageBlocks : [];
            payload.published_at = isDraft ? null : (payload.published_at || new Date().toISOString());

            let result;
            if (isNew) {
                result = await adminService.createService(payload);
            } else {
                result = await adminService.updateService(id, payload);
            }

            const ok = await handleSaveSuccess({
                result,
                isCreate: isNew,
                isDraft,
                listPath: '/admin/services',
                editPathPrefix: '/admin/services/',
                toast,
                router,
                entityName: 'Service',
            });
            if (ok) return; // redirect in progress — do not setSaving(false)
            setSaving(false);
            toast.error(result?.error || 'Failed to save service');
        } catch (err) {
            toast.error('An error occurred while saving');
            console.error(err);
            setSaving(false);
        }
    };

    const handleDuplicate = async () => {
        if (isNew || !id) return;
        const confirmed = window.confirm(`Duplicate "${formData.service_title || 'this service'}" as a new draft copy?`);
        if (!confirmed) return;
        setSaving(true);
        const result = await adminService.duplicateService(id);
        setSaving(false);
        if (result.success) {
            const newId = result?.data?.id || result?.data?._id;
            toast.success('Service duplicated as draft');
            if (newId) {
                router.push(`/admin/services/${newId}`);
            } else {
                router.push('/admin/services');
            }
        } else {
            toast.error(result.error || 'Failed to duplicate service');
        }
    };

    const handleShowModal = (key, type, listData = null) => {
        setActiveImageContext({ key, type, listData });
        setShowModal(true);
    };

    const handleCloseModal = (persist = false) => {
        if (persist && activeImageContext) {
            const { key, type, listData } = activeImageContext;
            let fileId = null;
            let meta = {};
            if (type === 'single') {
                fileId = formData[`${key}_id`];
                meta = imageMetadata[key] || {};
            } else if (type === 'list' && listData) {
                const { listName, index, fieldName } = listData;
                const item = formData[listName]?.[index];
                fileId = item?.[`${fieldName}_id`];
                meta = { alt_text: item?.[`${fieldName}_alt`], caption: item?.[`${fieldName}_caption`], filename: item?.[`${fieldName}_filename`] };
            } else if (type === 'nested_list' && listData) {
                const { listName, catIdx, itemIdx, fieldName } = listData;
                const item = formData[listName]?.[catIdx]?.items?.[itemIdx];
                fileId = item?.[`${fieldName}_id`];
                meta = { alt_text: item?.[`${fieldName}_alt`], caption: item?.[`${fieldName}_caption`], filename: item?.[`${fieldName}_filename`] };
            }
            if (fileId && (meta.alt_text || meta.caption)) {
                adminService.updateFileInfo(fileId, {
                    alternativeText: meta.alt_text || '',
                    caption: meta.caption || '',
                });
            }
        }
        setShowModal(false);
        setActiveImageContext(null);
    };

    const handleModalMetadataChange = (field, value) => {
        if (!activeImageContext) return;
        const { key, type, listData } = activeImageContext;

        if (type === 'single') {
            handleImageMetadataChange(key, field, value);
        } else if (type === 'list' && listData) {
            const { listName, index, fieldName } = listData;
            const updatedList = [...formData[listName]];
            // modal passes 'alt_text' but stored/read key suffix is 'alt'
            const suffix = field === 'alt_text' ? 'alt' : field;
            updatedList[index][`${fieldName}_${suffix}`] = value;
            setFormData(prev => ({ ...prev, [listName]: updatedList }));
        } else if (type === 'nested_list' && listData) {
            const { listName, catIdx, itemIdx, fieldName } = listData;
            const updatedList = [...formData[listName]];
            const suffix = field === 'alt_text' ? 'alt' : field;
            updatedList[catIdx].items[itemIdx][`${fieldName}_${suffix}`] = value;
            setFormData(prev => ({ ...prev, [listName]: updatedList }));
        }
    };

    const handleModalRemoveImage = () => {
        if (!activeImageContext) return;
        const { key, type, listData } = activeImageContext;

        if (type === 'single') {
            setFormData(prev => ({ ...prev, [key]: null, [`${key}_id`]: null }));
            setImagePreviews(prev => ({ ...prev, [key]: null }));
            setImageMetadata(prev => ({
                ...prev,
                [key]: { filename: '', alt_text: '', caption: '' }
            }));
        } else if (type === 'list' && listData) {
            const { listName, index, fieldName } = listData;
            const updatedList = [...formData[listName]];

            updatedList[index][fieldName] = null;
            updatedList[index][`${fieldName}_id`] = null;
            updatedList[index][`${fieldName}_filename`] = '';
            updatedList[index][`${fieldName}_alt`] = '';
            updatedList[index][`${fieldName}_caption`] = '';
            
            // If it's a modern field, also clear the URL
            const urlField = fieldName.replace('_file', '_url');
            if (updatedList[index][urlField] !== undefined) {
                updatedList[index][urlField] = '';
            }

            setFormData(prev => ({ ...prev, [listName]: updatedList }));
            setImagePreviews(prev => ({ ...prev, [key]: null }));
        } else if (type === 'nested_list' && listData) {
            const { listName, catIdx, itemIdx, fieldName } = listData;
            const updatedList = [...formData[listName]];

            updatedList[catIdx].items[itemIdx][fieldName] = null;
            updatedList[catIdx].items[itemIdx][`${fieldName}_id`] = null;
            updatedList[catIdx].items[itemIdx][`${fieldName}_filename`] = '';
            updatedList[catIdx].items[itemIdx][`${fieldName}_alt`] = '';
            updatedList[catIdx].items[itemIdx][`${fieldName}_caption`] = '';
            
            // Specifically for tech stack URL
            const urlField = fieldName.replace('_file', ''); // e.g., logo_file -> logo
            if (updatedList[catIdx].items[itemIdx][urlField] !== undefined) {
                updatedList[catIdx].items[itemIdx][urlField] = '';
            }

            setFormData(prev => ({ ...prev, [listName]: updatedList }));
            setImagePreviews(prev => ({ ...prev, [key]: null }));
        }
    };

    // Handle standard inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Image Upload
    const handleImageUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
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

    // Handle Image Upload for List Items
    const handleListImageUpload = (e, listName, index, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const updatedList = [...formData[listName]];
            updatedList[index][fieldName] = file;

            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                // Store preview with a unique key pattern
                const previewKey = `${listName}_${index}_${fieldName}`;
                const result = reader.result;
                setImagePreviews(prev => ({ ...prev, [previewKey]: result }));

                const img = new window.Image();
                img.src = result;
                img.onload = () => {
                    const newList = [...formData[listName]];
                    if (newList[index]) {
                        newList[index][`${fieldName}_size`] = (file.size / 1024).toFixed(2) + ' KB';
                        newList[index][`${fieldName}_date`] = new Date().toLocaleDateString();
                        newList[index][`${fieldName}_filename`] = file.name;
                        newList[index][`${fieldName}_extension`] = file.name.split('.').pop();
                        newList[index][`${fieldName}_dimensions`] = `${img.naturalWidth} x ${img.naturalHeight}`;
                        setFormData(prev => ({ ...prev, [listName]: newList }));
                    }
                };
            };
            reader.readAsDataURL(file);

            setFormData(prev => ({ ...prev, [listName]: updatedList }));
        }
    };

    const removeImage = (fieldName) => {
        setFormData(prev => ({ ...prev, [fieldName]: null }));
        setImagePreviews(prev => ({ ...prev, [fieldName]: null }));
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

    const removeListImage = (listName, index, fieldName) => {
        const updatedList = [...formData[listName]];
        updatedList[index][fieldName] = null;

        // Also clear metadata for list item
        updatedList[index][`${fieldName}_filename`] = '';
        updatedList[index][`${fieldName}_alt`] = '';
        updatedList[index][`${fieldName}_caption`] = '';

        setFormData(prev => ({ ...prev, [listName]: updatedList }));

        const previewKey = `${listName}_${index}_${fieldName}`;
        setImagePreviews(prev => ({ ...prev, [previewKey]: null }));
    };


    // Generic List Handlers
    const toggleCollapse = (listName, index) => {
        const key = `${listName}-${index}`;
        setCollapsedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Service Tabs Handlers
    const addServiceTab = () => {
        setFormData(prev => ({
            ...prev,
            service_tabs: [...prev.service_tabs, {
                name: '', content: '', media_item: null,
                media_item_filename: '', media_item_alt: '', media_item_caption: ''
            }]
        }));
    };
    const updateServiceTab = (index, field, value) => {
        const updated = [...formData.service_tabs];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, service_tabs: updated }));
    };
    const removeServiceTab = (index) => {
        setFormData(prev => ({
            ...prev,
            service_tabs: prev.service_tabs.filter((_, i) => i !== index)
        }));
    };

    // Parent Services Handlers
    const addParentService = () => {
        setFormData(prev => ({
            ...prev,
            parent_services: [...prev.parent_services, {
                name: '', content: '', media_item: null,
                media_item_filename: '', media_item_alt: '', media_item_caption: ''
            }]
        }));
    };
    const updateParentService = (index, field, value) => {
        const updated = [...formData.parent_services];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, parent_services: updated }));
    };
    const removeParentService = (index) => {
        setFormData(prev => ({
            ...prev,
            parent_services: prev.parent_services.filter((_, i) => i !== index)
        }));
    };

    // FAQs Handlers
    const addFaq = () => {
        setFormData(prev => ({
            ...prev,
            service_faqs_list: [...prev.service_faqs_list, { service_faq_title: '', service_faq_details: '' }]
        }));
    };
    const updateFaq = (index, field, value) => {
        const updated = [...formData.service_faqs_list];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, service_faqs_list: updated }));
    };
    const removeFaq = (index) => {
        setFormData(prev => ({
            ...prev,
            service_faqs_list: prev.service_faqs_list.filter((_, i) => i !== index)
        }));
    };

    // Az Diff List Handlers
    const addAzDiffItem = () => {
        setFormData(prev => ({
            ...prev,
            az_diff_list: [...prev.az_diff_list, { az_diff_list_title: '', az_diff_list_content: '' }]
        }));
    };
    const updateAzDiffItem = (index, field, value) => {
        const updated = [...formData.az_diff_list];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, az_diff_list: updated }));
    };
    const removeAzDiffItem = (index) => {
        setFormData(prev => ({
            ...prev,
            az_diff_list: prev.az_diff_list.filter((_, i) => i !== index)
        }));
    };

    // ── Generic handler factory for modern-template array fields ──
    const makeListHandlers = (listKey, emptyItem) => ({
        add: () => setFormData(prev => ({ ...prev, [listKey]: [...prev[listKey], { ...emptyItem }] })),
        update: (index, field, value) => {
            setFormData(prev => {
                const updated = [...prev[listKey]];
                updated[index] = { ...updated[index], [field]: value };
                return { ...prev, [listKey]: updated };
            });
        },
        remove: (index) => setFormData(prev => ({ ...prev, [listKey]: prev[listKey].filter((_, i) => i !== index) })),
    });

    // heroBadgeHandlers removed — static in component
    const serviceCardHandlers = makeListHandlers('service_cards', { title: '', description: '', image_url: '', image_file: null, image_file_id: null, image_file_alt: '', image_file_caption: '', image_file_filename: '' });
    const ctaSectionHandlers = makeListHandlers('cta_sections', { title: '', subtitle: '', buttonText: '', buttonLink: '', bg_image_url: '', bg_image_file: null, bg_image_file_id: null, bg_image_file_alt: '', bg_image_file_caption: '', bg_image_file_filename: '' });
    const flipCardHandlers = makeListHandlers('flip_cards', { title: '', description: '', iconSvg: '', icon_url: '', icon_file: null, icon_file_id: null, icon_file_alt: '', icon_file_caption: '', icon_file_filename: '', image_url: '', image_file: null, image_file_id: null, image_file_alt: '', image_file_caption: '', image_file_filename: '' });
    const slideCardHandlers = makeListHandlers('slide_cards', { title: '', description: '', iconSvg: '', icon_url: '', icon_file: null, icon_file_id: null, icon_file_alt: '', icon_file_caption: '', icon_file_filename: '', image_url: '', image_file: null, image_file_id: null, image_file_alt: '', image_file_caption: '', image_file_filename: '' });
    // awardHandlers removed — static in component
    const processStepHandlers = makeListHandlers('process_steps', { stepNumber: '', title: '', description: '' });
    const whyChooseHandlers = makeListHandlers('why_choose_cards', { title: '', description: '', image_url: '', image_file: null, image_file_id: null, image_file_alt: '', image_file_caption: '', image_file_filename: '' });
    const industryHandlers = makeListHandlers('industries', { name: '', icon_url: '', icon_file: null, icon_file_id: null, icon_file_alt: '', icon_file_caption: '', icon_file_filename: '' });
    const statsItemHandlers = makeListHandlers('stats_items', { value: '', label: '' });
    const benefitHandlers = makeListHandlers('benefits_accordion', { title: '', description: '' });
    const faqCategoryHandlers = makeListHandlers('faq_category_list', { name: '', faqs: [] });

    // Content sections (multiple title + rich HTML info blocks)
    const contentSectionHandlers = makeListHandlers('content_sections', { title: '', info: '' });

    // Nested faq handlers inside a category
    const addFaqToCategory = (catIdx) => {
        setFormData(prev => {
            const updated = [...prev.faq_category_list];
            updated[catIdx] = { ...updated[catIdx], faqs: [...(updated[catIdx].faqs || []), { question: '', answer: '' }] };
            return { ...prev, faq_category_list: updated };
        });
    };
    const updateFaqInCategory = (catIdx, faqIdx, field, value) => {
        setFormData(prev => {
            const updated = [...prev.faq_category_list];
            const faqs = [...(updated[catIdx].faqs || [])];
            faqs[faqIdx] = { ...faqs[faqIdx], [field]: value };
            updated[catIdx] = { ...updated[catIdx], faqs };
            return { ...prev, faq_category_list: updated };
        });
    };
    const removeFaqFromCategory = (catIdx, faqIdx) => {
        setFormData(prev => {
            const updated = [...prev.faq_category_list];
            updated[catIdx] = { ...updated[catIdx], faqs: updated[catIdx].faqs.filter((_, i) => i !== faqIdx) };
            return { ...prev, faq_category_list: updated };
        });
    };

    // Tech stack category + item handlers
    const addTechCategory = () => setFormData(prev => ({
        ...prev,
        tech_stack_categories: [...prev.tech_stack_categories, { name: '', items: [] }]
    }));
    const updateTechCategory = (catIdx, field, value) => {
        setFormData(prev => {
            const updated = [...prev.tech_stack_categories];
            updated[catIdx] = { ...updated[catIdx], [field]: value };
            return { ...prev, tech_stack_categories: updated };
        });
    };
    const removeTechCategory = (catIdx) => setFormData(prev => ({
        ...prev,
        tech_stack_categories: prev.tech_stack_categories.filter((_, i) => i !== catIdx)
    }));
    const addTechItem = (catIdx) => {
        setFormData(prev => {
            const updated = [...prev.tech_stack_categories];
            updated[catIdx] = { ...updated[catIdx], items: [...(updated[catIdx].items || []), { name: '', logo: '' }] };
            return { ...prev, tech_stack_categories: updated };
        });
    };
    const updateTechItem = (catIdx, itemIdx, field, value) => {
        setFormData(prev => {
            const updated = [...prev.tech_stack_categories];
            const items = [...(updated[catIdx].items || [])];
            items[itemIdx] = { ...items[itemIdx], [field]: value };
            updated[catIdx] = { ...updated[catIdx], items };
            return { ...prev, tech_stack_categories: updated };
        });
    };
    const removeTechItem = (catIdx, itemIdx) => {
        setFormData(prev => {
            const updated = [...prev.tech_stack_categories];
            updated[catIdx] = { ...updated[catIdx], items: updated[catIdx].items.filter((_, i) => i !== itemIdx) };
            return { ...prev, tech_stack_categories: updated };
        });
    };

    // Image upload for modern-template list items (stores URL path, not ID)
    const handleModernImageUpload = (e, listKey, index, imageFileField, imageUrlField) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData(prev => {
            const updated = [...prev[listKey]];
            updated[index] = { ...updated[index], [imageFileField]: file, [`${imageFileField}_filename`]: file.name };
            return { ...prev, [listKey]: updated };
        });
        const reader = new FileReader();
        reader.onloadend = () => {
            const previewKey = `${listKey}_${index}_${imageFileField}`;
            const result = reader.result;
            setImagePreviews(prev => ({ ...prev, [previewKey]: result }));
            const img = new window.Image();
            img.src = result;
            img.onload = () => {
                setFormData(prev => {
                    const updated = [...prev[listKey]];
                    updated[index] = {
                        ...updated[index],
                        [`${imageFileField}_size`]: (file.size / 1024).toFixed(2) + ' KB',
                        [`${imageFileField}_date`]: new Date().toLocaleDateString(),
                        [`${imageFileField}_extension`]: file.name.split('.').pop(),
                        [`${imageFileField}_dimensions`]: `${img.naturalWidth} x ${img.naturalHeight}`,
                    };
                    return { ...prev, [listKey]: updated };
                });
            };
        };
        reader.readAsDataURL(file);
    };

    const removeModernImage = (listKey, index, imageFileField, imageUrlField) => {
        setFormData(prev => {
            const updated = [...prev[listKey]];
            updated[index] = { ...updated[index], [imageFileField]: null, [`${imageFileField}_id`]: null, [imageUrlField]: '', [`${imageFileField}_filename`]: '', [`${imageFileField}_alt`]: '', [`${imageFileField}_caption`]: '' };
            return { ...prev, [listKey]: updated };
        });
        const previewKey = `${listKey}_${index}_${imageFileField}`;
        setImagePreviews(prev => ({ ...prev, [previewKey]: null }));
    };


    const ImageUploadField = ({ label, fieldName }) => {
        // const metadata = imageMetadata[fieldName] || { filename: '', alt_text: '', caption: '' };

        return (
            <div className="mb-4">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
                {imagePreviews[fieldName] ? (
                    <div>
                        <div className="position-relative mb-3" style={{ maxWidth: '100%' }}>
                            <Image src={imagePreviews[fieldName]} fluid className="border w-100" style={{ objectFit: 'cover', maxHeight: '300px' }} />
                            <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={() => handleShowModal(fieldName, 'single')}
                                    title="Edit Details"
                                >
                                    <FaPen size={12} />
                                </Button>
                                <Button variant="light" size="sm" className="border" onClick={() => removeImage(fieldName)} title="Remove">
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border bg-dark d-flex align-items-center justify-content-center" style={{ height: '150px', cursor: 'pointer', position: 'relative', backgroundColor: '#343a40' }}>
                        <div className="text-center text-secondary">
                            <FaCloudUploadAlt size={32} className="mb-2" />
                            <p className="mb-0 small">Click to select an asset or drag & drop a file in this area</p>
                        </div>
                        <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e, fieldName)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    </div>
                )}
            </div>
        );
    };

    const ListImageUploadField = ({ label, listName, index, fieldName }) => {
        const previewKey = `${listName}_${index}_${fieldName}`;
        // const item = formData[listName][index];

        return (
            <div className="mb-3">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
                {imagePreviews[previewKey] ? (
                    <div>
                        <div className="position-relative mb-3" style={{ maxWidth: '100%' }}>
                            <Image src={imagePreviews[previewKey]} fluid className="border w-100" style={{ objectFit: 'cover', maxHeight: '200px' }} />
                            <div className="position-absolute" style={{ top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="border"
                                    onClick={() => handleShowModal(previewKey, 'list', { listName, index, fieldName })}
                                    title="Edit Details"
                                >
                                    <FaPen size={12} />
                                </Button>
                                <Button variant="light" size="sm" className="border" onClick={() => removeListImage(listName, index, fieldName)} title="Remove">
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border bg-white d-flex align-items-center justify-content-center" style={{ height: '100px', cursor: 'pointer', position: 'relative' }}>
                        <div className="text-center text-secondary">
                            <FaCloudUploadAlt size={24} className="mb-1" />
                            <p className="mb-0 small">Upload</p>
                        </div>
                        <Form.Control type="file" accept="image/*" onChange={(e) => handleListImageUpload(e, listName, index, fieldName)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    </div>
                )}
            </div>
        );
    }

    // Image upload for modern-template list items (stores URL path, not ID)
    const ModernImageUpload = ({ label, listKey, index, fileField, urlField }) => {
        const previewKey = `${listKey}_${index}_${fileField}`;
        const existingUrl = formData[listKey]?.[index]?.[urlField];
        const preview = imagePreviews[previewKey] || (existingUrl && existingUrl.startsWith('/') ? `${STRAPI_IMAGE_BASE_URL}${existingUrl}` : existingUrl);
        return (
            <div className="mb-3">
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
                {preview ? (
                    <div className="position-relative mb-2">
                        <Image src={preview} fluid className="border rounded w-100" style={{ objectFit: 'cover', maxHeight: '150px' }} />
                        <div className="position-absolute" style={{ top: '6px', right: '6px', display: 'flex', gap: '5px' }}>
                            <Button variant="light" size="sm" className="border shadow-sm p-1" onClick={() => handleShowModal(previewKey, 'list', { listName: listKey, index, fieldName: fileField })} title="Edit Details">
                                <FaPen size={12} />
                            </Button>
                            <Button variant="danger" size="sm" className="shadow-sm p-1"
                                onClick={() => removeModernImage(listKey, index, fileField, urlField)} title="Remove">
                                <FaTrash size={12} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border bg-white d-flex align-items-center justify-content-center rounded" style={{ height: '90px', cursor: 'pointer', position: 'relative' }}>
                        <div className="text-center text-secondary">
                            <FaCloudUploadAlt size={20} className="mb-1" />
                            <p className="mb-0 small">Upload</p>
                        </div>
                        <Form.Control type="file" accept="image/*"
                            onChange={(e) => handleModernImageUpload(e, listKey, index, fileField, urlField)}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    </div>
                )}
            </div>
        );
    };

    // Image upload for nested lists (like tech stack)
    const NestedModernImageUpload = ({ label, listKey, catIdx, itemIdx, fileField, urlField }) => {
        const previewKey = `${listKey}_${catIdx}_${itemIdx}_${fileField}`;
        const item = formData[listKey]?.[catIdx]?.items?.[itemIdx] || {};
        const existingUrl = item[urlField];
        const preview = imagePreviews[previewKey] || (existingUrl && existingUrl.startsWith('/') ? `${STRAPI_IMAGE_BASE_URL}${existingUrl}` : existingUrl);
        return (
            <div className="mb-3" style={{ maxWidth: '160px' }}>
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>{label}</Form.Label>
                {preview ? (
                    <div className="position-relative mb-2">
                        <Image src={preview} fluid className="border rounded w-100 bg-light" style={{ objectFit: 'contain', maxHeight: '100px' }} />
                        <div className="position-absolute" style={{ top: '6px', right: '6px', display: 'flex', gap: '5px' }}>
                            <Button variant="light" size="sm" className="border shadow-sm p-1" onClick={() => handleShowModal(previewKey, 'nested_list', { listName: listKey, catIdx, itemIdx, fieldName: fileField })} title="Edit Details">
                                <FaPen size={11} />
                            </Button>
                            <Button variant="danger" size="sm" className="shadow-sm p-1"
                                onClick={() => {
                                    setFormData(prev => {
                                        const updated = [...prev[listKey]];
                                        const updItems = [...updated[catIdx].items];
                                        updItems[itemIdx] = { ...updItems[itemIdx], [fileField]: null, [`${fileField}_id`]: null, [urlField]: '', [`${fileField}_filename`]: '', [`${fileField}_alt`]: '', [`${fileField}_caption`]: '' };
                                        updated[catIdx] = { ...updated[catIdx], items: updItems };
                                        return { ...prev, [listKey]: updated };
                                    });
                                    setImagePreviews(prev => ({ ...prev, [previewKey]: null }));
                                }} title="Remove">
                                <FaTrash size={11} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border bg-white d-flex align-items-center justify-content-center rounded" style={{ height: '70px', cursor: 'pointer', position: 'relative' }}>
                        <div className="text-center text-secondary">
                            <FaCloudUploadAlt size={16} className="mb-1" />
                            <p className="mb-0" style={{ fontSize: '11px' }}>Upload Logo</p>
                        </div>
                        <Form.Control type="file" accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setFormData(prev => {
                                    const updated = [...prev[listKey]];
                                    const updItems = [...updated[catIdx].items];
                                    updItems[itemIdx] = { ...updItems[itemIdx], [fileField]: file, [`${fileField}_filename`]: file.name };
                                    updated[catIdx] = { ...updated[catIdx], items: updItems };
                                    return { ...prev, [listKey]: updated };
                                });
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const result = reader.result;
                                    setImagePreviews(prev => ({ ...prev, [previewKey]: result }));
                                    const img = new window.Image();
                                    img.src = result;
                                    img.onload = () => {
                                        setFormData(prev => {
                                            const updated = [...prev[listKey]];
                                            const updItems = [...updated[catIdx].items];
                                            updItems[itemIdx] = {
                                                ...updItems[itemIdx],
                                                [`${fileField}_size`]: (file.size / 1024).toFixed(2) + ' KB',
                                                [`${fileField}_date`]: new Date().toLocaleDateString(),
                                                [`${fileField}_extension`]: file.name.split('.').pop(),
                                                [`${fileField}_dimensions`]: `${img.naturalWidth} x ${img.naturalHeight}`,
                                            };
                                            updated[catIdx] = { ...updated[catIdx], items: updItems };
                                            return { ...prev, [listKey]: updated };
                                        });
                                    };
                                };
                                reader.readAsDataURL(file);
                            }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <AdminLayout title={isNew ? 'Create an entry' : 'Edit Service'}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <Link href="/admin/services" passHref>
                        <Button variant="link" className="text-dark p-0 me-3">
                            <FaArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="fw-bold mb-0">{isNew ? 'Create an entry' : 'Edit Service'}</h2>
                        <p className="text-muted small mb-0">API ID : services</p>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    {!isNew && (
                        <Link href={`/services/preview/${id}`} target="_blank" rel="noopener noreferrer" passHref>
                            <Button variant="outline-dark" disabled={saving}>
                                Preview
                            </Button>
                        </Link>
                    )}
                    {!isNew && (
                        <Button variant="outline-primary" onClick={handleDuplicate} disabled={saving}>
                            <FaCopy className="me-2" /> Duplicate
                        </Button>
                    )}
                </div>
            </div>

            {loadingData ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" className="mb-3" />
                    <p className="text-secondary">Loading service data...</p>
                </div>
            ) : (
                <Row>
                    <Col lg={9}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <ImageUploadField label="Serviceicon" fieldName="service_icon" />
                                    </Col>
                                    <Col md={6}>
                                        <FormField label="ServiceTitle" name="service_title" value={formData.service_title} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <FormField label="ServiceShortDescription" name="service_short_description" as="textarea" rows={4} value={formData.service_short_description} onChange={handleChange} />

                                <ImageUploadField label="ServiceBanner" fieldName="service_banner" />

                                <FormField label="ServiceInfoTitle" name="service_info_title" value={formData.service_info_title} onChange={handleChange} />
                                <ImageUploadField label="ServiceInfoMedia" fieldName="service_info_media" />

                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>ServiceInfoDescription</Form.Label>
                                    <RichTextEditor content={formData.service_info_description} onChange={(html) => setFormData(prev => ({ ...prev, service_info_description: html }))} minHeight="200px" />
                                </div>

                                <Row>
                                    <Col md={6}>
                                        <FormField label="ServiceTabSectionTitlte" name="service_tab_section_title" value={formData.service_tab_section_title} onChange={handleChange} />
                                    </Col>
                                    <Col md={6}>
                                        <FormField label="ServiceTabSectionSubTitle" name="service_tab_section_sub_title" value={formData.service_tab_section_sub_title} onChange={handleChange} />
                                    </Col>
                                </Row>

                                {/* Service Tabs */}
                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2">ServiceTab ({formData.service_tabs.length})</Form.Label>
                                    {formData.service_tabs.map((tab, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('tabs', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`tabs-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{tab.name || `Tab ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeServiceTab(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`tabs-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Name" name="tab_name" value={tab.name} onChange={(e) => updateServiceTab(idx, 'name', e.target.value)} />
                                                    <div className="mb-3">
                                                        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>Content</Form.Label>
                                                        <RichTextEditor content={tab.content} onChange={(html) => updateServiceTab(idx, 'content', html)} minHeight="150px" />
                                                    </div>
                                                    <ListImageUploadField label="MediaItem" listName="service_tabs" index={idx} fieldName="media_item" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={addServiceTab}><FaPlus className="me-2" /> ADD NEW ENTRY</Button>
                                </div>

                                <FormField label="ParentServiceTitle" name="parent_service_title" value={formData.parent_service_title} onChange={handleChange} />

                                {/* Parent Services */}
                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2">ParentServices ({formData.parent_services.length})</Form.Label>
                                    {formData.parent_services.map((item, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('parents', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`parents-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{item.name || `Service ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeParentService(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`parents-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Name" name="ps_name" value={item.name} onChange={(e) => updateParentService(idx, 'name', e.target.value)} />
                                                    <div className="mb-3">
                                                        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>Content</Form.Label>
                                                        <RichTextEditor content={item.content} onChange={(html) => updateParentService(idx, 'content', html)} minHeight="150px" />
                                                    </div>
                                                    <ListImageUploadField label="MediaItem" listName="parent_services" index={idx} fieldName="media_item" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={addParentService}><FaPlus className="me-2" /> ADD NEW ENTRY</Button>
                                </div>


                                {/* Services FAQs List */}
                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2">ServicesFaqsList ({formData.service_faqs_list.length})</Form.Label>
                                    {formData.service_faqs_list.map((item, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('faqs', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`faqs-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{item.service_faq_title || `FAQ ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeFaq(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`faqs-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="ServiceFaqTitle" name="faq_q" value={item.service_faq_title} onChange={(e) => updateFaq(idx, 'service_faq_title', e.target.value)} />
                                                    <div className="mb-3">
                                                        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>ServiceFaqDetails</Form.Label>
                                                        <RichTextEditor content={item.service_faq_details} onChange={(html) => updateFaq(idx, 'service_faq_details', html)} minHeight="150px" />
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={addFaq}><FaPlus className="me-2" /> ADD NEW ENTRY</Button>
                                </div>

                                {/* Content Sections (multiple) */}
                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                        Content_sections ({formData.content_sections.length})
                                    </Form.Label>

                                    {formData.content_sections.map((item, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div
                                                className="d-flex align-items-center justify-content-between p-3 border bg-white rounded"
                                                onClick={() => toggleCollapse('contentsec', idx)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`contentsec-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{item.title || `Content Section ${idx + 1}`}</span>
                                                </div>

                                                <Button
                                                    variant="link"
                                                    className="text-danger p-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        contentSectionHandlers.remove(idx);
                                                        if (formData.content_sections.length <= 1) {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                content_section_title: '',
                                                                content_section_info: '',
                                                            }));
                                                        }
                                                    }}
                                                    title="Remove section"
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                            </div>

                                            <Collapse in={!collapsedItems[`contentsec-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField
                                                        label={`Content_section_title ${idx + 1}`}
                                                        name={`content_section_title_${idx}`}
                                                        value={item.title}
                                                        onChange={(e) => contentSectionHandlers.update(idx, 'title', e.target.value)}
                                                    />
                                                    <div className="mb-3">
                                                        <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                                                            Content_section_info
                                                        </Form.Label>
                                                        <RichTextEditor
                                                            content={item.info}
                                                            onChange={(html) => contentSectionHandlers.update(idx, 'info', html)}
                                                            minHeight="200px"
                                                        />
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline-primary"
                                        className="w-100"
                                        onClick={() => contentSectionHandlers.add()}
                                    >
                                        <FaPlus className="me-2" /> ADD NEW CONTENT SECTION
                                    </Button>
                                </div>

                                <Row>
                                    <Col md={6}>
                                        <FormField label="Az_diff_title" name="az_diff_title" value={formData.az_diff_title} onChange={handleChange} />
                                    </Col>
                                    <Col md={6}>
                                        <FormField label="Az_diff_subtitle" name="az_diff_subtitle" value={formData.az_diff_subtitle} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <FormField label="Az_diff_info" name="az_diff_info" as="textarea" rows={4} value={formData.az_diff_info} onChange={handleChange} />

                                {/* Az Diff List */}
                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2">Az_diff_list ({formData.az_diff_list.length})</Form.Label>
                                    {formData.az_diff_list.map((item, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('azdiff', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`azdiff-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{item.az_diff_list_title || `Item ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeAzDiffItem(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`azdiff-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Az_diff_list_title" name="az_title" value={item.az_diff_list_title} onChange={(e) => updateAzDiffItem(idx, 'az_diff_list_title', e.target.value)} />
                                                    <FormField label="Az_diff_list_content" name="az_desc" as="textarea" rows={2} value={item.az_diff_list_content} onChange={(e) => updateAzDiffItem(idx, 'az_diff_list_content', e.target.value)} />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={addAzDiffItem}><FaPlus className="me-2" /> ADD NEW ENTRY</Button>
                                </div>

                                {/* ── Modern Template Settings ── */}
                                <hr className="my-4" />
                                <h5 className="fw-bold mb-3" style={{ color: '#DB241B' }}>🎯 Modern Template Settings</h5>

                                <div className="mb-4">
                                    <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>Template Type</Form.Label>
                                    <Form.Select name="template_type" value={formData.template_type} onChange={handleChange} style={{ fontSize: '14px' }}>
                                        <option value="default">Default</option>
                                        <option value="modern">Modern (AI / Jayesh-style)</option>
                                    </Form.Select>
                                    <Form.Text className="text-muted">Choose &quot;Modern&quot; to enable the new Jayesh-branch AI-service layout sections below.</Form.Text>
                                </div>

                                {/* Hero Badges — static in component, no admin editing needed */}
                                {/* Awards — static in component, no admin editing needed */}

                                {/* Service Cards */}
                                <hr className="my-3" />
                                <FormField label="Service Cards Section Title" name="service_cards_title" value={formData.service_cards_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Service Cards ({formData.service_cards.length})</Form.Label>
                                    {formData.service_cards.map((card, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('svcards', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`svcards-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{card.title || `Card ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); serviceCardHandlers.remove(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`svcards-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Title" name="sc_title" value={card.title} onChange={(e) => serviceCardHandlers.update(idx, 'title', e.target.value)} />
                                                    <FormField label="Description" name="sc_desc" as="textarea" rows={3} value={card.description} onChange={(e) => serviceCardHandlers.update(idx, 'description', e.target.value)} />
                                                    <ModernImageUpload label="Card Image" listKey="service_cards" index={idx} fileField="image_file" urlField="image_url" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={serviceCardHandlers.add}><FaPlus className="me-2" /> ADD CARD</Button>
                                </div>

                                {/* CTA Sections */}
                                <hr className="my-3" />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">CTA Sections ({formData.cta_sections.length})</Form.Label>
                                    {formData.cta_sections.map((cta, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('cta', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`cta-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{cta.title || `CTA ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); ctaSectionHandlers.remove(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`cta-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Title" name="cta_title" value={cta.title} onChange={(e) => ctaSectionHandlers.update(idx, 'title', e.target.value)} />
                                                    <FormField label="Subtitle" name="cta_subtitle" value={cta.subtitle} onChange={(e) => ctaSectionHandlers.update(idx, 'subtitle', e.target.value)} />
                                                    <Row>
                                                        <Col md={6}><FormField label="Button Text" name="cta_btn" value={cta.buttonText} onChange={(e) => ctaSectionHandlers.update(idx, 'buttonText', e.target.value)} /></Col>
                                                        <Col md={6}><FormField label="Button Link" name="cta_link" value={cta.buttonLink} onChange={(e) => ctaSectionHandlers.update(idx, 'buttonLink', e.target.value)} /></Col>
                                                    </Row>
                                                    <ModernImageUpload label="Background Image" listKey="cta_sections" index={idx} fileField="bg_image_file" urlField="bg_image_url" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={ctaSectionHandlers.add}><FaPlus className="me-2" /> ADD CTA</Button>
                                </div>

                                {/* Flip Cards */}
                                <hr className="my-3" />
                                <FormField label="Flip Cards Section Title" name="flip_cards_title" value={formData.flip_cards_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Flip Cards ({formData.flip_cards.length})</Form.Label>
                                    {formData.flip_cards.map((card, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('flipc', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`flipc-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{card.title || `Flip Card ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); flipCardHandlers.remove(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`flipc-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Title" name="fc_title" value={card.title} onChange={(e) => flipCardHandlers.update(idx, 'title', e.target.value)} />
                                                    <FormField label="Description" name="fc_desc" as="textarea" rows={2} value={card.description} onChange={(e) => flipCardHandlers.update(idx, 'description', e.target.value)} />
                                                    <ModernImageUpload label="Icon Image (optional)" listKey="flip_cards" index={idx} fileField="icon_file" urlField="icon_url" />
                                                    <ModernImageUpload label="Background Image" listKey="flip_cards" index={idx} fileField="image_file" urlField="image_url" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={flipCardHandlers.add}><FaPlus className="me-2" /> ADD FLIP CARD</Button>
                                </div>

                                {/* Slide Cards */}
                                <hr className="my-3" />
                                <FormField label="Slide Cards Section Title" name="slide_cards_title" value={formData.slide_cards_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Slide Cards ({formData.slide_cards.length})</Form.Label>
                                    {formData.slide_cards.map((card, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('slidec', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`slidec-${idx}`] ? <FaChevronRight size={12} /> : <FaChevronDown size={12} />}
                                                    <span>{card.title || `Slide Card ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); slideCardHandlers.remove(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`slidec-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Title" name="slc_title" value={card.title} onChange={(e) => slideCardHandlers.update(idx, 'title', e.target.value)} />
                                                    <FormField label="Description" name="slc_desc" as="textarea" rows={2} value={card.description} onChange={(e) => slideCardHandlers.update(idx, 'description', e.target.value)} />
                                                    <ModernImageUpload label="Icon Image (optional)" listKey="slide_cards" index={idx} fileField="icon_file" urlField="icon_url" />
                                                    <ModernImageUpload label="Background Image" listKey="slide_cards" index={idx} fileField="image_file" urlField="image_url" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={slideCardHandlers.add}><FaPlus className="me-2" /> ADD SLIDE CARD</Button>
                                </div>

                                {/* Process Steps */}
                                <hr className="my-3" />
                                <Row>
                                    <Col md={6}><FormField label="Process Section Title" name="process_section_title" value={formData.process_section_title} onChange={handleChange} /></Col>
                                    <Col md={6}><FormField label="Process Section Subtitle" name="process_section_subtitle" value={formData.process_section_subtitle} onChange={handleChange} /></Col>
                                </Row>
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Process Steps ({formData.process_steps.length})</Form.Label>
                                    {formData.process_steps.map((step, idx) => (
                                        <div key={idx} className="border rounded p-3 mb-2 bg-light">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="fw-bold">Step {step.stepNumber || idx + 1}: {step.title}</small>
                                                <Button variant="link" className="text-danger p-0" onClick={() => processStepHandlers.remove(idx)}><FaTrash size={12} /></Button>
                                            </div>
                                            <Row>
                                                <Col md={2}><Form.Control size="sm" type="number" placeholder="#" value={step.stepNumber} onChange={(e) => processStepHandlers.update(idx, 'stepNumber', e.target.value)} className="mb-2" /></Col>
                                                <Col md={4}><Form.Control size="sm" placeholder="Title" value={step.title} onChange={(e) => processStepHandlers.update(idx, 'title', e.target.value)} className="mb-2" /></Col>
                                                <Col md={6}><Form.Control size="sm" as="textarea" rows={1} placeholder="Description" value={step.description} onChange={(e) => processStepHandlers.update(idx, 'description', e.target.value)} className="mb-2" /></Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" className="w-100" onClick={processStepHandlers.add}><FaPlus className="me-2" /> ADD STEP</Button>
                                </div>

                                {/* Why Choose Cards */}
                                <hr className="my-3" />
                                <FormField label="Why Choose Section Title" name="why_choose_title" value={formData.why_choose_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Why Choose Cards ({formData.why_choose_cards.length})</Form.Label>
                                    {formData.why_choose_cards.map((card, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="d-flex align-items-center justify-content-between p-3 border bg-white rounded" onClick={() => toggleCollapse('whyc', idx)} style={{ cursor: 'pointer' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    {collapsedItems[`whyc-${idx}`] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                                                    <span>{card.title || `Card ${idx + 1}`}</span>
                                                </div>
                                                <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); whyChooseHandlers.remove(idx); }}><FaTrash size={12} /></Button>
                                            </div>
                                            <Collapse in={!!collapsedItems[`whyc-${idx}`]}>
                                                <div className="border border-top-0 p-3 bg-light">
                                                    <FormField label="Title" name="wc_title" value={card.title} onChange={(e) => whyChooseHandlers.update(idx, 'title', e.target.value)} />
                                                    <FormField label="Description" name="wc_desc" as="textarea" rows={2} value={card.description} onChange={(e) => whyChooseHandlers.update(idx, 'description', e.target.value)} />
                                                    <ModernImageUpload label="Card Image" listKey="why_choose_cards" index={idx} fileField="image_file" urlField="image_url" />
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" className="w-100" onClick={whyChooseHandlers.add}><FaPlus className="me-2" /> ADD CARD</Button>
                                </div>

                                {/* Industries */}
                                <hr className="my-3" />
                                <FormField label="Industries Section Title" name="industries_title" value={formData.industries_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Industries ({formData.industries.length})</Form.Label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {formData.industries.map((ind, idx) => (
                                            <div key={idx} className="border rounded p-2 mb-2 bg-light" style={{ width: '250px' }}>
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <Form.Control size="sm" placeholder="Industry name" value={ind.name} onChange={(e) => industryHandlers.update(idx, 'name', e.target.value)} />
                                                    <Button variant="link" className="text-danger p-0 ms-2" onClick={() => industryHandlers.remove(idx)}><FaTrash size={11} /></Button>
                                                </div>
                                                <ModernImageUpload label="Industry Icon" listKey="industries" index={idx} fileField="icon_file" urlField="icon_url" />
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline-primary" size="sm" className="mt-2" onClick={industryHandlers.add}><FaPlus className="me-1" /> Add Industry</Button>
                                </div>

                                {/* Stats Section */}
                                <hr className="my-3" />
                                <h6 className="fw-semibold mb-3">Stats Section</h6>
                                <FormField label="Stats Title (HTML allowed, e.g. Ranked <span>…</span>)" name="stats_title" value={formData.stats_title} onChange={handleChange} />
                                <FormField label="Stats Subtitle" name="stats_subtitle" value={formData.stats_subtitle} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Stats Items ({formData.stats_items.length})</Form.Label>
                                    {formData.stats_items.map((stat, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                            <Form.Control size="sm" style={{ width: '100px' }} placeholder="Value (150+)" value={stat.value} onChange={(e) => statsItemHandlers.update(idx, 'value', e.target.value)} />
                                            <Form.Control size="sm" placeholder="Label (AI Models Deployed)" value={stat.label} onChange={(e) => statsItemHandlers.update(idx, 'label', e.target.value)} />
                                            <Button variant="link" className="text-danger p-0" onClick={() => statsItemHandlers.remove(idx)}><FaTrash size={11} /></Button>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" onClick={statsItemHandlers.add}><FaPlus className="me-1" /> Add Stat</Button>
                                </div>

                                {/* Tech Stack Tabs */}
                                <hr className="my-3" />
                                <h6 className="fw-semibold mb-3">Tech Stack Tabs</h6>
                                {formData.tech_stack_categories.map((cat, catIdx) => (
                                    <div key={catIdx} className="mb-3 border rounded">
                                        <div className="d-flex align-items-center justify-content-between p-3 bg-white" onClick={() => toggleCollapse('techcat', catIdx)} style={{ cursor: 'pointer' }}>
                                            <div className="d-flex align-items-center gap-2">
                                                {collapsedItems[`techcat-${catIdx}`] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                                                <span>{cat.name || `Category ${catIdx + 1}`}</span>
                                            </div>
                                            <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); removeTechCategory(catIdx); }}><FaTrash size={12} /></Button>
                                        </div>
                                        <Collapse in={!!collapsedItems[`techcat-${catIdx}`]}>
                                            <div className="p-3 bg-light border-top">
                                                <div className="mb-3">
                                                    <Form.Control size="sm" placeholder="Category name (e.g. Machine Learning)" value={cat.name} onChange={(e) => updateTechCategory(catIdx, 'name', e.target.value)} />
                                                </div>
                                                {(cat.items || []).map((item, itemIdx) => (
                                                    <div key={itemIdx} className="border rounded p-3 mb-2 bg-white position-relative">
                                                        <Button variant="link" className="text-danger p-0 position-absolute" style={{ top: '8px', right: '8px' }} onClick={() => removeTechItem(catIdx, itemIdx)}><FaTrash size={12} /></Button>
                                                        <div className="mb-2">
                                                            <Form.Control size="sm" style={{ maxWidth: '200px' }} placeholder="Name (TensorFlow)" value={item.name} onChange={(e) => updateTechItem(catIdx, itemIdx, 'name', e.target.value)} />
                                                        </div>
                                                        <NestedModernImageUpload label="Tech Logo" listKey="tech_stack_categories" catIdx={catIdx} itemIdx={itemIdx} fileField="logo_file" urlField="logo" />
                                                    </div>
                                                ))}
                                                <Button variant="outline-secondary" size="sm" onClick={() => addTechItem(catIdx)}><FaPlus size={10} className="me-1" /> Add Tech</Button>
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}
                                <Button variant="outline-primary" size="sm" onClick={addTechCategory}><FaPlus className="me-1" /> Add Category</Button>

                                {/* Benefits Accordion */}
                                <hr className="my-3" />
                                <FormField label="Benefits Section Title" name="benefits_title" value={formData.benefits_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">Benefits Accordion ({formData.benefits_accordion.length})</Form.Label>
                                    {formData.benefits_accordion.map((item, idx) => (
                                        <div key={idx} className="border rounded p-3 mb-2 bg-light">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="fw-bold">{item.title || `Benefit ${idx + 1}`}</small>
                                                <Button variant="link" className="text-danger p-0" onClick={() => benefitHandlers.remove(idx)}><FaTrash size={12} /></Button>
                                            </div>
                                            <FormField label="Title" name="ben_title" value={item.title} onChange={(e) => benefitHandlers.update(idx, 'title', e.target.value)} />
                                            <FormField label="Description" name="ben_desc" as="textarea" rows={2} value={item.description} onChange={(e) => benefitHandlers.update(idx, 'description', e.target.value)} />
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" className="w-100" onClick={benefitHandlers.add}><FaPlus className="me-2" /> ADD BENEFIT</Button>
                                </div>

                                {/* FAQ Categories */}
                                <hr className="my-3" />
                                <FormField label="FAQ Section Title" name="faq_categories_title" value={formData.faq_categories_title} onChange={handleChange} />
                                <div className="mb-4">
                                    <Form.Label className="fw-semibold mb-2">FAQ Categories ({formData.faq_category_list.length})</Form.Label>
                                    {formData.faq_category_list.map((cat, catIdx) => (
                                        <div key={catIdx} className="border rounded p-3 mb-3 bg-light">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <Form.Control size="sm" style={{ maxWidth: '300px' }} placeholder="Category name (e.g. General AI Development)" value={cat.name} onChange={(e) => faqCategoryHandlers.update(catIdx, 'name', e.target.value)} />
                                                <Button variant="link" className="text-danger p-0" onClick={() => faqCategoryHandlers.remove(catIdx)}><FaTrash size={12} /></Button>
                                            </div>
                                            {(cat.faqs || []).map((faq, faqIdx) => (
                                                <div key={faqIdx} className="border rounded p-2 mb-2 bg-white">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <small className="text-muted">Q{faqIdx + 1}</small>
                                                        <Button variant="link" className="text-danger p-0" onClick={() => removeFaqFromCategory(catIdx, faqIdx)}><FaTrash size={11} /></Button>
                                                    </div>
                                                    <Form.Control size="sm" placeholder="Question" value={faq.question} onChange={(e) => updateFaqInCategory(catIdx, faqIdx, 'question', e.target.value)} className="mb-1" />
                                                    <Form.Control size="sm" as="textarea" rows={2} placeholder="Answer" value={faq.answer} onChange={(e) => updateFaqInCategory(catIdx, faqIdx, 'answer', e.target.value)} />
                                                </div>
                                            ))}
                                            <Button variant="outline-secondary" size="sm" onClick={() => addFaqToCategory(catIdx)}><FaPlus size={10} className="me-1" /> Add FAQ</Button>
                                        </div>
                                    ))}
                                    <Button variant="outline-primary" size="sm" className="w-100" onClick={faqCategoryHandlers.add}><FaPlus className="me-2" /> ADD CATEGORY</Button>
                                </div>

                                {/* SEO Settings */}
                                <hr className="my-4" />
                                <h6 className="fw-bold mb-3">SEO Settings</h6>

                                <Row>
                                    <Col md={6}>
                                        <FormField label="Meta Title" name="seo_title" value={formData.seo_title} onChange={handleChange} placeholder="SEO optimized title" />
                                    </Col>
                                    <Col md={6}>
                                        <FormField label="Slug" name="slug" value={formData.slug} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                    {formData.seo_title.length}/60 characters
                                </Form.Text>

                                <FormField label="Meta Description" name="seo_description" as="textarea" rows={3} value={formData.seo_description} onChange={handleChange} placeholder="Brief description for search results" />
                                <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                    {formData.seo_description.length}/160 characters
                                </Form.Text>

                                <FormField label="Meta Keywords" name="meta_keywords" value={formData.meta_keywords} onChange={handleChange} placeholder="keyword1, keyword2, keyword3" />
                                <FormField label="Robots Meta Tag" name="robots_meta" value={formData.robots_meta} onChange={handleChange} placeholder="index, follow" />

                                {/* Open Graph */}
                                <hr className="my-4" />
                                <h6 className="fw-bold mb-3">Open Graph (Facebook/LinkedIn)</h6>
                                <Row>
                                    <Col md={6}>
                                        <FormField label="OG Title" name="og_title" value={formData.og_title} onChange={handleChange} placeholder="Title for social media sharing" />
                                    </Col>
                                    <Col md={6}>
                                        <FormField label="OG Type" name="og_type" value={formData.og_type} onChange={handleChange} />
                                    </Col>
                                </Row>
                                <FormField label="OG Description" name="og_description" as="textarea" rows={2} value={formData.og_description} onChange={handleChange} placeholder="Description for social media sharing" />
                                <FormField label="OG Image URL" name="og_image" type="url" value={formData.og_image} onChange={handleChange} placeholder="https://example.com/og-image.jpg" />

                                {/* Twitter Card */}
                                <hr className="my-4" />
                                <h6 className="fw-bold mb-3">Twitter Card</h6>
                                <FormField label="Twitter Title" name="twitter_title" value={formData.twitter_title} onChange={handleChange} placeholder="Title for Twitter sharing" />
                                <FormField label="Twitter Description" name="twitter_description" as="textarea" rows={2} value={formData.twitter_description} onChange={handleChange} placeholder="Description for Twitter sharing" />
                                <FormField label="Twitter Image URL" name="twitter_image" type="url" value={formData.twitter_image} onChange={handleChange} placeholder="https://example.com/twitter-image.jpg" />

                                {/* Schema Markup */}
                                <hr className="my-4" />
                                <h6 className="fw-bold mb-3">Schema Markup</h6>
                                <FormField label="Schema Code (JSON-LD)" name="schema_code" as="textarea" rows={10} value={formData.schema_code} onChange={handleChange} placeholder='{"@context": "https://schema.org", ...}' />
                                <Form.Text className="text-muted d-block mb-3" style={{ fontSize: '11px', marginTop: '-10px' }}>
                                    Add JSON-LD structured data for better search engine understanding
                                </Form.Text>



                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <h6 className="fw-bold mb-3">Information</h6>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">LAST UPDATE</span>
                                    <span className="small">{serviceMetadata?.updatedAt ? new Date(serviceMetadata.updatedAt).toLocaleDateString() : '-'}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">BY</span>
                                    <span className="small">{serviceMetadata?.updatedBy || '-'}</span>
                                </div>
                                <hr />
                                <hr />
                                <div className="text-primary small mb-2">
                                    {serviceMetadata?.publishedAt ? (
                                        <><FaPen className="me-2" /> Editing published version</>
                                    ) : (
                                        <><FaPlus className="me-2" /> Editing draft version</>
                                    )}
                                </div>
                                <div className="text-muted small mb-2"><FaSave className="me-2" /> Configure the view</div>
                                <div className="text-muted small mb-2"><FaSave className="me-2" /> Edit the fields</div>
                                <hr />
                                <Button variant="outline-secondary" className="w-100 mb-2" onClick={() => handleSubmit(true)} disabled={saving}>
                                    {saving ? <Spinner animation="border" size="sm" /> : 'Save Draft'}
                                </Button>
                                <Button variant="success" className="w-100 mb-3" onClick={() => handleSubmit(false)} disabled={saving}>
                                    {saving ? <Spinner animation="border" size="sm" /> : (isNew ? 'Save & Publish' : 'Update')}
                                </Button>
                                <Button variant="outline-primary" className="w-100" onClick={() => setShowPageBuilderModal(true)}>
                                    Open Page Builder
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
            {/* Page Builder Modal */}
            <Modal show={showPageBuilderModal} onHide={() => setShowPageBuilderModal(false)} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="h6 mb-0">Page Builder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted small mb-3">
                        Reorder existing sections, remove blocks, or add new blocks.
                        Changes are saved when you click Save Draft or Update.
                    </p>
                    <Button variant="outline-secondary" size="sm" className="mb-3" onClick={() => {
                        if (window.confirm('This will replace current page blocks with auto-generated ones from existing data. Continue?')) {
                            const seeded = autoSeedBlocks('service', rawApiDataRef.current || formData);
                            setFormData(prev => ({ ...prev, pageBlocks: seeded }));
                        }
                    }}>
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
                                {activeImageContext && (() => {
                                    let previewSrc = imagePreviews[activeImageContext.key];
                                    if (!previewSrc) {
                                        const { type, listData, key } = activeImageContext;
                                        if (type === 'list' && listData) {
                                            const item = formData[listData.listName]?.[listData.index];
                                            const existingUrl = item?.[listData.fieldName.replace('_file', '_url')];
                                            if (existingUrl) previewSrc = existingUrl.startsWith('/') ? `${STRAPI_IMAGE_BASE_URL}${existingUrl}` : existingUrl;
                                        } else if (type === 'nested_list' && listData) {
                                            const item = formData[listData.listName]?.[listData.catIdx]?.items?.[listData.itemIdx];
                                            const existingUrl = item?.[listData.fieldName.replace('_file', '')]; // e.g. logo_file -> logo
                                            if (existingUrl) previewSrc = existingUrl.startsWith('/') ? `${STRAPI_IMAGE_BASE_URL}${existingUrl}` : existingUrl;
                                        }
                                    }
                                    return previewSrc ? (
                                        <Image
                                            src={previewSrc}
                                            fluid
                                            style={{ maxHeight: '350px', maxWidth: '100%' }}
                                        />
                                    ) : <span className="text-secondary">No Preview Available</span>;
                                })()}
                                <div className="position-absolute top-0 end-0 p-3">
                                    <Button variant="light" size="sm" className="me-2" onClick={handleModalRemoveImage}><FaTrash /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="bg-white p-4 rounded shadow-sm h-100">
                                {/* Metadata Fields */}
                                {activeImageContext && (() => {
                                    const { key, type, listData } = activeImageContext;
                                    let filename = '', alt_text = '', caption = '';
                                    let size = 'Calculating...', date = '', dimensions = '-', extension = 'webp';

                                    if (type === 'single') {
                                        const meta = imageMetadata[key] || {};
                                        filename = meta.filename;
                                        alt_text = meta.alt_text;
                                        caption = meta.caption;
                                        if (meta.size) size = meta.size;
                                        if (meta.date) date = meta.date;
                                        if (meta.dimensions) dimensions = meta.dimensions;
                                        if (meta.extension) extension = meta.extension;
                                    } else if (type === 'list' && listData) {
                                        const { listName, index, fieldName } = listData;
                                        const item = formData[listName][index] || {};
                                        filename = item[`${fieldName}_filename`];
                                        alt_text = item[`${fieldName}_alt`];
                                        caption = item[`${fieldName}_caption`];

                                        if (item[`${fieldName}_size`]) size = item[`${fieldName}_size`];
                                        if (item[`${fieldName}_date`]) date = item[`${fieldName}_date`];
                                        if (item[`${fieldName}_dimensions`]) dimensions = item[`${fieldName}_dimensions`];
                                        if (item[`${fieldName}_extension`]) extension = item[`${fieldName}_extension`];
                                    } else if (type === 'nested_list' && listData) {
                                        const { listName, catIdx, itemIdx, fieldName } = listData;
                                        const item = formData[listName][catIdx]?.items?.[itemIdx] || {};
                                        filename = item[`${fieldName}_filename`];
                                        alt_text = item[`${fieldName}_alt`];
                                        caption = item[`${fieldName}_caption`];

                                        if (item[`${fieldName}_size`]) size = item[`${fieldName}_size`];
                                        if (item[`${fieldName}_date`]) date = item[`${fieldName}_date`];
                                        if (item[`${fieldName}_dimensions`]) dimensions = item[`${fieldName}_dimensions`];
                                        if (item[`${fieldName}_extension`]) extension = item[`${fieldName}_extension`];
                                    }
                                    return (
                                        <>
                                            <Row className="mb-4">
                                                <Col xs={6}><small className="text-muted d-block">Size</small><span className="small fw-bold">{size}</span></Col>
                                                <Col xs={6}><small className="text-muted d-block">Date</small><span className="small fw-bold">{date || new Date().toLocaleDateString()}</span></Col>
                                                <Col xs={6} className="mt-3"><small className="text-muted d-block">Dimensions</small><span className="small fw-bold">{dimensions}</span></Col>
                                                <Col xs={6} className="mt-3"><small className="text-muted d-block">Extension</small><span className="small fw-bold">{extension}</span></Col>
                                            </Row>

                                            <div className="mb-3"><Form.Label className="small fw-bold">File name</Form.Label><Form.Control type="text" value={filename || ''} onChange={(e) => handleModalMetadataChange('filename', e.target.value)} /></div>
                                            <div className="mb-3"><Form.Label className="small fw-bold">Alternative text</Form.Label><Form.Control type="text" value={alt_text || ''} onChange={(e) => handleModalMetadataChange('alt_text', e.target.value)} /><Form.Text className="text-muted small">This text will be displayed if the asset can't be shown.</Form.Text></div>
                                            <div className="mb-3"><Form.Label className="small fw-bold">Caption</Form.Label><Form.Control type="text" value={caption || ''} onChange={(e) => handleModalMetadataChange('caption', e.target.value)} /></div>
                                        </>
                                    );
                                })()}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => handleCloseModal(false)}>Cancel</Button>
                    <Button variant="primary" className="bg-success border-success" onClick={() => handleCloseModal(true)}>Finish</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

// Force server-side rendering for admin pages
export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default ServiceEdit;
