import React, { useState } from 'react';
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { setEdgeCache } from '../../lib/edgeCache';
import Link from 'next/link';
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import { Container } from 'react-bootstrap';
import TalkExpert from '../../components/common/TalkExpert';
import Modal from 'react-bootstrap/Modal';
import dynamic from 'next/dynamic';
// Only loaded when the Apply Now modal is opened — keeps ~80KB of HubSpot
// form code out of the initial career-detail page bundle.
const HubspotForm = dynamic(() => import('react-hubspot-form'), { ssr: false });
import MetaData from '../../components/common/MetaData';
import SeoJsonLd from '../../components/common/SeoJsonLd';
import { buildBreadcrumbSchema, buildJobPostingSchema } from '../../lib/schemaBuilders';
import { HUBSPOT_FORM_ID, REACT_APP_API_URL } from '../../lib/constants';
import { LuMoveRight } from '../../components/OptimizedIcons';
import {
  careerSlug,
  findByContentSlug,
  normalizeListField,
} from '../../lib/contentSlug';

function stripHtml(text) {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const CareerDetail = ({ post }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const responsibilities = normalizeListField(post?.Responsibility);
  const requirements = normalizeListField(post?.Requirements);
  const pageSlug = post ? careerSlug(post) : '';
  const plainDetails = stripHtml(post?.Details);
  const metaDescription =
    plainDetails.slice(0, 160) ||
    `Apply for ${post?.Title || 'this role'} at AppZoro. ${post?.Experience || ''}`.trim();

  return (
    <>
      <MetaData
        title={
          post?.Title
            ? `${post.Title} | AppZoro Careers`
            : 'Career Opportunity | AppZoro'
        }
        description={
          metaDescription ||
          'Explore career opportunities at AppZoro Technologies in Atlanta.'
        }
        url={`/career/${pageSlug}`}
        image={DEFAULT_OG_IMAGE}
      />
      {post && (
        <SeoJsonLd
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Careers', url: '/career' },
              { name: post.Title || 'Role', url: `/career/${pageSlug}` },
            ]),
            buildJobPostingSchema({
              title: post.Title,
              description: plainDetails || metaDescription,
              url: `/career/${pageSlug}`,
              datePosted: post.published_at || post.createdAt,
            }),
          ]}
        />
      )}
      <MainHeader />
      <section className="page-title career-bg">
        <Container>
          <div className="page-section-title">
            <h1>{post?.Title || 'Career Opportunity'}</h1>
            {post?.Experience && <p>{post.Experience}</p>}
          </div>
        </Container>
      </section>

      {post ? (
        <section className="career-list">
          <Container>
            <div className="career-info mb-4">
              {post.Details && (
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: post.Details }}
                />
              )}
              {responsibilities.length > 0 && (
                <>
                  <h3>Responsibilities:</h3>
                  <ol>
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </>
              )}
              {requirements.length > 0 && (
                <>
                  <h3>Requirements:</h3>
                  <ol>
                    {requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
            <div className="d-flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="btn-style-arrow"
              >
                Apply Now <span><LuMoveRight /></span>
              </button>
              <Link
                href="/career"
                className="btn-style-arrow btn-theme-transparent"
              >
                All Openings <span><LuMoveRight /></span>
              </Link>
            </div>
          </Container>
        </section>
      ) : (
        <section className="no-data py-4">
          <Container>
            <div className="section-title-dark text-center">
              <p>
                The position you are looking for could not be found. Browse our
                current openings or return to the careers page.
              </p>
              <Link href="/career" className="btn-style-arrow mt-3">
                View Careers <span><LuMoveRight /></span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      <TalkExpert />
      <Footer />

      <Modal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        backdrop="static"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Let&apos;s Discuss how we will build a winning product along!</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="career-info">
            <h4 className="consult-message text-center mb-3">
              Someone will be in touch shortly!
            </h4>
            <HubspotForm
              portalId={HUBSPOT_FORM_ID?.PORTAL_ID}
              formId={HUBSPOT_FORM_ID?.CAREER}
              loading={
                <div className="loading-panel">
                  <div className="loading-text" data-text="Loading...">
                    Loading...
                  </div>
                </div>
              }
              cssClass="hubspot-link__container sproket"
            />
          </div>
        </Modal.Body>
      </Modal>
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
    const res = await fetch(`${REACT_APP_API_URL}careers`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return { notFound: true };
    }
    const data = await res.json();
    const posts = Array.isArray(data) ? data : [];
    const post = findByContentSlug(posts, slug, careerSlug);
    if (!post) {
      return { notFound: true };
    }
    return { props: { post } };
  } catch {
    return { notFound: true };
  }
}

export default CareerDetail;
