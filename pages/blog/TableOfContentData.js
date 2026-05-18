import React from 'react'
import dynamic from "next/dynamic";
import DynamicHeading from '../../components/DynamicHeading';
const ReactMarkdown = dynamic(import("react-markdown"));

const TableOfContentData = ({ sectionRefs, section }) => {
  return (
    <div className="post-content">
        {section?.map((section, index) => (
          <div key={section?._id} id={section?._id} ref={sectionRefs[index]}>
            {/* <h3>{section?.title}</h3> */}
            <DynamicHeading
              headingType={section?.heading_type}
              text={section?.title}
            />
            <ReactMarkdown>{section?.post_content}</ReactMarkdown>

            {section?.cta_content && (
              <div className="section-btm-cta" key={section?._id}>
                <ReactMarkdown>{section?.cta_content}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
  )
}

export default TableOfContentData