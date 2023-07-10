"use client";
import React from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";

function Lounge() {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Intro userData={userData} />
      {userData?.role === "USER" && <PbRecommend name={userData?.name} />}
      <Content />
    </>
  );
}

export default Lounge;
