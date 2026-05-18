import React, { createContext, useContext, useReducer, useCallback } from 'react';
import adminService from '../../../services/admin.service';

/**
 * Admin Service Context
 * 
 * Manages state for admin services functionality including:
 * - Services list with pagination and sorting
 * - Loading and error states
 * - Edit mode tracking
 */

// Initial state
const initialState = {
    // Services data
    services: [],
    totalServices: 0,

    // Pagination
    currentPage: 0,
    entriesPerPage: 10,

    // Filters
    filters: {
        search: '',
        includeDrafts: true,
    },

    // Sorting
    sort: 'createdAt:DESC',

    // Loading states
    loading: false,
    error: null,

    // Edit mode
    editMode: false,
    selectedService: null,
};

// Action types
const ACTIONS = {
    SET_SERVICES: 'SET_SERVICES',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_PAGE: 'SET_PAGE',
    SET_ENTRIES_PER_PAGE: 'SET_ENTRIES_PER_PAGE',
    SET_FILTERS: 'SET_FILTERS',
    RESET_FILTERS: 'RESET_FILTERS',
    SET_SORT: 'SET_SORT',
    SELECT_SERVICE_FOR_EDIT: 'SELECT_SERVICE_FOR_EDIT',
    CLEAR_EDIT: 'CLEAR_EDIT',
    REMOVE_SERVICE: 'REMOVE_SERVICE',
};

// Reducer
function serviceReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_SERVICES:
            return {
                ...state,
                services: action.payload.services,
                totalServices: action.payload.total,
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
                currentPage: 0,
            };

        case ACTIONS.SET_FILTERS:
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
                currentPage: 0,
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

        case ACTIONS.SELECT_SERVICE_FOR_EDIT:
            return {
                ...state,
                editMode: true,
                selectedService: action.payload,
            };

        case ACTIONS.CLEAR_EDIT:
            return {
                ...state,
                editMode: false,
                selectedService: null,
            };

        case ACTIONS.REMOVE_SERVICE:
            return {
                ...state,
                services: state.services.filter(s => s.id !== action.payload),
                totalServices: state.totalServices - 1,
            };

        default:
            return state;
    }
}

// Context
const AdminServiceContext = createContext(null);

// Provider component
export function AdminServiceProvider({ children }) {
    const [state, dispatch] = useReducer(serviceReducer, initialState);

    // Fetch services
    const fetchServices = useCallback(async () => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        const result = await adminService.getAllServices({
            page: state.currentPage,
            limit: state.entriesPerPage,
            sort: state.sort,
            includeDrafts: state.filters.includeDrafts,
            ...state.filters,
        });

        if (result.success) {
            const countResult = await adminService.getServicesCount({ includeDrafts: state.filters.includeDrafts, ...state.filters });
            dispatch({
                type: ACTIONS.SET_SERVICES,
                payload: {
                    services: result.data,
                    total: countResult.success ? countResult.count : 0,
                },
            });
        } else {
            dispatch({ type: ACTIONS.SET_ERROR, payload: result.error });
        }
    }, [state.currentPage, state.entriesPerPage, state.sort, state.filters]);

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

    const toggleSort = useCallback((field) => {
        const [currentField, currentOrder] = state.sort.split(':');
        if (currentField === field) {
            const newOrder = currentOrder === 'DESC' ? 'ASC' : 'DESC';
            dispatch({ type: ACTIONS.SET_SORT, payload: `${field}:${newOrder}` });
        } else {
            dispatch({ type: ACTIONS.SET_SORT, payload: `${field}:DESC` });
        }
    }, [state.sort]);

    // Edit mode
    const selectServiceForEdit = useCallback((service) => {
        dispatch({ type: ACTIONS.SELECT_SERVICE_FOR_EDIT, payload: service });
    }, []);

    const clearEdit = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_EDIT });
    }, []);

    // Delete service
    const deleteService = useCallback(async (id) => {
        const result = await adminService.deleteService(id);
        if (result.success) {
            dispatch({ type: ACTIONS.REMOVE_SERVICE, payload: id });
            return true;
        }
        return false;
    }, []);

    const duplicateService = useCallback(async (id) => {
        const result = await adminService.duplicateService(id);
        if (result.success) {
            await fetchServices();
        }
        return result;
    }, [fetchServices]);

    // Create service
    const createService = useCallback(async (data) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const result = await adminService.createService(data);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        return result;
    }, []);

    // Update service
    const updateService = useCallback(async (id, data) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const result = await adminService.updateService(id, data);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        return result;
    }, []);

    // Upload image (reuse existing upload)
    const uploadImage = useCallback(async (file) => {
        return adminService.uploadImage(file);
    }, []);

    const value = {
        // State
        ...state,

        // Actions
        fetchServices,
        setPage,
        setEntriesPerPage,
        setFilters,
        resetFilters,
        setSort,
        toggleSort,
        selectServiceForEdit,
        clearEdit,
        deleteService,
        duplicateService,
        createService,
        updateService,
        uploadImage,
    };

    return (
        <AdminServiceContext.Provider value={value}>
            {children}
        </AdminServiceContext.Provider>
    );
}

// Hook for using the context
export function useAdminService() {
    const context = useContext(AdminServiceContext);
    if (!context) {
        throw new Error('useAdminService must be used within AdminServiceProvider');
    }
    return context;
}

export default AdminServiceContext;
