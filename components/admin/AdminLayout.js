import React, { useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute.js';

const AdminLayout = ({ children, title = 'Admin Dashboard' }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Head>
                <title>{`${title} | AppZoro Admin`}</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <ProtectedRoute>
                <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
                    <Header toggleSidebar={toggleSidebar} />

                    {/* paddingTop clears the fixed header (Navbar py-2 + logo h=40px ≈ 56px). */}
                    <div className="d-flex flex-grow-1" style={{ paddingTop: '64px' }}>
                        <Sidebar isOpen={sidebarOpen} />

                        <main className="flex-grow-1 p-4" style={{ marginLeft: sidebarOpen ? '80px' : '250px', transition: 'margin 0.3s' }}>
                            {children}
                        </main>
                    </div>
                </div>
            </ProtectedRoute>

            <style jsx global>{`
        /* Admin navbar must stay fixed at the top while page content scrolls. */
        .admin-header-fixed {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1030 !important;
            background-color: #fff !important;
        }

        @media (max-width: 991.98px) {
            main {
                margin-left: 0 !important;
            }
        }
      `}</style>
        </>
    );
};

export default AdminLayout;
