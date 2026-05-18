import React, { createContext, useContext, useReducer, useCallback } from 'react';
import adminService from '../../../services/admin.service';

/**
 * Admin Blog Context
 * 
 * Manages state for admin blog functionality including:
 * - Posts list with pagination, filtering, and sorting
 * - Loading and error states
 * - Edit mode tracking
 * - Categories, archives, and writers for dropdowns
 */

// Initial state
const initialState = {
    // Posts data
    posts: [],
    totalPosts: 0,

    // Pagination
    currentPage: 0,
    entriesPerPage: 10,

    // Filters
    filters: {
        status: 'all', // 'all', 'published', 'draft'
        search: '',
        category: '',
        archive: '',
    },

    // Sorting
    sort: 'createdAt:DESC',

    // Loading states
    loading: false,
    error: null,

    // Edit mode
    editMode: false,
    selectedPost: null,

    // Dropdown data
    categories: [],
    archives: [],
    writers: [],
    dropdownsLoaded: false,
};

// Action types
const ACTIONS = {
    // Posts
    SET_POSTS: 'SET_POSTS',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',

    // Pagination
    SET_PAGE: 'SET_PAGE',
    SET_ENTRIES_PER_PAGE: 'SET_ENTRIES_PER_PAGE',

    // Filters
    SET_FILTERS: 'SET_FILTERS',
    RESET_FILTERS: 'RESET_FILTERS',

    // Sorting
    SET_SORT: 'SET_SORT',

    // Edit mode
    SELECT_POST_FOR_EDIT: 'SELECT_POST_FOR_EDIT',
    CLEAR_EDIT: 'CLEAR_EDIT',

    // Dropdowns
    SET_DROPDOWNS: 'SET_DROPDOWNS',

    // Delete
    REMOVE_POST: 'REMOVE_POST',
};

// Reducer
function blogReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                totalPosts: action.payload.total,
                loading: false,
                error: null,
            };

        case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case ACTIONS.SET_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case ACTIONS.SET_ENTRIES_PER_PAGE:
            return {
                ...state,
                entriesPerPage: action.payload,
                currentPage: 0, // Reset to first page
            };

        case ACTIONS.SET_FILTERS:
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
                currentPage: 0, // Reset to first page when filters change
            };

        case ACTIONS.RESET_FILTERS:
            return {
                ...state,
                filters: initialState.filters,
                currentPage: 0,
            };

        case ACTIONS.SET_SORT:
            return {
                ...state,
                sort: action.payload,
            };

        case ACTIONS.SELECT_POST_FOR_EDIT:
            return {
                ...state,
                editMode: true,
                selectedPost: action.payload,
            };

        case ACTIONS.CLEAR_EDIT:
            return {
                ...state,
                editMode: false,
                selectedPost: null,
            };

        case ACTIONS.SET_DROPDOWNS:
            return {
                ...state,
                categories: action.payload.categories || state.categories,
                archives: action.payload.archives || state.archives,
                writers: action.payload.writers || state.writers,
                dropdownsLoaded: true,
            };

        case ACTIONS.REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload),
                totalPosts: state.totalPosts - 1,
            };

        default:
            return state;
    }
}

// Context
const AdminBlogContext = createContext(null);

// Provider component
export function AdminBlogProvider({ children }) {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    // Fetch posts
    const fetchPosts = useCallback(async () => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        const result = await adminService.getAllPosts({
            page: state.currentPage,
            limit: state.entriesPerPage,
            sort: state.sort,
            ...state.filters,
        });

        if (result.success) {
            // Also get count
            const countResult = await adminService.getPostsCount(state.filters);
            dispatch({
                type: ACTIONS.SET_POSTS,
                payload: {
                    posts: result.data,
                    total: countResult.success ? countResult.count : 0,
                },
            });
        } else {
            dispatch({ type: ACTIONS.SET_ERROR, payload: result.error });
        }
    }, [state.currentPage, state.entriesPerPage, state.sort, state.filters]);

    // Fetch dropdowns (categories, archives, writers)
    const fetchDropdowns = useCallback(async () => {
        if (state.dropdownsLoaded) return;

        const [categoriesRes, archivesRes, writersRes] = await Promise.all([
            adminService.getCategories(),
            adminService.getArchives(),
            adminService.getWriters(),
        ]);

        dispatch({
            type: ACTIONS.SET_DROPDOWNS,
            payload: {
                categories: categoriesRes.success ? categoriesRes.data : [],
                archives: archivesRes.success ? archivesRes.data : [],
                writers: writersRes.success ? writersRes.data : [],
            },
        });
    }, [state.dropdownsLoaded]);

    // Page navigation
    const setPage = useCallback((page) => {
        dispatch({ type: ACTIONS.SET_PAGE, payload: page });
    }, []);

    const setEntriesPerPage = useCallback((limit) => {
        dispatch({ type: ACTIONS.SET_ENTRIES_PER_PAGE, payload: limit });
    }, []);

    // Filters
    const setFilters = useCallback((filters) => {
        dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    }, []);

    const resetFilters = useCallback(() => {
        dispatch({ type: ACTIONS.RESET_FILTERS });
    }, []);

    // Sorting
    const setSort = useCallback((sort) => {
        dispatch({ type: ACTIONS.SET_SORT, payload: sort });
    }, []);

    // Toggle sort for a column
    const toggleSort = useCallback((field) => {
        const [currentField, currentOrder] = state.sort.split(':');
        if (currentField === field) {
            // Toggle order
            const newOrder = currentOrder === 'DESC' ? 'ASC' : 'DESC';
            dispatch({ type: ACTIONS.SET_SORT, payload: `${field}:${newOrder}` });
        } else {
            // New field, default to DESC
            dispatch({ type: ACTIONS.SET_SORT, payload: `${field}:DESC` });
        }
    }, [state.sort]);

    // Edit mode
    const selectPostForEdit = useCallback((post) => {
        dispatch({ type: ACTIONS.SELECT_POST_FOR_EDIT, payload: post });
    }, []);

    const clearEdit = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_EDIT });
    }, []);

    // Delete post
    const deletePost = useCallback(async (id) => {
        const result = await adminService.deletePost(id);
        if (result.success) {
            dispatch({ type: ACTIONS.REMOVE_POST, payload: id });
            return true;
        }
        return false;
    }, []);

    // Create post
    const createPost = useCallback(async (data) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const result = await adminService.createPost(data);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        return result;
    }, []);

    // Update post
    const updatePost = useCallback(async (id, data) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const result = await adminService.updatePost(id, data);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        return result;
    }, []);

    // Upload image
    const uploadImage = useCallback(async (file) => {
        return adminService.uploadImage(file);
    }, []);

    const value = {
        // State
        ...state,

        // Actions
        fetchPosts,
        fetchDropdowns,
        setPage,
        setEntriesPerPage,
        setFilters,
        resetFilters,
        setSort,
        toggleSort,
        selectPostForEdit,
        clearEdit,
        deletePost,
        createPost,
        updatePost,
        uploadImage,
    };

    return (
        <AdminBlogContext.Provider value={value}>
            {children}
        </AdminBlogContext.Provider>
    );
}

// Hook for using the context
export function useAdminBlog() {
    const context = useContext(AdminBlogContext);
    if (!context) {
        throw new Error('useAdminBlog must be used within AdminBlogProvider');
    }
    return context;
}

export default AdminBlogContext;
