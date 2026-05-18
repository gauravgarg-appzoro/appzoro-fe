import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FaPlus } from '../../OptimizedIcons';

/**
 * Reusable header for admin list pages.
 * @param {string} title - Page title (e.g. "Industry Content")
 * @param {string} [subtitle] - Optional subtitle (e.g. "42 entries found")
 * @param {string} [addHref] - Link for "Add New" button (if omitted, button not shown)
 * @param {string} [addLabel] - Label for add button (default "Add New Entry")
 * @param {React.ReactNode} [extra] - Optional extra content on the right (e.g. filters)
 */
const AdminListHeader = ({ title, subtitle, addHref, addLabel = 'Add New Entry', extra }) => {
    return (
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
                <h2 className="fw-bold mb-1">{title}</h2>
                {subtitle != null && <p className="text-secondary mb-0 small">{subtitle}</p>}
            </div>
            <div className="d-flex align-items-center gap-2">
                {extra}
                {addHref && (
                    <Link href={addHref} passHref>
                        <Button variant="primary" className="d-flex align-items-center px-4">
                            <FaPlus className="me-2" size={12} /> {addLabel}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default AdminListHeader;
