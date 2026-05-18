import React from 'react';
import BLOCK_TYPES from './blockRegistry';

/**
 * Renders an ordered array of page blocks.
 * @param {{ blocks: Array<{ id: string, type: string, props: object }>, context: object }} props
 * context is shared data like { slug, STRAPI_IMAGE_BASE_URL } passed to every block.
 */
export default function BlockRenderer({ blocks, context = {} }) {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block, index) => {
                if (!block || typeof block !== 'object' || !block.type) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn('[BlockRenderer] Invalid block payload, skipping:', block);
                    }
                    return null;
                }
                const entry = BLOCK_TYPES[block.type];
                if (!entry || !entry.Component) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`[BlockRenderer] Unknown block type: "${block.type}", skipping.`);
                    }
                    return null;
                }
                const Comp = entry.Component;
                const safeProps = (block.props && typeof block.props === 'object') ? block.props : {};
                const key = block.id || `${block.type}-${index}`;
                // Spread context first, then block props so reordering never changes explicit block config.
                return <Comp key={key} {...context} {...safeProps} />;
            })}
        </>
    );
}
