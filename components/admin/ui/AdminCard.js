import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * Reusable card for form sections (consistent border-0 shadow-sm, padding).
 */
const AdminCard = ({ title, children, className = '', bodyClassName = 'p-4', ...rest }) => {
    return (
        <Card className={`border-0 shadow-sm mb-4 ${className}`} {...rest}>
            {title && (
                <Card.Header className="bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">{title}</h5>
                </Card.Header>
            )}
            <Card.Body className={bodyClassName}>
                {children}
            </Card.Body>
        </Card>
    );
};

export default AdminCard;
