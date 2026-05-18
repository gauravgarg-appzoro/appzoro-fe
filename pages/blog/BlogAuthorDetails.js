import Image from "next/image";
import Link from "next/link";
import React from "react";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { FaLinkedin } from '../../components/OptimizedIcons';

const BlogAuthorDetails = ({ author }) => {
  return (
    <div className="author-info-view">
      <div className="author-img">
        {author?.picture?.url ? (
          <Image
            src={`${STRAPI_IMAGE_BASE_URL}${author?.picture?.url}`}
            width="100"
            height="100"
            alt="Author"

          />
        ) : (
          <Image
            src="/assets/images/logo-icon.png"
            width="100"
            height="100"
            alt="Author"

          />
        )}
      </div>
      <div className="author-info">
        {author?.name && <div className="author-name">{author?.name}</div>}
        {author?.bio && <div className="author-bio">{author?.bio}</div>}
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
