import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import TalkExpert from "../../components/common/TalkExpert";
import dynamic from "next/dynamic";
import MetaData from "../../components/common/MetaData";
import { REACT_APP_API_URL } from "../../lib/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
const ReactMarkdown = dynamic(import("react-markdown"));

const HireDeveloperDetails = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    setPosts(initialPosts || []);
  }, [initialPosts]);

  const postData = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const [checkData, setCheckData] = useState(null);
  useEffect(() => {
    setCheckData(["test", "test1", "test2"]);
  }, []);
  const pathname = usePathname();
  console.log("postdetails", postData);
  return (
    <>
      <MetaData
        title={postData?.seo_title}
        description={postData?.seo_description}
        url={`/locations/${postData?.slug}`}
        image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
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
  const [postsRes] = await Promise.all([
    fetch(
      `${REACT_APP_API_URL}hire-developers?slug=${params.query.slug}`
    ),
  ]);
  const [posts] = await Promise.all([postsRes.json()]);
  return { props: { posts } };
}

export default HireDeveloperDetails;
