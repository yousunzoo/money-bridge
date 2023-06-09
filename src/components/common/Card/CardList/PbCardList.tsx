"use client";
import React from "react";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";

function PbCardList({props}: any) {
  // 10개 이상이면 무한 스크롤 동작 시작
  return (
    <ul>
      {props.map((item: any) => (
        <PbCardItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default PbCardList;
