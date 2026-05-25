import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { LuMoveRight } from './OptimizedIcons';

const PortfolioView = (portfolios) => {
    const portfolioData = portfolios.portfolios;
    return (
        <>
            {
                portfolioData.length > 0 &&
                portfolioData.map((p, indx) => {
                    return (
                        <div key={indx} className="portfolio-work">
                            <div className="row m-0 align-items-center">
                                <div className="col-lg-6 order-lg-2">
                                    <div className="portfolio-column-thumb">
                                        <div className="portfolio-work-bg">
                                            <Image
                                                src={`${STRAPI_IMAGE_BASE_URL}${p.Projectimg[0].url}`}
                                                alt={p.Projectimg[0].alternativeText}
                                                width="657"
                                                height="550"
                                                
                                            />
                                        </div>
                                        <div className={'portfolio-app ' + (p.web ? 'portfolio-web' : '')}>
                                            <Image
                                                src={`${STRAPI_IMAGE_BASE_URL}${p.Worklistscreenimg[0].url}`}
                                                alt={p.Worklistscreenimg[0].alternativeText}
                                                width="300"
                                                height="200"
                                                
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="portfolio-column-info">
                                        <h2>{p.Projectname}</h2>
                                        <p>{p.Projectdes}</p>
                                        <div className="case-action">
                                            <Link href={`/case-study/${p.slug}`} className="btn-style-arrow me-3">Explore more <span><LuMoveRight /></span></Link>
                                            {p.Casestudybtnlink &&
                                                <Link href={p.Casestudybtnlink} target="_blank" className="btn-style-arrow me-3">View Case study <span><LuMoveRight /></span></Link>
                                            }
                                            {p.web && false && (
                                                <Link href={p.Weblink} target="_blank" className="btn-style-arrow me-3">Visit Website <span><LuMoveRight /></span></Link>
                                            )}
                                        </div>
                                        <div className="app-store-action">
                                            <ul>
                                                {p.android && false && (
                                                    <li>
                                                        <a href={p.Playstorelink} target="_blank" rel="noreferrer">
                                                            <Image
                                                                src="/static/images/download_googlay_play.png"
                                                                alt="Google Play"
                                                                width="200"
                                                                height="59"
                                                                
                                                            />
                                                        </a>
                                                    </li>
                                                )}
                                                {p.ios && false && (
                                                    <li>
                                                        <a href={p.Appstorelink} target="_blank" rel="noreferrer">
                                                            <Image
                                                                src="/static/images/download_app_store.png"
                                                                alt="App Store"
                                                                width="200"
                                                                height="59"
                                                                
                                                            />
                                                        </a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}


PortfolioView.propTypes = {
    portfolios: PropTypes.array,
    // onTap: PropTypes.func.isRequired,
};


export default PortfolioView