import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import AwardDev from '../homePage/AwardDev'
import ClientReview from '../../components/common/ClientReview'
import TalkExpert from '../../components/common/TalkExpert'
import MetaData from '../../components/common/MetaData'
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from '../../lib/constants';
import { LuMoveRight } from '../../components/OptimizedIcons';
import { formatDateMMM } from '../../lib/rules';

const PressRelease = ({ posts }) => {
  const postData = posts;
  const [visibleItems, setVisibleItems] = useState(5);
  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 5);
  };

  return (
    <>
      <MetaData title="AppZoro Press Release | Announcements, Features, and Updates" description="Stay updated with AppZoro's announcements, PR and media features. Explore milestones and industry recognition as we shape the future of software development." url={`/press-release/`} image={`${REACT_APP_API_URL}/assets/images/az-logo-large.png`} />
      <MainHeader />
      <section className='page-title press-bg'>
        <Container>
          <div className='page-section-title'>
            <h1>Press Release</h1>
            <p>AppZoro is one of the Top Web and App Development Company and received several awards and acclamation for the delivered work. We have expanded our reach and deliverables as well periodically. Here are all the vital events that we always cherish.</p>
          </div>
        </Container>
      </section>
      <section className='press-main'>
        <Container>
          {
            posts?.slice(0, visibleItems).map((item, index) => (
              <div className='press-item' key={index}>
                <div className='press-img'>
                  <Image src={`${STRAPI_IMAGE_BASE_URL}${item.PressImage[0].url}`} width="347" height="300" alt={item.PressTitle} />
                </div>
                <div className='press-info'>
                  <h3>{item.PressTitle}</h3>
                  <h5>{formatDateMMM(item.PressDate, 'MMM DD, YYYY')}</h5>
                  <p>{item.PressDescription}</p>
                  <Link href={`${item.PressUrl ? item.PressUrl : "/press-release"}`} target='_blank' className='btn-style-arrow me-3'>Read More <span><LuMoveRight /></span></Link>
                </div>
              </div>
            ))
          }


        </Container>
      </section>
      {visibleItems < postData?.length && (
        <section className='load-more-blogs pt-3'>
          <Container className='text-center'>
            <button onClick={handleLoadMore} className="btn-style-arrow me-3 load-more-btn">Load More<span><LuMoveRight /></span></button>
          </Container>
        </section>
      )}
      <AwardDev />
      <ClientReview />
      <TalkExpert />
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${REACT_APP_API_URL}presses?_sort=PressDate:desc`);
  const postsdata = await res.json();
  const posts = postsdata.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return {
    props: {
      posts,
    },
  };
}

export default PressRelease