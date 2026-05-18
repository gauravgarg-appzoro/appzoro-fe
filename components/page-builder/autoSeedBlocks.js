/**
 * Auto-seed pageBlocks from existing entity data.
 * When an entity has no pageBlocks yet, this generates a block array
 * matching the current legacy section order — so the admin sees the
 * existing layout as draggable, deletable, reorderable blocks.
 */

let _counter = 0;
function blockId() {
    return `seed_${Date.now().toString(36)}_${(++_counter).toString(36)}`;
}

// ─── Industry ────────────────────────────────────────────────────────

export function seedIndustryBlocks(data) {
    if (!data) return [];
    const blocks = [];

    // Hero
    if (data.Title || data.banner_image) {
        blocks.push({
            id: blockId(),
            type: 'HeroBanner',
            props: {
                title: data.Title || '',
                subtitle: data.bannerShortDescription || '',
                backgroundImage: data.banner_image?.url || '',
            },
        });
    }

    // Industry CTA
    blocks.push({ id: blockId(), type: 'IndustryCTA', props: {} });

    // Detail content
    if (data.industryDetailContent) {
        blocks.push({ id: blockId(), type: 'IndustryDetailContent', props: {} });
    }

    // Why choose + features
    if (data.whyChooseIndustryTitle || data.industryFeatures?.length) {
        blocks.push({ id: blockId(), type: 'IndustryWhyChoose', props: {} });
    }

    // Other Industries
    blocks.push({ id: blockId(), type: 'OtherIndustries', props: {} });

    // Shared bottom sections
    blocks.push({ id: blockId(), type: 'CaseStudy', props: {} });
    blocks.push({ id: blockId(), type: 'TechStack', props: {} });
    blocks.push({ id: blockId(), type: 'ClientReview', props: {} });
    blocks.push({ id: blockId(), type: 'ArticlesView', props: {} });
    blocks.push({ id: blockId(), type: 'TalkExpert', props: {} });

    return blocks;
}

// ─── Service ─────────────────────────────────────────────────────────

export function seedServiceBlocks(data) {
    if (!data) return [];
    const blocks = [];
    const isModern = data.templateType === 'modern';
    const hasModernAbout = !!(data.serviceAboutTitle || data.serviceAboutDescription || isModern);

    // Combined hero section (banner + trusted-by + partner logos)
    blocks.push({ id: blockId(), type: 'ServiceHeroSection', props: {} });

    // About section
    if (hasModernAbout) {
        blocks.push({
            id: blockId(),
            type: 'ServiceAboutSection',
            props: {
                title: data.serviceAboutTitle || data.serviceInfoTitle || '',
                description: data.serviceAboutDescription || data.serviceInfoDescription || '',
                ctaText: data.serviceAboutCtaText || "Let's Talk",
                ctaLink: data.serviceAboutCtaLink || '/contact-us',
            },
        });
    }

    // Parent services
    if (data.parentServices?.length) {
        blocks.push({ id: blockId(), type: 'ServiceParentServices', props: {} });
    }

    // Why AZ (non-modern)
    if (!hasModernAbout && data.serviceInfoTitle) {
        blocks.push({
            id: blockId(),
            type: 'ServiceWhySection',
            props: {
                title: data.serviceInfoTitle || '',
                subtitle: '',
                info: data.serviceInfoDescription || '',
                list: [],
            },
        });
    }

    // Expertise tabs
    if (data.serviceTab?.length) {
        blocks.push({ id: blockId(), type: 'ServiceExpertiseTabs', props: {} });
    }

    // Service cards grid
    if (data.serviceCards?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceCardsGrid',
            props: { sectionTitle: data.serviceCardsTitle || '', cards: data.serviceCards },
        });
    }

    // CTA banner 1
    if (data.ctaSections?.[0]) {
        const cta = data.ctaSections[0];
        blocks.push({
            id: blockId(),
            type: 'ServiceCTABanner',
            props: {
                title: cta.title || '',
                subtitle: cta.subtitle || '',
                buttonText: cta.buttonText || 'Get Started',
                buttonLink: cta.buttonLink || '/contact-us',
                backgroundImage: cta.backgroundImage || '',
            },
        });
    }

    // Flip cards
    if (data.flipCards?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceFlipCards',
            props: { sectionTitle: data.flipCardsTitle || '', cards: data.flipCards },
        });
    }

    // Slide cards
    if (data.slideCards?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceSlideCards',
            props: { sectionTitle: data.slideCardsTitle || '', cards: data.slideCards },
        });
    }

    // Awards
    blocks.push({ id: blockId(), type: 'ServiceAwards', props: {} });

    // CTA banner 2
    if (data.ctaSections?.[1]) {
        const cta = data.ctaSections[1];
        blocks.push({
            id: blockId(),
            type: 'ServiceCTABanner',
            props: {
                title: cta.title || '',
                subtitle: cta.subtitle || '',
                buttonText: cta.buttonText || 'Get Started',
                buttonLink: cta.buttonLink || '/contact-us',
                backgroundImage: cta.backgroundImage || '',
                className: 'ai-cta-market-section',
            },
        });
    }

    // Process timeline
    if (data.processSteps?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceProcessTimeline',
            props: {
                sectionTitle: data.processSectionTitle || '',
                sectionSubtitle: data.processSectionSubtitle || '',
                steps: data.processSteps,
            },
        });
    }

    // Why choose cards
    if (data.whyChooseCards?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceWhyChooseCards',
            props: { sectionTitle: data.whyChooseTitle || '', cards: data.whyChooseCards },
        });
    }

    // Industry marquee
    if (data.industries?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceIndustryMarquee',
            props: {
                sectionTitle: data.industriesTitle || '',
                industries: data.industries,
                ctaText: 'Get Started',
                ctaLink: '/contact-us',
            },
        });
    }

    // CTA banner 3
    if (data.ctaSections?.[2]) {
        const cta = data.ctaSections[2];
        blocks.push({
            id: blockId(),
            type: 'ServiceCTABanner',
            props: {
                title: cta.title || '',
                subtitle: cta.subtitle || '',
                buttonText: cta.buttonText || 'Get Started',
                buttonLink: cta.buttonLink || '/contact-us',
                backgroundImage: cta.backgroundImage || '',
                className: 'ai-lost-potential-cta',
            },
        });
    }

    // Case study
    blocks.push({ id: blockId(), type: 'CaseStudy', props: {} });

    // Stats + reviews
    if (data.statsSection) {
        blocks.push({
            id: blockId(),
            type: 'ServiceStatsSection',
            props: {
                title: data.statsSection.title || '',
                subtitle: data.statsSection.subtitle || '',
                stats: data.statsSection.stats || [],
            },
        });
    }
    blocks.push({ id: blockId(), type: 'ServiceClientReview', props: {} });

    // Tech stack tabs
    if (data.techStackTabs) {
        blocks.push({
            id: blockId(),
            type: 'ServiceTechStackTabs',
            props: { sectionTitle: 'Our Tech Stack', techStack: data.techStackTabs },
        });
    }

    // Benefits accordion
    if (data.benefitsAccordion?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceBenefitsAccordion',
            props: { sectionTitle: data.benefitsTitle || '', benefits: data.benefitsAccordion },
        });
    }

    // Category FAQ
    if (data.faqCategories?.categories?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceCategoryFAQ',
            props: {
                sectionTitle: data.faqCategories.title || 'Frequently Asked Questions',
                categories: data.faqCategories.categories,
            },
        });
    }

    // Content expand/collapse sections
    const contentSections = data.content_sections || [];
    if (contentSections.length) {
        contentSections.forEach((cs) => {
            if (cs.title || cs.info || cs.content_section_title || cs.content_section_info) {
                blocks.push({
                    id: blockId(),
                    type: 'ContentExpandCollapse',
                    props: {
                        title: cs.title || cs.content_section_title || '',
                        info: cs.info || cs.content_section_info || '',
                    },
                });
            }
        });
    } else if (data.content_section_title && data.content_section_info) {
        blocks.push({
            id: blockId(),
            type: 'ContentExpandCollapse',
            props: { title: data.content_section_title, info: data.content_section_info },
        });
    }

    // Non-modern fallbacks
    if (!data.techStackTabs) {
        blocks.push({ id: blockId(), type: 'TechStack', props: {} });
    }

    // Connect with expert
    blocks.push({ id: blockId(), type: 'ConnectWithExpert', props: {} });

    // Why Appzoro diff
    if (data.az_diff_list?.length && (data.az_diff_title || data.az_diff_subtitle || data.az_diff_info)) {
        blocks.push({
            id: blockId(),
            type: 'ServiceWhySection',
            props: {
                title: data.az_diff_title || '',
                subtitle: data.az_diff_subtitle || '',
                info: data.az_diff_info || '',
                list: data.az_diff_list,
            },
        });
    }

    // Legacy FAQs
    if (!data.faqCategories?.categories?.length && data.servicesFaqsList?.length) {
        blocks.push({
            id: blockId(),
            type: 'ServiceFaqs',
            props: { faqData: data.servicesFaqsList },
        });
    }

    blocks.push({ id: blockId(), type: 'ArticlesView', props: {} });
    blocks.push({ id: blockId(), type: 'TalkExpert', props: {} });

    return blocks;
}

// ─── Product ─────────────────────────────────────────────────────────

export function seedProductBlocks(data) {
    if (!data) return [];
    const blocks = [];

    // Hero
    blocks.push({ id: blockId(), type: 'ProductHero', props: {} });

    // Brands carousel
    if (data.BrandsLogo?.length) {
        blocks.push({ id: blockId(), type: 'ProductBrands', props: {} });
    }

    // Section-based blocks
    const sectionKeys = ['section2', 'section2_layout2', 'section3', 'section4', 'section5', 'section5_layout2', 'section6', 'section7'];
    sectionKeys.forEach((key) => {
        if (data[key] && (data[key].heading || data[key].boxes?.length || data[key].points?.length)) {
            blocks.push({ id: blockId(), type: 'ProductSection', props: { sectionKey: key } });
        }
    });

    // Shared bottom sections
    blocks.push({ id: blockId(), type: 'CaseStudy', props: {} });
    blocks.push({ id: blockId(), type: 'TechStack', props: {} });
    blocks.push({ id: blockId(), type: 'ClientReview', props: {} });

    if (data.faqList?.length) {
        blocks.push({ id: blockId(), type: 'ServiceFaqs', props: { faqData: data.faqList } });
    }

    blocks.push({ id: blockId(), type: 'ArticlesView', props: {} });
    blocks.push({ id: blockId(), type: 'TalkExpert', props: {} });

    return blocks;
}

// ─── Portfolio ───────────────────────────────────────────────────────
export function seedPortfolioBlocks(data) {
    if (!data) return [];
    const blocks = [];

    if (data.Title || data.Banner_Image?.url) {
        blocks.push({
            id: blockId(),
            type: 'HeroBanner',
            props: {
                title: data.Title || '',
                subtitle: data.Banner_short_description || '',
                backgroundImage: data.Banner_Image?.url || '',
            },
        });
    }

    if (data.intro_content) {
        blocks.push({ id: blockId(), type: 'MarkdownContent', props: { title: data.subtitle || '', content: data.intro_content } });
    }

    if (data.content_section_info || data.content_section_title) {
        blocks.push({
            id: blockId(),
            type: 'ContentExpandCollapse',
            props: { title: data.content_section_title || '', info: data.content_section_info || '' },
        });
    }

    blocks.push({ id: blockId(), type: 'CaseStudy', props: {} });
    blocks.push({ id: blockId(), type: 'TalkExpert', props: {} });
    return blocks;
}

/**
 * Main entry point — auto-seed based on page type.
 * @param {'industry'|'service'|'product'} pageType
 * @param {object} entityData — the full entity data from the API
 * @returns {Array} pageBlocks array
 */
export default function autoSeedBlocks(pageType, entityData) {
    switch (pageType) {
        case 'industry': return seedIndustryBlocks(entityData);
        case 'service': return seedServiceBlocks(entityData);
        case 'product': return seedProductBlocks(entityData);
        case 'portfolio': return seedPortfolioBlocks(entityData);
        default: return [];
    }
}
