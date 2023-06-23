"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import { LoungeNew as New } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeNew() {
  return (
    <>
      <TopNav title="최신 콘텐츠" hasBack={true} />
      <ContentCardList queryKey={"/boards"} api={New} />
    </>
  );
}

export default LoungeNew;
