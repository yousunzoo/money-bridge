import React, { useState } from "react";

const LINKS = [
  { id: 1, text: "신규예약", href: "APPLY" },
  { id: 2, text: "예약확정", href: "CONFIRM" },
  { id: 3, text: "상담완료", href: "COMPLETE" },
  { id: 4, text: "예약취소", href: "WITHDRAW" },
];

interface ProcessListProps {
  setIsProcess: React.Dispatch<React.SetStateAction<string>>;
}

function ProcessList({ setIsProcess }: ProcessListProps) {
  const [selectedItem, setSelectedItem] = useState("APPLY");

  const clickHendler = (item: string) => {
    setSelectedItem(item);
    setIsProcess(item);
  };

  return (
    <ul className="mt-8 flex w-full justify-start gap-2 bg-white">
      {LINKS.map(item => (
        <li
          key={item.id}
          className={`rounded-full rounded-lg border-1 p-2 text-sm ${
            selectedItem === item.href ? "bg-primary-normal text-white" : "border-primary-normal text-primary-normal"
          }`}
        >
          <button onClick={() => clickHendler(item.href)}>{item.text}</button>
        </li>
      ))}
    </ul>
  );
}

export default ProcessList;
