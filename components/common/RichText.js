import React from 'react';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'));

// CMS rich-text fields commonly contain:
//   - Markdown hyphens (- bullet, - bullet) that must render as <ul><li>
//   - Stray <br>, <br/>, <br />, </br> tags that JSX would otherwise escape
//     as literal text. (</br> is invalid HTML5; the others are valid but
//     prevent markdown from parsing adjacent lines as a list.)
// Normalizing every variant to a real newline lets react-markdown produce
// the correct semantic structure (lists, paragraphs) for SEO + accessibility.
//
// Additionally: collapse a SINGLE `\n` inside a paragraph to a space.
// Markdown spec says only `\n\n+` separates paragraphs — a single newline
// renders as a soft break that becomes a literal `\n` in the HTML output.
// Browsers render that as whitespace (no visible change), but the literal
// newline in the source HTML prevents Ctrl+F searching for a phrase that
// spans the break (e.g. "frameworks. Our developers" won't match because
// source has "frameworks.\nOur developers"). The regex below preserves
// real paragraph breaks (\n\n+) but normalises single \n within a
// paragraph to a space, so each paragraph renders as one searchable
// continuous line in source.
const normalizeBreaks = (s) => {
    let str = String(s == null ? '' : s).replace(/<\/?br\s*\/?>/gi, '\n');
    // Replace single \n (not part of \n\n+) with a single space.
    // Regex matches any \n where neither neighbour is also a \n.
    str = str.replace(/([^\n])\n([^\n])/g, '$1 $2');
    return str;
};

const RichText = ({ children }) => {
    const value = normalizeBreaks(children).trim();
    if (!value) return null;
    return <ReactMarkdown>{value}</ReactMarkdown>;
};

export default RichText;
