"use client";
import React from "react";
import PbReviewList from "@/components/pbdetailPage/pbreviewPage/PbReviewList";
import { usePathname } from "next/navigation";

function PbDetailReview() {
  const pathname: string = usePathname();
  const id: number = Number(pathname.split("/").pop());

  return (
    <>
      <PbReviewList id={id} />
    </>
  );
}

export default PbDetailReview;
