import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import AdminFormActions from './AdminFormActions';
import { FaArrowLeft } from '../../OptimizedIcons';

/**
 * Reusable header for admin create/edit form pages.
 * @param {string} backHref - Link for back button (e.g. list page)
 * @param {string} title - Page title (e.g. "Create Industry Page")
 * @param {string} [subtitle] - Optional (e.g. "API ID : induustries")
 * @param {boolean} [isNew] - Create vs edit
 * @param {boolean} [showDraftPublish] - Show Save as draft + Publish/Update buttons
 * @param {boolean} [isDraft] - Current record is draft (for edit mode badge)
 * @param {boolean} [saving]
 * @param {function} [onSaveDraft] - () => void
 * @param {function} [onSavePrimary] - () => void (Publish / Update / Save)
 * @param {string} [primaryLabel] - Override primary button label (default: isNew ? 'Publish' : 'Update')
 */
const AdminFormPageHeader = ({
    backHref,
    title,
    subtitle,
    isNew = false,
    showDraftPublish = false,
    isDraft = false,
    saving = false,
    onSaveDraft,
    onSavePrimary,
    primaryLabel,
}) => {
    const defaultPrimaryLabel = isNew ? 'Publish' : 'Update';
    const label = primaryLabel != null ? primaryLabel : defaultPrimaryLabel;

    return (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div className="d-flex align-items-center">
                <Link href={backHref} passHref>
                    <Button variant="link" className="text-dark p-0 me-3">
                        <FaArrowLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h2 className="fw-bold mb-0">{title}</h2>
                    {subtitle != null && <p className="text-muted small mb-0">{subtitle}</p>}
                </div>
            </div>
            {showDraftPublish && (
                <div className="d-flex gap-2 align-items-center">
                    {!isNew && (
                        <span className="text-muted small me-2">
                            {isDraft ? <>Draft</> : <>Published</>}
                        </span>
                    )}
                    <AdminFormActions
                        saving={saving}
                        onSaveDraft={onSaveDraft}
                        onSavePrimary={onSavePrimary}
                        primaryLabel={label}
                        showDraft={showDraftPublish}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminFormPageHeader;
