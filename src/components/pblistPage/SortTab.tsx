"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent } from "react";

function SortTab() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") || "distance";
  const companyParam = searchParams.get("company");
  const specialityParam = searchParams.get("speciality");

  const router = useRouter();
  const setParams = (sortParam: string) => {
    const menuParam = companyParam ? "company=" + companyParam : "speciality=" + specialityParam;
    return "/pblist?" + menuParam + "&sort=" + sortParam;
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const sort = e.target.dataset.sort as string;
    const url = setParams(sort);
    router.push(url);
  };
  return (
    <div className="flex w-full justify-between text-xs">
      <button>서울시 강남구</button>
      <div className="flex gap-1" onClick={handleClick}>
        <button data-sort="distance" className={`${sortParam === "distance" && "font-bold"}`}>
          거리순
        </button>
        <button data-sort="career" className={`${sortParam === "career" && "font-bold"}`}>
          경력순
        </button>
      </div>
    </div>
  );
}

export default SortTab;
