"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TopNav({ title, path = "" }: { title: string; path?: string }) {
  const router = useRouter();

  return (
    <div className="fixed top-0 flex h-[40px] min-w-[425px]  items-center justify-between bg-[#d9d9d9] px-9">
      <button onClick={() => router.back()}>&lt;</button>
      <span>{title}</span>
      <button onClick={() => router.replace(path)}>X</button>
    </div>
  );
}

export default TopNav;
