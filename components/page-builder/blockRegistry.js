import dynamic from 'next/dynamic';

/**
 * Global block registry — every block is available on every page.
 * Admin picks from this list when building any page (industry, service, product, etc.).
 */
const BLOCK_TYPES = {
    // ─── Hero & Banner ───────────────────────────────────────────────
    HeroBanner: {
        label: 'Hero Banner',
        category: 'Hero & Banners',
        Component: dynamic(() => import('./blocks/HeroBannerBlock')),
        defaultProps: { title: '', subtitle: '', backgroundImage: '' },
        propsSchema: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'backgroundImage', label: 'Background Image', type: 'image' },
        ],
    },
    ServiceHeroBanner: {
        label: 'Trusted-By Logos Strip',
        category: 'Hero & Banners',
        Component: dynamic(() => import('../common/ServiceHeroBanner')),
        defaultProps: {},
        entityHint: 'Uses trusted-by / partner logo data from the service record (same as the main service form).',
    },
    ServiceAwards: {
        label: 'Awards Strip',
        category: 'Hero & Banners',
        Component: dynamic(() => import('../common/ServiceAwards')),
        defaultProps: {},
        entityHint: 'Uses awards content from the service record.',
    },
    AppDevelopmentPartners: {
        label: 'Trusted By / Partner Logos',
        category: 'Hero & Banners',
        Component: dynamic(() => import('../common/AppDevelopmentPartners')),
        defaultProps: {},
        entityHint: 'Uses partner logos from the service record.',
    },

    // ─── Content ─────────────────────────────────────────────────────
    CustomContent: {
        label: 'Custom Content Section',
        category: 'Content',
        Component: dynamic(() => import('./blocks/CustomContentBlock')),
        defaultProps: {
            title: 'Your section title',
            description: 'Add your section description here.',
            buttonText: 'Learn More',
            buttonLink: '/contact-us',
            imageUrl: '',
            imageAlt: 'Section image',
        },
        propsSchema: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'buttonText', label: 'Button Text', type: 'text' },
            { key: 'buttonLink', label: 'Button Link', type: 'url' },
            { key: 'imageUrl', label: 'Image URL', type: 'image' },
            { key: 'imageAlt', label: 'Image Alt', type: 'text' },
        ],
    },
    MarkdownContent: {
        label: 'Rich Text / Markdown',
        category: 'Content',
        Component: dynamic(() => import('./blocks/MarkdownContentBlock')),
        defaultProps: { title: '', content: '' },
        propsSchema: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'content', label: 'Content', type: 'textarea' },
        ],
    },
    ContentExpandCollapse: {
        label: 'Expandable Content (SEO)',
        category: 'Content',
        Component: dynamic(() => import('../common/ContentExpandCollapse')),
        defaultProps: { title: '', info: '', dividerBelow: false, compact: false },
        propsSchema: [
            { key: 'title', label: 'Section Title', type: 'text' },
            { key: 'info', label: 'Body (HTML or Markdown supported)', type: 'textarea' },
            { key: 'dividerBelow', label: 'Show divider below section', type: 'boolean' },
            { key: 'compact', label: 'Compact spacing', type: 'boolean' },
        ],
    },
    ServiceAboutSection: {
        label: 'About Section + CTA',
        category: 'Content',
        Component: dynamic(() => import('../common/ServiceAboutSection')),
        defaultProps: { title: '', description: '', ctaText: 'Get Started', ctaLink: '/contact-us' },
        propsSchema: [
            { key: 'title', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description (HTML)', type: 'textarea' },
            { key: 'ctaText', label: 'Button Label', type: 'text' },
            { key: 'ctaLink', label: 'Button Link', type: 'url' },
        ],
    },
    ServiceWhySection: {
        label: 'Why Choose Us (Text + List)',
        category: 'Content',
        Component: dynamic(() => import('../common/ServiceWhySection')),
        defaultProps: { title: '', subtitle: '', info: '', list: [] },
        propsSchema: [
            { key: 'title', label: 'Large Title', type: 'text' },
            { key: 'subtitle', label: 'Small Title / Eyebrow', type: 'text' },
            { key: 'info', label: 'Intro Paragraph', type: 'textarea' },
            {
                key: 'list',
                label: 'List Items',
                type: 'array',
                itemLabel: 'Item',
                itemFields: [
                    { key: 'az_diff_list_title', label: 'Item Title', type: 'text' },
                    { key: 'az_diff_list_content', label: 'Item Description', type: 'textarea' },
                ],
            },
        ],
    },

    // ─── Cards & Grids ──────────────────────────────────────────────
    FeaturesGrid: {
        label: 'Features Grid',
        category: 'Cards & Grids',
        Component: dynamic(() => import('./blocks/FeaturesGridBlock')),
        defaultProps: { title: '', subtitle: '', features: [] },
        propsSchema: [
            { key: 'title', label: 'Section Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            {
                key: 'features',
                label: 'Features',
                type: 'array',
                itemLabel: 'Feature',
                itemFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'featuresTitle', label: 'Title (alt key)', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'featuresDescription', label: 'Description (alt key)', type: 'textarea' },
                ],
            },
        ],
    },
    ServiceCardsGrid: {
        label: 'Service Cards Grid',
        category: 'Cards & Grids',
        Component: dynamic(() => import('../common/ServiceCardsGrid')),
        defaultProps: { sectionTitle: '', cards: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'cards', label: 'Cards', type: 'array', itemLabel: 'Card', itemFields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'image', label: 'Image', type: 'image' },
            ]},
        ],
    },
    ServiceFlipCards: {
        label: 'Flip Cards',
        category: 'Cards & Grids',
        Component: dynamic(() => import('../common/ServiceFlipCards')),
        defaultProps: {
            sectionTitle: 'Flip Cards Section',
            cards: [
                {
                    title: 'Sample Card',
                    description: 'Edit this card in Page Builder.',
                    iconSvg: '',
                    iconImage: '',
                    backgroundImage: '',
                },
            ],
        },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'cards', label: 'Cards', type: 'array', itemLabel: 'Card', itemFields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'iconSvg', label: 'Icon SVG (inline)', type: 'textarea' },
                { key: 'iconImage', label: 'Icon Image URL', type: 'image' },
                { key: 'backgroundImage', label: 'Background Image URL', type: 'image' },
            ]},
        ],
    },
    ServiceSlideCards: {
        label: 'Slide / Hover Cards',
        category: 'Cards & Grids',
        Component: dynamic(() => import('../common/ServiceSlideCards')),
        defaultProps: { sectionTitle: '', cards: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'cards', label: 'Cards', type: 'array', itemLabel: 'Card', itemFields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'iconImage', label: 'Icon Image', type: 'image' },
                { key: 'backgroundImage', label: 'Background Image', type: 'image' },
            ]},
        ],
    },
    ServiceWhyChooseCards: {
        label: 'Why Choose Us Cards',
        category: 'Cards & Grids',
        Component: dynamic(() => import('../common/ServiceWhyChooseCards')),
        defaultProps: { sectionTitle: '', cards: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'cards', label: 'Cards', type: 'array', itemLabel: 'Card', itemFields: [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'image', label: 'Image', type: 'image' },
            ]},
        ],
    },

    // ─── Process & Timeline ─────────────────────────────────────────
    ServiceProcessTimeline: {
        label: 'Process / Timeline Steps',
        category: 'Process & Timeline',
        Component: dynamic(() => import('../common/ServiceProcessTimeline')),
        defaultProps: { sectionTitle: '', sectionSubtitle: '', steps: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'sectionSubtitle', label: 'Section Subtitle', type: 'textarea' },
            { key: 'steps', label: 'Steps', type: 'array', itemLabel: 'Step', itemFields: [
                { key: 'stepNumber', label: 'Step Number', type: 'text' },
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
            ]},
        ],
    },

    // ─── CTA ─────────────────────────────────────────────────────────
    CTABanner: {
        label: 'CTA Banner (Simple)',
        category: 'Call to Action',
        Component: dynamic(() => import('./blocks/CTABannerBlock')),
        defaultProps: { title: '', subtitle: '', buttonText: 'Get Started', buttonLink: '/contact-us' },
        propsSchema: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'buttonText', label: 'Button Text', type: 'text' },
            { key: 'buttonLink', label: 'Button Link', type: 'url' },
        ],
    },
    ServiceCTABanner: {
        label: 'CTA Banner (with Background)',
        category: 'Call to Action',
        Component: dynamic(() => import('../common/ServiceCTABanner')),
        defaultProps: { title: '', subtitle: '', buttonText: 'Get Started', buttonLink: '/contact-us', backgroundImage: '', className: '' },
        propsSchema: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'buttonText', label: 'Button Text', type: 'text' },
            { key: 'buttonLink', label: 'Button Link', type: 'url' },
            { key: 'backgroundImage', label: 'Background Image', type: 'image' },
            { key: 'className', label: 'Class Name', type: 'text' },
        ],
    },
    TalkExpert: {
        label: 'Talk to Expert CTA',
        category: 'Call to Action',
        Component: dynamic(() => import('../common/TalkExpert')),
        defaultProps: {},
        entityHint: 'Static marketing CTA—copy and layout come from the shared TalkExpert component.',
    },
    ConnectWithExpert: {
        label: 'Connect With Expert (Form)',
        category: 'Call to Action',
        Component: dynamic(() => import('../common/ConnectWIthExpert')),
        defaultProps: {},
        entityHint: 'Lead form block—no per-block fields; uses global form configuration.',
    },

    // ─── Social Proof ────────────────────────────────────────────────
    CaseStudy: {
        label: 'Case Studies / Portfolio',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/CaseStudy')),
        defaultProps: {},
        entityHint: 'Pulls featured case studies from the site API—manage case studies in Portfolios admin.',
    },
    ClientReview: {
        label: 'Client Reviews (Light)',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/ClientReview')),
        defaultProps: {},
        entityHint: 'Loads testimonials from global content—no fields on this block.',
    },
    ServiceClientReview: {
        label: 'Client Reviews (Dark)',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/ServiceClientReview')),
        defaultProps: {},
        entityHint: 'Loads testimonials from global content—no fields on this block.',
    },
    ServicePortfolioShowcase: {
        label: 'Portfolio Showcase',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/ServicePortfolioShowcase')),
        defaultProps: {
            sectionTitle: '',
            portfolio: {
                appName: '',
                description: '',
                rating: '',
                appIcon: '',
                screenshot: '',
                appStoreLink: '',
                playStoreLink: '',
            },
        },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            {
                key: 'portfolio',
                label: 'Portfolio (app name, copy, links, images)',
                type: 'json',
                rows: 12,
                defaultJson: {
                    appName: '',
                    description: '',
                    rating: '',
                    appIcon: '',
                    screenshot: '',
                    appStoreLink: '',
                    playStoreLink: '',
                },
                helpText: 'Same shape as the service “portfolio showcase” field: appName, description, rating, appIcon, screenshot, appStoreLink, playStoreLink (paths can be Strapi /uploads/... URLs).',
            },
        ],
    },
    ServiceStatsSection: {
        label: 'Stats / Counters Section',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/ServiceStatsSection')),
        defaultProps: { title: '', subtitle: '', stats: [] },
        propsSchema: [
            { key: 'title', label: 'Title (HTML allowed)', type: 'textarea' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            {
                key: 'stats',
                label: 'Stats',
                type: 'array',
                itemLabel: 'Stat',
                itemFields: [
                    { key: 'value', label: 'Value (e.g. 500+)', type: 'text' },
                    { key: 'label', label: 'Label', type: 'text' },
                ],
            },
        ],
    },
    PressSlider: {
        label: 'Press / News Slider',
        category: 'Social Proof',
        Component: dynamic(() => import('../common/PressSlider')),
        defaultProps: {},
        entityHint: 'Press items come from global content—no per-block fields.',
    },

    // ─── Tech & Industry ─────────────────────────────────────────────
    TechStack: {
        label: 'Technology Stack (Static)',
        category: 'Technology & Industry',
        Component: dynamic(() => import('../common/TechStack')),
        defaultProps: {},
        entityHint: 'Static logo grid from the TechStack component—no block-level fields.',
    },
    ServiceTechStackTabs: {
        label: 'Tech Stack Tabs (Dynamic)',
        category: 'Technology & Industry',
        Component: dynamic(() => import('../common/ServiceTechStackTabs')),
        defaultProps: { sectionTitle: '', techStack: { categories: [] } },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title (HTML allowed)', type: 'textarea' },
            {
                key: 'techStack',
                label: 'Tech stack data',
                type: 'json',
                rows: 14,
                defaultJson: { categories: [{ name: 'Category', items: [{ name: 'Tech', logo: '' }] }] },
                helpText: 'Matches the service form: { "categories": [ { "name": "...", "items": [ { "name": "...", "logo": "/uploads/..." } ] } ] }',
            },
        ],
    },
    ServiceIndustryMarquee: {
        label: 'Industry Marquee',
        category: 'Technology & Industry',
        Component: dynamic(() => import('../common/ServiceIndustryMarquee')),
        defaultProps: { sectionTitle: '', industries: [], ctaText: '', ctaLink: '' },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title', type: 'text' },
            { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
            { key: 'ctaLink', label: 'CTA Link', type: 'url' },
            {
                key: 'industries',
                label: 'Industries (badges)',
                type: 'array',
                itemLabel: 'Industry',
                itemFields: [
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'icon', label: 'Icon Image URL', type: 'image' },
                    { key: 'iconSvg', label: 'Icon SVG (inline, optional)', type: 'textarea' },
                ],
            },
        ],
    },

    // ─── FAQ & Accordion ─────────────────────────────────────────────
    CommonFaqs: {
        label: 'FAQ Accordion (Static)',
        category: 'FAQ',
        Component: dynamic(() => import('../common/CommonFaqs')),
        defaultProps: {},
        entityHint: 'Uses built-in static FAQ content—no block fields.',
    },
    ServiceFaqs: {
        label: 'FAQ Accordion (Dynamic)',
        category: 'FAQ',
        Component: dynamic(() => import('../common/ServiceFaqs')),
        defaultProps: { faqData: [] },
        propsSchema: [
            {
                key: 'faqData',
                label: 'FAQ items',
                type: 'array',
                itemLabel: 'FAQ',
                itemFields: [
                    { key: 'serviceFaqTitle', label: 'Question', type: 'text' },
                    { key: 'serviceFaqDetails', label: 'Answer (Markdown)', type: 'textarea' },
                ],
            },
        ],
    },
    ServiceBenefitsAccordion: {
        label: 'Benefits Accordion',
        category: 'FAQ',
        Component: dynamic(() => import('../common/ServiceBenefitsAccordion')),
        defaultProps: { sectionTitle: '', benefits: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title (HTML allowed)', type: 'textarea' },
            {
                key: 'benefits',
                label: 'Benefits',
                type: 'array',
                itemLabel: 'Benefit',
                itemFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    ServiceCategoryFAQ: {
        label: 'FAQ by Category',
        category: 'FAQ',
        Component: dynamic(() => import('../common/ServiceCategoryFAQ')),
        defaultProps: { sectionTitle: '', categories: [] },
        propsSchema: [
            { key: 'sectionTitle', label: 'Section Title (HTML allowed)', type: 'textarea' },
            {
                key: 'categories',
                label: 'Categories & FAQs (JSON array)',
                type: 'json',
                rows: 16,
                defaultJson: [{ name: 'Category', faqs: [{ question: '', answer: '' }] }],
                helpText: 'Array of { "name": "Tab name", "faqs": [ { "question": "...", "answer": "..." } ] } — matches the service FAQ-by-category field.',
            },
        ],
    },

    // ─── Blog & Articles ─────────────────────────────────────────────
    ArticlesView: {
        label: 'Latest Articles Carousel',
        category: 'Blog & Articles',
        Component: dynamic(() => import('../common/ArticlesView')),
        defaultProps: {},
        entityHint: 'Loads latest blog posts from the API—no block-level fields.',
    },

    // ─── Locations ───────────────────────────────────────────────────
    LocationsSlide: {
        label: 'Locations Slider',
        category: 'Locations',
        Component: dynamic(() => import('../common/LocationsSlide')),
        defaultProps: {},
        entityHint: 'Office locations from global content—no block fields.',
    },

    // ─── Entity-Aware Blocks (read from postData via context) ────────
    ServiceHero: {
        label: 'Service Hero Banner',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ServiceHeroBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses service banner, title, and short description from the main service form (same fields as legacy layout).',
    },
    ServiceHeroSection: {
        label: 'Service Hero Section (Combined)',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ServiceHeroSectionBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses hero banner, about strip, and partner logos from the service record—edit those sections on the main form.',
    },
    ServiceParentServices: {
        label: 'Parent Services Carousel',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ServiceParentServicesBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses parent services list and title from the service form.',
    },
    ServiceExpertiseTabs: {
        label: 'Service Expertise Tabs',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ServiceExpertiseTabsBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses expertise tabs, section title, and media from the service form.',
    },
    IndustryCTA: {
        label: 'Industry CTA Section',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.IndustryCTABlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses industry CTA image from the industry form (copy is fixed in the component).',
    },
    IndustryDetailContent: {
        label: 'Industry Detail Content',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.IndustryDetailContentBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses “Industry detail content” markdown from the industry form.',
    },
    IndustryWhyChoose: {
        label: 'Industry Why Choose + Features',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.IndustryWhyChooseBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses why-choose title, description, and feature cards from the industry form.',
    },
    OtherIndustries: {
        label: 'Other Industries Grid',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.OtherIndustriesBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Lists other industries from the API (excludes current slug). No extra fields.',
    },
    ProductHero: {
        label: 'Product Hero Banner',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ProductHeroBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses product heading, short description, and banner image from the product form.',
    },
    ProductBrands: {
        label: 'Product Client Logos',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ProductBrandsBlock }))),
        defaultProps: {},
        entityAware: true,
        entityHint: 'Uses “Brands logo” from the product form.',
    },
    ProductSection: {
        label: 'Product Section (Generic)',
        category: 'Page Sections',
        Component: dynamic(() => import('./blocks/EntityBlock').then(m => ({ default: m.ProductSectionBlock }))),
        defaultProps: { sectionKey: '' },
        entityAware: true,
        entityHint: 'Renders one product JSON section (section2–section8, section3, section7, etc.) from the product record. Set the key below; edit section content on the main product form.',
        propsSchema: [
            {
                key: 'sectionKey',
                label: 'Section key on product',
                type: 'text',
                helpText: 'Examples: section2, section3, section4, section5, section6, section7, section8 — must match a populated field on the product.',
            },
        ],
    },
};

/** Get all block types (global — no filtering) */
export function getAllBlocks() {
    return Object.entries(BLOCK_TYPES).map(([type, meta]) => ({ type, ...meta }));
}

/** Get blocks grouped by category */
export function getBlockCategories() {
    const blocks = getAllBlocks();
    const cats = {};
    blocks.forEach((b) => {
        if (!cats[b.category]) cats[b.category] = [];
        cats[b.category].push(b);
    });
    return cats;
}

/** Whitelist of valid type strings */
export const VALID_BLOCK_TYPES = Object.keys(BLOCK_TYPES);

export default BLOCK_TYPES;
