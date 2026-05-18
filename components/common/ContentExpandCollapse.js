import React, { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import dynamic from 'next/dynamic';
import { RxArrowDown, RxArrowUp } from '../OptimizedIcons';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { rewriteLegacyWpContentUploadsToAbsolute } from '../../lib/rewriteLegacyWpMedia';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

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
    const previewText = plainText.substring(0, 400);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className={`content-about-view ${dividerBelow ? 'has-divider' : ''} ${compact ? 'compact-spacing' : ''}`}>
            <Container>
                <div className="c-about-block">
                    <div className="section-title text-start">
                        <h2>{props?.title}</h2>
                    </div>

                    {/* Collapsed view: short preview */}
                    {!isExpanded && (
                        isHtml ? (
                            <div
                                className="content-section-html collapsed"
                                style={{ maxHeight: 260, overflow: 'hidden' }}
                                dangerouslySetInnerHTML={{ __html: info }}
                            />
                        ) : (
                            <ReactMarkdown>
                                {previewText}
                            </ReactMarkdown>
                        )
                    )}

                    {/* Expanded view: full content with formatting */}
                    {isExpanded && (
                        isHtml ? (
                            <div
                                className="content-section-html"
                                dangerouslySetInnerHTML={{ __html: info }}
                            />
                        ) : (
                            <ReactMarkdown>{plainText}</ReactMarkdown>
                        )
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