import React from 'react';
import Link from 'next/link';
import { setEdgeCache } from '../../lib/edgeCache';
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import AwardDev from '../../components/home/AwardDev';
import ClientReview from '../../components/common/ClientReview';
import TalkExpert from '../../components/common/TalkExpert';
import MetaData from '../../components/common/MetaData';
import SeoJsonLd from '../../components/common/SeoJsonLd';
import { buildBreadcrumbSchema, buildNewsArticleSchema } from '../../lib/schemaBuilders';
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { formatDateMMM } from '../../lib/rules';
import { LuMoveRight } from '../../components/OptimizedIcons';
import { findByContentSlug, pressSlug } from '../../lib/contentSlug';

function stripHtml(text) {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isHTML(str) {
  return /<[a-z][\s\S]*>/i.test(str || '');
}

function pressImageUrl(post) {
  const img = post?.PressImage?.[0];
  if (!img?.url) return null;
  return `${STRAPI_IMAGE_BASE_URL}${img.url}`;
}

const PressReleaseDetail = ({ post }) => {
  const pageSlug = post ? pressSlug(post) : '';
  const plainDescription = stripHtml(post?.PressDescription);
  const imageUrl = post ? pressImageUrl(post) : null;

  return (
    <>
      <MetaData
        title={
          post?.PressTitle
            ? `${post.PressTitle} | AppZoro Press Release`
            : 'Press Release | AppZoro'
        }
        description={
          plainDescription.slice(0, 160) ||
          'Read the latest announcements and milestones from AppZoro Technologies.'
        }
        url={`/press-release/${pageSlug}`}
        image={imageUrl || DEFAULT_OG_IMAGE}
        ogType="article"
      />
      {post && (
        <SeoJsonLd
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Press', url: '/press-release' },
              { name: post.PressTitle || 'Press Release', url: `/press-release/${pageSlug}` },
            ]),
            buildNewsArticleSchema({
              headline: post.PressTitle,
              description: plainDescription,
              url: `/press-release/${pageSlug}`,
              image: imageUrl || DEFAULT_OG_IMAGE,
              datePublished: post.PressDate,
            }),
          ]}
        />
      )}
      <MainHeader />
      <section className="page-title press-bg">
        <Container>
          <div className="page-section-title">
            <h1>{post?.PressTitle || 'Press Release'}</h1>
            {post?.PressDate && (
              <p>{formatDateMMM(post.PressDate, 'MMM DD, YYYY')}</p>
            )}
          </div>
        </Container>
      </section>

      {post ? (
        <section className="press-main">
          <Container>
            <div className="press-item">
              {imageUrl && (
                <div className="press-img">
                  <Image
                    src={imageUrl}
                    width={347}
                    height={300}
                    alt={post.PressTitle || 'Press release'}
                  />
                </div>
              )}
              <div className="press-info">
                <h3>{post.PressTitle}</h3>
                <h5>{formatDateMMM(post.PressDate, 'MMM DD, YYYY')}</h5>
                {post.PressDescription &&
                  (isHTML(post.PressDescription) ? (
                    <div
                      className="press-description-html"
                      dangerouslySetInnerHTML={{ __html: post.PressDescription }}
                    />
                  ) : (
                    <p>{post.PressDescription}</p>
                  ))}
                <div className="d-flex flex-wrap gap-3 mt-4">
                  {post.PressUrl && (
                    <Link
                      href={post.PressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-style-arrow"
                    >
                      Read External Article <span><LuMoveRight /></span>
                    </Link>
                  )}
                  <Link
                    href="/press-release"
                    className="btn-style-arrow btn-theme-transparent"
                  >
                    All Press Releases <span><LuMoveRight /></span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="no-data py-4">
          <Container>
            <div className="section-title-dark text-center">
              <p>
                The press release you are looking for could not be found. Browse
                our latest announcements or return to the press release listing.
              </p>
              <Link href="/press-release" className="btn-style-arrow mt-3">
                View Press Releases <span><LuMoveRight /></span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      <AwardDev />
      <ClientReview />
      <TalkExpert />
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params?.slug;
  if (!slug || typeof slug !== 'string') {
    return { notFound: true };
  }

  setEdgeCache(context.res, 'long');

  try {
    const res = await fetch(
      `${REACT_APP_API_URL}presses?_sort=PressDate:desc`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      return { notFound: true };
    }
    const data = await res.json();
    const posts = Array.isArray(data) ? data : [];
    const post = findByContentSlug(posts, slug, pressSlug);
    if (!post) {
      return { notFound: true };
    }
    return { props: { post } };
  } catch {
    return { notFound: true };
  }
}

export default PressReleaseDetail;
