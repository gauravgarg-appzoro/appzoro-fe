import React from 'react';

const BlogKeyTakeaways = ({ items = [] }) => {
    const takeaways = Array.isArray(items)
        ? items.map((item) => String(item || '').trim()).filter(Boolean)
        : [];

    if (takeaways.length === 0) return null;

    return (
        <section className="blog-key-takeaways" aria-labelledby="blog-key-takeaways-heading">
            <div className="blog-key-takeaways__inner">
                <p
                    id="blog-key-takeaways-heading"
                    className="blog-key-takeaways__title"
                    role="heading"
                    aria-level={3}
                >
                    Key Takeaways:
                </p>
                <ul className="blog-key-takeaways__list">
                    {takeaways.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default BlogKeyTakeaways;
