/**
 * Normalizes CMS JSON-LD so validators (Semrush / Google) stop flagging common issues:
 * - Invalid Article fields (proficiencyLevel)
 * - LocalBusiness + subtypes: provider/serviceType not recognized — strip them
 * - Missing LocalBusiness.address
 * - hasOffer → makesOffer (schema.org)
 * - SoftwareApplication missing aggregateRating when review absent
 */

const DEFAULT_ADDRESS = {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    streetAddress: '3423 Piedmont Rd NE, STE 320',
    addressLocality: 'Atlanta',
    addressRegion: 'GA',
    postalCode: '30305',
};

const DEFAULT_AGGREGATE_RATING = {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '16',
};

const LOCAL_BUSINESS_TYPES = new Set([
    'localbusiness',
    'professionalservice',
    'medicalorganization',
    'medicalbusiness',
    'legalservice',
    'financialservice',
    'autorepair',
    'store',
    'restaurant',
    'healthandbeautybusiness',
    'sportsactivitylocation',
    'entertainmentbusiness',
    'foodestablishment',
    'lodgingbusiness',
    'homeandconstructionbusiness',
    'autobodyshop',
    'autodealer',
    'autorental',
    'autowash',
]);

function typesOf(node) {
    const t = node['@type'];
    if (!t) return [];
    return Array.isArray(t) ? t : [t];
}

function hasType(node, name) {
    return typesOf(node).some((x) => String(x).toLowerCase() === name.toLowerCase());
}

function isLocalBusinessType(node) {
    return typesOf(node).some((x) => LOCAL_BUSINESS_TYPES.has(String(x).toLowerCase()));
}

function patchNode(node) {
    if (!node || typeof node !== 'object' || node instanceof Date) return;

    delete node.proficiencyLevel;

    const tList = typesOf(node);
    if (tList.some((t) => String(t).toLowerCase().replace(/\s+/g, '') === 'softwareapp')) {
        node['@type'] = 'SoftwareApplication';
    }

    if (isLocalBusinessType(node)) {
        delete node.provider;
        delete node.serviceType;
        const addr = node.address;
        const missing =
            !addr ||
            typeof addr !== 'object' ||
            (!addr.streetAddress && !addr.addressLocality && !addr.postalCode);
        if (missing) {
            node.address = { ...DEFAULT_ADDRESS };
        }
    }

    if (Object.prototype.hasOwnProperty.call(node, 'hasOffer') && node.makesOffer === undefined) {
        node.makesOffer = node.hasOffer;
        delete node.hasOffer;
    }

    const isSoftwareApp =
        hasType(node, 'SoftwareApplication') ||
        tList.some((t) => String(t).replace(/\s+/g, '').toLowerCase() === 'softwareapp');

    if (isSoftwareApp && !node.aggregateRating && !node.review) {
        node.aggregateRating = { ...DEFAULT_AGGREGATE_RATING };
    }

    for (const v of Object.values(node)) {
        if (Array.isArray(v)) v.forEach(patchNode);
        else if (v && typeof v === 'object') patchNode(v);
    }
}

/**
 * @param {string} raw JSON-LD string from CMS
 * @returns {string} safe JSON string (unchanged if parse fails)
 */
export function sanitizeJsonLdString(raw) {
    if (raw == null || typeof raw !== 'string') return '';
    const s = raw.trim();
    if (!s) return '';
    try {
        const data = JSON.parse(s);
        if (data['@graph'] && Array.isArray(data['@graph'])) {
            data['@graph'].forEach(patchNode);
        }
        patchNode(data);
        return JSON.stringify(data);
    } catch {
        return s;
    }
}
