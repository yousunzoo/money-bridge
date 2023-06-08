"use client";
import React from "react";
import { useRouter } from "next/navigation";

import PbCardItem from "@/components/common/CardItem/PbCardItem";
function PbCardList({ props }: any) {
  const router = useRouter();

  return (
    <>
      {props.map((item: any) => (
        <PbCardItem key={item} router={router} />
      ))}
    </>
  );
}

export default PbCardList;
