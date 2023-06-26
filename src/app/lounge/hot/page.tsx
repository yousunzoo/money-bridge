"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import { getLoungeHot as Hot } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeHot() {
  return (
    <>
      <TopNav title="인기 콘텐츠" hasBack={true} />
      <ContentCardList queryKey={"/boards/hot"} api={Hot} />
    </>
  );
}

export default LoungeHot;
