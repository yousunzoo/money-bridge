"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

function SortTab() {
  const searchParams = useSearchParams();
  return (
    <div className="flex w-full justify-between text-xs">
      <button>서울시 강남구</button>
      <div className="flex gap-1">
        <button>거리순</button>
        <button>경력순</button>
      </div>
    </div>
  );
}

export default SortTab;
