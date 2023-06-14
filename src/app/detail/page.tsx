"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";
import profile from "@/mocks/hyeon17/PbDetail/Profile/profile.json";
import { useRoleStore } from "@/store/roleStore";
import About from "@/components/pbdetailPage/About";

function PbDetail() {
  const data = authProfile.data;
  const profileData = profile.data;
  const notLoginData = {
    companyLogo: profileData.companyLogo,
    profile: profileData.profile,
    msg: profileData.msg,
  };
  const introData = {
    id: data.id,
    profile: data.profile,
    name: data.name,
    isBookmarked: data.isBookmarked,
    branchName: data.branchName,
    msg: data.msg,
    companyId: data.companyId,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };

  const contentData = {
    intro: data.intro,
    name: data.name,
    speciality1: data.speciality1,
    speciality2: data.speciality2,
    career: data.career,
    award: data.award,
  };

  const aboutData = {
    name: data.name,
    id: data.id,
    branchAddress: data.branchAddress,
    branchName: data.branchName,
    companyName: data.companyName,
    branchLatitude: data.branchLatitude,
    branchLongitude: data.branchLongitude,
  };
  const { getRole } = useRoleStore();

  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={getRole() === "" ? notLoginData : introData} edit={false} />
      {getRole() === "" ? null : (
        <>
          <Content contentData={contentData} edit={false} />
          <About aboutData={aboutData} />
        </>
      )}
    </>
  );
}

export default PbDetail;
