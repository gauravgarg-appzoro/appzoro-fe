import Link from 'next/link'
import React from 'react'

const BlogTags = ({tags}) => {
  return (
    <div className='blog-tags mt-4'>
      <h3 className='blog-block-title'>Tags</h3>
      <ul>
        {tags?.map((item, index) => (
          <li key={index}><a>{item}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default BlogTags