import React from 'react'
import Intro from "@/components/pbdetailPage/Intro";
import ContentCardList from '@/components/common/Card/CardList/ContentCardList';
import ContentData from "@/mocks/hyeon17/Common/pbContent.json";
import TopNav from "@/components/common/TopNav";

function PbDetailContent() {
  return (
    <>
      <TopNav title="PB 상세프로필" />
      <Intro />
      <ContentCardList props={ContentData} />
    </>
  );
}

export default PbDetailContent;