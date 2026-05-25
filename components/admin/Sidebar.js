import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav, Collapse } from 'react-bootstrap';
import { FaTachometerAlt, FaBlog, FaBriefcase, FaNewspaper, FaGlobe, FaInfoCircle, FaCogs, FaUsers, FaBuilding, FaLaptopCode, FaFileAlt, FaBox, FaChevronDown, FaChevronRight, FaPhone, FaArchive, FaList, FaPen, FaLayerGroup, FaMicrochip, FaSitemap, FaUsersCog, FaHome, FaSearch, FaLink, FaRobot, FaStar } from '../OptimizedIcons';

const Sidebar = ({ isOpen }) => {
    const router = useRouter();
    const [companyOpen, setCompanyOpen] = useState(false);
    const [blogsOpen, setBlogsOpen] = useState(false);
    const [portfoliosOpen, setPortfoliosOpen] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);
    const [countryPagesOpen, setCountryPagesOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
        { name: 'User Management', path: '/admin/users', icon: <FaUsersCog /> },
        { name: 'Homepage', path: '/admin/homepage', icon: <FaHome /> },
        { name: 'Products', path: '/admin/products', icon: <FaBox /> },
        { name: 'Services', path: '/admin/services', icon: <FaCogs /> },
        { name: 'Client Reviews', path: '/admin/client-reviews', icon: <FaStar /> },

    ];

    const industriesMenuItems = [
        { name: 'All Industries', path: '/admin/industries', icon: <FaBuilding /> },
        { name: 'Industry Names', path: '/admin/industry/industry-names', icon: <FaList /> },
    ];

    const countryPagesMenuItems = [
        { name: 'All Country Pages', path: '/admin/country-pages', icon: <FaGlobe /> },
        { name: 'Location Data', path: '/admin/country-pages/location-data', icon: <FaList /> },
        { name: 'Location Common Services', path: '/admin/country-pages/location-common-services', icon: <FaList /> },
    ];

    const blogsMenuItems = [
        { name: 'All Blogs', path: '/admin/blogs', icon: <FaBlog /> },
        { name: 'Categories', path: '/admin/blogs/categories', icon: <FaList /> },
        { name: 'Writers', path: '/admin/blogs/writers', icon: <FaPen /> },
        { name: 'Archives', path: '/admin/blogs/archives', icon: <FaArchive /> },
    ];

    const portfoliosMenuItems = [
        { name: 'All Portfolios', path: '/admin/portfolios', icon: <FaBriefcase /> },
        { name: 'Portfolio Industries', path: '/admin/portfolios/industries', icon: <FaBuilding /> },
        { name: 'Tech Stacks', path: '/admin/portfolios/tech-stacks', icon: <FaLayerGroup /> },
        { name: 'Technologies', path: '/admin/portfolios/technologies', icon: <FaMicrochip /> },
    ];

    const companyMenuItems = [
        { name: 'About Us', path: '/admin/about-us', icon: <FaInfoCircle /> },
        { name: 'Press Release', path: '/admin/press', icon: <FaNewspaper /> },
        { name: 'Career', path: '/admin/career', icon: <FaBriefcase /> },
        { name: 'Contact Us', path: '/admin/contact-us', icon: <FaPhone /> },
    ];

    const seoMenuItems = [
        { name: 'Sitemap', path: '/admin/seo/sitemaps', icon: <FaSitemap /> },
        { name: 'URL Redirections', path: '/admin/seo/url-redirections', icon: <FaLink /> },
        { name: 'Robots.txt', path: '/admin/seo/robots-txt', icon: <FaRobot /> },
    ];

    const isPortfoliosActive =
        portfoliosMenuItems.some((item) => router.pathname === item.path) ||
        router.pathname.startsWith('/admin/portfolios/');
    const isBlogsActive =
        blogsMenuItems.some((item) => router.pathname === item.path) ||
        router.pathname.startsWith('/admin/blogs/');
    const isCompanyActive = companyMenuItems.some(item => router.pathname === item.path);

    const isSeoActive = seoMenuItems.some(item => router.pathname === item.path);
    const isIndustriesActive =
        industriesMenuItems.some((item) => router.pathname === item.path) ||
        router.pathname.startsWith('/admin/industry/');
    const isCountryPagesActive = countryPagesMenuItems.some(item => router.pathname === item.path);

    return (
        <div
            className={`border-end position-fixed start-0 transition-all`}
            style={{
                width: isOpen ? '80px' : '250px',
                zIndex: 1000,
                top: '64px',
                bottom: 0,
                overflowY: 'auto',
                paddingBottom: '40px',
                backgroundColor: '#3c4b64',
                borderColor: '#2d3a4d'
            }}
        >
            <Nav className="flex-column py-3 px-2 gap-1">
                {menuItems.map((item, index) => {
                    const isActive = router.pathname === item.path;
                    return (
                        <Link href={item.path} key={index} passHref legacyBehavior>
                            <Nav.Link
                                className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                    }`}
                                style={{
                                    fontSize: '14px',
                                    transition: 'all 0.2s',
                                    backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                    opacity: isActive ? 1 : 0.8,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.opacity = '1';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.opacity = '0.8';
                                    }
                                }}
                            >
                                <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}>{item.icon}</span>
                                {!isOpen && <span>{item.name}</span>}
                            </Nav.Link>
                        </Link>
                    );
                })}



                {/* Country Pages Menu with Submenu */}
                <div>
                    <div
                        className={`d-flex align-items-center justify-content-between px-2 py-2 mb-1 rounded ${isCountryPagesActive ? 'bg-primary text-white' : 'text-light'}`}
                        style={{
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isCountryPagesActive ? '#0d6efd' : 'transparent',
                            opacity: isCountryPagesActive ? 1 : 0.8,
                        }}
                        onClick={() => setCountryPagesOpen(!countryPagesOpen)}
                        onMouseEnter={(e) => {
                            if (!isCountryPagesActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isCountryPagesActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '0.8';
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}><FaGlobe /></span>
                            {!isOpen && <span>Country Pages</span>}
                        </div>
                        {!isOpen && (countryPagesOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                    </div>

                    <Collapse in={countryPagesOpen}>
                        <div>
                            {countryPagesMenuItems.map((item, index) => {
                                const isActive = router.pathname === item.path;
                                return (
                                    <Link href={item.path} key={index} passHref legacyBehavior>
                                        <Nav.Link
                                            className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                                }`}
                                            style={{
                                                fontSize: '13px',
                                                marginLeft: isOpen ? '0' : '14px',
                                                transition: 'all 0.2s',
                                                backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                                opacity: isActive ? 1 : 0.7,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.7';
                                                }
                                            }}
                                        >
                                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '14px' }}>{item.icon}</span>
                                            {!isOpen && <span>{item.name}</span>}
                                        </Nav.Link>
                                    </Link>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>

                {/* Industries - single link (no collapse) */}
                {industriesMenuItems.map((item, index) => {
                    const isActive = router.pathname === item.path;
                    return (
                        <Link href={item.path} key={index} passHref legacyBehavior>
                            <Nav.Link
                                className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'}`}
                                style={{
                                    fontSize: '14px',
                                    transition: 'all 0.2s',
                                    backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                    opacity: isActive ? 1 : 0.8,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.opacity = '1';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.opacity = '0.8';
                                    }
                                }}
                            >
                                <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}>{item.icon}</span>
                                {!isOpen && <span>{item.name}</span>}
                            </Nav.Link>
                        </Link>
                    );
                })}


                {/* Portfolios Menu with Submenu */}
                <div>
                    <div
                        className={`d-flex align-items-center justify-content-between px-2 py-2 mb-1 rounded ${isPortfoliosActive ? 'bg-primary text-white' : 'text-light'}`}
                        style={{
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isPortfoliosActive ? '#0d6efd' : 'transparent',
                            opacity: isPortfoliosActive ? 1 : 0.8,
                        }}
                        onClick={() => setPortfoliosOpen(!portfoliosOpen)}
                        onMouseEnter={(e) => {
                            if (!isPortfoliosActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isPortfoliosActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '0.8';
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}><FaBriefcase /></span>
                            {!isOpen && <span>Portfolios</span>}
                        </div>
                        {!isOpen && (portfoliosOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                    </div>

                    <Collapse in={portfoliosOpen}>
                        <div>
                            {portfoliosMenuItems.map((item, index) => {
                                const isActive = router.pathname === item.path;
                                return (
                                    <Link href={item.path} key={index} passHref legacyBehavior>
                                        <Nav.Link
                                            className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                                }`}
                                            style={{
                                                fontSize: '13px',
                                                marginLeft: isOpen ? '0' : '14px',
                                                transition: 'all 0.2s',
                                                backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                                opacity: isActive ? 1 : 0.7,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.7';
                                                }
                                            }}
                                        >
                                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '14px' }}>{item.icon}</span>
                                            {!isOpen && <span>{item.name}</span>}
                                        </Nav.Link>
                                    </Link>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>

                {/* Blogs Menu with Submenu */}

                <div>
                    <div
                        className={`d-flex align-items-center justify-content-between px-2 py-2 mb-1 rounded ${isBlogsActive ? 'bg-primary text-white' : 'text-light'}`}
                        style={{
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isBlogsActive ? '#0d6efd' : 'transparent',
                            opacity: isBlogsActive ? 1 : 0.8,
                        }}
                        onClick={() => setBlogsOpen(!blogsOpen)}
                        onMouseEnter={(e) => {
                            if (!isBlogsActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isBlogsActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '0.8';
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}><FaBlog /></span>
                            {!isOpen && <span>Blogs</span>}
                        </div>
                        {!isOpen && (blogsOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                    </div>

                    <Collapse in={blogsOpen}>
                        <div>
                            {blogsMenuItems.map((item, index) => {
                                const isActive = router.pathname === item.path;
                                return (
                                    <Link href={item.path} key={index} passHref legacyBehavior>
                                        <Nav.Link
                                            className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                                }`}
                                            style={{
                                                fontSize: '13px',
                                                marginLeft: isOpen ? '0' : '14px',
                                                transition: 'all 0.2s',
                                                backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                                opacity: isActive ? 1 : 0.7,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.7';
                                                }
                                            }}
                                        >
                                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '14px' }}>{item.icon}</span>
                                            {!isOpen && <span>{item.name}</span>}
                                        </Nav.Link>
                                    </Link>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>

                {/* Company Menu with Submenu */}
                <div>
                    <div
                        className={`d-flex align-items-center justify-content-between px-2 py-2 mb-1 rounded ${isCompanyActive ? 'bg-primary text-white' : 'text-light'}`}
                        style={{
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isCompanyActive ? '#0d6efd' : 'transparent',
                            opacity: isCompanyActive ? 1 : 0.8,
                        }}
                        onClick={() => setCompanyOpen(!companyOpen)}
                        onMouseEnter={(e) => {
                            if (!isCompanyActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isCompanyActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '0.8';
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}><FaBuilding /></span>
                            {!isOpen && <span>Company</span>}
                        </div>
                        {!isOpen && (companyOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                    </div>

                    <Collapse in={companyOpen}>
                        <div>
                            {companyMenuItems.map((item, index) => {
                                const isActive = router.pathname === item.path;
                                return (
                                    <Link href={item.path} key={index} passHref legacyBehavior>
                                        <Nav.Link
                                            className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                                }`}
                                            style={{
                                                fontSize: '13px',
                                                marginLeft: isOpen ? '0' : '14px',
                                                transition: 'all 0.2s',
                                                backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                                opacity: isActive ? 1 : 0.7,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.7';
                                                }
                                            }}
                                        >
                                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '14px' }}>{item.icon}</span>
                                            {!isOpen && <span>{item.name}</span>}
                                        </Nav.Link>
                                    </Link>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>

                {/* SEO Management Menu with Submenu */}
                <div>
                    <div
                        className={`d-flex align-items-center justify-content-between px-2 py-2 mb-1 rounded ${isSeoActive ? 'bg-primary text-white' : 'text-light'}`}
                        style={{
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isSeoActive ? '#0d6efd' : 'transparent',
                            opacity: isSeoActive ? 1 : 0.8,
                        }}
                        onClick={() => setSeoOpen(!seoOpen)}
                        onMouseEnter={(e) => {
                            if (!isSeoActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSeoActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.opacity = '0.8';
                            }
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '16px' }}><FaSearch /></span>
                            {!isOpen && <span>SEO Management</span>}
                        </div>
                        {!isOpen && (seoOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />)}
                    </div>

                    <Collapse in={seoOpen}>
                        <div>
                            {seoMenuItems.map((item, index) => {
                                const isActive = router.pathname === item.path;
                                return (
                                    <Link href={item.path} key={index} passHref legacyBehavior>
                                        <Nav.Link
                                            className={`d-flex align-items-center px-2 py-2 mb-1 rounded ${isActive ? 'bg-primary text-white' : 'text-light'
                                                }`}
                                            style={{
                                                fontSize: '13px',
                                                marginLeft: isOpen ? '0' : '14px',
                                                transition: 'all 0.2s',
                                                backgroundColor: isActive ? '#0d6efd' : 'transparent',
                                                opacity: isActive ? 1 : 0.7,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.7';
                                                }
                                            }}
                                        >
                                            <span className={isOpen ? 'me-0' : 'me-3'} style={{ fontSize: '14px' }}>{item.icon}</span>
                                            {!isOpen && <span>{item.name}</span>}
                                        </Nav.Link>
                                    </Link>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>
            </Nav>
        </div>
    );
};

export default Sidebar;
