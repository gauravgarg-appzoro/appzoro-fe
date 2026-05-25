/**
 * Hero H1 markup aligned with production (appzoro.com):
 * "Crafting Reliable <span>Solutions</span> Together with ..."
 */
export function formatHeroTitleHtml(title) {
  const raw = String(title || '').trim();
  if (!raw) return '';

  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw
      .replace(/<(?!\/?(span|br)\b)[^>]+>/gi, '')
      .replace(/<span[^>]*>/gi, '<span>')
      .replace(/<\/span>/gi, '</span>')
      .replace(/<br[^>]*>/gi, '<br/>');
  }

  return raw.replace(/\bSolutions\b/g, '<span>Solutions</span>');
}
