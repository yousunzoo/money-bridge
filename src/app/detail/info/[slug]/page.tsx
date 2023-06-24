"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import About from "@/components/pbdetailPage/About";
import { getPbNotLogin, getPbProfile } from "@/app/apis/services/pb";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";

function PbDetailInfo() {
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: profile } = useQuery([`/profile/${id}`], () => getPbNotLogin(id));
  const { data: authProfile } = useQuery([`/auth/profile/${id}`], () => getPbProfile(id));
  const { data: userData } = useQuery(["/auth/account"], getLoginedUserInfo);

  const data = authProfile?.data;
  const profileData = profile?.data;
  const notLoginData = {
    companyLogo: profileData?.companyLogo,
    profile: profileData?.profile,
    msg: profileData?.msg,
  };
  const introData = {
    id: data?.id,
    profile: data?.profile,
    name: data?.name,
    isBookmarked: data?.isBookmarked,
    branchName: data?.branchName,
    msg: data?.msg,
    companyId: data?.companyId,
    companyName: data?.companyName,
    companyLogo: data?.companyLogo,
    reserveCount: data?.reserveCount,
    reviewCount: data?.reviewCount,
  };

  const contentData = {
    id: data?.id,
    intro: data?.intro,
    name: data?.name,
    speciality1: data?.speciality1,
    speciality2: data?.speciality2,
    career: data?.career,
    award: data?.award,
  };

  const aboutData = {
    name: data?.name,
    id: data?.id,
    branchAddress: data?.branchAddress,
    branchName: data?.branchName,
    companyName: data?.companyName,
    branchLatitude: data?.branchLatitude,
    branchLongitude: data?.branchLongitude,
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userData?.role);
  }, [userData]);

  return (
    <div className="mb-24 flex w-full flex-col">
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={role ? introData : notLoginData} role={role} />
      {role && (
        <>
          <Content contentData={contentData} />
          <About aboutData={aboutData} />
        </>
      )}
    </div>
  );
}

export default PbDetailInfo;
