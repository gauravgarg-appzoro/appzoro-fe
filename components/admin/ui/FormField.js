import React from 'react';
import { Form } from 'react-bootstrap';

const defaultInputStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '10px 12px',
};

/**
 * Reusable form field: label + control (input/textarea/select).
 * Use for consistent styling across admin forms.
 */
const FormField = ({
    label,
    name,
    type = 'text',
    as,
    rows,
    value,
    onChange,
    placeholder,
    className,
    ...rest
}) => {
    const handleChange = (e) => {
        if (onChange) onChange(e);
    };

    return (
        <div className={`mb-4 ${className || ''}`}>
            {label && (
                <Form.Label className="text-dark fw-normal mb-2" style={{ fontSize: '13px' }}>
                    {label}
                </Form.Label>
            )}
            <Form.Control
                type={type}
                name={name}
                as={as}
                rows={rows}
                value={value != null ? value : ''}
                onChange={handleChange}
                placeholder={placeholder}
                style={defaultInputStyle}
                {...rest}
            />
        </div>
    );
};

export default FormField;
