"use client";
import TopNav from "@/components/common/TopNav";
import TemporaryList from "@/components/contentsPage/TemporaryList";
import React from "react";
import { getTempList } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import { ITempList } from "@/types/contents";
import { AxiosError } from "axios";

function ContentsTemp() {
  const { data: tempData } = useQuery<ITempList[], AxiosError>(["getTempList"], getTempList);
  if (!tempData) return null;

  return (
    <>
      <TopNav title="임시저장 콘텐츠" hasBack={true} />
      <TemporaryList tempData={tempData} />
    </>
  );
}

export default ContentsTemp;
