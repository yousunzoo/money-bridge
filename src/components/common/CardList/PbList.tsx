"use client";
import React from "react";
import { useRouter } from "next/navigation";

import PbItem from '@/components/common/CardItem/PbItem';
function PbList({ props }: any) {
  const router = useRouter();

  return (
    <>
      {props.map((item: any) => (
        <PbItem key={item} router={router} />
      ))}
    </>
  );
}

export default PbList;
