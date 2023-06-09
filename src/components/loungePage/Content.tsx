"use client";
import React, { useState, useEffect } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import Link from "next/link";

function Content({ newHot, all }: any) {
  const [newAll, setNewAll] = useState([]);
  useEffect(() => {
    setNewAll(all.slice(0, 2));
  }, [all]);
  const newData = newHot.slice(0, 2);
  const hotData = newHot.slice(-2);

  const getAllContent = () => {
    setNewAll(all);
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
          <ContentCardList props={newAll} />
        </div>
      </div>
    </div>
  );
}

export default Content;
