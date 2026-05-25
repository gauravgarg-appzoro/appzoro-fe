import Image from "next/image";
import Link from "next/link";
import React from "react";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { slugify } from "../../lib/validation";
import { FaLinkedin } from '../../components/OptimizedIcons';

const BlogAuthorDetails = ({ author }) => {
  const authorSlug = slugify(author?.name || '');
  const authorHref = authorSlug ? `/blog/author/${authorSlug}` : null;

  const avatar = author?.picture?.url
    ? `${STRAPI_IMAGE_BASE_URL}${author.picture.url}`
    : "/assets/images/logo-icon.png";

  const Avatar = (
    <Image src={avatar} width="100" height="100" alt={author?.name || "Author"} />
  );

  return (
    <div className="author-info-view">
      <div className="author-img">
        {authorHref ? (
          <Link href={authorHref} aria-label={`View all articles by ${author?.name || 'this author'}`}>
            {Avatar}
          </Link>
        ) : (
          Avatar
        )}
      </div>
      <div className="author-info">
        {author?.name && (
          <div className="author-name">
            {authorHref ? (
              <Link href={authorHref}>{author.name}</Link>
            ) : (
              author.name
            )}
          </div>
        )}
        {author?.bio && <div className="author-bio">{author?.bio}</div>}
        {authorHref && (
          <div className="author-more">
            <Link href={authorHref}>View all articles by {author?.name || 'this author'} →</Link>
          </div>
        )}
        {author?.linkedin_profile_url && (
          <div className="author-profile">
            <Link href={author?.linkedin_profile_url} target="_blank" aria-label={`LinkedIn profile for ${author?.name || 'Author'}`}>
              <FaLinkedin />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAuthorDetails;
