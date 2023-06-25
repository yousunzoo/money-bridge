"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import PbReviewList from "@/components/pbdetailPage/pbreviewPage/PbReviewList";
import { usePathname } from "next/navigation";

function PbDetailReview() {
  const pathname:string = usePathname();
  const id:number = Number(pathname.split("/").pop());

  return (
    <>
      <TopNav title="후기 전체보기" hasBack={true} />
      <PbReviewList id={id} />
    </>
  );
}

export default PbDetailReview;
