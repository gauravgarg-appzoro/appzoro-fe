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

                    <div className="d-flex flex-grow-1">
                        <Sidebar isOpen={sidebarOpen} />

                        <main className="flex-grow-1 p-4" style={{ marginLeft: sidebarOpen ? '80px' : '250px', transition: 'margin 0.3s' }}>
                            {/* Mobile sidebar adjust logic needed usually, but for now simple desktop first */}
                            {/* Using media query/css logic for sidebar toggle usually, here relying on prop */}
                            {children}
                        </main>
                    </div>
                </div>
            </ProtectedRoute>

            <style jsx global>{`
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
