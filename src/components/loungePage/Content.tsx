"use client";
import React, { useState, useEffect } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import Link from "next/link";

function Content({ NewAndHot, All }: any) {
  const [all, setAll] = useState(All.data.list.slice(0, 2));
  const newData = NewAndHot.data.list.slice(0, 2);
  const hotData = NewAndHot.data.list.slice(2, 4);

  const getAllContent = () => {
    // setAll(All);
    console.log("더보기 버튼 클릭");
    //todo: api를 호출하여 데이터 더 불러오기
  };

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex">
          <div>따끈따끈한 최신 콘텐츠 부터 읽어보세요</div>
          <Link href="/new">더보기</Link>
        </div>
        <div>
          <ContentCardList props={newData} />
        </div>
      </div>
      <div>
        <div className="flex">
          <div>지금 가장 핫한 인기 콘텐츠</div>
          <Link href="/hot">더보기</Link>
        </div>
        <div>
          <ContentCardList props={hotData} />
        </div>
      </div>
      <div>
        <div className="flex">
          <div>머니 브릿지의 모든 콘텐츠를 한눈에 보세요</div>
          <button onClick={getAllContent}>더보기</button>
        </div>
        <div>
          <ContentCardList props={all} />
        </div>
      </div>
    </div>
  );
}

export default Content;
