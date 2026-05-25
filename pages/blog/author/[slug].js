import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import MetaData from '../../../components/common/MetaData';
import TalkExpert from '../../../components/common/TalkExpert';
import BlogCardBox from '../BlogCardBox';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../../lib/constants';
import { SITE_URL, resolveOgImage } from '../../../lib/seo';
import { setEdgeCache } from '../../../lib/edgeCache';
import { slugify } from '../../../lib/validation';
import { FaLinkedin, LuMoveRight } from '../../../components/OptimizedIcons';

const AUTHOR_AVATAR_FALLBACK = '/assets/images/logo-icon.png';
const PAGE_SIZE = 9;

const authorImageUrl = (writer) => {
    const raw = writer?.picture?.url;
    if (!raw) return AUTHOR_AVATAR_FALLBACK;
    if (/^https?:\/\//i.test(raw)) return raw;
    return `${STRAPI_IMAGE_BASE_URL}${raw}`;
};

// Person JSON-LD so Google understands this is an author bio page (E-E-A-T signal)
// and can show the author's name/image as a knowledge-graph entity attached to
// their articles.
const buildPersonSchema = (writer, authorUrl, imageUrl) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: writer?.name || 'Author',
    url: `${SITE_URL}${authorUrl}`,
    image: imageUrl,
    ...(writer?.bio ? { description: String(writer.bio).slice(0, 500) } : {}),
    ...(writer?.linkedin_profile_url ? { sameAs: [writer.linkedin_profile_url] } : {}),
});

const AuthorBio = ({ writer, posts, authorSlug }) => {
    const [visibleItems, setVisibleItems] = useState(PAGE_SIZE);
    const handleLoadMore = () => setVisibleItems((prev) => prev + PAGE_SIZE);

    const list = Array.isArray(posts) ? posts : [];
    const authorName = writer?.name || 'Author';
    const authorBio = writer?.bio || '';
    const avatarSrc = authorImageUrl(writer);
    const authorUrl = `/blog/author/${authorSlug}`;
    const ogImage = writer?.picture?.url
        ? avatarSrc
        : resolveOgImage('/assets/images/az-logo-large.png');

    const pageTitle = `${authorName} — Author at AppZoro`;
    const pageDescription = authorBio
        ? `Articles by ${authorName} on AppZoro Blog. ${String(authorBio).slice(0, 140)}`
        : `Read all articles written by ${authorName} on the AppZoro Blog.`;

    return (
        <>
            <MetaData
                title={pageTitle}
                description={pageDescription}
                url={authorUrl}
                image={ogImage}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildPersonSchema(writer, authorUrl, ogImage)),
                }}
            />
            <MainHeader />

            <section className="page-title blog-bg" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                    src="/assets/images/banner/blog-banner.png"
                    alt="Author profile background"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover', zIndex: -1 }}
                />
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <div className="page-section-title">
                        <h1>{authorName}</h1>
                    </div>
                </Container>
            </section>

            <section className="author-profile-section py-5">
                <Container>
                    <Row className="align-items-center g-4">
                        <Col xs="12" md="3" className="text-center text-md-start">
                            <div className="author-img-large">
                                <Image
                                    src={avatarSrc}
                                    width={180}
                                    height={180}
                                    alt={authorName}
                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </div>
                        </Col>
                        <Col xs="12" md="9">
                            <h2 className="mb-3">About {authorName}</h2>
                            {authorBio ? (
                                <p className="mb-3">{authorBio}</p>
                            ) : (
                                <p className="mb-3 text-muted">
                                    {authorName} contributes articles on app development, design, and
                                    technology to the AppZoro Blog.
                                </p>
                            )}
                            {writer?.linkedin_profile_url && (
                                <Link
                                    href={writer.linkedin_profile_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${authorName} on LinkedIn`}
                                    className="btn-style-arrow"
                                >
                                    Connect on LinkedIn <FaLinkedin style={{ marginLeft: 8 }} />
                                </Link>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="blog-listing">
                <Container>
                    <h2 className="mb-4">
                        {list.length > 0
                            ? `Articles by ${authorName} (${list.length})`
                            : `No articles by ${authorName} yet`}
                    </h2>
                    <Row>
                        {list.slice(0, visibleItems).map((item, index) => (
                            <BlogCardBox
                                data={item}
                                key={item?.id || item?._id || item?.slug || index}
                                categoryName=""
                            />
                        ))}
                    </Row>
                </Container>
            </section>

            {list.length === 0 && (
                <section className="py-4">
                    <Container className="text-center">
                        <Link href="/blog" className="btn-style-arrow">
                            Browse all blog posts <span><LuMoveRight /></span>
                        </Link>
                    </Container>
                </section>
            )}

            {visibleItems < list.length && (
                <section className="load-more-blogs">
                    <Container className="text-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            className="btn-style-arrow me-3 load-more-btn"
                        >
                            Load More <span><LuMoveRight /></span>
                        </button>
                    </Container>
                </section>
            )}

            <TalkExpert />
            <Footer />
        </>
    );
};

export async function getServerSideProps({ params, res }) {
    const slug = params?.slug;
    if (!slug || typeof slug !== 'string') {
        return { notFound: true };
    }

    // Long edge cache — author bios and their article lists change rarely.
    setEdgeCache(res, 'long');

    const apiBase = (REACT_APP_API_URL || '').replace(/\/$/, '');

    try {
        // 1) Find the writer whose slugified name matches the URL slug.
        //    Writers list is small (handful of authors), safe to fetch all.
        const writersRes = await fetch(`${apiBase}/writers?_limit=200`, {
            headers: { Accept: 'application/json' },
        });
        if (!writersRes.ok) return { notFound: true };
        const writersData = await writersRes.json();
        const writers = Array.isArray(writersData) ? writersData : (writersData?.data || []);

        const writer = writers.find((w) => slugify(w?.name || '') === slug);
        if (!writer) return { notFound: true };

        // 2) Fetch all posts authored by this writer (newest first).
        //    Backend filter added: ?writer=<id> on /posts.
        const writerId = writer._id || writer.id;
        const postsRes = await fetch(
            `${apiBase}/posts?writer=${writerId}&_sort=published_at:DESC&_limit=100`,
            { headers: { Accept: 'application/json' } },
        );
        const postsData = postsRes.ok ? await postsRes.json() : [];
        const posts = Array.isArray(postsData) ? postsData : (postsData?.data || []);

        return {
            props: {
                writer,
                posts,
                authorSlug: slug,
            },
        };
    } catch {
        return { notFound: true };
    }
}

export default AuthorBio;
