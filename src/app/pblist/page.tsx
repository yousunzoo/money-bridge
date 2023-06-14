import Link from "next/link";
import React, { ReactElement } from "react";
import Image from "next/image";
import PBMenu from "@/components/pblistPage/PBMenu";

function PBListPage({ children }: { children: ReactElement }) {
  // 기본경로 pblist?speciality=all

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
      <PBMenu />
      {children}
    </div>
  );
}

export default PBListPage;
