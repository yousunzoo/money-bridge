import Content from '@/components/pbdetailPage/Content';
import Intro from '@/components/pbdetailPage/Intro';
import React from 'react'
import TopNav from "@/components/common/TopNav";

function PbDetail() {
  return (
    <>
      <TopNav title="PB 상세프로필" />
      <Intro />
      <Content />
    </>
  );
}

export default PbDetail;