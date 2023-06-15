import React, { useState } from "react";

const LINKS = [
  { id: 1, text: "신규예약", href: "APPLY" },
  { id: 2, text: "예약확정", href: "CONFIRM" },
  { id: 3, text: "상담완료", href: "COMPLETE" },
  { id: 4, text: "예약취소", href: "WITHDRAW" },
];

interface ProcessListProps {
  setIsProcess: React.Dispatch<React.SetStateAction<string>>;
  role: string;
}

function ProcessList({ setIsProcess, role }: ProcessListProps) {
  const [selectedItem, setSelectedItem] = useState("APPLY");

  const clickHendler = (item: string) => {
    setSelectedItem(item);
    setIsProcess(item);
  };

  const getContainerClasses = (itemHref: string) => {
    if (role === "user") {
      return selectedItem === itemHref
        ? "bg-secondary-heavy text-white"
        : "border-secondary-heavy text-secondary-heavy";
    } else {
      return selectedItem === itemHref ? "bg-primary-normal text-white" : "border-primary-normal text-primary-normal";
    }
  };

  return (
    <ul className="flex justify-start w-full gap-2 mt-8 bg-white">
      {LINKS.map(item => (
        <li key={item.id} className={`rounded-full rounded-lg border-1 p-2 text-sm ${getContainerClasses(item.href)}`}>
          <button onClick={() => clickHendler(item.href)}>{item.text}</button>
        </li>
      ))}
    </ul>
  );
}

export default ProcessList;
