"use client";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import { ILoginedUserInfo } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "콘텐츠 작성하기",
};

function ContentsWrite() {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <TopNav title="콘텐츠 작성하기" hasBack={true} />
      {userData?.id && <Write id={userData?.id} />}
    </>
  );
}

export default ContentsWrite;
