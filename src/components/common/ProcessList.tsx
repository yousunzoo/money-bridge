import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const LINKS = [
  { id: 1, text: "신규예약", href: "APPLY" },
  { id: 2, text: "예약확정", href: "CONFIRM" },
  { id: 3, text: "상담완료", href: "COMPLETE" },
  { id: 4, text: "예약취소", href: "WITHDRAW" },
];

interface ProcessListProps {
  role: string;
  linkHref: string;
}

function ProcessList({ role, linkHref }: ProcessListProps) {
  const searchParams = useSearchParams();
  const currentProcess = searchParams.get("process");

  const getContainerClasses = (itemHref: string) => {
    if (role === "USER") {
      return currentProcess === itemHref
        ? "bg-secondary-heavy text-white"
        : "border-secondary-heavy text-secondary-heavy bg-white";
    } else {
      return currentProcess === itemHref ? "bg-primary-normal text-white" : "border-primary-normal text-primary-normal";
    }
  };

  return (
    <ul className="flex justify-start w-full gap-2 mt-8 ">
      {LINKS.map(item => (
        <Link
          href={`/${linkHref}?process=${item.href}`}
          key={item.id}
          className={`rounded-md border-1 p-2 text-sm ${getContainerClasses(item.href)}`}
        >
          <span>{item.text}</span>
        </Link>
      ))}
    </ul>
  );
}

export default ProcessList;
