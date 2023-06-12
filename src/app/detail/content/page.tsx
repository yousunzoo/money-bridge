import React from "react";
import Intro from "@/components/pbdetailPage/Intro";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import ContentData from "@/mocks/hyeon17/PbDetail/boards.json";
import TopNav from "@/components/common/TopNav";
import { introData } from "@/app/detail/page";

function PbDetailContent() {
 
  
  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} edit={false} />
      <ContentCardList props={ContentData} />
    </>
  );
}

export default PbDetailContent;
