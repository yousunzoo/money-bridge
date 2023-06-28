"use client";
import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import React from "react";
import { getTemp } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ITemp } from "@/types/contents";

function ContentsEdit() {
  const pathname: string = usePathname();
  const id: number = Number(pathname.split("/").pop());
  const { data: tempData } = useQuery<ITemp>(["getTemp"], () => getTemp(id));

  return (
    <>
      <TopNav title="콘텐츠 수정하기" hasBack={true} />
      {tempData && <Write data={tempData} id={id} />}
    </>
  );
}

export default ContentsEdit;
