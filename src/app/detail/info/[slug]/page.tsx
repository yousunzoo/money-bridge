"use client";
import React from "react";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import About from "@/components/pbdetailPage/About";
import { getPbNotLogin, getPbProfile } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { IloginProfile } from "@/types/pb";
import { IDataResponse } from "@/types/common";
import Profile from "@/components/pbdetailPage/Profile";
import { getCookie } from "@/utils/cookies";
import "@/styles/pb.css";
import BlurModal from "@/components/common/Modal/BlurModal";

type Props = {
  params: { slug: number };
};

function PbDetailInfo({ params: { slug } }: Props) {
  const token = getCookie("Authorization");
  const { data: profile } = useQuery<IDataResponse<IloginProfile>, AxiosError>({
    queryKey: ["getPbProfile", slug],
    queryFn: token ? () => getPbProfile(slug) : () => getPbNotLogin(slug),
    refetchOnWindowFocus: false,
  });
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  if (!profile?.data) return null;

  return (
    <div className="mb-24 flex w-full flex-col">
      {userData?.role !== undefined && profile?.data ? (
        <>
          <Intro introData={profile.data} userData={userData} />
          <Content contentData={profile.data} />
          <About aboutData={profile.data} role={userData.role} Id={userData.id} />
        </>
      ) : (
        <>
          <Profile notLoginData={profile?.data} />
          <BlurModal />
        </>
      )}
    </div>
  );
}

export default PbDetailInfo;
