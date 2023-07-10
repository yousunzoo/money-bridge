import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PB 리스트",
};

function PBListLayout({ children }: { children: ReactNode }) {
  return (
    <>
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
      {children}
    </>
  );
}

export default PBListLayout;
