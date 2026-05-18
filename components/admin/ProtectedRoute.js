import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authService from '../../services/auth.service.js';
import Loader from '../Loader';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            // Public routes within admin (like login) don't need protection here
            // but usually we wrap the whole AdminLayout.
            // If the current path is /admin/login, we don't need to redirect.
            if (router.pathname === '/admin/login') {
                setIsLoading(false);
                setIsAuthorized(true);
                return;
            }

            if (!authService.isAuthenticated()) {
                console.warn('User not authenticated, redirecting to login...');
                router.push('/admin/login');
            } else {
                setIsAuthorized(true);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [router.pathname]);

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthorized && router.pathname !== '/admin/login') {
        return null; // or a custom unauthorized message
    }

    return children;
};

export default ProtectedRoute;
