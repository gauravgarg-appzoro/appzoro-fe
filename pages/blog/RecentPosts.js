import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { REACT_APP_API_URL, STRAPI_IMAGE_BASE_URL } from "../../lib/constants";

const RecentPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData()
      .then((result) => setData(Array.isArray(result) ? result : []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}posts?_sort=published_at:DESC&_limit=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json().catch(() => []);
      return data;
    } catch (error) {
      throw error;
    }
  }
  return (
    <div className="blog-sidebar-block">
      <h2>Recent Posts</h2>
      {Array.isArray(data) && data.length > 0 ? (
        <ul className="bp-recent-post">
          {data.slice(0, 5).map((item, index) => (
            <li key={index}>
              <div className="recent-post-view">
                <Link href={`/blog/${item?.slug}`}>
                  <span>
                    <Image

                      src={`${STRAPI_IMAGE_BASE_URL}${item?.image?.[0]?.url || ''}`}
                      width="50"
                      height="50"
                      alt="blog"
                    />
                  </span>
                  <div className="rp-content">
                    <h3>{item?.title}</h3>
                    <p>{item?.description}</p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-3 text-center">Loading...</p>
      )}
    </div>
  );
};

export default RecentPosts;
