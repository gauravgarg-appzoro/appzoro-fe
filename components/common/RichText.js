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
const normalizeBreaks = (s) =>
    String(s == null ? '' : s).replace(/<\/?br\s*\/?>/gi, '\n');

const RichText = ({ children }) => {
    const value = normalizeBreaks(children).trim();
    if (!value) return null;
    return <ReactMarkdown>{value}</ReactMarkdown>;
};

export default RichText;
