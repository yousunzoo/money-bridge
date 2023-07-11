"use client";
import TemporaryList from "@/components/contentsPage/TemporaryList";
import React from "react";
import { getTempList } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import { ITempList } from "@/types/contents";
import { AxiosError } from "axios";

function ContentsTemp() {
  const { data: tempData } = useQuery<ITempList[], AxiosError>({
    queryKey: ["getTempList"],
    queryFn: getTempList,
    refetchOnWindowFocus: false,
  });
  if (!tempData) return null;

  return (
    <>
      <TemporaryList tempData={tempData} />
    </>
  );
}

export default ContentsTemp;
