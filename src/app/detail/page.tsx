"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import profile from "@/mocks/hyeon17/PbDetail/profile.json";
import { useRoleStore } from "@/store/roleStore";

function PbDetail() {
  const data = profile.data;
  const introData = {
    id: data.id,
    profile: data.profile,
    name: data.name,
    branchName: data.branchName,
    msg: data.msg,
    companyName: data.companyName,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };
  const contentData = {
    name: data.name,
    id: data.id,
    intro: data.intro,
    address: data.address,
    branchName: data.branchName,
    companyName: data.companyName,
    speciality1: data.speciality1,
    speciality2: data.speciality2,
    career: data.career,
    award: data.award,
  };
  const { getRole } = useRoleStore();

  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} />
      {getRole() === "" ? null : <Content contentData={contentData} />}
    </>
  );
}

export default PbDetail;
