import React, { useEffect, useState } from 'react';
import { Navbar, Container, Dropdown, Nav, Button } from 'react-bootstrap';
import authService from '../../services/auth.service.js';
import { FaUserCircle, FaSignOutAlt, FaBars } from '../OptimizedIcons';

const Header = ({ toggleSidebar }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        authService.logout();
    };

    return (
        <Navbar
            bg="white"
            variant="light"
            expand="lg"
            className="shadow-sm border-bottom py-2 admin-header-fixed"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1030,
                backgroundColor: '#fff',
            }}
        >
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Button variant="link" className="text-dark me-3" onClick={toggleSidebar}>
                        <FaBars size={20} />
                    </Button>
                    <Navbar.Brand href="/admin" className="fw-bold text-dark d-flex align-items-center">
                        <img src="/assets/images/logo.png" alt="AppZoro" height="40" className="me-2" />
                        {/* AppZoro Admin */}
                    </Navbar.Brand>
                </div>

                <Nav className="ms-auto align-items-center">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center border-0 bg-transparent text-dark shadow-none">
                            <FaUserCircle size={24} className="text-secondary me-2" />
                            <span className="d-none d-md-inline fw-medium">{user ? user.username : 'Admin User'}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow border-0 mt-2">
                            <div className="px-3 py-2 border-bottom mb-2 bg-light">
                                <div className="fw-bold small">{user ? user.username : 'Admin'}</div>
                                <div className="text-muted small">{user ? user.email : 'admin@appzoro.com'}</div>
                            </div>
                            <Dropdown.Item href="#">Profile</Dropdown.Item>
                            <Dropdown.Item href="#">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center">
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
