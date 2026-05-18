/**
 * Maps API product response (nested section2, section3, ...) to admin ProductForm shape
 * (flat section2_heading, section2_boxes, etc.).
 * Aligns with public [slug]/index.js which uses: Image?.url, BrandsLogo[].url,
 * section2.section_boxes[].icon?.url, section2.section_boxes[].image?.url,
 * section3.image?.url, section4.short_description, section4.boxes[].icon, section5.boxes[].icon, etc.
 */

function pick(obj, key, fallback = '') {
    if (obj == null) return fallback;
    const v = obj[key];
    return v !== undefined && v !== null ? v : fallback;
}

function arrayOrEmpty(arr) {
    return Array.isArray(arr) ? arr : [];
}

/** Ensure image is single object with url (API may return object or array of one) */
function normalizeImage(img) {
    if (!img) return null;
    const one = Array.isArray(img) ? img[0] : img;
    if (!one || typeof one !== 'object') return null;
    return one.url != null ? { ...one, url: one.url } : null;
}

/** Ensure array of images; each item object with url */
function normalizeImageArray(arr) {
    if (!Array.isArray(arr)) return arr ? [normalizeImage(arr)] : [];
    return arr.map(normalizeImage).filter(Boolean);
}

/** Normalize section box so icon/image are single objects with url (form expects .url for preview) */
function normalizeSection2Box(box) {
    if (!box || typeof box !== 'object') return box;
    return {
        ...box,
        icon: normalizeImage(box.icon),
        image: normalizeImage(box.image),
        heading: box.heading ?? '',
        description_back: box.description_back ?? box.description ?? '',
    };
}

/** Section4/5 boxes: API has icon; form preview uses box.image - so expose image from icon */
function normalizeSection4Box(box) {
    if (!box || typeof box !== 'object') return box;
    const icon = normalizeImage(box.icon);
    return {
        ...box,
        icon,
        image: box.image ? normalizeImage(box.image) : icon,
        heading: box.heading ?? box.title ?? '',
        description: box.description ?? box.short_description ?? '',
    };
}

function normalizeSection5Box(box) {
    if (!box || typeof box !== 'object') return box;
    const icon = normalizeImage(box.icon);
    return {
        ...box,
        icon,
        image: box.image ? normalizeImage(box.image) : icon,
        title: box.title ?? box.heading ?? '',
        short_description: box.short_description ?? box.description ?? '',
    };
}

/** Section6/7: image only */
function normalizeBoxWithImage(box) {
    if (!box || typeof box !== 'object') return box;
    return {
        ...box,
        image: normalizeImage(box.image),
    };
}

function normalizeLayout(layout) {
    if (!layout) return '';
    const s = String(layout);
    if (s === 'layout_1') return 'layout1';
    if (s === 'layout_2') return 'layout2';
    if (s === 'layout_3') return 'layout3';
    return s;
}

/**
 * Map API product (from getProduct) to initialData shape for ProductForm
 * @param {Object} apiProduct - Product as returned by backend (populated)
 * @returns {Object} - Flat object for ProductForm initialData
 */
export function mapProductApiToForm(apiProduct) {
    if (!apiProduct || typeof apiProduct !== 'object') {
        return {};
    }

    const p = apiProduct;

    // Top-level images (API: Image, BrandsLogo - public uses postData?.Image?.url, postData?.BrandsLogo[].url)
    const image = normalizeImage(p.Image ?? p.image);
    const brandsLogo = arrayOrEmpty(p.BrandsLogo ?? p.brandsLogo);
    const brandsLogoNorm = brandsLogo.map(normalizeImage).filter(Boolean);

    // Section 2: section_boxes with icon + image (public: item?.icon?.url, item?.image?.url)
    const s2 = p.section2 || {};
    const section2_boxes = arrayOrEmpty(s2.section_boxes).map(normalizeSection2Box);

    // Section 3: single object with image (public: section3?.image?.url)
    const s3 = p.section3;
    const section3_entries = s3
        ? [{ ...s3, image: normalizeImage(s3.image), sub_heading: s3.sub_heading ?? '' }]
        : [];

    // Section 4: heading, short_description, boxes (public: section4?.short_description, boxes[].icon?.url)
    const s4 = p.section4 || {};
    const section4_boxes = arrayOrEmpty(s4.boxes).map(normalizeSection4Box);

    // Section 5
    const s5 = p.section5 || {};
    const section5_boxes = arrayOrEmpty(s5.boxes).map(normalizeSection5Box);

    // Section 6: boxes with image (public: section6?.short_description, boxes[].image?.url)
    const s6 = p.section6 || {};
    const section6_boxes = arrayOrEmpty(s6.boxes).map(normalizeBoxWithImage);

    // Section 7: points with image (public: section7?.image?.url, section7?.short_description, points[].image?.url)
    const s7 = p.section7 || {};
    const section7_boxes = arrayOrEmpty(s7.points).map(normalizeBoxWithImage);

    return {
        id: p.id || p._id,
        layout: normalizeLayout(p.layout),
        heading: pick(p, 'heading'),
        shortDescription: pick(p, 'shortDescription'),
        image,
        Image: image,
        brandsLogo: brandsLogoNorm,
        BrandsLogo: brandsLogoNorm,

        section2_heading: pick(s2, 'heading'),
        section2_shortDescription: pick(s2, 'short_description'),
        section2_boxes,

        section3_entries,

        section4_heading: pick(s4, 'heading'),
        section4_shortDescription: pick(s4, 'short_description') || pick(s4, 'description'),
        section4_boxes,

        section5_heading: pick(s5, 'heading'),
        section5_shortDescription: pick(s5, 'short_description') || pick(s5, 'description'),
        section5_boxes,

        section6_heading: pick(s6, 'heading'),
        section6_shortDescription: pick(s6, 'short_description') || pick(s6, 'description'),
        section6_boxes,

        section7_heading: pick(s7, 'heading'),
        section7_shortDescription: pick(s7, 'short_description') || pick(s7, 'description'),
        section7_boxes,

        faqList: arrayOrEmpty(p.faqList).map((faq) => ({
            faq_title: faq.faq_title ?? faq.title ?? faq.Title ?? '',
            faq_content: faq.faq_content ?? faq.content ?? faq.Content ?? '',
        })),
        meta_title: pick(p, 'seoTitle') || pick(p, 'meta_title'),
        meta_description: pick(p, 'seoDescription') || pick(p, 'meta_description'),
        slug: pick(p, 'slug'),
        schema: pick(p, 'schema_script') || pick(p, 'schema'),
        og_title: pick(p, 'og_title'),
        og_description: pick(p, 'og_description'),
        og_image: pick(p, 'og_image'),
        og_type: pick(p, 'og_type', 'website'),
        publishedAt: p.publishedAt ?? p.published_at ?? null,
    };
}

/**
 * Map Admin ProductForm state (flat fields) back to API expected payload (structured JSON).
 */
export function mapProductFormToApi(form) {
    const stripHtml = (html) => {
        if (!html) return '';
        if (typeof html !== 'string') return html;
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const payload = {
        layout: form.layout,
        heading: form.heading,
        shortDescription: stripHtml(form.shortDescription),
        seoTitle: form.meta_title || form.seoTitle,
        seoDescription: form.meta_description || form.seoDescription,
        slug: form.slug,
        schema_script: form.schema,
        og_title: form.og_title,
        og_description: form.og_description,
        og_image: form.og_image,
        og_type: form.og_type,
        published_at: form.publishedAt || form.published_at,
    };

    const extractId = (img) => {
        if (!img) return null;
        if (typeof img === 'string') return img;
        if (img.id) return String(img.id);
        if (img._id) return String(img._id);
        return null;
    };

    payload.Image = extractId(form.image) ? [extractId(form.image)] : [];
    payload.BrandsLogo = extractId(form.brandsLogo) ? [extractId(form.brandsLogo)] : [];

    payload.section2 = {
        heading: form.section2_heading || '',
        short_description: stripHtml(form.section2_shortDescription) || '',
        section_boxes: (form.section2_boxes || []).map(box => ({
            ...box,
            description: stripHtml(box.description),
            description_back: stripHtml(box.description_back),
            icon: extractId(box.icon),
            image: extractId(box.image)
        }))
    };

    if (form.section3_entries && form.section3_entries.length > 0) {
        const s3 = form.section3_entries[0];
        payload.section3 = {
            ...s3,
            description: stripHtml(s3.description),
            image: extractId(s3.image)
        };
    } else {
        payload.section3 = null;
    }

    payload.section4 = {
        heading: form.section4_heading || '',
        short_description: stripHtml(form.section4_shortDescription) || '',
        boxes: (form.section4_boxes || []).map(box => ({
            ...box,
            description: stripHtml(box.description),
            icon: extractId(box.image) || extractId(box.icon) // Mapped to icon schema property
        }))
    };

    payload.section5 = {
        heading: form.section5_heading || '',
        short_description: stripHtml(form.section5_shortDescription) || '',
        boxes: (form.section5_boxes || []).map(box => ({
            ...box,
            short_description: stripHtml(box.short_description),
            description: stripHtml(box.description),
            icon: extractId(box.image) || extractId(box.icon)
        }))
    };

    payload.section6 = {
        heading: form.section6_heading || '',
        short_description: stripHtml(form.section6_shortDescription) || '',
        boxes: (form.section6_boxes || []).map(box => ({
            ...box,
            short_description: stripHtml(box.short_description),
            description: stripHtml(box.description),
            image: extractId(box.image)
        }))
    };

    payload.section7 = {
        heading: form.section7_heading || '',
        short_description: stripHtml(form.section7_shortDescription) || '',
        points: (form.section7_boxes || []).map(box => ({
            ...box,
            description: stripHtml(box.description),
            image: extractId(box.image)
        }))
    };

    payload.faqList = (form.faqList || []).map(faq => ({
        faq_title: stripHtml(faq.faq_title || faq.serviceFaqTitle || ''),
        faq_content: stripHtml(faq.faq_content || faq.serviceFaqDetails || '')
    }));

    return payload;
}

export default mapProductApiToForm;
