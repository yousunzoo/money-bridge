import React from "react";

function PbReviewItem({ item }: any) {
  return (
    <li className="card cursor-pointer">
      <div>
        <div>{item.userName}</div>
        <div>{item.createdAt}</div>
        <ul>
          {item.list.map((styles: any, idx: number) => (
            <li key={idx}>{styles.style}</li>
          ))}
        </ul>
      </div>
      <div>{item.content}</div>
    </li>
  );
}

export default PbReviewItem;
