import Header from "@/components/common/Header/Header";
import Search from "@/components/loungePage/Search";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import NewAndHot from "@/mocks/hyeon17/Lounge/newandhot.json";
import All from "@/mocks/hyeon17/Lounge/all.json";
import React from "react";
import Content from "@/components/loungePage/Content";

function Lounge() {
  return (
    <div className="mb-5 flex w-full flex-col">
      <Header />
      <Intro />
      <Search />
      <PbRecommend />
      <Content NewAndHot={NewAndHot} All={All} />
    </div>
  );
}

export default Lounge;
