import React from "react";

function Card({ children, click }: { children: React.ReactNode , click?: () => void}) {
  return (
    <li
      className={`mx-auto my-4 flex h-48 w-4/5 flex-col rounded-xl shadow-md ${click ? "cursor-pointer" : ""}`}
      onClick={click}
    >
      {children}
    </li>
  );
}

export default Card;
