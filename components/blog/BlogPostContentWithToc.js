import React, { useMemo, useEffect, useRef } from 'react';
import { useContactModal } from '../../contexts/ContactModalContext';
import dynamic from 'next/dynamic';
import {
    slugify,
    extractMarkdownHeadings,
    processHtmlHeadings,
    getTextFromReactNode,
    decodeHtmlEntities,
} from '../../lib/blogHeadings';
import { rewriteLegacyWpContentUploadsToRelative } from '../../lib/rewriteLegacyWpMedia';
import { sanitizeBlogBodyHtml } from '../../lib/sanitizeBlogBodyHtml';

const ReactMarkdown = dynamic(() => import('react-markdown'));

const SCROLL_OFFSET = 96;

function scrollToId(id) {
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}

function buildTocTree(headings) {
    const root = { level: 0, children: [] };
    const stack = [root];

    for (const h of headings || []) {
        const item = { ...h, children: [] };
        while (stack.length > 1 && h.level <= stack[stack.length - 1].level) {
            stack.pop();
        }
        stack[stack.length - 1].children.push(item);
        stack.push(item);
    }

    return root.children;
}

// SEO: TOC links must be real <a href="#id"> anchors, not <button>s. Google uses
// in-page anchor links to generate Sitelinks / "Jump to section" rows in SERPs,
// and users expect right-click → Copy Link Address and Cmd/Ctrl+click → new tab
// to work for navigation. We still hijack the plain left-click for smooth scroll
// (and for parents, to expand children) — but only when no modifier keys are
// held, so all native browser semantics still work.
function handleTocAnchorClick(e, onActivate) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onActivate();
}

function TocItems({ nodes, expandedIds, onToggleExpand, onParentTitleClick }) {
    if (!nodes?.length) return null;
    return (
        <ul className="blog-toc-list">
            {nodes.map((node) => {
                const hasKids = node.children?.length > 0;
                const expanded = hasKids && expandedIds.has(node.id);
                const href = `#${node.id}`;
                return (
                    <li
                        key={node.id}
                        className={`blog-toc-item blog-toc-level-${node.level}`}
                    >
                        <div className="blog-toc-row">
                            <a
                                href={href}
                                className="blog-toc-link"
                                onClick={(e) =>
                                    handleTocAnchorClick(e, () => {
                                        if (hasKids) {
                                            onParentTitleClick(node.id);
                                        } else {
                                            scrollToId(node.id);
                                        }
                                    })
                                }
                            >
                                {decodeHtmlEntities(node.text)}
                            </a>
                            {hasKids ? (
                                <button
                                    type="button"
                                    className={`blog-toc-chevron${expanded ? ' blog-toc-chevron--open' : ''}`}
                                    aria-expanded={expanded}
                                    aria-label={expanded ? 'Collapse section' : 'Expand section'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onToggleExpand(node.id);
                                    }}
                                >
                                    <span className="blog-toc-chevron-icon" aria-hidden />
                                </button>
                            ) : (
                                <span className="blog-toc-chevron-spacer" aria-hidden />
                            )}
                        </div>
                        {hasKids && expanded && (
                            <div className="blog-toc-children">
                                <TocItems
                                    nodes={node.children}
                                    expandedIds={expandedIds}
                                    onToggleExpand={onToggleExpand}
                                    onParentTitleClick={onParentTitleClick}
                                />
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

function BlogTocNav({ headings }) {
    const [open, setOpen] = React.useState(true);
    const [expandedIds, setExpandedIds] = React.useState(() => new Set());

    if (!headings?.length) return null;

    const tree = useMemo(() => buildTocTree(headings), [headings]);

    const onToggleExpand = React.useCallback((id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    const onParentTitleClick = React.useCallback((id) => {
        setExpandedIds((prev) => new Set(prev).add(id));
        scrollToId(id);
    }, []);

    return (
        <nav className="blog-toc" aria-label="Table of contents">
            <div className="blog-toc-header">
                <h2 className="blog-toc-title">Table of contents</h2>
                <button
                    type="button"
                    className="blog-toc-toggle"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                >
                    {open ? 'Hide' : 'Show'}
                </button>
            </div>
            {open && (
                <TocItems
                    nodes={tree}
                    expandedIds={expandedIds}
                    onToggleExpand={onToggleExpand}
                    onParentTitleClick={onParentTitleClick}
                />
            )}
        </nav>
    );
}

/**
 * Shared model for TOC + body (used by 3-column layout or stacked default).
 */
export function useBlogPostContentModel(content, isHtml, strapiUploadsBase) {
    const prepared = useMemo(() => {
        const raw = sanitizeBlogBodyHtml(rewriteLegacyWpContentUploadsToRelative(content || ''));
        return raw.replace(
            /\/uploads/g,
            `${strapiUploadsBase}/uploads`,
        );
    }, [content, strapiUploadsBase]);

    const htmlBlock = useMemo(() => {
        if (!isHtml) return null;
        return processHtmlHeadings(prepared);
    }, [isHtml, prepared]);

    const mdHeadings = useMemo(() => {
        if (isHtml) return [];
        return extractMarkdownHeadings(prepared);
    }, [isHtml, prepared]);

    const mdComponents = useMemo(() => {
        if (isHtml) return {};
        let c = 0;
        const list = mdHeadings;
        const make = (level) => (props) => {
            const item = list[c];
            let id;
            if (item && item.level === level) {
                id = item.id;
                c += 1;
            } else {
                id = slugify(getTextFromReactNode(props.children));
            }
            const Tag = `h${level}`;
            return <Tag {...props} id={id} />;
        };
        return {
            h1: make(1),
            h2: make(2),
            h3: make(3),
            h4: make(4),
            h5: make(5),
            h6: make(6),
        };
    }, [isHtml, mdHeadings]);

    const headings = isHtml ? htmlBlock?.headings || [] : mdHeadings;

    return { prepared, htmlBlock, mdComponents, headings, isHtml };
}

export function BlogPostToc({ headings }) {
    return <BlogTocNav headings={headings} />;
}

function contactUsHrefOpensModal(href) {
    if (!href || typeof href !== 'string') return false;
    const u = href.trim();
    if (u === '/contact-us' || u === '/contact-us/') return true;
    return /^https?:\/\/(www\.)?appzoro\.com\/?contact-us\/?$/i.test(u);
}

function BlogPostBodyInner({ prepared, htmlBlock, mdComponents, isHtml }) {
    if (isHtml) {
        return (
            <div
                className="blog-post-body-inner"
                dangerouslySetInnerHTML={{ __html: htmlBlock?.html || '' }}
            />
        );
    }
    return (
        <div className="blog-post-body-inner blog-post-body-markdown">
            <ReactMarkdown components={mdComponents}>{prepared}</ReactMarkdown>
        </div>
    );
}

export function BlogPostBody(props) {
    const wrapRef = useRef(null);
    const { openContactModal } = useContactModal();

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const onClick = (e) => {
            const a = e.target.closest('a[href]');
            if (!a || !el.contains(a)) return;
            if (contactUsHrefOpensModal(a.getAttribute('href'))) {
                e.preventDefault();
                openContactModal();
            }
        };
        el.addEventListener('click', onClick);
        return () => el.removeEventListener('click', onClick);
    }, [openContactModal]);

    return (
        <div ref={wrapRef} className="blog-post-body-contact-wrap">
            <BlogPostBodyInner {...props} />
        </div>
    );
}

/**
 * Stacked: TOC above article body (legacy single-column body).
 */
export default function BlogPostContentWithToc({ content, isHtml, strapiUploadsBase }) {
    const model = useBlogPostContentModel(content, isHtml, strapiUploadsBase);
    return (
        <>
            <BlogPostToc headings={model.headings} />
            <BlogPostBody {...model} />
        </>
    );
}
