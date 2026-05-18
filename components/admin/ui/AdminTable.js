import React from 'react';
import { Table, Form, Spinner } from 'react-bootstrap';

/**
 * Reusable table wrapper for list pages.
 * - Consistent styling (hover, align-middle, thead bg-light)
 * - Optional loading and empty states
 * @param {boolean} [loading] - Show loading row
 * @param {boolean} [empty] - Show empty state row
 * @param {number} [emptyColSpan=10] - ColSpan for empty/loading row
 * @param {string} [emptyMessage='No content found']
 * @param {boolean} [showCheckbox=false] - Add checkbox column in header
 * @param {React.ReactNode} children - <thead> and <tbody> or header config + rows
 */
const AdminTable = ({
    loading = false,
    empty = false,
    emptyColSpan = 10,
    emptyMessage = 'No content found',
    showCheckbox = false,
    columns = [],
    children,
}) => {
    const hasHeaderConfig = Array.isArray(columns) && columns.length > 0;

    return (
        <div className="table-responsive bg-white rounded shadow-sm">
            <Table hover className="mb-0 align-middle">
                {hasHeaderConfig && (
                    <thead className="bg-light">
                        <tr>
                            {showCheckbox && (
                                <th className="py-3 ps-3" style={{ width: '40px' }}>
                                    <Form.Check type="checkbox" />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key || col.label}
                                    className="py-3 border-0 fw-bold"
                                    style={col.width ? { width: col.width } : undefined}
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="py-3 border-0 text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={emptyColSpan} className="text-center py-5">
                                <Spinner animation="border" />
                            </td>
                        </tr>
                    ) : empty ? (
                        <tr>
                            <td colSpan={emptyColSpan} className="text-center py-5 text-muted">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        children
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminTable;
