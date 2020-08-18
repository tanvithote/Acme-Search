import React from "react";

function Tag(tagList) {
  return (
    <div className="row">
      {tagList.tagList.map(tag => {
        return <span class="badge badge-pill badge-primary">{tag}</span>;
      })}
    </div>
  );
}

export default Tag;
