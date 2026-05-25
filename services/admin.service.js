import { REACT_APP_API_URL } from '../lib/constants.js';
import authService from './auth.service.js';

/**
 * Admin API Endpoints - Uses existing backend routes
 */
const ENDPOINTS = {
    POSTS: 'posts',
    POSTS_COUNT: 'posts/count',
    UPLOAD: 'upload',
    UPLOAD_FILES: 'upload/files',
    CATEGORIES: 'categories',
    CATEGORIES_COUNT: 'categories/count',
    ARCHIVES: 'archives',
    ARCHIVES_COUNT: 'archives/count',
    WRITERS: 'writers',
    WRITERS_COUNT: 'writers/count',
    SERVICES: 'services',
    SERVICES_COUNT: 'services/count',
    PRODUCTS: 'products',
    PRODUCTS_COUNT: 'products/count',
    PRESS: 'presses',
    PRESS_COUNT: 'presses/count',
    LOCATION_COMMON_SERVICES: 'location-common-services',
    LOCATION_COMMON_SERVICES_COUNT: 'location-common-services/count',
    LOCATION_DATA: 'locations-news',
    LOCATION_DATA_COUNT: 'locations-news/count',

    CAREERS: 'careers',
    CAREERS_COUNT: 'careers/count',
    USERS: 'users',
    URL_REDIRECTIONS: 'url-redirections',
    URL_REDIRECTIONS_COUNT: 'url-redirections/count',
};

/**
 * Build URL with query parameters
 */
const buildUrl = (endpoint, params = {}) => {
    // Ensure base URL ends without trailing slash
    const baseUrl = (REACT_APP_API_URL || 'http://localhost:3001/').replace(/\/+$/, '');

    // Build query string
    const queryParts = [];
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    });

    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return `${baseUrl}/${endpoint}${queryString}`;
};

/**
 * Append a cache-busting timestamp query param to a URL.
 */
const withNoCacheParam = (url) => {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}_ts=${Date.now()}`;
};

/**
 * Generic fetch wrapper
 */
const apiFetch = async (url, options = {}) => {
    const { allowNotFound = false, ...fetchOptions } = options;

    try {
        console.log('API Request:', url, fetchOptions.method || 'GET'); // Debug log

        const token = authService.getToken();
        const headers = {
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...fetchOptions.headers,
        };

        // Only set Content-Type to application/json if body is present and it's not FormData
        if (fetchOptions.body && typeof fetchOptions.body === 'string' && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const method = (fetchOptions.method || 'GET').toUpperCase();
        const response = await fetch(url, {
            ...fetchOptions,
            // Prevent browser/proxy stale reads in admin after update.
            ...(method === 'GET' ? { cache: 'no-store' } : {}),
            headers,
        });

        if (response.status === 401) {
            console.warn('Unauthorized request. Logging out...');
            authService.logout();
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            if (allowNotFound && response.status === 404) {
                return null;
            }
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // Handle 204 No Content (DELETE often returns this)
        if (response.status === 204) {
            return { success: true };
        }

        const jsonResponse = await response.json();

        // Unwrap standard { data: ... } response from NestJS Global Interceptor
        if (jsonResponse && jsonResponse.data !== undefined && Object.keys(jsonResponse).length === 1) {
            return jsonResponse.data;
        }

        return jsonResponse;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * Admin Service
 * 
 * Uses EXISTING backend endpoints for blog management.
 */
const adminService = {
    /* =============================
     * POSTS
     * ============================= */

    /**
     * Get all posts with pagination, sorting, and filtering
     */
    getAllPosts: async (options = {}) => {
        const {
            page = 0,
            limit = 10,
            sort = 'createdAt:DESC',
            search = '',
            category = '',
            archive = '',
        } = options;

        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
            _includeDrafts: 'true', // Admin needs to see all posts including drafts
        };

        // Add optional filters
        if (search) {
            params.title_contains = search;
        }
        if (category) {
            params.categories = category;
        }
        if (archive) {
            params.archive = archive;
        }

        try {
            const url = buildUrl(ENDPOINTS.POSTS, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Get total count of posts
     */
    getPostsCount: async (options = {}) => {
        const { search = '', category = '', archive = '' } = options;
        const params = {
            _includeDrafts: 'true', // Admin needs total count including drafts
        };

        if (search) params.title_contains = search;
        if (category) params.categories = category;
        if (archive) params.archive = archive;

        try {
            const url = buildUrl(ENDPOINTS.POSTS_COUNT, params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    /**
     * Get single post by ID
     */
    getPostById: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.POSTS}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message, data: null };
        }
    },

    /**
     * Create new post
     */
    createPost: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.POSTS);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            const doc = result?.data !== undefined ? result.data : result;
            const id = doc?.id ?? doc?._id;
            const responseData = id != null ? { ...doc, id: id.toString?.() ?? id } : doc;
            return { success: true, data: responseData };
        } catch (error) {
            return { success: false, error: error.message, data: null };
        }
    },

    /**
     * Update existing post
     */
    updatePost: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.POSTS}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message, data: null };
        }
    },

    /**
     * Delete post
     */
    deletePost: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.POSTS}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * IMAGE UPLOAD
     * ============================= */

    /**
     * Upload image file
     */
    uploadImage: async (file, fileInfo = {}) => {
        try {
            const formData = new FormData();
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            formData.append('files', file, sanitizedName);

            const info = {
                alternativeText: fileInfo.alternativeText || fileInfo.alt_text || '',
                caption: fileInfo.caption || '',
                name: fileInfo.name || file.name,
            };
            formData.append('fileInfo', JSON.stringify(info));

            const url = buildUrl(ENDPOINTS.UPLOAD);
            const token = authService.getToken();
            const headers = {
                'Accept': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData,
            });

            if (response.status === 401) {
                authService.logout();
                return { success: false, error: 'Unauthorized', data: null };
            }
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
            }

            const result = await response.json();
            const uploadedFile = Array.isArray(result) ? result[0] : result;
            return { success: true, data: uploadedFile };
        } catch (error) {
            return { success: false, error: error.message, data: null };
        }
    },

    updateFileInfo: async (fileId, fileInfo) => {
        try {
            const url = buildUrl(`upload/files/${fileId}`);
            const body = {};
            if (fileInfo.alternativeText !== undefined || fileInfo.alt_text !== undefined) {
                body.alternativeText = fileInfo.alternativeText || fileInfo.alt_text || '';
            }
            if (fileInfo.caption !== undefined) body.caption = fileInfo.caption;
            if (fileInfo.name !== undefined) body.name = fileInfo.name;

            return await apiFetch(url, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
        } catch (error) {
            console.error('Error updating file info:', error);
            return null;
        }
    },

    /**
     * Get all uploaded files
     */
    getUploadedFiles: async (options = {}) => {
        const { start = 0, limit = 100 } = options;
        try {
            const url = buildUrl(ENDPOINTS.UPLOAD_FILES, { _start: start, _limit: limit });
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    /* =============================
     * CATEGORIES
     * ============================= */

    getCategories: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'name:ASC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.name_contains = search; // Adjust filter based on backend logic usually 'name'

        try {
            const url = buildUrl(ENDPOINTS.CATEGORIES, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    getCategoriesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.name_contains = search;
        try {
            const url = buildUrl(ENDPOINTS.CATEGORIES_COUNT, params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getCategory: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.CATEGORIES}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createCategory: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.CATEGORIES);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateCategory: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.CATEGORIES}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteCategory: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.CATEGORIES}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * ARCHIVES
     * ============================= */

    getArchives: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'name:DESC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.name_contains = search;

        try {
            const url = buildUrl(ENDPOINTS.ARCHIVES, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    getArchivesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.name_contains = search;
        try {
            const url = buildUrl(ENDPOINTS.ARCHIVES_COUNT, params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getArchive: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.ARCHIVES}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createArchive: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.ARCHIVES);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateArchive: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.ARCHIVES}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteArchive: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.ARCHIVES}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },



    /* =============================
     * WRITERS
     * ============================= */

    getWriters: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'name:ASC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.name_contains = search;

        try {
            const url = buildUrl(ENDPOINTS.WRITERS, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    getWritersCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.name_contains = search;
        try {
            const url = buildUrl(ENDPOINTS.WRITERS_COUNT, params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getWriter: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.WRITERS}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createWriter: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.WRITERS);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateWriter: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.WRITERS}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteWriter: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.WRITERS}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * SERVICES
     * ============================= */

    /**
     * Get all services with pagination, sorting, and filtering
     */
    /**
     * Get all services with pagination, sorting, and filtering
     */
    getAllServices: async (options = {}) => {
        const {
            page = 0,
            limit = 10,
            sort = 'createdAt:DESC',
            search = '',
            serviceTitle = '',
            includeDrafts = false,
        } = options;

        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
            includeDrafts: includeDrafts ? 'true' : 'false',
        };

        // Add optional filters
        if (search) {
            params.slug = search;
        }
        if (serviceTitle) {
            params.serviceTitle = serviceTitle;
        }

        try {
            const url = buildUrl(ENDPOINTS.SERVICES, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Get total count of services
     */
    getServicesCount: async (options = {}) => {
        const { search = '', serviceTitle = '', includeDrafts = false } = options;
        const params = {
            includeDrafts: includeDrafts ? 'true' : 'false',
        };

        if (search) {
            params.slug = search;
        }
        if (serviceTitle) {
            params.serviceTitle = serviceTitle;
        }

        try {
            const url = buildUrl(ENDPOINTS.SERVICES_COUNT, params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, error: error.message, count: 0 };
        }
    },

    /**
     * Get single service by ID
     */
    getServiceById: async (id) => {
        try {
            const url = withNoCacheParam(buildUrl(`${ENDPOINTS.SERVICES}/${id}`));
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Create new service
     */
    createService: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.SERVICES);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Update existing service
     */
    updateService: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.SERVICES}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /**
     * Delete service
     */
    deleteService: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.SERVICES}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    duplicateService: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.SERVICES}/${id}/duplicate`);
            const result = await apiFetch(url, { method: 'POST' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    /* =============================
     * PORTFOLIO HELPERS & SUB-MODULES
     * ============================= */

    /* TECH STACKS */
    getTechStacks: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'tech_name:ASC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.tech_name = search;
        try {
            const url = buildUrl('tech-stacks', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    createTechStack: async (data) => {
        try {
            const url = buildUrl('tech-stacks');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateTechStack: async (id, data) => {
        try {
            const url = buildUrl(`tech-stacks/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteTechStack: async (id) => {
        try {
            const url = buildUrl(`tech-stacks/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getTechStack: async (id) => {
        try {
            const url = buildUrl(`tech-stacks/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getTechStacksCount: async (options = {}) => {
        const params = {};
        if (options.search) params.tech_name = options.search;
        try {
            const url = buildUrl('tech-stacks/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    /* TECHNOLOGIES */
    getTechnologies: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'techTitle:ASC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
            includeDrafts: 'true',
        };
        if (search) params.techTitle = search;
        try {
            const url = buildUrl('technologies', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    getTechnologiesCount: async (options = {}) => {
        const params = { includeDrafts: 'true' };
        if (options.search) params.techTitle = options.search;
        try {
            const url = buildUrl('technologies/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    createTechnology: async (data) => {
        try {
            const url = buildUrl('technologies');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateTechnology: async (id, data) => {
        try {
            const url = buildUrl(`technologies/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteTechnology: async (id) => {
        try {
            const url = buildUrl(`technologies/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getTechnology: async (id) => {
        try {
            const url = buildUrl(`technologies/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* INDUSTRY NAMES (Dropdown) */
    getIndustryNames: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'name:ASC', search = '' } = options;
        const params = {
            _sort: sort,
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.name = search;
        try {
            const url = buildUrl('industry-names', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    getIndustryNamesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.name = search;
        try {
            const url = buildUrl('industry-names/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getIndustryName: async (id) => {
        try {
            const url = buildUrl(`industry-names/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createIndustryName: async (data) => {
        try {
            const url = buildUrl('industry-names');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateIndustryName: async (id, data) => {
        try {
            const url = buildUrl(`industry-names/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteIndustryName: async (id) => {
        try {
            const url = buildUrl(`industry-names/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* INDUSTRY CONTENT (Full Pages) */
    getIndustries: async (options = {}) => {
        const query = new URLSearchParams();
        query.append('includeDrafts', 'true');
        if (options.page) query.append('_start', options.page * (options.limit || 10));
        if (options.limit) query.append('_limit', options.limit);
        if (options.sort) query.append('_sort', options.sort);
        if (options.search) query.append('Title', options.search);

        const url = buildUrl(`induustries?${query.toString()}`);
        return await apiFetch(url);
    },
    getIndustriesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.Title = search;
        try {
            const url = buildUrl('induustries/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getIndustry: async (id) => {
        const url = withNoCacheParam(buildUrl(`induustries/${id}`));
        return await apiFetch(url);
    },

    /* HOMEPAGE (Singleton) */
    getHomepage: async () => {
        // Cache-bust the GET so the admin form always sees the latest saved data,
        // not a stale response cached upstream (CDN/HTTP cache) or by any proxy.
        // Without this, saved edits revert to old content after handleSave →
        // fetchHomepageData() re-populates form from cached stale GET response.
        const url = withNoCacheParam(buildUrl('homepage'));
        return await apiFetch(url);
    },

    updateHomepage: async (data) => {
        // Cache-bust the PUT URL too so any intermediate proxy doesn't dedupe
        // identical PUT requests as cached. Also forces the upstream to bust
        // its cache entry for the homepage GET response.
        const url = withNoCacheParam(buildUrl('homepage'));
        return await apiFetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /* COUNTRY PAGES */
    getCountryPages: async (options = {}) => {
        const { page = 0, limit = 10, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit, includeDrafts: 'true' };
        if (search) params.title_contains = search;
        try {
            const url = buildUrl('country-pages', params);
            const data = await apiFetch(url);
            return { success: true, data: Array.isArray(data) ? data : (data?.data ?? []) };
        } catch (error) {
            return { success: false, data: [], error: error.message };
        }
    },
    getCountryPagesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.title_contains = search;
        try {
            const url = buildUrl('country-pages/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getCountryPage: async (id) => {
        const url = buildUrl(`country-pages/${id}`);
        return await apiFetch(url);
    },

    createCountryPage: async (data) => {
        try {
            const url = buildUrl('country-pages');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            const doc = result?.data !== undefined ? result.data : result;
            const id = doc?.id ?? doc?._id;
            return { success: true, data: id != null ? { ...doc, id: id.toString?.() ?? id } : doc };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateCountryPage: async (id, data) => {
        try {
            const url = buildUrl(`country-pages/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            const doc = result?.data !== undefined ? result.data : result;
            return { success: true, data: doc };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteCountryPage: async (id) => {
        const url = buildUrl(`country-pages/${id}`);
        return await apiFetch(url, {
            method: 'DELETE',
        });
    },

    createIndustry: async (data) => {
        try {
            const url = buildUrl('induustries');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            const doc = result?.data !== undefined ? result.data : result;
            const id = doc?.id ?? doc?._id;
            return { success: true, data: id != null ? { ...doc, id: id.toString?.() ?? id } : doc };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateIndustry: async (id, data) => {
        try {
            const url = buildUrl(`induustries/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            const doc = result?.data !== undefined ? result.data : result;
            return { success: true, data: doc };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteIndustry: async (id) => {
        const url = buildUrl(`induustries/${id}`);
        return await apiFetch(url, {
            method: 'DELETE',
        });
    },

    /* =============================
     * OUR PORTFOLIOS (Case Studies)
     * ============================= */
    getPortfolios: async (options = {}) => {
        const { page = 0, limit = 10, sort = 'updatedAt:DESC', industry = '', tech_stack = '' } = options;
        const params = { _start: page * limit, _limit: limit, _sort: sort, includeDrafts: 'true' };
        if (industry) params.industry = industry;
        if (tech_stack) params.tech_stack = tech_stack;
        try {
            const url = buildUrl('our-portfolios', params);
            const data = await apiFetch(url);
            const list = Array.isArray(data) ? data : (data?.data ?? data ?? []);
            return { success: true, data: list };
        } catch (error) {
            return { success: false, data: [], error: error.message };
        }
    },

    getPortfoliosCount: async (options = {}) => {
        const { industry = '', tech_stack = '' } = options;
        const params = { includeDrafts: 'true' };
        if (industry) params.industry = industry;
        if (tech_stack) params.tech_stack = tech_stack;
        try {
            const url = buildUrl('our-portfolios/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getPortfolio: async (id) => {
        try {
            const url = buildUrl(`our-portfolios/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createPortfolio: async (data) => {
        try {
            const url = buildUrl('our-portfolios');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updatePortfolio: async (id, data) => {
        try {
            const url = buildUrl(`our-portfolios/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deletePortfolio: async (id) => {
        try {
            const url = buildUrl(`our-portfolios/${id}`);
            await apiFetch(url, { method: 'DELETE' });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * CAREERS
     * ============================= */
    getCareers: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit, includeDrafts: 'true' };
        if (search) params.Title_contains = search;
        try {
            const url = buildUrl('careers', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getCareersCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.Title_contains = search;
        try {
            const url = buildUrl('careers/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getCareer: async (id) => {
        const url = buildUrl(`careers/${id}`);
        return await apiFetch(url);
    },
    createCareer: async (data) => {
        try {
            const url = buildUrl('careers');
            const result = await apiFetch(url, { method: 'POST', body: JSON.stringify(data) });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateCareer: async (id, data) => {
        try {
            const url = buildUrl(`careers/${id}`);
            const result = await apiFetch(url, { method: 'PUT', body: JSON.stringify(data) });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteCareer: async (id) => {
        try {
            const url = buildUrl(`careers/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * PRODUCTS
     * ============================= */
    getProducts: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit, includeDrafts: 'true' };
        if (search) params.heading_contains = search;
        try {
            const url = buildUrl('products', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getProductsCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.heading_contains = search;
        try {
            const url = buildUrl('products/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getProduct: async (id) => {
        const url = withNoCacheParam(buildUrl(`products/${id}`));
        return await apiFetch(url);
    },
    createProduct: async (data) => {
        try {
            const url = buildUrl('products');
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateProduct: async (id, data) => {
        try {
            const url = buildUrl(`products/${id}`);
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'PUT',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteProduct: async (id) => {
        try {
            const url = buildUrl(`products/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * PRESS
     * ============================= */
    getPressList: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit, includeDrafts: 'true' };
        if (search) params.PressTitle_contains = search;
        try {
            const url = buildUrl('presses', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getPressCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.PressTitle_contains = search;
        try {
            const url = buildUrl('presses/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getPressItem: async (id) => {
        const url = buildUrl(`presses/${id}`);
        return await apiFetch(url);
    },
    createPress: async (data) => {
        try {
            const url = buildUrl('presses');
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updatePress: async (id, data) => {
        try {
            const url = buildUrl(`presses/${id}`);
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'PUT',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deletePress: async (id) => {
        try {
            const url = buildUrl(`presses/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * LOCATION COMMON SERVICES
     * ============================= */
    getLocationCommonServices: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit };
        if (search) params.lcs_title_contains = search;
        try {
            const url = buildUrl('location-common-services', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getLocationCommonServicesCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.lcs_title_contains = search;
        try {
            const url = buildUrl('location-common-services/count', params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getLocationCommonService: async (id) => {
        const url = buildUrl(`location-common-services/${id}`);
        return await apiFetch(url);
    },
    createLocationCommonService: async (data) => {
        try {
            const url = buildUrl('location-common-services');
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateLocationCommonService: async (id, data) => {
        try {
            const url = buildUrl(`location-common-services/${id}`);
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'PUT',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteLocationCommonService: async (id) => {
        try {
            const url = buildUrl(`location-common-services/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * LOCATION DATA (locations-news)
     * ============================= */
    getLocationData: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit, includeDrafts: 'true' };
        if (search) params.location_title_contains = search;
        try {
            const url = buildUrl('locations-news', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },

    /**
     * Get single location data by ID
     */
    getLocationDataById: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.LOCATION_DATA}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    getLocationDataCount: async (options = {}) => {
        const { search = '' } = options;
        const params = { includeDrafts: 'true' };
        if (search) params.location_title_contains = search;
        try {
            const url = buildUrl('locations-news/count', params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getLocationDataItem: async (id) => {
        const url = buildUrl(`locations-news/${id}`);
        return await apiFetch(url);
    },
    createLocationData: async (data) => {
        try {
            const url = buildUrl('locations-news');
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateLocationData: async (id, data) => {
        try {
            const url = buildUrl(`locations-news/${id}`);
            const isFormData = data instanceof FormData;
            const result = await apiFetch(url, {
                method: 'PUT',
                body: isFormData ? data : JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteLocationData: async (id) => {
        try {
            const url = buildUrl(`locations-news/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * CLIENT REVIEWS
     * ============================= */
    getClientReviews: async (options = {}) => {
        const { page = 0, limit = 100, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit };
        if (search) params.name_contains = search;
        try {
            const url = buildUrl('client-reviews', params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getClientReviewsCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.name_contains = search;
        try {
            const url = buildUrl('client-reviews/count', params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getClientReview: async (id) => {
        try {
            const url = buildUrl(`client-reviews/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    createClientReview: async (data) => {
        try {
            const url = buildUrl('client-reviews');
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateClientReview: async (id, data) => {
        try {
            const url = buildUrl(`client-reviews/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteClientReview: async (id) => {
        try {
            const url = buildUrl(`client-reviews/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * USERS
     * ============================= */

    getAllUsers: async (options = {}) => {
        const { page = 0, limit = 10, search = '' } = options;
        const params = {
            _start: page * limit,
            _limit: limit,
        };
        if (search) params.username_contains = search;

        try {
            const url = buildUrl(ENDPOINTS.USERS, params);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message, data: [] };
        }
    },

    getUsersCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.username_contains = search;

        try {
            const url = buildUrl(`${ENDPOINTS.USERS}/count`, params);
            const count = await apiFetch(url);
            return { success: true, count };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },

    getUserById: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.USERS}/${id}`);
            const data = await apiFetch(url);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createUser: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.USERS);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    updateUser: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.USERS}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    deleteUser: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.USERS}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* =============================
     * URL REDIRECTIONS
     * ============================= */
    getUrlRedirectionList: async (options = {}) => {
        const { page = 0, limit = 200, sort = 'createdAt:DESC', search = '' } = options;
        const params = { _sort: sort, _start: page * limit, _limit: limit };
        if (search) params.sourceUrl_contains = search;
        try {
            const url = buildUrl(ENDPOINTS.URL_REDIRECTIONS, params);
            const data = await apiFetch(url);
            return { success: true, data: Array.isArray(data) ? data : [] };
        } catch (error) {
            return { success: false, data: [], error: error.message };
        }
    },
    getUrlRedirectionCount: async (options = {}) => {
        const { search = '' } = options;
        const params = {};
        if (search) params.sourceUrl_contains = search;
        try {
            const url = buildUrl(ENDPOINTS.URL_REDIRECTIONS_COUNT, params);
            const raw = await apiFetch(url);
            const count = typeof raw === 'number' ? raw : (raw?.count ?? raw ?? 0);
            return { success: true, count: Number(count) || 0 };
        } catch (error) {
            return { success: false, count: 0 };
        }
    },
    getUrlRedirectionItem: async (id) => {
        const url = buildUrl(`${ENDPOINTS.URL_REDIRECTIONS}/${id}`);
        return await apiFetch(url);
    },
    createUrlRedirection: async (data) => {
        try {
            const url = buildUrl(ENDPOINTS.URL_REDIRECTIONS);
            const result = await apiFetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateUrlRedirection: async (id, data) => {
        try {
            const url = buildUrl(`${ENDPOINTS.URL_REDIRECTIONS}/${id}`);
            const result = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    deleteUrlRedirection: async (id) => {
        try {
            const url = buildUrl(`${ENDPOINTS.URL_REDIRECTIONS}/${id}`);
            const result = await apiFetch(url, { method: 'DELETE' });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* SITE PAGES (about-us, contact-us) */
    getSitePage: async (slug) => {
        try {
            const url = buildUrl(`site-pages/${slug}`);
            const data = await apiFetch(url, { allowNotFound: true });
            if (data === null) {
                return {
                    success: false,
                    notFound: true,
                    error: 'Site pages API is not available on this server (404).',
                };
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateSitePage: async (slug, payload) => {
        try {
            const url = buildUrl(`site-pages/${slug}`);
            const data = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify(payload),
                allowNotFound: true,
            });
            if (data === null) {
                return {
                    success: false,
                    notFound: true,
                    error:
                        'Cannot save: site-pages API is not deployed on this server. Deploy the latest backend, or point REACT_APP_API_URL to a local API (localhost:3001).',
                };
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    /* SITE CONFIG */
    getRobotsTxt: async () => {
        try {
            const url = buildUrl('site-config/robots');
            const data = await apiFetch(url, { allowNotFound: true });
            if (data === null) {
                return {
                    success: false,
                    notFound: true,
                    error: 'site-config API is not deployed on this server yet.',
                };
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    updateRobotsTxt: async (robots_txt) => {
        try {
            const url = buildUrl('site-config/robots');
            const data = await apiFetch(url, {
                method: 'PUT',
                body: JSON.stringify({ robots_txt }),
                allowNotFound: true,
            });
            if (data === null) {
                return {
                    success: false,
                    notFound: true,
                    error:
                        'Cannot save: site-config API is not deployed on this server. Deploy the latest backend, or point REACT_APP_API_URL to a local API (localhost:3001).',
                };
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};

export default adminService;
