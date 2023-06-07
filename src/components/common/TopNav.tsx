"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TopNav({ title, path = "" }: { title: string; path?: string }) {
  const router = useRouter();

  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-[#d9d9d9] px-9">
      <button onClick={() => router.back()}>&lt;</button>
      <span>{title}</span>
      <button onClick={() => router.replace(path)}>X</button>
    </div>
  );
}

export default TopNav;
