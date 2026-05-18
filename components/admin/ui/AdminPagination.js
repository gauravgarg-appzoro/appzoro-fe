import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from '../../OptimizedIcons';

/**
 * Reusable pagination bar for list pages.
 * @param {number} page - Current 0-based page
 * @param {number} total - Total count
 * @param {number} limit - Items per page
 * @param {function} onPageChange - (newPage) => void
 * @param {number[]} [limitOptions=[10, 20, 50]]
 * @param {function} [onLimitChange] - (newLimit) => void
 */
const AdminPagination = ({
    page,
    total,
    limit,
    onPageChange,
    limitOptions = [10, 20, 50],
    onLimitChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasPrev = page > 0;
    const hasNext = page < totalPages - 1;

    return (
        <div className="d-flex justify-content-between align-items-center mt-4 bg-white p-3 border-top rounded shadow-sm">
            <div className="d-flex align-items-center">
                {onLimitChange && (
                    <>
                        <Form.Select
                            size="sm"
                            className="me-2"
                            style={{ width: '70px' }}
                            value={limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                        >
                            {limitOptions.map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </Form.Select>
                        <span className="text-secondary small fst-italic">entries per page</span>
                    </>
                )}
            </div>
            <div className="d-flex align-items-center">
                <Button
                    variant="white"
                    className="border rounded-start p-2"
                    onClick={() => onPageChange(Math.max(0, page - 1))}
                    disabled={!hasPrev}
                >
                    <FaChevronLeft size={12} className="text-secondary" />
                </Button>
                <div className="d-flex border-top border-bottom">
                    <span className="px-3 py-1 text-secondary small">Page {page + 1} of {totalPages}</span>
                </div>
                <Button
                    variant="white"
                    className="border rounded-end p-2"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                >
                    <FaChevronRight size={12} className="text-secondary" />
                </Button>
            </div>
        </div>
    );
};

export default AdminPagination;
