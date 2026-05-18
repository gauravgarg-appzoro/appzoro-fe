import React from 'react';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Image from 'next/image';
import ContactHref from '../../common/ContactHref';
import { LuMoveRight, LiaIndustrySolid } from '../../OptimizedIcons';
import ServiceHeroBanner from '../../common/ServiceHeroBanner';
import AppDevelopmentPartners from '../../common/AppDevelopmentPartners';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

/**
 * Entity-aware blocks that read from postData via context.
 * Each sub-component renders the exact same markup as the legacy page sections.
 */

// ─── Service-specific blocks ─────────────────────────────────────────

export function ServiceHeroBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData) return null;
    const hasModernAbout = !!(postData.serviceAboutTitle || postData.serviceAboutDescription || postData.templateType === 'modern');
    return (
        <section className={`page-title service-page-banner${hasModernAbout ? ' ai-hero-section' : ''}`} style={{ position: 'relative' }}>
            <Image
                src={`${STRAPI_IMAGE_BASE_URL}${postData.serviceBanner?.formats?.large?.url || postData.serviceBanner?.formats?.medium?.url || postData.serviceBanner?.url || ''}`}
                alt={postData.serviceTitle || 'Service Banner'}
                fill priority sizes="100vw"
                style={{ objectFit: 'cover', zIndex: -1 }}
            />
            <Container>
                <Row className="align-items-center justify-content-center">
                    <Col lg="10" md="12">
                        <div className="page-section-title service-title text-center">
                            <h1>{postData.serviceTitle}</h1>
                            <p>{postData.ServiceShortDescription || ''}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export function ServiceHeroSectionBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData) return null;
    const hasModernAbout = !!(postData.serviceAboutTitle || postData.serviceAboutDescription || postData.templateType === 'modern');
    return (
        <>
            <section className={`page-title service-page-banner${hasModernAbout ? ' ai-hero-section' : ''}`} style={{ position: 'relative' }}>
                <Image
                    src={`${STRAPI_IMAGE_BASE_URL}${postData.serviceBanner?.formats?.large?.url || postData.serviceBanner?.formats?.medium?.url || postData.serviceBanner?.url || ''}`}
                    alt={postData.serviceTitle || 'Service Banner'}
                    fill priority sizes="100vw"
                    style={{ objectFit: 'cover', zIndex: -1 }}
                />
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col lg="10" md="12">
                            <div className="page-section-title service-title text-center">
                                <h1>{postData.serviceTitle}</h1>
                                <p>{postData.ServiceShortDescription || ''}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {hasModernAbout && <div className="pt-4"><ServiceHeroBanner /></div>}
            <div className="pt-2"><AppDevelopmentPartners /></div>
        </>
    );
}

export function ServiceParentServicesBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData?.parentServices?.length) return null;
    return (
        <section id="services" className="services-views">
            <Container>
                <div className="section-title">
                    <h3>{postData.parentServiceTitle || 'Our Services'}</h3>
                </div>
                <Row>
                    {postData.parentServices.map((srv) => (
                        <Col md="4" xs="12" key={srv.id || srv.name} className="mb-4">
                            <div className="services-box p-3 border rounded h-100">
                                {srv.mediaItem?.[0]?.url && (
                                    <Image src={`${STRAPI_IMAGE_BASE_URL}${srv.mediaItem[0].url}`} width={80} height={80} alt={srv.name || ''} />
                                )}
                                <h4>{srv.name}</h4>
                                <p>{srv.content}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export function ServiceExpertiseTabsBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData?.serviceTab?.length) return null;
    const [activeTab, setActiveTab] = React.useState(0);
    const tab = postData.serviceTab[activeTab];
    return (
        <section id="expertiese" className="service-tabs-view">
            <Container>
                {postData.serviceTabSectionTitlte && (
                    <div className="section-title text-center">
                        <h3>{postData.serviceTabSectionTitlte}</h3>
                        {postData.serviceTabSectionSubTitle && <p>{postData.serviceTabSectionSubTitle}</p>}
                    </div>
                )}
                <Row>
                    <Col md="4">
                        <ul className="nav flex-column service-tab-nav">
                            {postData.serviceTab.map((t, i) => (
                                <li key={t.id || i} className={`nav-item${i === activeTab ? ' active' : ''}`}>
                                    <button className="nav-link" onClick={() => setActiveTab(i)}>{t.name}</button>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col md="8">
                        {tab && (
                            <div className="service-tab-content">
                                {tab.mediaItem?.[0]?.url && (
                                    <Image src={`${STRAPI_IMAGE_BASE_URL}${tab.mediaItem[0].url}`} width={600} height={400} alt={tab.name || ''} style={{ width: '100%', height: 'auto' }} />
                                )}
                                <div className="mt-3"><ReactMarkdown>{tab.content || ''}</ReactMarkdown></div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

// ─── Industry-specific blocks ────────────────────────────────────────

export function IndustryCTABlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData) return null;
    return (
        <section className="ind-cta">
            <Container>
                <Row>
                    <Col md="5" xs="12">
                        <div className="ind-cta-view">
                            <h3>We Were Part of Their Stories</h3>
                            <p>Let&apos;s build a Better Future together.</p>
                            <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                                Talk with Expert <span><LuMoveRight /></span>
                            </ContactHref>
                        </div>
                    </Col>
                    <Col md="7" xs="12">
                        <div className="ind-cta-img">
                            <Image
                                src={postData.industryCTAImage?.url ? `${STRAPI_IMAGE_BASE_URL}${postData.industryCTAImage.url}` : '/assets/images/ind-detail.png'}
                                width={709} height={351} alt="Appzoro Industry"
                                sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export function IndustryDetailContentBlock({ postData }) {
    if (!postData?.industryDetailContent) return null;
    return (
        <section className="ind-detail-content">
            <Container>
                <ReactMarkdown>{postData.industryDetailContent}</ReactMarkdown>
            </Container>
        </section>
    );
}

export function IndustryWhyChooseBlock({ postData }) {
    if (!postData) return null;
    return (
        <section className="why-az-industry">
            <Container>
                <div className="why-ind-az-content">
                    <h3>{postData.whyChooseIndustryTitle}</h3>
                    <ReactMarkdown>{postData.whyChooseIndustryDescription || ''}</ReactMarkdown>
                </div>
                {Array.isArray(postData.industryFeatures) && postData.industryFeatures.length > 0 && (
                    <div className="why-ind-az-content-box">
                        <Row>
                            {postData.industryFeatures.map((item, index) => (
                                <Col md="3" xs="12" key={item?.id || index}>
                                    <div className="ind-box-counter">
                                        <h5>0{index + 1}</h5>
                                        <h3>{item?.featuresTitle}</h3>
                                        <ReactMarkdown>{item?.featuresDescription || ''}</ReactMarkdown>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </Container>
        </section>
    );
}

export function OtherIndustriesBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    const [catData, setCatData] = React.useState([]);
    const REACT_APP_API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    React.useEffect(() => {
        if (!postData?.slug) return;
        fetch(`${REACT_APP_API_URL.replace(/\/$/, '')}/induustries`)
            .then(r => r.json())
            .then(data => setCatData(Array.isArray(data) ? data.filter(i => i.slug !== postData.slug) : []))
            .catch(() => {});
    }, [postData?.slug, REACT_APP_API_URL]);
    if (!catData.length) return null;
    return (
        <section className="why-az-industry">
            <Container>
                <div className="why-ind-az-content-box-type2 mt-4">
                    <div className="section-title"><h3>Other Industries We Serve</h3></div>
                    <Row>
                        {catData.map((item, index) => (
                            <Col md="4" xs="12" key={index}>
                                <div className="ind-box-type2">
                                    {item.industryIcon ? (
                                        <Image src={`${STRAPI_IMAGE_BASE_URL}${item.industryIcon?.url || ''}`} width={72} height={74} alt={item.slug} sizes="(max-width: 768px) 50vw, 100px" />
                                    ) : (<LiaIndustrySolid />)}
                                    <h3>{item.Title}</h3>
                                    <Link href={`/industry/${item?.slug}`} className="btn-style-arrow me-3">
                                        Explore <span><LuMoveRight /></span>
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
}

// ─── Product-specific blocks ─────────────────────────────────────────

export function ProductHeroBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData) return null;
    const heading = postData.heading || '';
    const words = heading.split(' ').filter(Boolean);
    const firstTwo = words.slice(0, 2).join(' ');
    const rest = words.slice(2).join(' ') || '';
    const bannerSrc = postData.LocalBannerPath
        ? postData.LocalBannerPath
        : postData.Image?.url ? `${STRAPI_IMAGE_BASE_URL}${postData.Image.url}` : null;
    return (
        <section className="product-banner">
            <Container>
                <Row className="align-items-center">
                    <Col xs="12" md="7">
                        <div className="product-banner-info">
                            <h1><span>{firstTwo}</span> <br />{rest}</h1>
                            <p>{postData.shortDescription}</p>
                            <ContactHref href="/contact-us" className="btn-style-arrow me-3">
                                Get Free Consultation <span><LuMoveRight /></span>
                            </ContactHref>
                        </div>
                    </Col>
                    <Col xs="12" md="5">
                        {bannerSrc && (
                            <div className="product-banner-img text-center">
                                <Image src={bannerSrc} width={500} height={500} alt={heading} priority sizes="(max-width: 768px) 100vw, 40vw" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export function ProductBrandsBlock({ postData, STRAPI_IMAGE_BASE_URL = '' }) {
    if (!postData?.BrandsLogo?.length) return null;
    return (
        <section className="clients">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 py-3">
                    {postData.BrandsLogo.map((logo, i) => (
                        <Image key={i} src={`${STRAPI_IMAGE_BASE_URL}${logo.url}`} width={150} height={60} alt={logo.alternativeText || logo.name || 'Partner'} style={{ objectFit: 'contain' }} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export function ProductSectionBlock({ postData, STRAPI_IMAGE_BASE_URL = '', sectionKey = '' }) {
    if (!postData || !sectionKey) return null;
    const layout = postData.layout || 'layout_1';
    const section = postData[sectionKey];
    if (!section) return null;

    const imgUrl = (media) => {
        const p = media?.url;
        if (!p) return '';
        const base = (STRAPI_IMAGE_BASE_URL || '').replace(/\/$/, '');
        return base ? `${base}${p.startsWith('/') ? p : '/' + p}` : p;
    };

    if (sectionKey === 'section3') {
        const desc = (section.description || '').replace(/\/uploads/g, `${STRAPI_IMAGE_BASE_URL}/uploads`);
        return (
            <section className="why-services" id="whyChooseAz">
                <Container>
                    <Row className="align-items-center">
                        <Col md="6">
                            {section.sub_heading && <p className="sub-heading">{section.sub_heading}</p>}
                            <h3>{section.heading}</h3>
                            <div dangerouslySetInnerHTML={{ __html: desc }} />
                        </Col>
                        <Col md="6">
                            {section.image?.url && (
                                <Image src={imgUrl(section.image)} width={600} height={400} alt={section.heading || ''} style={{ width: '100%', height: 'auto' }} />
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }

    if (sectionKey === 'section7') {
        return (
            <section className="container py-5">
                <div className="section-title text-center">
                    <h3>{section.heading}</h3>
                    {section.short_description && <p>{section.short_description}</p>}
                </div>
                <Row className="mt-4">
                    {layout === 'layout_1' && section.image?.url && (
                        <Col md="5"><Image src={imgUrl(section.image)} width={500} height={400} alt={section.heading || ''} style={{ width: '100%', height: 'auto' }} /></Col>
                    )}
                    <Col md={layout === 'layout_1' && section.image?.url ? '7' : '12'}>
                        {(section.points || []).map((pt, i) => (
                            <div key={i} className="mb-3 d-flex gap-3">
                                {layout === 'layout_2' && pt.image?.url && (
                                    <Image src={imgUrl(pt.image)} width={60} height={60} alt={pt.title || ''} />
                                )}
                                <div>
                                    <h5>{pt.title}</h5>
                                    <p className="text-muted">{pt.description}</p>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </section>
        );
    }

    const boxes = section.boxes || section.section_boxes || [];
    return (
        <section className="py-5">
            <Container>
                <div className="section-title text-center">
                    <h3>{section.heading}</h3>
                    {section.short_description && <p>{section.short_description}</p>}
                </div>
                <Row className="mt-4">
                    {boxes.map((box, i) => (
                        <Col md="4" xs="12" key={i} className="mb-4">
                            <div className="p-3 border rounded h-100">
                                {(box.icon?.url || box.image?.url) && (
                                    <Image src={imgUrl(box.icon || box.image)} width={60} height={60} alt={box.heading || box.title || ''} className="mb-2" />
                                )}
                                <h5>{box.heading || box.title || ''}</h5>
                                <p className="text-muted small">{box.description || box.short_description || box.description_back || ''}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
