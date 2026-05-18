import React, { useRef } from "react";
import TableOfContentsList from "./TableOfContentsList";
import TableOfContentData from "./TableOfContentData";

const TableContentView = ({ data }) => {
  // const sectionRefs = data?.map(() => useRef(null));
  const sectionRefs = useRef(data?.map(() => React.createRef()));
  const offset = 90;

  return (
    <div className="post-table-content">
      <TableOfContentsList sectionRefs={sectionRefs.current} offset={offset} section={data} />
      <TableOfContentData sectionRefs={sectionRefs.current} section={data} />
    </div>
  );
};

export default TableContentView;
