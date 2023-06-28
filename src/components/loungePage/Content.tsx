import React, { useState, useEffect } from "react";
import Link from "next/link";
import MainCarousel from "@/components/common/Carousel/MainCarousel";
import "@/styles/carousel.css";
import "@/styles/lounge.css";
import { getLoungeBoard, getLoungeNew } from "@/app/apis/services/common";
import { useQuery } from "@tanstack/react-query";
import ContentCardItem from "@/components/common/Card/CardItem/ContentCardItem";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { IContentCard } from "@/types/card";
import { IListResponse } from "@/types/common";
import { AxiosError } from "axios";

function Content() {
  const { data: All } = useQuery<IListResponse<IContentCard>, AxiosError>(["getLoungeNew"], () => getLoungeNew(0));
  const { data: NewAndHot } = useQuery<IListResponse<IContentCard>, AxiosError>(["getLoungeBoard"], getLoungeBoard);
  const [all, setAll] = useState<IContentCard[]>();
  const [newData, setNewData] = useState<IContentCard[]>();
  const [hotData, setHotData] = useState<IContentCard[]>();
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    if (NewAndHot) {
      setNewData(NewAndHot.list?.slice(0, 2));
      setHotData(NewAndHot.list?.slice(2, 4));
    }
    if (All) {
      setAll(All.list?.slice(0, 2));
    }
  }, [NewAndHot, All]);
  
  return (
    <>
      <div>
        <div className="header">
          <div className="section">
            따끈따끈한 최신 콘텐츠 부터
            <br />
            읽어보세요
          </div>
          <Link href="/lounge/new" className="more flex-3">
            더보기
          </Link>
        </div>
        <ul>
          {newData?.map((item: IContentCard) => (
            <ContentCardItem key={item.id} item={item} bookmarks={false} />
          ))}
        </ul>
      </div>
      <div>
        <div className="header">
          <div className="section">
            지금 가장 핫한
            <br />
            인기 콘텐츠
          </div>
          <Link href="/lounge/hot" className="more flex-3">
            더보기
          </Link>
        </div>
        <ul>
          {hotData?.map((item: IContentCard) => (
            <ContentCardItem key={item.id} item={item} bookmarks={false} />
          ))}
        </ul>
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
          {!isClick && (
            <button onClick={() => setIsClick(true)} className="more flex-3">
              더보기
            </button>
          )}
        </div>
        {isClick ? (
          <ContentCardList queryKey={"/boards"} api={getLoungeNew} bookmarks={false} />
        ) : (
          all?.map((item: IContentCard) => <ContentCardItem key={item.id} item={item} bookmarks={false} />)
        )}
      </div>
    </>
  );
}

export default Content;
