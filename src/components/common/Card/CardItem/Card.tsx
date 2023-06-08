import React from "react";

function Card({ props, click }: any) {
  return (
    <li
      className={`mx-auto my-4 flex h-48 w-4/5 flex-col rounded-xl shadow-md ${click ? "cursor-pointer" : ""}`}
      onClick={click}
    >
      {props}
    </li>
  );
}

export default Card;
