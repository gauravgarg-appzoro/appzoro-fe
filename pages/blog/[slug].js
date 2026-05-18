import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import dateFormat from "dateformat";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import { STRAPI_IMAGE_BASE_URL, REACT_APP_API_URL } from "../../lib/constants";
import { rewriteLegacyWpContentUploadsToAbsolute } from "../../lib/rewriteLegacyWpMedia";
import { sanitizeJsonLdString } from "../../lib/jsonLdSanitize";
import {
  BlogPostToc,
  BlogPostBody,
  useBlogPostContentModel,
} from "../../components/blog/BlogPostContentWithToc";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPinterest } from '../../components/OptimizedIcons';

const RecentPosts = dynamic(() => import("./RecentPosts"));
const SidebarCategories = dynamic(() => import("./SidebarCategories"));
const BlogTags = dynamic(() => import("./BlogTags"));
const BlogFaq = dynamic(() => import("./BlogFaq"));
const BlogComment = dynamic(() => import("./BlogComment"), { ssr: false });
const SidebarArchives = dynamic(() => import("./SidebarArchives"));
const BlogAuthorDetails = dynamic(() => import("./BlogAuthorDetails"));
const BlogKeyTakeaways = dynamic(() => import("../../components/blog/BlogKeyTakeaways"));

/** API may return a raw array or a wrapped payload; strip null entries. */
function normalizeBlogPostsResponse(data) {
  if (Array.isArray(data)) return data.filter(Boolean);
  if (data && Array.isArray(data.data)) return data.data.filter(Boolean);
  return [];
}

function filterValidBlogPosts(posts) {
  return (posts || []).filter(
    (p) => p && typeof p === "object" && (p.slug || p.title || p._id || p.id)
  );
}

async function fetchBlogPostsBySlug(slug) {
  const apiBase = (REACT_APP_API_URL || "").replace(/\/$/, "");
  const url = `${apiBase}/posts?slug=${encodeURIComponent(String(slug))}`;
  const fetchOpts = {
    cache: "no-store",
    headers: { Accept: "application/json" },
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, fetchOpts);
      if (!res.ok) {
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
        }
        continue;
      }
      const raw = await res.json();
      const posts = filterValidBlogPosts(normalizeBlogPostsResponse(raw));
      if (posts.length > 0) return posts;
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
      }
    } catch {
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
      }
    }
  }
  return [];
}

function BlogPostThreeColumnSection({ blogDetail, isHtml }) {
  const model = useBlogPostContentModel(
    blogDetail.content,
    isHtml,
    STRAPI_IMAGE_BASE_URL
  );

  return (
    <>
      <Col xs="12" md="3" className="blog-col-toc">
        <div className="blog-toc-column-inner">
          <BlogPostToc headings={model.headings} />
        </div>
      </Col>
      <Col xs="12" md="6" className="blog-col-main">
        <BlogKeyTakeaways items={blogDetail?.post_takeaways} />
        {blogDetail?.content && (
          <div className="blog-post-content">
            <BlogPostBody {...model} />
          </div>
        )}
        {blogDetail?.blogQuestion?.length > 0 && (
          <BlogFaq faqData={blogDetail?.blogQuestion} />
        )}
        {blogDetail?.tags && <BlogTags tags={blogDetail?.tags} />}
        {blogDetail?.writer && (
          <BlogAuthorDetails author={blogDetail?.writer} />
        )}
        <BlogComment />
      </Col>
      <Col xs="12" md="3" className="blog-col-sidebar">
        <div className="blog-sidebar-inner">
          <RecentPosts />
          <SidebarCategories />
        </div>
      </Col>
    </>
  );
}

const BlogDetails = ({ posts: initialPosts }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(() =>
    filterValidBlogPosts(normalizeBlogPostsResponse(initialPosts))
  );
  const [shareUrl, setShareUrl] = useState("");
  const [loadingFallback, setLoadingFallback] = useState(false);

  const blogDetail = posts?.[0] ?? null;
  const slugForMeta = blogDetail?.slug ?? router.query?.slug ?? "";

  function isHTML(str) {
    return /<[a-z][\s\S]*>/i.test(str);
  }

  useEffect(() => {
    setPosts(filterValidBlogPosts(normalizeBlogPostsResponse(initialPosts)));
  }, [initialPosts]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  /** Recover from transient API failures or malformed SSR props (e.g. empty slot in array). */
  useEffect(() => {
    if (!router.isReady) return;
    if (blogDetail) return;
    const slug = router.query?.slug;
    if (!slug) return;

    let cancelled = false;
    setLoadingFallback(true);
    const apiBase = (REACT_APP_API_URL || "").replace(/\/$/, "");
    fetch(
      `${apiBase}/posts?slug=${encodeURIComponent(String(slug))}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const next = filterValidBlogPosts(normalizeBlogPostsResponse(data));
        if (next.length > 0) setPosts(next);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingFallback(false);
      });
    return () => {
      cancelled = true;
    };
  }, [router.isReady, router.query?.slug, blogDetail]);

  return (
    <>
      <MetaData
        title={blogDetail?.meta_title ? blogDetail?.meta_title : blogDetail?.title || "Blog"}
        description={blogDetail?.meta_description ? blogDetail?.meta_description : blogDetail?.description || ""}
        url={`/blog/${slugForMeta}`}
        image={`${STRAPI_IMAGE_BASE_URL}${blogDetail?.image?.[0]?.url || ""}`}
      />
      <Head>
        <meta name="author" content={blogDetail?.writer?.name ? blogDetail?.writer?.name : "AppZoro"} />
        {blogDetail?.post_schema && (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            dangerouslySetInnerHTML={{
              __html: sanitizeJsonLdString(
                rewriteLegacyWpContentUploadsToAbsolute(String(blogDetail?.post_schema || ''), STRAPI_IMAGE_BASE_URL),
              ),
            }}
          ></script>
        )}

      </Head>
      <MainHeader />
      {/* <section className='page-title service-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h3>Blog detail</h3>
                    </div>
                </Container>
            </section> */}
      {blogDetail && (
        <section className="blog-detail-intro">
          <Container fluid className="blog-detail-container px-3 px-md-4 px-xl-5">
            <Row className="align-items-center">
              <Col md="6" xs="12">
                <div className="blog-detail-info">
                  {blogDetail?.categories?.[0] && (
                    <a
                      className="cat-name"
                    >
                      {blogDetail?.categories[0]?.name}
                    </a>
                  )}
                  <h1>{blogDetail?.title}</h1>
                  <div className="post-by">
                    <span>
                      {blogDetail?.writer?.picture?.url ? (
                        <Image
                          src={`${STRAPI_IMAGE_BASE_URL}${blogDetail?.writer?.picture?.url}`}
                          width="100"
                          height="60"
                          alt="User"

                        />
                      ) : (
                        <Image
                          src="/assets/images/logo-icon.png"
                          width="100"
                          height="60"
                          alt="User"

                        />
                      )}
                    </span>
                    <h3>
                      {blogDetail?.writer?.name
                        ? blogDetail?.writer?.name
                        : "AppZoro"}
                    </h3>
                  </div>
                  <h4 className="post-date">
                    {dateFormat(blogDetail?.publishedAt, "mediumDate")}
                  </h4>
                </div>
              </Col>
              <Col md="6" xs="12">
                {blogDetail?.image?.[0] && (
                  <div className="blog-main-img">
                    <Image
                      src={`${STRAPI_IMAGE_BASE_URL}${blogDetail?.image?.[0]?.url || ''}`}
                      width="600"
                      height="320"
                      alt={blogDetail?.title || "Blog Image"}
                      priority
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
          <div className="share-post-view">
            <h3>Share</h3>
            <ul>
              <li className="ftr-social_fb">
                <FacebookShareButton url={shareUrl} quote={`${shareUrl}`}>
                  <a className="fb" aria-label="Share on Facebook">
                    <FaFacebookF />
                  </a>
                </FacebookShareButton>
              </li>
              <li className="ftr-social_linkedin">
                <LinkedinShareButton url={shareUrl} summary={`${shareUrl}`}>
                  <a className="linkedin" aria-label="Share on LinkedIn">
                    <FaLinkedinIn />
                  </a>
                </LinkedinShareButton>
              </li>
              <li className="ftr-social_twitter">
                <TwitterShareButton url={shareUrl}>
                  <a className="twitter" aria-label="Share on Twitter">
                    <Image
                      src="/assets/images/twitter.png"
                      width="14"
                      height="14"
                      alt="twitter"

                    />
                  </a>
                </TwitterShareButton>
              </li>
              <li className="ftr-social_insta">
                <EmailShareButton url={shareUrl} subject={blogDetail?.title}>
                  <a aria-label="Share via Email">
                    <FaEnvelope />
                  </a>
                </EmailShareButton>
              </li>
              <li className="ftr-social_insta">
                <PinterestShareButton
                  url={shareUrl}
                  description={blogDetail?.title}
                  media={`${STRAPI_IMAGE_BASE_URL}${blogDetail?.image?.[0]?.url || ''}`}
                >
                  <a aria-label="Share on Pinterest">
                    <FaPinterest />
                  </a>
                </PinterestShareButton>
              </li>
            </ul>
          </div>
        </section>
      )}
      <section className="blog-content-main">
        <Container fluid className="blog-detail-container px-3 px-md-4 px-xl-5">
          <Row>
            {blogDetail ? (
              <BlogPostThreeColumnSection
                blogDetail={blogDetail}
                isHtml={
                  new Date(blogDetail.updatedAt) >
                  new Date("09/09/2021 01:00:00 AM")
                    ? isHTML(blogDetail.content)
                    : true
                }
              />
            ) : loadingFallback ? (
              <Col md="12" xs="12">
                <div className="text-center py-5 text-muted" role="status">
                  Loading article…
                </div>
              </Col>
            ) : (
              <Col md="12" xs="12">
                <div className="alert alert-danger mt-4">
                  The search query you used might not match any existing record.
                  Double-check your search terms to ensure they match the
                  content of the blog posts.
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params?.slug ?? context.query?.slug;
  if (!slug || typeof slug !== "string") {
    return { notFound: true };
  }

  try {
    const posts = await fetchBlogPostsBySlug(slug);
    if (!posts.length) {
      return { notFound: true };
    }
    return { props: { posts } };
  } catch {
    return { notFound: true };
  }
}

export default BlogDetails;
