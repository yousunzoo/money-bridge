"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TopNav({
  title,
  hasBack,
  hasClose,
  closePath = "",
}: {
  title: string;
  hasBack?: boolean;
  hasClose?: boolean;
  closePath?: string;
}) {
  const router = useRouter();

  return (
    <div className="fixed top-0 grid h-[40px] min-w-[425px] grid-cols-3 items-center bg-[#d9d9d9] px-[10px]">
      <button className="text-left" onClick={() => router.back()}>
        {hasBack && "<"}
      </button>
      <span>{title}</span>
      <button className="text-right" onClick={() => router.replace(closePath)}>
        {hasClose && "X"}
      </button>
    </div>
  );
}

export default TopNav;
