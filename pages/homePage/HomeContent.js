import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';

import dynamic from "next/dynamic";
import {   RxArrowDown, RxArrowUp   } from '../../components/OptimizedIcons';

// const ReactMarkdown = dynamic(import('react-markdown'));

const HomeContent = () => {
    // const [data, setData] = useState();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    // const renderContent = () => {
    //     if (isExpanded) {
    //         return <ReactMarkdown>{data?.content}</ReactMarkdown>;
    //     } else {
    //         return <ReactMarkdown>{data?.content.substring(0, 350)}</ReactMarkdown>;
    //     }
    // };


    // useEffect(() => {
    //     fetchData()
    //         .then((result) => setData(result))
    //         .catch((error) => console.error('Error fetching data:', error));
    // }, []);

    //     try {
    //         const response = await fetch(`${REACT_APP_API_URL}home-page-content`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    return (
        <>
            <section className="content-about-view">
                <Container>
                    <div className='c-about-block'>
                        <div className="section-title text-start">
                            <h3>About AppZoro</h3>
                        </div>
                        <p>Appzoro is an award-winning mobile app development agency that works to convert your dreams into destinations. We leverage the proficiency of our expert mobile app developers to craft your digital desires in reality. With cutting-edge technologies, our team offers the best digital solution in the industry to meet your business requirements via the needed app.</p>
                        <p >Appzoro Technologies is a leading mobile app development agency in the state of Atlanta. Our team of seasoned app developers in Atlanta emphasizes inculcating feasibility into your visions and ideas. We are obsessed with your app approach as much as you do and hence, we even strive to boost the potential of underperforming apps. By partnering with the adept team of Appzoro Technologies, you will avail end-to-end iOS and Android app development and designing services. Together with the best-in-class web development, you will also get access to a comprehensive range of services from prototyping and testing to third-party integrations, version updates, and additional support. We integrate responsive UI/UX designs to drive a higher rate of user engagement and streamline deployments by employing a CI/CD approach.</p>
                        <div
                            style={{ display: isExpanded ? 'block' : 'none' }}
                            aria-hidden={!isExpanded}
                        >
                            <p>Whether you want a native app, a database-driven application, or a web-based digital solution, we have got you covered. AppZoro delivers high-end mobile app development services for all the needs of your enterprise. We make highly customizable desktop and mobile apps to help your business meet the ever-changing market demands of your customers.</p>
                            <p>We at AppZoro work with well-defined development processes compiled by thoughtful strategies. In addition, you get access to the deployment of cloud-based integrations and customized tools across all devices of the Android ecosystem. Our seasoned Android App developers in Atlanta are known for providing top-notch results with their skills and experience. Besides facilitating Android app development services in the city of Atlanta, Georgia, we also serve complete QA and testing of mobile applications.</p>
                        </div>
                        <div className="btn-animated-height text-center">
                            <button title="Read More" onClick={toggleReadMore} className='read-more-btn down-arrow'>{isExpanded ? <RxArrowUp /> : <RxArrowDown />}</button>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    )
}

export default HomeContent