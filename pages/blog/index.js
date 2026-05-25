import React, { useState, useEffect } from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { Col, Container, Row } from 'react-bootstrap'
import MainHeaderComponent from '../../components/MainHeader';
import FooterComponent from '../../components/Footer';
import CategoriesFilterComponent from './CategoriesFilter';
import BlogCardBoxComponent from './BlogCardBox';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const TalkExpertComponent = dynamic(() => import('../../components/common/TalkExpert'));

import { useForm } from 'react-hook-form';
import MetaData from '../../components/common/MetaData'
import SeoJsonLd from '../../components/common/SeoJsonLd'
import { buildBreadcrumbSchema } from '../../lib/schemaBuilders'
import Loader from '../../components/Loader'
import { REACT_APP_API_URL } from '../../lib/constants'
import { LuMoveRight } from '../../components/OptimizedIcons';
import { normalizeListPayload, normalizeCountPayload } from '../../lib/apiNormalize';

const limit = 9;

const Blog = ({ initialPosts, category, total, currentPage = 1 }) => {
    const [noBlogData, setNoBlogData] = useState(false);
    const [blogListData, setBlogListData] = useState(() => normalizeListPayload(initialPosts));
    const [categoryData, setCategoryData] = useState(Array.isArray(category) ? category : []);
    const [isLoading, setIsLoading] = useState(false);
    const [start, setStart] = useState(currentPage * limit);
    const [totalPosts, setTotalPosts] = useState(() => normalizeCountPayload(total));
    // const [visibleItems, setVisibleItems] = useState(9);

    // const handleLoadMore = () => {
    //     setVisibleItems(prev => prev + 9);
    // };

    // const getBlogPost = () => {
    //     setBlogListData(posts);
    // }

    const [hasFetchedFallback, setHasFetchedFallback] = useState(false);
    const [hasFetchedCatFallback, setHasFetchedCatFallback] = useState(false);

    useEffect(() => {
        setBlogListData(normalizeListPayload(initialPosts));
        setTotalPosts(normalizeCountPayload(total));
        setStart(currentPage * limit);
        setNoBlogData(false);
    }, [initialPosts, total, currentPage]);

    useEffect(() => {
        // Fallback: If SSR failed to fetch posts for some reason, fetch them client-side once.
        if (blogListData.length === 0 && !hasFetchedFallback) {
            setHasFetchedFallback(true);
            setIsLoading(true);
            fetch(`${REACT_APP_API_URL}posts?_sort=published_at:DESC&_start=${(currentPage - 1) * limit}&_limit=${limit}`, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    const fallbackPosts = normalizeListPayload(data);
                    if (fallbackPosts.length > 0) {
                        setBlogListData(fallbackPosts);
                        setNoBlogData(false);
                        // Also fetch count if we have 0 total
                        if (totalPosts === 0) {
                            fetch(`${REACT_APP_API_URL}posts/count`, { cache: 'no-store' })
                                .then(res => res.json())
                                .then(countData => {
                                    setTotalPosts(normalizeCountPayload(countData));
                                }).catch(console.error);
                        }
                    } else {
                        setNoBlogData(true);
                    }
                })
                .catch((err) => {
                    console.error("Fallback fetch failed", err);
                    setNoBlogData(true);
                })
                .finally(() => setIsLoading(false));
        }

        if (categoryData.length === 0 && !hasFetchedCatFallback) {
            setHasFetchedCatFallback(true);
            fetch(`${REACT_APP_API_URL}categories`, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    const fallbackCategories = normalizeListPayload(data);
                    if (fallbackCategories.length > 0) {
                        setCategoryData(fallbackCategories.map(cat => ({
                            slug: cat?.slug,
                            name: cat?.name
                        })));
                    }
                }).catch(console.error);
        }
    }, [blogListData.length, hasFetchedFallback, currentPage, totalPosts, categoryData.length, hasFetchedCatFallback]);



    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleLoadMore = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${REACT_APP_API_URL}posts?_sort=published_at:DESC&_start=${start}&_limit=${limit}`, { cache: 'no-store' });
            const data = await res.json();
            const newPosts = normalizeListPayload(data);
            setBlogListData(prev => [...prev, ...newPosts]);
            setStart(prev => prev + limit);
        } catch (err) {
            console.error("Failed to load more blogs", err);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${REACT_APP_API_URL}posts?_sort=publishedAt%3Adesc&_limit=100&_start=0&title_contains=${data.search}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json().catch(() => []);
            const finalResult = normalizeListPayload(result);
            setBlogListData(finalResult);
            setTotalPosts(finalResult.length);
            setNoBlogData(finalResult.length === 0);

        } catch (error) {
            setNoBlogData(true);
        } finally {
            setIsLoading(false);
        }
    }

    const resetSearch = () => {
        reset();
        setBlogListData(normalizeListPayload(initialPosts));
        setTotalPosts(normalizeCountPayload(total));
        setStart(currentPage * limit);
        setNoBlogData(false);
    }


    return (
        <>
            <MetaData
                title={currentPage > 1
                    ? `AppZoro Blogs: Insights on App Development and Tech Trends | Page ${currentPage}`
                    : "AppZoro Blogs: Insights on App Development and Tech Trends"}
                description={currentPage > 1
                    ? `Stay informed with AppZoro Blogs, featuring articles on app development strategies, design tips, and the latest industry trends. Page ${currentPage}`
                    : "Stay informed with AppZoro Blogs, featuring articles on app development strategies, design tips, and the latest industry trends."}
                url={currentPage > 1 ? `/blog?page=${currentPage}` : '/blog'}
                canonicalPath={currentPage > 1 ? `/blog?page=${currentPage}` : '/blog'}
                image={DEFAULT_OG_IMAGE}
            />
            <SeoJsonLd
                data={buildBreadcrumbSchema([
                    { name: 'Home', url: '/' },
                    { name: 'Blog', url: '/blog' },
                ])}
            />
            {isLoading && <Loader />}
            <MainHeaderComponent />
            <section className='page-title blog-bg' style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                    src="/assets/images/banner/blog-banner.png"
                    alt="Blog Banner"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover', zIndex: -1 }}
                />
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <div className='page-section-title'>
                        <h1>App Development &amp; Tech Blog</h1>
                    </div>
                    <div className="searchBox">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="search-group">
                                <input type="text" name="search" {...register("search")} placeholder="Search blog.." />
                                <button type='submit' className='search-btn'>Search</button>
                                <button type='button' className='reset-btn' onClick={resetSearch}>Reset</button>
                            </div>
                            {errors.search?.type === "required" && (
                                <p className='error-msg' role="alert">Please enter search query!</p>
                            )}
                        </form>
                    </div>
                </Container>
            </section>
            <section className='blog-intro'>
                <Container>
                    <h3>We Have Published Over <span>{totalPosts} Blogs</span> On Various Topics</h3>
                    <CategoriesFilterComponent category={categoryData} />
                </Container>
            </section>
            <section className='blog-listing'>
                <Container>
                    <Row>
                        {
                            Array.isArray(blogListData) && blogListData?.length > 0 ? blogListData.map((item, index) => (
                                <BlogCardBoxComponent key={index} data={item} categoryName="" />
                            )) : <div className="col-12 text-center">No posts found</div>
                        }
                    </Row>
                </Container>
            </section>
            {noBlogData &&
                <section className='blog-listing'>
                    <Container>
                        <div className="alert alert-danger">
                            No BLog post found with your search query
                        </div>
                    </Container>
                </section>
            }
            {blogListData.length < totalPosts && !noBlogData && (
                <section className='load-more-blogs'>
                    <Container className='text-center'>

                        <button onClick={handleLoadMore} className="btn-style-arrow me-3 load-more-btn">Load More<span><LuMoveRight /></span></button>
                    </Container>
                </section>
            )}
            {/* Always render SEO pagination anchors for crawlers */}
            <section style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                {currentPage > 1 && (
                    <a href={`/blog?page=${currentPage - 1}`}>
                        Previous Page
                    </a>
                )}
                {blogListData.length + start < totalPosts && (
                    <a href={`/blog?page=${currentPage + 1}`}>
                        Next Page
                    </a>
                )}
            </section>
            <TalkExpertComponent />
            <FooterComponent />
        </>
    )
}
/** Bounded wait so crawlers (e.g. Semrush) get a 200 HTML shell instead of hanging on a slow API. */
const SSR_FETCH_MS = 12_000;
async function fetchBlogSsr(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SSR_FETCH_MS);
    try {
        return await fetch(url, { cache: 'no-store', signal: controller.signal });
    } catch {
        return { ok: false, json: async () => [] };
    } finally {
        clearTimeout(timer);
    }
}

//  /posts?_sort=published_at:DESC&_start=0&_limit=100
export async function getServerSideProps(context) {
    const page = parseInt(context.query?.page || '1', 10);

    if (page === 1 && context.query?.page) {
        return {
            redirect: { destination: '/blog', permanent: true },
        };
    }

    // CDN/edge cache: serve cached HTML for 60s; serve stale for 5min while
    // revalidating in background. Turns repeated /blog visits from "cold SSR
    // every time" (1-12s with 3 parallel API calls) into instant edge hits.
    // Blog list rarely changes per-second, so 60s freshness is safe.
    if (context.res) {
        context.res.setHeader(
            'Cache-Control',
            'public, s-maxage=60, stale-while-revalidate=300',
        );
    }

    const limit = 9;
    const start = (page - 1) * limit;

    try {
        const [postsRes, categoryRes, countRes] = await Promise.all([
            fetchBlogSsr(`${REACT_APP_API_URL}posts?_sort=published_at:DESC&_start=${start}&_limit=${limit}`),
            fetchBlogSsr(`${REACT_APP_API_URL}categories`),
            fetchBlogSsr(`${REACT_APP_API_URL}posts/count`)
        ]);

        const [postsData, categoriesData, totalData] = await Promise.all([
            postsRes.ok ? postsRes.json().catch(() => []) : [],
            categoryRes.ok ? categoryRes.json().catch(() => []) : [],
            countRes.ok ? countRes.json().catch(() => 0) : 0
        ]);

        const posts = normalizeListPayload(postsData);
        const categories = normalizeListPayload(categoriesData);
        const total = normalizeCountPayload(totalData);

        const category = categories.map(cat => ({
            slug: cat?.slug,
            name: cat?.name
        }));

        return { props: { initialPosts: posts, category, total, currentPage: page } };
    } catch (err) {
        console.error("Error in blog getServerSideProps:", err);
        return { props: { initialPosts: [], category: [], total: 0, currentPage: 1 } };
    }
}

export default Blog