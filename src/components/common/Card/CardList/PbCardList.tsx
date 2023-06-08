"use client";
import React from "react";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";

function PbCardList({props}: any) {
  
  return (
    <ul>
      {props.map((item: any) => (
        <PbCardItem key={item.id} item={item}/>
      ))}
    </ul>
  );
}

export default PbCardList;
