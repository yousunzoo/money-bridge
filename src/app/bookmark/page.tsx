"use client";
import React from "react";
import Link from "next/link";
import TopNav from "@/components/common/TopNav";
import { usePathname } from "next/navigation";

function BookMark() {
  const pathname = usePathname();

  return (
    <div className="mb-[24px]">
      <TopNav title="북마크 목록" hasBack={true} />
      <div className="mx-[-16px] mb-6 flex h-[52px] items-center border-[1px] border-solid border-primary-normal text-base font-bold">
        <Link
          href="/bookmark/content"
          className={`flex h-full w-full items-center justify-center pl-[8px] ${
            pathname === "/bookmark/content" ? "bg-primary-normal text-white" : ""
          }`}
        >
          콘텐츠
        </Link>
        <Link
          href="/bookmark/pb"
          className={`flex h-full w-full items-center justify-center pr-[8px] ${
            pathname === "/bookmark/pb" ? "bg-primary-normal text-white" : ""
          }`}
        >
          PB
        </Link>
      </div>
    </div>
  );
}

export default BookMark;
