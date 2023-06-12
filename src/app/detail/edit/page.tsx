"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
import { introData, contentData } from "@/app/detail/page";

function PbDetailEdit() {

  return (
    <>
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} edit={true} />
      <Content contentData={contentData} edit={true} />
    </>
  );
}

export default PbDetailEdit;
