import { useEffect, useState } from "react";
import Link from 'next/link'
import React from 'react'
import { REACT_APP_API_URL } from "../../lib/constants";

const SidebarCategories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData()
      .then((result) => setCategory(Array.isArray(result) ? result : []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}services`
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
    <div className='blog-sidebar-block'>
      <h2>Services</h2>
      {Array.isArray(category) && category.length > 0 ?

        <ul className='bp-category'>
          {category.map((item, index) => (
            <li key={index}><Link href={`/services/${item?.slug}`}
            >{item?.serviceTitle}</Link></li>
          ))}
        </ul>
        :
        <p className="p-3 text-center">Loading...</p>
      }
    </div>
  )
}

export default SidebarCategories