import React from "react";
import TopNav from "@/components/common/TopNav";
import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";
import Edit from "@/components/pbdetailPage/Edit";

function PbDetailEdit() {
  const data = authProfile.data;

  const contentData = {
    intro: data.intro,
    name: data.name,
    speciality1: data.speciality1,
    speciality2: data.speciality2,
    career: data.career,
    award: data.award,
  };

  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Edit contentData={contentData} />
    </>
  );
}

export default PbDetailEdit;
