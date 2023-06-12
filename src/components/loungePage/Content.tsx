"use client";
import React, { useState } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import Link from "next/link";
import MainCarousel from "@/components/common/Carousel/MainCarousel";
import "@/styles/carousel.css";

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
      <MainCarousel className="bg-black text-white">
        <div className="pb_banner">
          <div>경험 많은 프라이빗 뱅커의 포트폴리오가 궁금하신가요?</div>
          <Link href="/findPb/list" className="underline hover:text-white hover:underline">
            PB 포트폴리오 보러가기
          </Link>
        </div>
        <div className="pb_banner">
          <div>가까운 거리의 PB를 바로 만나보세요</div>
          <Link href="/findPb/list" className="underline hover:text-white hover:underline">
            가까운 거리의 PB 찾기
          </Link>
        </div>
        <div className="pb_banner">
          <div>선호하는 증권사별 PB를 찾아보세요</div>
          <Link href="/findPb/list" className="underline hover:text-white hover:underline">
            증권사별 PB 보러가기
          </Link>
        </div>
      </MainCarousel>
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
