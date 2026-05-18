import React from 'react';
import Image from 'next/image';

/**
 * ServiceHeroBanner — Static hero rating badges (Clutch, Google, UpCity, DesignRush).
 * Matches Jayesh branch layout exactly.
 */
const ServiceHeroBanner = () => {
    return (
        <div className="hero-rating-badges-wrapper">
            <div className="rating-badge">
                <div className="badge-logo clutch-logo">
                    <Image src="/assets/images/clutch.png" width={74} height={21} alt="Clutch" unoptimized />
                </div>
                <div className="badge-rating">
                    <span className="star">★</span>
                    <span className="rating-value">5.0</span>
                </div>
            </div>

            <div className="rating-badge">
                <div className="badge-logo google-logo">
                    <Image src="/assets/images/google.png" width={80} height={26} alt="Google" unoptimized />
                </div>
                <div className="badge-rating">
                    <span className="star">★</span>
                    <span className="rating-value">5.0</span>
                </div>
            </div>

            <div className="rating-badge">
                <div className="badge-logo upcity-logo">
                    <Image src="/assets/images/Upcity.png" width={80} height={26} alt="UpCity" unoptimized />
                </div>
                <div className="badge-rating">
                    <span className="star">★</span>
                    <span className="rating-value">4.7</span>
                </div>
            </div>

            <div className="rating-badge">
                <div className="badge-logo designrush-logo">
                    <Image src="/assets/images/designrush.png" width={80} height={26} alt="DesignRush" unoptimized />
                </div>
                <div className="badge-rating">
                    <span className="star">★</span>
                    <span className="rating-value">5.0</span>
                </div>
            </div>
        </div>
    );
};

export default ServiceHeroBanner;
