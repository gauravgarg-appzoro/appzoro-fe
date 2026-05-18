import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaSave } from '../../OptimizedIcons';

/**
 * Reusable action buttons for form pages: Save as draft + Primary (Publish/Update/Save).
 * @param {boolean} [saving]
 * @param {function} [onSaveDraft] - () => void
 * @param {function} [onSavePrimary] - () => void
 * @param {string} [primaryLabel='Update'] - e.g. "Publish", "Update", "Save"
 * @param {boolean} [showDraft=true] - Show "Save as draft" button
 */
const AdminFormActions = ({
    saving = false,
    onSaveDraft,
    onSavePrimary,
    primaryLabel = 'Update',
    showDraft = true,
}) => {
    return (
        <div className="d-flex gap-2">
            {showDraft && onSaveDraft && (
                <Button
                    variant="outline-secondary"
                    onClick={onSaveDraft}
                    disabled={saving}
                    className="px-4"
                >
                    {saving ? <Spinner size="sm" animation="border" /> : <><FaSave className="me-2" /> Save as draft</>}
                </Button>
            )}
            {onSavePrimary && (
                <Button
                    variant="primary"
                    onClick={onSavePrimary}
                    disabled={saving}
                    className="px-4"
                >
                    {saving ? <Spinner size="sm" animation="border" /> : <><FaSave className="me-2" /> {primaryLabel}</>}
                </Button>
            )}
        </div>
    );
};

export default AdminFormActions;
