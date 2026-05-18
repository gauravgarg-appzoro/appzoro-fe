import React, { useState } from "react";

const TableOfContentsList = ({ sectionRefs, offset, section }) => {
  const [showTableContent, setShowTableContent] = useState(true);
  const toggleTableContent = () => {
    setShowTableContent(!showTableContent);
  };

  const handleScroll = (index) => {
    window.scrollTo({
      top: sectionRefs[index].current.offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <div className={`table-content-list ${showTableContent ? "show" : "hide"}`}>
      <div className="table-of-content">
        <h3>Table of Contents</h3>
        <button onClick={toggleTableContent}>
          [{showTableContent ? "show" : "hide"}]
        </button>
      </div>
      <ul>
        {section?.map((section, index) => (
          <li
            key={section?._id}
            className={section?.isChild_item && "child_item"}
          >
            <a
              href={`#${section?._id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(index);
              }}
            >
              {section?.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContentsList;
