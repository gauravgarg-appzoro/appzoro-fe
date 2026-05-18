'use client';

import React from 'react';
import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';

// Image with optional link (so linked images are stored as one node and survive getHTML/save)
const ImageWithLink = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            linkHref: {
                default: null,
                parseHTML: (el) => el.parentElement?.tagName === 'A' ? el.parentElement.getAttribute('href') : null,
                renderHTML: (attrs) => attrs.linkHref ? null : null,
            },
            linkTarget: {
                default: '_blank',
                parseHTML: (el) => el.parentElement?.tagName === 'A' ? (el.parentElement.getAttribute('target') || '_blank') : '_blank',
                renderHTML: () => null,
            },
            linkRel: {
                default: 'noopener',
                parseHTML: (el) => el.parentElement?.tagName === 'A' ? (el.parentElement.getAttribute('rel') || 'noopener') : 'noopener',
                renderHTML: () => null,
            },
        };
    },
    renderHTML({ node, HTMLAttributes }) {
        const { linkHref, linkTarget, linkRel } = node.attrs;
        const imgClass = ['editor-image', HTMLAttributes?.class].filter(Boolean).join(' ');
        const imgAttrs = { ...HTMLAttributes, class: imgClass };
        if (linkHref) {
            return ['a', {
                href: linkHref,
                target: linkTarget || '_blank',
                rel: linkRel || 'noopener',
                class: 'editor-link',
            }, ['img', imgAttrs]];
        }
        return ['img', imgAttrs];
    },
});
import { Table as TableExtension } from '@tiptap/extension-table';
import { TableRow as TableRowExtension } from '@tiptap/extension-table-row';
import { TableCell as TableCellExtension } from '@tiptap/extension-table-cell';
import { TableHeader as TableHeaderExtension } from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import MediaLibraryModal from './MediaLibraryModal';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaLink, FaImage, FaTable, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaUndo, FaRedo, FaCode, FaQuoteRight, FaTrash, FaExchangeAlt } from '../../OptimizedIcons';

/** Snapshot toolbar state from editor; useEditorState compares by value so we avoid re-renders on unrelated doc churn. */
function getToolbarUi(ed) {
    if (!ed) {
        return {
            blockType: 'paragraph',
            bold: false,
            italic: false,
            underline: false,
            strike: false,
            bulletList: false,
            orderedList: false,
            alignLeft: false,
            alignCenter: false,
            alignRight: false,
            alignJustify: false,
            blockquote: false,
            codeBlock: false,
            table: false,
            canUndo: false,
            canRedo: false,
        };
    }
    let blockType = 'paragraph';
    for (let level = 1; level <= 6; level += 1) {
        if (ed.isActive('heading', { level })) {
            blockType = `h${level}`;
            break;
        }
    }
    return {
        blockType,
        bold: ed.isActive('bold'),
        italic: ed.isActive('italic'),
        underline: ed.isActive('underline'),
        strike: ed.isActive('strike'),
        bulletList: ed.isActive('bulletList'),
        orderedList: ed.isActive('orderedList'),
        alignLeft: ed.isActive({ textAlign: 'left' }),
        alignCenter: ed.isActive({ textAlign: 'center' }),
        alignRight: ed.isActive({ textAlign: 'right' }),
        alignJustify: ed.isActive({ textAlign: 'justify' }),
        blockquote: ed.isActive('blockquote'),
        codeBlock: ed.isActive('codeBlock'),
        table: ed.isActive('table'),
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
    };
}

const RichTextEditorClient = ({
    content = '',
    onChange,
    placeholder = 'Start writing...',
    minHeight = '300px'
}) => {
    const [showLinkModal, setShowLinkModal] = React.useState(false);
    const [showMediaLibrary, setShowMediaLibrary] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState('');
    const [linkNewTab, setLinkNewTab] = React.useState(false);
    const [linkNoFollow, setLinkNoFollow] = React.useState(false); // default do follow
    const [h1Count, setH1Count] = React.useState(0);
    const editorWrapperRef = React.useRef(null);

    const editor = useEditor({
        immediatelyRender: false, // Fix for SSR hydration error
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'editor-link',
                },
            }),
            ImageWithLink.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
            BubbleMenuExtension,
            TableExtension.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'editor-table',
                },
            }),
            TableRowExtension,
            TableCellExtension,
            TableHeaderExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);

            // Count H1 tags for SEO warning
            const h1Matches = html.match(/<h1>/g);
            setH1Count(h1Matches ? h1Matches.length : 0);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
                style: `min-height: ${minHeight}; padding: 12px;`,
            },
        },
    });

    const toolbarUi = useEditorState({
        editor,
        selector: ({ editor: ed }) => getToolbarUi(ed),
    });

    const onBlockTypeChange = (e) => {
        const v = e.target.value;
        if (!editor) return;
        if (v === 'paragraph') {
            editor.chain().focus().setParagraph().run();
            return;
        }
        const level = parseInt(v.replace('h', ''), 10);
        if (level >= 1 && level <= 6) {
            editor.chain().focus().setHeading({ level }).run();
        }
    };

    // Keyboard shortcut for link (Ctrl+K / Cmd+K) — only when this editor has focus to avoid multiple modals
    React.useEffect(() => {
        if (!editor || !editorWrapperRef.current) return;
        const wrapper = editorWrapperRef.current;
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                if (!wrapper.contains(document.activeElement)) return;
                e.preventDefault();
                openLinkModal();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [editor]);

    const openLinkModal = () => {
        if (!editor) return;
        const prevAttrs = editor.getAttributes('link');
        const previousUrl = prevAttrs.href || '';
        setLinkUrl(previousUrl);
        setLinkNewTab(prevAttrs.target === '_blank');
        setLinkNoFollow(previousUrl ? (prevAttrs.rel != null && String(prevAttrs.rel).includes('nofollow')) : false);
        setShowLinkModal(true);
    };

    const setLink = () => {
        if (!linkUrl) {
            editor.chain().focus().unsetLink().run();
        } else {
            const attrs = {
                href: linkUrl,
                target: linkNewTab ? '_blank' : null,
                rel: linkNoFollow ? 'nofollow noopener' : (linkNewTab ? 'noopener' : null),
            };
            editor.chain().focus().setLink(attrs).run();
        }
        setShowLinkModal(false);
        setLinkUrl('');
        setLinkNewTab(false);
        setLinkNoFollow(false); // reset to default (do follow) for next time
    };

    const handleInsertImage = (url, alt, caption, linkUrl, imageLinkNoFollow = false) => {
        if (!url) return;
        const attrs = {
            src: url,
            alt: alt || '',
            title: caption || '',
        };
        if (linkUrl && linkUrl.trim()) {
            attrs.linkHref = linkUrl.trim();
            attrs.linkTarget = '_blank';
            attrs.linkRel = imageLinkNoFollow ? 'nofollow noopener' : 'noopener';
        }
        editor.chain().focus().setImage(attrs).run();
        setShowMediaLibrary(false);
    };

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    if (!editor) {
        return <div style={{ minHeight, padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>Loading editor...</div>;
    }

    const ui = toolbarUi ?? getToolbarUi(editor);

    return (
        <div className="rich-text-editor" ref={editorWrapperRef}>
            {/* SEO Warning */}
            {h1Count > 1 && (
                <div className="alert alert-warning mb-2 py-2 px-3" style={{ fontSize: '12px' }}>
                    ⚠️ SEO Warning: Multiple H1 tags detected ({h1Count}). Use only one H1 per page.
                </div>
            )}

            {/* Toolbar — sticky below admin navbar while scrolling the form */}
            <div className="rich-text-editor__toolbar border border-bottom-0 p-2 bg-light d-flex flex-wrap align-items-center gap-2">
                {/* Block type: native select avoids Bootstrap Dropdown + Popper positioning bugs in this layout */}
                <Form.Select
                    size="sm"
                    aria-label="Block type"
                    className="rich-text-editor__block-type"
                    value={ui.blockType}
                    onChange={onBlockTypeChange}
                    style={{
                        width: 'auto',
                        minWidth: 120,
                        maxWidth: 150,
                        fontSize: '12px',
                        flexShrink: 0,
                    }}
                >
                    <option value="paragraph">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                    <option value="h6">Heading 6</option>
                </Form.Select>

                <div className="vr"></div>

                {/* Text Formatting */}
                <ButtonGroup size="sm">
                    <Button
                        variant={ui.bold ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        title="Bold (Ctrl+B)"
                    >
                        <FaBold />
                    </Button>
                    <Button
                        variant={ui.italic ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        title="Italic (Ctrl+I)"
                    >
                        <FaItalic />
                    </Button>
                    <Button
                        variant={ui.underline ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        title="Underline (Ctrl+U)"
                    >
                        <FaUnderline />
                    </Button>
                    <Button
                        variant={ui.strike ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        title="Strikethrough"
                    >
                        <FaStrikethrough />
                    </Button>
                </ButtonGroup>

                <div className="vr"></div>

                {/* Lists */}
                <ButtonGroup size="sm">
                    <Button
                        variant={ui.bulletList ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        title="Bullet List"
                    >
                        <FaListUl />
                    </Button>
                    <Button
                        variant={ui.orderedList ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        title="Numbered List"
                    >
                        <FaListOl />
                    </Button>
                </ButtonGroup>

                <div className="vr"></div>

                {/* Alignment */}
                <ButtonGroup size="sm">
                    <Button
                        variant={ui.alignLeft ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        title="Align Left"
                    >
                        <FaAlignLeft />
                    </Button>
                    <Button
                        variant={ui.alignCenter ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        title="Align Center"
                    >
                        <FaAlignCenter />
                    </Button>
                    <Button
                        variant={ui.alignRight ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        title="Align Right"
                    >
                        <FaAlignRight />
                    </Button>
                    <Button
                        variant={ui.alignJustify ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        title="Justify"
                    >
                        <FaAlignJustify />
                    </Button>
                </ButtonGroup>

                <div className="vr"></div>

                {/* Insert */}
                <ButtonGroup size="sm">
                    <Button
                        variant="light"
                        onClick={openLinkModal}
                        title="Insert Link (Ctrl+K)"
                    >
                        <FaLink />
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => setShowMediaLibrary(true)}
                        title="Insert Image"
                    >
                        <FaImage />
                    </Button>
                    <Button
                        variant="light"
                        onClick={addTable}
                        title="Insert Table"
                    >
                        <FaTable />
                    </Button>
                    <Button
                        variant={ui.blockquote ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        title="Quote"
                    >
                        <FaQuoteRight />
                    </Button>
                    <Button
                        variant={ui.codeBlock ? 'primary' : 'light'}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        title="Code Block"
                    >
                        <FaCode />
                    </Button>
                </ButtonGroup>

                {/* Table Management Controls - Show when table is active */}
                {ui.table && (
                    <>
                        <div className="vr"></div>
                        <ButtonGroup size="sm">
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().addRowBefore().run()}
                                title="Add Row Above"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                ↑Row
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().addRowAfter().run()}
                                title="Add Row Below"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                ↓Row
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().deleteRow().run()}
                                title="Delete Row"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                ✕Row
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().addColumnBefore().run()}
                                title="Add Column Left"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                ←Col
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().addColumnAfter().run()}
                                title="Add Column Right"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                →Col
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => editor.chain().focus().deleteColumn().run()}
                                title="Delete Column"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                ✕Col
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => editor.chain().focus().deleteTable().run()}
                                title="Delete Table"
                                style={{ fontSize: '10px', padding: '4px 8px' }}
                            >
                                Delete Table
                            </Button>
                        </ButtonGroup>
                    </>
                )}

                <div className="vr"></div>

                {/* Undo/Redo */}
                <ButtonGroup size="sm">
                    <Button
                        variant="light"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!ui.canUndo}
                        title="Undo (Ctrl+Z)"
                    >
                        <FaUndo />
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!ui.canRedo}
                        title="Redo (Ctrl+Y)"
                    >
                        <FaRedo />
                    </Button>
                </ButtonGroup>
            </div>

            {/* Editor Content */}
            <div
                className="border"
                style={{
                    borderRadius: '0 0 4px 4px',
                    backgroundColor: '#fff',
                    minHeight
                }}
            >
                <EditorContent editor={editor} />
            </div>

            {/* Link Modal */}
            <Modal show={showLinkModal} onHide={() => setShowLinkModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="https://example.com"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Open in new tab"
                        checked={linkNewTab}
                        onChange={(e) => setLinkNewTab(e.target.checked)}
                        className="mb-2"
                    />
                    <Form.Group className="mb-0">
                        <Form.Label className="small">Link type (SEO)</Form.Label>
                        <div className="d-flex gap-3 mt-1">
                            <Form.Check
                                type="radio"
                                id="link-dofollow"
                                name="linkFollow"
                                label="Do follow"
                                checked={!linkNoFollow}
                                onChange={() => setLinkNoFollow(false)}
                            />
                            <Form.Check
                                type="radio"
                                id="link-nofollow"
                                name="linkFollow"
                                label="No follow"
                                checked={linkNoFollow}
                                onChange={() => setLinkNoFollow(true)}
                            />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={setLink}>
                        Insert Link
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Media Library Modal */}
            <MediaLibraryModal
                show={showMediaLibrary}
                onHide={() => setShowMediaLibrary(false)}
                onSelectImage={handleInsertImage}
            />

            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} shouldShow={({ editor }) => editor.isActive('image')}>
                    <div className="bg-white border rounded shadow-sm p-1 d-flex gap-1" style={{ zIndex: 999 }}>
                        <Button
                            size="sm"
                            variant="light"
                            onClick={() => setShowMediaLibrary(true)}
                            title="Replace Image"
                            className="d-flex align-items-center gap-1"
                        >
                            <FaExchangeAlt size={12} /> Replace
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => editor.chain().focus().deleteSelection().run()}
                            title="Remove Image"
                            className="d-flex align-items-center gap-1"
                        >
                            <FaTrash size={12} /> Remove
                        </Button>
                    </div>
                </BubbleMenu>
            )}

            <style jsx global>{`
                .rich-text-editor {
                    overflow: visible;
                }
                /* Sit just under AppZoro admin Navbar (sticky-top ~56px); adjust if header height changes */
                .rich-text-editor__toolbar {
                    position: sticky;
                    top: 56px;
                    z-index: 1020;
                    border-radius: 4px 4px 0 0;
                    background-color: #f8f9fa !important;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }
                .ProseMirror {
                    outline: none;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .ProseMirror h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
                .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
                .ProseMirror h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
                .ProseMirror h4 { font-size: 1em; font-weight: bold; margin: 1.12em 0; }
                .ProseMirror h5 { font-size: 0.83em; font-weight: bold; margin: 1.5em 0; }
                .ProseMirror h6 { font-size: 0.75em; font-weight: bold; margin: 1.67em 0; }
                .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; margin: 1em 0; }
                .ProseMirror li { margin: 0.5em 0; }
                .ProseMirror blockquote { border-left: 3px solid #ccc; padding-left: 1em; margin: 1em 0; color: #666; }
                .ProseMirror code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
                .ProseMirror pre { background: #f4f4f4; padding: 1em; border-radius: 4px; overflow-x: auto; }
                .ProseMirror pre code { background: none; padding: 0; }
                .ProseMirror img { max-width: 100%; height: auto; }
                .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                .ProseMirror th, .ProseMirror td { border: 1px solid #ddd; padding: 0.5em; }
                .ProseMirror th { background: #f4f4f4; font-weight: bold; }
                .ProseMirror a { color: #0d6efd; text-decoration: underline; }
            `}</style>
        </div>
    );
};

export default RichTextEditorClient;
