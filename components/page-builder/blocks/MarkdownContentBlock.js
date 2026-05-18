import React from 'react';
import { Container } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export default function MarkdownContentBlock({ title, content }) {
    if (!content && !title) return null;

    return (
        <section className="industry-content-section py-5">
            <Container>
                {title && <h2 className="section-title-dark mb-4">{title}</h2>}
                {content && (
                    <div className="industry-detail-content">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </Container>
        </section>
    );
}
