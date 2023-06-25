"use client";
import { useLocationStore } from "@/store/location";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import myLocation from "/public/assets/images/myLocation.svg";

function SortTab() {
  const [mounted, setMounted] = useState(false);
  const { locations } = useLocationStore();
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="flex w-full justify-between text-sm">
          <p className="flex">
            <span className="mr-1">{locations.location}</span>
            <Image className="mr-2" src={myLocation} alt={"myLocation"} width={14} height={14} />
          </p>
          <div className="flex gap-1" onClick={handleClick}>
            <button data-sort="distance" className={`${sortParam === "distance" ? "font-bold" : "text-gray-normal"}`}>
              거리순
            </button>
            <button data-sort="career" className={`${sortParam === "career" ? "font-bold" : "text-gray-normal"}`}>
              경력순
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SortTab;
