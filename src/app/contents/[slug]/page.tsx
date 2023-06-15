import Poster from "@/components/contentsPage/Poster";
import React from "react";
import board from "@/mocks/hyeon17/ContentDetail/board.json";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/contentsPage/Content";
import Comments from "@/components/contentsPage/Comments";

function ContentsDetail() {
  const boardData = board.data;
  return (
    <>
      <TopNav title="콘텐츠" hasBack={true} />
      <Poster img={boardData.thumbnail} />\
      <Content />
      <Comments/>
    </>
  );
}

export default ContentsDetail;
