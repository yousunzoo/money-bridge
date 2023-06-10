import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import React from "react";
import TopNav from "@/components/common/TopNav";
import profile from "@/mocks/hyeon17/PbDetail/profile.json";

function PbDetail() {
  const data = profile.data;
  const introData = {
    id: data.id,
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
    speciality1: data.speciality1,
    speciality2: data.speciality2,
    career: data.career,
    award: data.award,
  };

  return (
    <>
      <TopNav title="PB 상세프로필" />
      <Intro introData={introData} />
      <Content contentData={contentData} />
    </>
  );
}

export default PbDetail;
