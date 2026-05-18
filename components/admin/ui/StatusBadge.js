import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBadge = ({ status }) => {
    let variant = 'success';
    let textClass = 'text-success';
    let borderClass = 'border-success';

    // Future proofing for other statuses
    if (status === 'Draft') {
        variant = 'warning';
        textClass = 'text-warning';
        borderClass = 'border-warning';
    } else if (status === 'Archived') {
        variant = 'secondary';
        textClass = 'text-secondary';
        borderClass = 'border-secondary';
    }

    return (
        <Badge bg="white" className={`${textClass} border ${borderClass} px-3 py-2 fw-normal`}>
            {status}
        </Badge>
    );
};

export default StatusBadge;
