import React from 'react'

const DynamicHeading = (props) => {
  const HeadingTag = props?.headingType || "h3";
  return (
    <HeadingTag>{props?.text}</HeadingTag>
  )
}

export default DynamicHeading