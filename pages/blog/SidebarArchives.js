import Link from 'next/link'
import React from 'react'

const SidebarArchives = ({ archives }) => {
  const archivesTag = archives;
  return (
    <div className='blog-sidebar-block'>
      <h2>Archives</h2>
      <ul className='bp-archives'>
        {archivesTag?.map((item, index) => (
          <li key={index}><Link href={`/blog/archives/${item.slug}`}>{item?.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarArchives