import React from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from '../../OptimizedIcons';

/**
 * Reusable search bar for list pages.
 */
const AdminSearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
    return (
        <div className={`bg-white p-3 rounded shadow-sm mb-3 ${className}`}>
            <div className="position-relative">
                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" style={{ zIndex: 1 }} />
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className="ps-5 bg-light border-0"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default AdminSearchBar;
