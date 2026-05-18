import React from 'react'
import ClientReviewCard from './ClientReviewCard';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import { STRAPI_IMAGE_BASE_URL } from '../lib/constants';
import { CiGlobe } from './OptimizedIcons';


const PortfolioDetails = ({ portfolio }) => {
    return (
        <>
            <section className='page-title portfolio-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h3>{portfolio?.portfolio?.Projectname}</h3>
                    </div>
                </Container>
            </section>
            <div className="main_container portfolio-detail-page-new">
                <div className="portfolio-main-banner">
                    <div className="container-fluid p-0">
                        <div className="row m-0 align-items-center">
                            <div className="col-lg-6 order-lg-2 pic-detail">
                                <figure>
                                    <Image
                                        className="port-pic"
                                        src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Projectimg[0]?.url}`}
                                        alt={portfolio?.portfolio?.Projectimg[0]?.alternativeText}
                                        width={657}
                                        height={525}
                                        
                                    />
                                    <Image className="dots" src="/assets/images/dot-rect.png" alt="App Development Atlanta" width="220" height="202"  />
                                </figure>
                            </div>
                            <div className="col-lg-6 portfolio-main-detail">
                                <h2>{portfolio?.portfolio?.Projectname}</h2>
                                <p>{portfolio?.portfolio?.Projectdes}</p>

                                <div className="portfolio-case-type">
                                    <ul>
                                        <li>
                                            <span>Industry</span>
                                            <p>{portfolio?.portfolio?.Industry}</p>
                                        </li>
                                        <li>
                                            <span>Services</span>
                                            <p>{portfolio?.portfolio?.Services}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="app-store-action">
                                    <ul>
                                        {portfolio?.portfolio?.android && (
                                            <li className='me-3'>
                                                <a href={portfolio?.portfolio?.Playstorelink} target="_blank" rel="noreferrer">
                                                    <Image
                                                        src="/assets/images/download_googlay_play.png"
                                                        alt="Google Play"
                                                        width="200"
                                                        height="59"
                                                        
                                                    />
                                                </a>
                                            </li>
                                        )}
                                        {portfolio?.portfolio?.ios && (
                                            <li className='me-3'>
                                                <a href={portfolio?.portfolio?.Appstorelink} target="_blank" rel="noreferrer">
                                                    <Image src="/assets/images/download_app_store.png" alt="App Store" width="200" height="59"  />
                                                </a>
                                            </li>
                                        )}

                                        {portfolio?.portfolio?.web && (
                                            <li>
                                                <a href={portfolio?.portfolio?.Weblink} target="_blank" rel="noreferrer">
                                                    Visit Website <CiGlobe />
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-case-study">
                        <h2>Case Study</h2>
                        <p className="lg-text">{portfolio?.portfolio?.Casestudytext}</p>
                        <p>
                            By <a href={portfolio?.portfolio?.Casestudybtnlink}>AppZoro</a>
                        </p>
                    </div>
                </div>

                <div className="portfolio-steps">
                    {portfolio?.portfolio?.Defineproblemtext && portfolio?.portfolio?.Defineproblemtext.length && (
                        <div className="port-steps-list">
                            <div className="row align-items-center m-0">
                                <div className="col-lg-6 port-step-details">
                                    <h2>
                                        <span>01</span> {portfolio?.portfolio?.Problemcushead ? portfolio?.portfolio?.Problemcushead : 'Defining the Problems'}
                                    </h2>
                                    <p>{portfolio.portfolio?.Defineproblemtext}</p>
                                </div>
                                <div className="col-lg-6 port-step-pic">
                                    <figure>
                                        <Image
                                            src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Defineproblemimg[0].url}`}
                                            alt={portfolio?.portfolio?.Defineproblemimg[0].alternativeText}
                                            width={657}
                                            height={525}
                                            
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )}

                    {portfolio?.portfolio?.Plansolutiontext && portfolio?.portfolio?.Plansolutiontext.length && (
                        <div className="port-steps-list">
                            <div className="row align-items-center m-0">
                                <div className="col-lg-6 port-step-details">
                                    <h2>
                                        <span>02</span> {portfolio?.portfolio?.Solutioncushead ? portfolio?.portfolio?.Solutioncushead : 'Plan & Solutions'}
                                    </h2>
                                    <p>{portfolio?.portfolio?.Plansolutiontext}</p>
                                </div>
                                <div className="col-lg-6 port-step-pic">
                                    <figure>
                                        <Image
                                            src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Plansolutionimg[0].url}`}
                                            alt={portfolio?.portfolio?.Plansolutionimg[0].alternativeText}
                                            width={657}
                                            height={525}
                                            
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )}

                    {portfolio?.portfolio?.Chellangestext && portfolio?.portfolio?.Chellangestext.length && (
                        <div className="port-steps-list">
                            <div className="row align-items-center m-0">
                                <div className="col-lg-6 port-step-details">
                                    <h2>
                                        <span>03</span> {portfolio?.portfolio?.Chellangecushead ? portfolio?.portfolio?.Chellangecushead : 'Key Challenges'}
                                    </h2>

                                    <p>{portfolio.portfolio?.Chellangestext}</p>
                                </div>
                                <div className="col-lg-6 port-step-pic">
                                    <figure>
                                        <Image
                                            src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Chellangesimg[0].url}`}
                                            alt={portfolio?.portfolio?.Chellangesimg[0].alternativeText}
                                            width={657}
                                            height={525}
                                            
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )}

                    {portfolio?.portfolio?.Techstacktext && portfolio?.portfolio?.Techstacktext.length && (
                        <div className="port-steps-list">
                            <div className="row  m-0">
                                <div className="col-lg-6 port-step-details">
                                    <h2>
                                        <span>04</span> {portfolio?.portfolio?.Techcushead ? portfolio.portfolio?.Techcushead : 'Technology Stack'}
                                    </h2>
                                    <p>{portfolio?.portfolio?.Techstacktext}</p>
                                    <div className="tech-list">
                                        {portfolio?.portfolio?.Platforms && portfolio?.portfolio?.Platforms.length > 0 && (
                                            <>
                                                <h5>Platform</h5>
                                                <ul>
                                                    {portfolio?.portfolio?.Platforms.map((p, i) => {
                                                        return <li key={i}>{p}</li>;
                                                    })}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <div className="tech-list">
                                        {portfolio.portfolio?.Designtools && portfolio.portfolio?.Designtools.length > 0 && (
                                            <>
                                                <h5>Design Tools</h5>
                                                <ul>
                                                    {portfolio?.portfolio?.Designtools.map((p, i) => {
                                                        return <li key={i}>{p}</li>;
                                                    })}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <div className="tech-list">
                                        {portfolio?.portfolio?.Frontendlang && portfolio?.portfolio?.Frontendlang.length > 0 && (
                                            <>
                                                <h5>Frontend Language</h5>
                                                <ul>
                                                    {portfolio?.portfolio?.Frontendlang.map((p, i) => {
                                                        return <li key={i}>{p}</li>;
                                                    })}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <div className="tech-list">
                                        {portfolio?.portfolio?.Backendlang && portfolio?.portfolio?.Backendlang.length > 0 && (
                                            <>
                                                <h5>Backend Language</h5>
                                                <ul>
                                                    {portfolio?.portfolio?.Backendlang.map((p, i) => {
                                                        return <li key={i}>{p}</li>;
                                                    })}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <div className="tech-list">
                                        {portfolio?.portfolio?.Databaselang && portfolio?.portfolio?.Databaselang.length > 0 && (
                                            <>
                                                <h5>Database Language</h5>
                                                <ul>
                                                    {portfolio?.portfolio?.Databaselang.map((p, i) => {
                                                        return <li key={i}>{p}</li>;
                                                    })}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-6 port-step-pic">
                                    <figure>
                                        <Image
                                            src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Techstackimg[0].url}`}
                                            alt={portfolio?.portfolio?.Techstackimg[0].alternativeText}
                                            width={657}
                                            height={525}
                                            
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )}
                    {portfolio?.portfolio?.Launchtext && portfolio?.portfolio?.Launchtext.length && (
                        <div className="port-steps-list">
                            <div className="row align-items-center m-0">
                                <div className="col-lg-6 port-step-details">
                                    <h2>
                                        <span>05</span> {portfolio?.portfolio?.Launchcushead ? portfolio?.portfolio?.Launchcushead : 'Delivery & Launch'}
                                    </h2>
                                    <p>{portfolio?.portfolio?.Launchtext}</p>
                                </div>
                                <div className="col-lg-6 port-step-pic">
                                    <figure>
                                        <Image
                                            src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Launchimg[0].url}`}
                                            alt={portfolio?.portfolio?.Launchimg[0].alternativeText}
                                            width={657}
                                            height={525}
                                            
                                        />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {(portfolio?.portfolio?.Clutchlink && portfolio?.portfolio?.Testimonialimg) &&
                    <div className="portfolio-client-review">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="headline center">
                                        <h2>Client Review</h2>
                                    </div>

                                    <div className="port-review-frame">
                                        <a href={portfolio?.portfolio?.Clutchlink} target="_blank" rel="noreferrer">
                                            <Image
                                                src={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Testimonialimg[0].url}`}
                                                alt={`${STRAPI_IMAGE_BASE_URL}${portfolio?.portfolio?.Testimonialimg[0].alternativeText}`}
                                                width={600}
                                                height={350}
                                                
                                            />
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
                {portfolio?.portfolio?.ClientReviewStatus && (
                    <ClientReviewCard
                        clientReview={portfolio?.portfolio?.ClientReview}
                        clientName={portfolio?.portfolio?.ClientName}
                        clientAvatar={portfolio?.portfolio?.ClientAvatar[0].url}
                    />
                )}

            </div>
        </>
    )
}

export default PortfolioDetails