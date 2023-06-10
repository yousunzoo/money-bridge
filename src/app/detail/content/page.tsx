import React from "react";
import Intro from "@/components/pbdetailPage/Intro";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import ContentData from "@/mocks/hyeon17/PbDetail/boards.json";
import TopNav from "@/components/common/TopNav";
import profile from "@/mocks/hyeon17/PbDetail/profile.json";

function PbDetailContent() {
  const data = profile.data;
  const introData = {
    id: data.id,
    name: data.name,
    branchName: data.branchName,
    intro: data.intro,
    msg: data.msg,
    companyName: data.companyName,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };
  return (
    <>
      <TopNav title="PB 상세프로필" />
      <Intro introData={introData} />
      <ContentCardList props={ContentData} />
    </>
  );
}

export default PbDetailContent;
