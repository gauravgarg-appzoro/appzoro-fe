import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Col } from 'react-bootstrap'
import dateFormat from "dateformat";
import { STRAPI_IMAGE_BASE_URL } from '../../lib/constants';

const FALLBACK_THUMB = '/assets/images/az-logo-large.png';

function blogThumbSrc(imageArr) {
    const raw = imageArr?.[0]?.url;
    if (!raw) return FALLBACK_THUMB;
    if (raw.startsWith('http')) return raw;
    return `${STRAPI_IMAGE_BASE_URL}${raw}`;
}

const BlogCardBox = ({ data, categoryName }) => {
    return (
        <Col md="4" xs="12" key={data?.id} className='mb-5'>
            <div className="blog-box">
                <Link href={`/blog/${data?.slug}`} className='blog-image'>
                    <Image src={blogThumbSrc(data?.image)} width={465} height={250} alt={data?.title || 'blog'} sizes="(max-width: 768px) 100vw, 350px" style={{ width: '100%', height: 'auto' }} />
                </Link>
                <div className='post-list-info'>
                    <div className='post-cat-outer'>
                        {data?.categories?.[0]?.name &&
                            <a>
                                {data?.categories?.[0]?.name ? data?.categories?.[0]?.name : categoryName}
                            </a>
                        }
                        <div className='post-date'>{dateFormat(data?.published_at, "mediumDate")}</div>
                    </div>
                    <h2 className="post-title">
                        <Link href={`/blog/${data?.slug}`}>{data?.title}</Link>
                    </h2>
                    <p className="post-content">{data?.description}</p>
                </div>
            </div>
        </Col>
    )
}

export default BlogCardBox