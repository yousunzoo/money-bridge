import React, { useState, useEffect } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import Link from "next/link";
import MainCarousel from "@/components/common/Carousel/MainCarousel";
import "@/styles/carousel.css";
import "@/styles/lounge.css";
import { ListResponse } from "@/types/common";
import { ContentCard } from "@/types/card";

function Content({ NewAndHot, All }: { NewAndHot: ListResponse<ContentCard> | undefined; All: any }) {
  const [all, setAll] = useState(All?.data?.list.slice(0, 2));
  const [newData, setNewData] = useState<ContentCard[]>();
  const [hotData, setHotData] = useState<ContentCard[]>();

  useEffect(() => {
    if (NewAndHot) {
      setNewData(NewAndHot.data?.list?.slice(0, 2));
      setHotData(NewAndHot.data?.list?.slice(2, 4));
    }
  }, [NewAndHot]);

  const getAllContent = () => {
    // setAll(All);
    console.log("더보기 버튼 클릭");
    //todo: api를 호출하여 데이터 더 불러오기
  };

  return (
    <div className="flex flex-col">
      <div>
        <div className="header">
          <div className="section">
            따끈따끈한 최신 콘텐츠 부터
            <br />
            읽어보세요
          </div>
          <Link href="/new" className="more flex-3">
            더보기
          </Link>
        </div>
        <div>
          <ContentCardList props={newData} />
        </div>
      </div>
      <div>
        <div className="header">
          <div className="section">
            지금 가장 핫한
            <br />
            인기 콘텐츠
          </div>
          <Link href="/hot" className="more flex-3">
            더보기
          </Link>
        </div>
        <div>
          <ContentCardList props={hotData} />
        </div>
      </div>
      <MainCarousel className="my-11 h-[235px] text-white">
        <div className="pb_banner bg-primary-light">
          <div className="title">
            경험 많은 프라이빗 뱅커를
            <br />
            만나보세요
          </div>
          <Link href="/findPb/list" className="link">
            PB 포트폴리오 보러가기
          </Link>
        </div>
        <div className="pb_banner bg-secondary-heavy">
          <div className="title">
            가까운 거리의 PB를
            <br />
            바로 만나보세요
          </div>
          <Link href="/findPb/list" className="link">
            가까운 거리의 PB 찾기
          </Link>
        </div>
        <div className="pb_banner bg-secondary-light">
          <div className="title">
            선호하는
            <br />
            증권사별 PB를 찾아보세요
          </div>
          <Link href="/findPb/list" className="link">
            증권사별 PB 보러가기
          </Link>
        </div>
      </MainCarousel>
      <div>
        <div className="header">
          <div className="section">
            머니 브릿지의 모든 콘텐츠를
            <br />
            한눈에 보세요
          </div>
          <button onClick={getAllContent} className="more flex-3">
            더보기
          </button>
        </div>
        <div>
          <ContentCardList props={all} />
        </div>
      </div>
    </div>
  );
}

export default Content;
