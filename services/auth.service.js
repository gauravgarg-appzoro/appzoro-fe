import { REACT_APP_API_URL } from '../lib/constants';

const TOKEN_KEY = 'appzoro_admin_token';
const USER_KEY = 'appzoro_admin_user';

const authService = {
    /**
     * Login with credentials
     */
    login: async (identifier, password) => {
        try {
            const baseUrl = (REACT_APP_API_URL || 'http://localhost:3001/').replace(/\/+$/, '');
            const response = await fetch(`${baseUrl}/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.jwt) {
                localStorage.setItem(TOKEN_KEY, data.jwt);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
                return { success: true, data };
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Login Error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Logout and clear session
     */
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
        }
    },

    /**
     * Get current JWT token
     */
    getToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Get current user info
     */
    getCurrentUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem(TOKEN_KEY);
    }
};

export default authService;
