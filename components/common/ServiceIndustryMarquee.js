import React from 'react';
import Container from 'react-bootstrap/Container';
import ContactHref from './ContactHref';
import { LuMoveRight } from '../OptimizedIcons';
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';

/**
 * ServiceIndustryMarquee — 3-row marquee layout matching Jayesh branch.
 * Row 1: forward, Row 2: reverse, Row 3: forward.
 * All rows have duplicated content for seamless infinite mobile scrolling.
 * Desktop: display:contents collapses wrappers → flex-wrap badges.
 * Mobile: horizontal scrolling marquee animation via CSS.
 */

const DEFAULT_ICONS = [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 7L16 12L23 17V7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M7 7H17V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12H18L15 21L9 3L6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21H23M3 7V21M7 7V21M11 7V21M15 7V21M19 7V21M21 3L12 7L3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2V7C3 9.20914 4.79086 11 7 11C9.20914 11 11 9.20914 11 7V2M3 2H11M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>',
];

const BadgeItem = ({ name, iconUrl, iconSvg, idx }) => (
    <div className="industry-badge">
        {iconUrl ? (
            <div className="industry-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={iconUrl.startsWith('http') ? iconUrl : `${STRAPI_IMAGE_BASE_URL}${iconUrl}`} alt={name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
        ) : (
            <div className="industry-icon" dangerouslySetInnerHTML={{ __html: iconSvg || DEFAULT_ICONS[idx % DEFAULT_ICONS.length] }} />
        )}
        <span>{name}</span>
    </div>
);

const MarqueeRow = ({ items, reverse, startIdx }) => {
    const badges = items.map((ind, idx) => (
        <BadgeItem key={idx} name={ind.name} iconUrl={ind.icon} iconSvg={ind.iconSvg} idx={startIdx + idx} />
    ));
    const badgesDup = items.map((ind, idx) => (
        <BadgeItem key={`dup-${idx}`} name={ind.name} iconUrl={ind.icon} iconSvg={ind.iconSvg} idx={startIdx + idx} />
    ));

    return (
        <div className={`marquee-row${reverse ? ' reverse' : ''}`}>
            <div className="marquee-content">
                {badges}
            </div>
            <div className="marquee-content mobile-only">
                {badgesDup}
            </div>
        </div>
    );
};

const ServiceIndustryMarquee = ({ sectionTitle, industries, ctaText, ctaLink }) => {
    if (!industries || industries.length === 0) return null;

    // Split into 3 roughly equal rows
    const total = industries.length;
    const rowSize = Math.ceil(total / 3);
    const row1Items = industries.slice(0, rowSize);
    const row2Items = industries.slice(rowSize, rowSize * 2);
    const row3Items = industries.slice(rowSize * 2);

    // If row3 is too short (less items than other rows), pad it by repeating its items
    // so all rows have equal visual length for seamless marquee
    const targetLen = Math.max(row1Items.length, row2Items.length, 5);
    const padRow = (items) => {
        if (items.length === 0) return items;
        const padded = [...items];
        while (padded.length < targetLen) {
            padded.push(items[padded.length % items.length]);
        }
        return padded;
    };

    const r1 = padRow(row1Items);
    const r2 = padRow(row2Items);
    const r3 = padRow(row3Items);

    return (
        <section className="ai-industry-section" style={{ background: '#fff', padding: '30px 0' }}>
            <Container>
                {sectionTitle && (
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '40px', fontWeight: '600', color: '#1a1a1a' }}>{sectionTitle}</h2>
                    </div>
                )}
                <div className="ai-industry-badges">
                    <MarqueeRow items={r1} reverse={false} startIdx={0} />
                    <MarqueeRow items={r2} reverse={true} startIdx={rowSize} />
                    <MarqueeRow items={r3} reverse={false} startIdx={rowSize * 2} />
                </div>
                {ctaText && (
                    <div className="text-center mt-5">
                        <ContactHref href={ctaLink || '/contact-us'} className="ai-gradient-btn">
                            {ctaText}{' '}
                            <span><LuMoveRight /></span>
                        </ContactHref>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default ServiceIndustryMarquee;
