"use client";
import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import React from "react";
import { getTemp } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import { ITemp } from "@/types/contents";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";

function ContentsEdit() {
  const pathname: string = usePathname();
  const id: number = Number(pathname.split("/").pop());
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const { data: tempData } = useQuery<ITemp>({
    queryKey: ["getTemp",id],
    queryFn: () => getTemp(id),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <TopNav title="콘텐츠 수정하기" hasBack={true} />
      {tempData && userData?.id && <Write data={tempData} id={id} userData={userData} />}
    </>
  );
}

export default ContentsEdit;
