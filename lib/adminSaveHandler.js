/**
 * Shared success/redirect handler for admin create and edit (Publish + Save as draft).
 * Treats 200/201 responses as success, shows message, and redirects the same for both actions.
 * Use in every module (industry, blog, product, country-pages, etc.) for consistent UX.
 *
 * @param {Object} options
 * @param {*} options.result - API result: { success: true, data } or raw document (id/_id)
 * @param {boolean} options.isCreate - true for create page, false for edit
 * @param {boolean} options.isDraft - true when user clicked "Save as draft"
 * @param {string} options.listPath - e.g. '/admin/industries'
 * @param {string} options.editPathPrefix - e.g. '/admin/industry/' (trailing slash); used when isCreate and we have newId
 * @param {Object} options.toast - { success: (msg)=>void, error: (msg)=>void } (e.g. react-toastify or Swal adapter)
 * @param {Object} options.router - Next.js router for redirect
 * @param {string} [options.entityName='Item'] - for messages, e.g. 'Industry'
 * @returns {Promise<boolean>} true if success (caller can stop loading), false otherwise
 */
export async function handleSaveSuccess({
    result,
    isCreate,
    isDraft,
    listPath,
    editPathPrefix,
    toast,
    router,
    entityName = 'Item',
}) {
    const success = result?.success === true || (result && (result.id != null || result._id != null));
    const data = result?.data !== undefined ? result.data : result;
    const newId = data?.id ?? data?._id ?? result?.id ?? result?._id;

    if (success) {
        let message;
        if (isDraft) message = `${entityName} saved as draft`;
        else if (isCreate) message = `${entityName} created successfully`;
        else message = `${entityName} updated successfully`;
        toast.success(message);

        // Always redirect to the list page after both create and edit
        if (typeof window !== 'undefined') {
            window.location.href = listPath;
        } else {
            await router.push(listPath);
        }
        return true;
    }

    const errMsg = result?.error || 'Failed to save';
    const errP = toast.error(errMsg);
    if (errP && typeof errP.then === 'function') await errP;
    return false;
}
