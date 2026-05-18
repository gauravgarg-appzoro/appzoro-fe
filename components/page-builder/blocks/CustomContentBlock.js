import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomContentBlock({
    title = '',
    description = '',
    buttonText = '',
    buttonLink = '',
    imageUrl = '',
    imageAlt = 'Custom section image',
    STRAPI_IMAGE_BASE_URL = '',
}) {
    const hasContent = title || description || buttonText || imageUrl;
    if (!hasContent) return null;

    const normalizedImage = imageUrl
        ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_IMAGE_BASE_URL}${imageUrl}`)
        : '';

    return (
        <section className="py-5">
            <Container>
                <div className="p-4 p-md-5 border rounded-3 bg-light">
                    {title && <h2 className="mb-3">{title}</h2>}
                    {description && <p className="text-muted mb-3">{description}</p>}
                    {buttonText && buttonLink && (
                        <div className="mb-3">
                            <Link href={buttonLink} className="btn_theme">
                                {buttonText}
                            </Link>
                        </div>
                    )}
                    {normalizedImage && (
                        <div className="mt-3">
                            <Image
                                src={normalizedImage}
                                alt={imageAlt || 'Custom section image'}
                                width={1200}
                                height={700}
                                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                            />
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
