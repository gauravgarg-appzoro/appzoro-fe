import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from '../../OptimizedIcons';

/**
 * Reusable Edit + Delete actions for table rows.
 * @param {string} editHref - e.g. `/admin/industry/${id}`
 * @param {function} onDelete - () => void (caller should confirm)
 */
const AdminTableRowActions = ({ editHref, onDelete }) => {
    return (
        <td className="text-end pe-4">
            <Link href={editHref} passHref>
                <Button variant="link" className="p-0 me-2 text-secondary">
                    <FaEdit />
                </Button>
            </Link>
            <Button variant="link" className="p-0 text-danger" onClick={onDelete}>
                <FaTrash />
            </Button>
        </td>
    );
};

export default AdminTableRowActions;
