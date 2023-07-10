"use client";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import Write from "@/components/contentsPage/Write";
import { ILoginedUserInfo } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

function ContentsWrite() {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return <>{userData?.id && <Write id={userData.id} />}</>;
}

export default ContentsWrite;
