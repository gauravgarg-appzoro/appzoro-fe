/**
 * Unwrap NestJS / Strapi-style API responses: { data: T } or raw T.
 */
export function unwrapApiResponse(json) {
  if (json == null) return null;
  if (typeof json === 'object' && json.data !== undefined && Object.keys(json).length === 1) {
    return json.data;
  }
  return json;
}
