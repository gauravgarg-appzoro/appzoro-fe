import React from 'react'
import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { Container } from 'react-bootstrap'
import Link from 'next/link';
import MetaData from '../../components/common/MetaData';

const Privacy = () => {
    return (
        <>
        <MetaData title="Privacy Policies for Appzoro Technologies Inc." description="Appzoro Technologies provides you with answers to frequently asked questions. You can click on the various products and services we offer and clarify your doubts" url={`/privacy`} image={DEFAULT_OG_IMAGE} />
            <MainHeader />
            <section className='page-title press-bg'>
                <Container>
                    <div className='page-section-title'>
                        <h1>Privacy Policy</h1>
                        <p>We Value Your Privacy</p>
                    </div>
                </Container>
            </section>
            <section className='privacy-content'>
                <Container>
                    <p>
                        AppZoro Technologies Inc. (&ldquo;AppZoro&rdquo; or &ldquo;we&rdquo;), recognizes the need to
                        protect the privacy of the personal information we collect or you provide to us when you access
                        and use our website (www.appzoro.com) (the &ldquo;Website&rdquo;).
                    </p>
                    <p>
                        Therefore, we have adopted this privacy policy (the &ldquo;Privacy Policy&rdquo;), which sets
                        forth, among other things, the type of information that will be collected, the purpose and use
                        of the collected information, and your rights with regard to the collected information. By
                        accessing the Website, you are consenting to the collection and the use of your information by
                        Tenrocket, but only to the extent described herein. Should you wish to revoke your consent, you
                        may do so in accordance with the provisions of Section 4 below.
                    </p>
                    <p>
                        AppZoro may make modifications, deletions and/or additions to this Privacy Policy
                        (&ldquo;Changes&rdquo;) at any time. Changes will be effective:
                    </p>
                    <ul>
                        <li>
                            Thirty (30) days after AppZoro provides notice of the Changes, whether such notice is provided
                            through the Website user interface, is sent to the email address associated with your account
                            or otherwise.
                        </li>
                        <li>
                            When you opt-in or otherwise expressly agree to the Changes or a version of this Privacy
                            Policy incorporating the Changes, whichever comes first.
                        </li>
                    </ul>
                    <p>
                        Please note that the last update was performed on February 22, 2017. If the modified terms are
                        not acceptable, please do not access or use the Website.
                    </p>
                    <h5>Type and Purpose of Collection</h5>
                    <p>
                        We collect information at various points in the Website to facilitate its use by our customers.
                        Specifically, two types of information are collected:
                    </p>
                    <h5>Non-Personal Information</h5>
                    <p>
                        Upon accessing the Website, certain non-personal information will be automatically collected
                        without your knowledge or consent, such as your IP address and the referring website
                        (&ldquo;Non-Personal Information&rdquo;).We use Non-Personal Information to examine our traffic
                        and to view how our customers use the Website. This type of information will not allow you to be
                        personally identified. For example, we use &ldquo;cookies&rdquo;, which contains only certain
                        statistical information. You can instruct your computer to inform you whenever a cookie is being
                        sent, or you can disallow cookies through your web browser. If you do choose to disallow
                        cookies, your experience on the Website may be diminished, or your ability to choose some of the
                        options on the Website may be limited.
                    </p>
                    <h5>Identifying Personal Information</h5>
                    <p>
                        To utilize some portions of the Website or some of the services provided therein, you must first
                        provide personal information that will allow you to be identified (&ldquo;Personal
                        Information&rdquo;). This type of informationwill not be collected without your consent. The
                        purposes of the collection of Personal Information are the following:
                    </p>
                    <ul>
                        <li>To establish a relationship with you.</li>
                        <li>To facilitate your service with our affiliated service providers.</li>
                    </ul>
                    <p>For job postings and applications:</p>
                    <ul>
                        <li>To anticipate and resolve problems with your service.</li>
                        <li>To understand your needs and desires vis-à-vis the Website.</li>
                        <li>To update you on changes to our services or products, including new promotions.</li>
                    </ul>
                    <p>
                        We expressly acknowledge that we will not use your Personal Information for any other purposes
                        without your consent. Further, we will only collect Personal Information to the extent necessary
                        for the abovementioned purposes. The Personal Information we collect will vary depending on how
                        you are using the Website, but may include, without limitation, your address, phone number,
                        email address, and credit card information, resume, portfolio link and bank account information
                        for wiring purposes.
                    </p>
                    <h5>Right to Examine Information</h5>
                    <p>
                        You have the right to examine any of your Personal Information that we collect. Should you wish
                        to examine such information, please send us a written request to Info@AppZoro.com. We reserve
                        the right to charge you a reasonable administrative fee to access your information, as permitted
                        by applicable law. In certain cases we may not be able to provide you with access to all of your
                        Personal Information (ex: if the information also pertains to the Personal Information of
                        another user)
                    </p>
                    <h5>Withdrawal of Consent</h5>
                    <p>
                        You may withdraw your consent to the collection of Personal Information at any time by sending a
                        written request to Info@AppZoro.com. Upon receiving notice that you have revoked your consent,
                        we will stop using your Personal Information within a reasonable time, which will vary depending
                        on what information we have collected and for what purpose. Please note that we will send you an
                        email confirmation upon receipt of your request. Therefore, if you do not receive a confirmation
                        email, please contact us again with your request. If you do choose to withdraw such consent,
                        your experience on the Website may be diminished, or your ability to choose some of the options
                        on the Website or the services provided therein may be limited.
                    </p>
                    <h5>Sharing Information</h5>
                    <p>
                        We will not sell, rent or disclose to outside parties the information we collect, save and
                        except that we may share the collected information with other parties as follows.
                    </p>

                    <h5>Affiliated Service Providers</h5>
                    <p>
                        We have agreements with various affiliated service providers to facilitate the functioning of
                        the Website, with whom we may share the information we have collected. For example, we may share
                        your credit card information with the credit card service provider to process your purchase. All
                        Administrative service providers that we use are required to have the same level of privacy
                        protection as we have, and therefore we expect that your information will be handled with the
                        same level of care that we employ.
                    </p>
                    <h5>Job Postings and Applications</h5>
                    <p>
                        We may share the collected information to post a job posting and application, the whole as set
                        out in the Terms of Use (ex: applications will be shared with the relevant group of users).
                    </p>
                    <h5>Where required by law</h5>
                    <p>
                        We may share the collected information where required by law, specifically in response to a
                        demand from government authorities where such demand meets the legal requirements.
                    </p>
                    <h5>Statistical Analysis:</h5>
                    <p>
                        We may share Non-Personal Information and aggregated information with third parties for
                        advertising or marketing purposes. No Personal Information will be shared in this manner.
                    </p>
                    <h5>Transactions</h5>
                    <p>
                        In connection with, or during negotiations of, any merger, sale of company assets, financing or
                        acquisition, or in any other situation where collected information may be disclosed or
                        transferred as one of our business assets.
                    </p>
                    <h5>External Links</h5>
                    <p>
                        The Website contains links and references to other websites. We are not responsible for the
                        collection, use and disclosure of information, or the privacy practices of such websites, and we
                        expressly disclaim any liability relating thereto.
                    </p>
                    <h5>Terms of Use</h5>
                    <p>
                        This Privacy Policy is incorporated into and forms part of the Terms of Use, which outlines the
                        terms and conditions you agree to when accessing and using the Website.
                    </p>
                    <h5>Persons Under 18</h5>
                    <p>
                        The Website is not marketed toward persons under the age of 18. If AppZoro discovers that it has
                        inadvertently collected Personal Information about individuals under the age 18, it will
                        promptly delete such information.
                    </p>
                    <p>
                        Should you have any questions or comments concerning this Privacy Policy, please do not hesitate to contact us at <Link className="theme-text" href="mailto:Info@AppZoro.com">Info@AppZoro.com</Link>
                    </p>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Privacy

export async function getStaticProps() {
    return { props: {} }
}