
import Header from "@/components/common/Header/Header";
import Search from "@/components/loungePage/Search";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import NewHot from '@/mocks/hyeon17/Lounge/newandhot.json'
import All from '@/mocks/hyeon17/Lounge/all.json'
import React from "react";
import Content from "@/components/loungePage/Content";

function Lounge() {
  const newHot = NewHot.data;
  const all = All.data.list;

  return (
    <div className="flex w-full flex-col mb-5">
      <Header />
      <Intro />
      <Search />
      <PbRecommend />
      <Content newHot={newHot} all={all} />
    </div>
  );
}

export default Lounge;
