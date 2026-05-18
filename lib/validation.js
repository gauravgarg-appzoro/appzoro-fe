/**
 * Shared validation helpers for admin forms.
 * Aligns with backend DTOs (class-validator) where applicable.
 */

/** Slug: lowercase, alphanumeric and hyphens only, no leading/trailing hyphen */
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Derive URL slug from a string (e.g. title, SEO title).
 * @param {string} value
 * @param {string} fallback - used when result is empty
 * @returns {string}
 */
export function slugify(value, fallback = '') {
    if (value == null || String(value).trim() === '') return fallback;
    return String(value).trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || fallback;
}

/**
 * Validate required string (trimmed)
 * @returns {string|null} Error message or null if valid
 */
export function required(value, fieldName = 'This field') {
    if (value == null || String(value).trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
}

/**
 * Validate slug format (URL-friendly)
 * @returns {string|null} Error message or null if valid
 */
export function slugFormat(value, fieldName = 'Slug') {
    const r = required(value, fieldName);
    if (r) return r;
    const trimmed = String(value).trim().toLowerCase();
    if (!SLUG_REGEX.test(trimmed)) {
        return `${fieldName} must be lowercase letters, numbers, and hyphens only (e.g. my-post-title)`;
    }
    if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
        return `${fieldName} cannot start or end with a hyphen`;
    }
    return null;
}

/**
 * Validate max length
 * @returns {string|null} Error message or null if valid
 */
export function maxLength(value, max, fieldName = 'This field') {
    if (value == null) return null;
    if (String(value).length > max) {
        return `${fieldName} must be at most ${max} characters`;
    }
    return null;
}

/**
 * Validate multiple rules; returns first error or null
 * @param {*} value
 * @param {Array<function(value): string|null>} validators
 * @returns {string|null}
 */
export function validateAll(value, validators) {
    for (const fn of validators) {
        const err = fn(value);
        if (err) return err;
    }
    return null;
}

/**
 * Run validations for a form; returns { valid: boolean, errors: { field: message } }
 * @param {Object} data - Form data object
 * @param {Object} rules - { fieldName: [validatorFn, ...] } or { fieldName: validatorFn }
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateForm(data, rules) {
    const errors = {};
    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];
        const fns = Array.isArray(rule) ? rule : [rule];
        const err = validateAll(value, fns);
        if (err) errors[field] = err;
    }
    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}

export default {
    required,
    slugFormat,
    slugify,
    maxLength,
    validateAll,
    validateForm,
    SLUG_REGEX,
};
