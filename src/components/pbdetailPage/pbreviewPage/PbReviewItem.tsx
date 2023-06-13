import React from "react";

function PbReviewItem({ item }: any) {
  return (
    <li className="card cursor-pointer">
      <div>
        <div>{item.userName}</div>
        <div>{item.createdAt}</div>
      </div>
      <div>{item.content}</div>
    </li>
  );
}

export default PbReviewItem;
