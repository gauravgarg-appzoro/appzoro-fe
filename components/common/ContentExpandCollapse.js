import React, { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import dynamic from 'next/dynamic';
import { RxArrowDown, RxArrowUp } from '../OptimizedIcons';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { rewriteLegacyWpContentUploadsToAbsolute } from '../../lib/rewriteLegacyWpMedia';

const ReactMarkdown = dynamic(() => import('react-markdown'));

const stripHtmlForDisplay = (str) => {
    if (str == null || typeof str !== 'string') return '';
    return str
        .replace(/<\/p>\s*<p[^>]*>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .trim();
};

const looksLikeHtml = (str) => /<[a-z][\s\S]*>/i.test(str || '');

const ContentExpandCollapse = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const rawInfo = (props?.info != null && typeof props.info === 'string') ? props.info : '';
    const info = useMemo(
        () => rewriteLegacyWpContentUploadsToAbsolute(rawInfo, STRAPI_IMAGE_BASE_URL),
        [rawInfo],
    );
    const dividerBelow = !!props?.dividerBelow;
    const compact = !!props?.compact;
    const isHtml = looksLikeHtml(info);
    const plainText = stripHtmlForDisplay(info);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    // SEO: render full body unconditionally so it lives in the initial SSR HTML.
    // Collapsed state only clips it visually via CSS — never excludes it from the DOM.
    const collapsedStyle = !isExpanded ? { maxHeight: 260, overflow: 'hidden' } : undefined;

    return (
        <section className={`content-about-view ${dividerBelow ? 'has-divider' : ''} ${compact ? 'compact-spacing' : ''}`}>
            <Container>
                <div className="c-about-block">
                    <div className="section-title text-start">
                        <h2>{props?.title}</h2>
                    </div>

                    {isHtml ? (
                        <div
                            className={`content-section-html ${!isExpanded ? 'collapsed' : ''}`}
                            style={collapsedStyle}
                            dangerouslySetInnerHTML={{ __html: info }}
                        />
                    ) : (
                        <div
                            className={`content-section-md ${!isExpanded ? 'collapsed' : ''}`}
                            style={collapsedStyle}
                        >
                            <ReactMarkdown>{plainText}</ReactMarkdown>
                        </div>
                    )}

                    <div className="btn-animated-height text-center">
                        <button
                            title="Read More"
                            onClick={toggleReadMore}
                            className="read-more-btn down-arrow"
                        >
                            {isExpanded ? <RxArrowUp /> : <RxArrowDown />}
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContentExpandCollapse;