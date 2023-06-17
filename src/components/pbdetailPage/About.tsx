import React from "react";
import Carousel from "antd/lib/carousel";
import "@/styles/defaultCarousel.css";
import { ConsultationStyle } from "@/constants/enum";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import review from "@/mocks/hyeon17/PbDetail/review.json";
import same from "@/mocks/hyeon17/PbDetail/same.json";
import LocationCard from "@/components/common/LocationCard";
import Image from "next/image";
import Link from "next/link";
import ButtonModal from "@/components/common/ButtonModal";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import PbRecentReview from "@/mocks/hyeon17/PbDetail/Review/pbrecentreview.json";
import PbReview from "@/mocks/hyeon17/PbDetail/Review/pbreview.json";
import "@/styles/pb.css";

function About({ aboutData }: any) {
  const { name, branchAddress, branchName, companyName, branchLatitude, branchLongitude } = aboutData;
  const reviewData = review.data;
  const { style1, style2, style3 } = reviewData;
  const sameData = same.data.list;
  const pbReviewData = PbReview.data;
  const pbRecentData = PbRecentReview.data;
  const { isCopyOpen, isCopy, setIsCopyOpen, addressCopy, copyContents } = useCopyClipboard(branchAddress);

  const styleCase = (style: string): { style: ConsultationStyle; image: string } => {
    switch (style) {
      case "METICULOUS":
        return { style: ConsultationStyle.METICULOUS, image: "/assets/images/counselingStyle/METICULOUS.svg" };
      case "FAST":
        return { style: ConsultationStyle.FAST, image: "/assets/images/counselingStyle/FAST.svg" };
      case "KIND":
        return { style: ConsultationStyle.KIND, image: "/assets/images/counselingStyle/KIND.svg" };
      case "PROFESSIONAL":
        return {
          style: ConsultationStyle.PROFESSIONAL,
          image: "/assets/images/counselingStyle/PROFESSIONAL.svg",
        };
      case "HONEST":
        return { style: ConsultationStyle.HONEST, image: "/assets/images/counselingStyle/HONEST.svg" };
      case "PRAGMATIC":
        return { style: ConsultationStyle.PRAGMATIC, image: "/assets/images/counselingStyle/PRAGMATIC.svg" };
      case "DIRECTIONAL":
        return { style: ConsultationStyle.DIRECTIONAL, image: "/assets/images/counselingStyle/DIRECTIONAL.svg" };
      default:
        return { style: ConsultationStyle.OTHER, image: "" };
    }
  };

  return (
    <>
      <div className="info_header">
        투자자 님들의
        <br />
        실제 상담 후기
      </div>
      <div className="card mb-[46px] flex h-[154px] w-full flex-col justify-center">
        <div className="mx-auto mb-[15px] flex text-xs">
          "투자자님들이 말하는&nbsp;<p className="font-bold">{name} PB의 매력</p>은?"
        </div>
        <div className="mx-auto flex w-full justify-between px-[51px]">
          <div className="review_section">
            <Image src={styleCase(style1)?.image} alt={styleCase(style1)?.style} width={56} height={56} />
            <div className="review_text">{styleCase(style1)?.style}</div>
          </div>
          <div className="review_section">
            <Image src={styleCase(style2)?.image} alt={styleCase(style2)?.style} width={56} height={56} />
            <div className="review_text">{styleCase(style2)?.style}</div>
          </div>
          <div className="review_section">
            <Image src={styleCase(style3)?.image} alt={styleCase(style3)?.style} width={56} height={56} />
            <div className="review_text">{styleCase(style3)?.style}</div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <div className="flex w-full items-center">
          <div className="w-full text-xs font-bold">후기 {pbReviewData ? pbReviewData.totalElements : 0}건</div>
          {pbReviewData ? (
            <Link href="/detail/review" className="flex w-full justify-end text-sm underline">
              전체보기
            </Link>
          ) : null}
        </div>
        {pbRecentData ? (
          <ul>
            <Carousel draggable={true}>
              {pbRecentData.list.map((item: any) => (
                <li className="card h-[188px] p-[15px]" key={item.reviewId}>
                  <div className="flex mb-[9px] items-end">
                    <div className="text-sm font-bold mr-2">{item.userName}님</div>
                    <div className="text-xs">{item.createdAt}</div>
                  </div>
                  <div className="bg-background-secondary h-[90px] rounded-md p-3.5 text-xs">{item.content}</div>
                  <ul className="mt-3 flex">
                    {item.list.map((styles: any, idx: number) => (
                      <li key={idx} className="mr-[7px]">{styles.style}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </Carousel>
          </ul>
        ) : null}
      </div>
      <div>
        <div className="info_header">방문 상담을 원하시나요?</div>
        <div className="card">
          <div>
            {companyName}&nbsp;{branchName}
          </div>
          <div>
            <div>{branchAddress}</div>
            <button onClick={addressCopy}>주소 복사</button>
          </div>
          <LocationCard latitude={branchLatitude} longitude={branchLongitude} />
        </div>
      </div>
      <div>
        <div className="info_header">
          핏에 맞는 다른 PB도
          <br />
          함께 만나보세요
        </div>
        <PbCardList props={sameData} />
      </div>
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
    </>
  );
}

export default About;
