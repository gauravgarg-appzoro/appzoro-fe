import React, { useState, useEffect } from "react";
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import { setEdgeCache } from '../../lib/edgeCache';
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import TalkExpert from "../../components/common/TalkExpert";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import SeoJsonLd from "../../components/common/SeoJsonLd";
import { REACT_APP_API_URL } from "../../lib/constants";
import { buildBreadcrumbSchema, buildJobPostingSchema } from "../../lib/schemaBuilders";
import Image from "next/image";
const ReactMarkdown = dynamic(import("react-markdown"));

const HireDeveloperDetails = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    setPosts(initialPosts || []);
  }, [initialPosts]);

  const postData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const pageUrl = postData?.slug ? `/hire-developer/${postData.slug}` : '/hire-developer';
  return (
    <>
      <MetaData
        title={postData?.seo_title || postData?.job_title || 'Hire Developer | AppZoro'}
        description={postData?.seo_description || postData?.job_description?.slice?.(0, 160) || 'Hire dedicated mobile and web developers from AppZoro.'}
        url={pageUrl}
        image={DEFAULT_OG_IMAGE}
      />
      {postData && (
        <SeoJsonLd
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Hire Developer', url: '/hire-developer' },
              { name: postData.job_title || 'Role', url: pageUrl },
            ]),
            buildJobPostingSchema({
              title: postData.job_title,
              description: postData.job_description,
              url: pageUrl,
              datePosted: postData.createdAt || postData.published_at,
            }),
          ]}
        />
      )}
      <MainHeader />

      {postData ? (
        <>
          <section className="page-title service-bg">
            <Container>
              <div className="page-section-title">
                <h1>{postData?.job_title}</h1>
              </div>
            </Container>
          </section>
          <section className="py-4">
            <Container>
              <ReactMarkdown>{postData.job_description}</ReactMarkdown>
            </Container>
          </section>
        </>
      ) : (
        <section className="no-data py-4">
          <Container>
            <div className="section-title-dark text-center">
              <p>
                The record you are looking for could not be found.
                Double-check the URL or return to our home page to browse our services.
              </p>
            </div>
          </Container>
        </section>
      )}

      <TalkExpert />
      <Footer />
    </>
  );
};

export async function getServerSideProps(params) {
  setEdgeCache(params.res, 'long');
  const [postsRes] = await Promise.all([
    fetch(
      `${REACT_APP_API_URL}hire-developers?slug=${params.query.slug}`
    ),
  ]);
  const [posts] = await Promise.all([postsRes.json()]);
  return { props: { posts } };
}

export default HireDeveloperDetails;
