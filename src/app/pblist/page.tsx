"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import PBMenu from "@/components/pblistPage/PBMenu";
import { ICompanyList } from "@/types/pblist";
import { company } from "@/mocks/seon/companyList";
import pbListData from "@/mocks/seon/pblist.json";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import SortTab from "@/components/pblistPage/SortTab";
import { usePathname } from "next/navigation";

function PBListPage() {
  // 기본경로 pblist?speciality=all&sort=distance
  const pathname = usePathname();
  console.log(pathname);
  const companyList = company as ICompanyList;
  return (
    <div className="h-full w-full bg-background-normal">
      <h2 className="mb-7 text-xl font-bold">
        관심 있는 증권사의
        <br />
        전문 PB를 찾아보세요.
      </h2>

      <Link
        href="/pblist/recommend"
        className="mb-6 flex items-center justify-between rounded-md bg-primary-normal p-4 text-white"
      >
        <span>당신을 위한 맞춤 추천</span>
        <Image src="/assets/images/arrayNext.svg" alt="맞춤 추천으로 이동" width={14} height={14} />
      </Link>
      <PBMenu companyList={companyList} />
      <SortTab />
      <PbCardList props={pbListData} />
    </div>
  );
}

export default PBListPage;
