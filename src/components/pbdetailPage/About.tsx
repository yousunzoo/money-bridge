"use client";
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

function About({ aboutData }: any) {
  const { name, branchAddress, branchName, companyName, branchLatitude, branchLongitude } = aboutData;
  const reviewData = review.data;
  const { style1, style2, style3 } = reviewData;
  const sameData = same.data.list;
  const pbReviewData = PbReview.data;
  const pbRecentData = PbRecentReview.data;
  const { isCopyOpen, isCopy, setIsCopyOpen, addressCopy, copyContents } = useCopyClipboard(branchAddress);

  const styleCase = (style: string) => {
    switch (style) {
      case "METICULOUS":
        return { style: ConsultationStyle.METICULOUS, image: "이미지" };
      case "FAST":
        return { style: ConsultationStyle.FAST, image: "이미지" };
      case "KIND":
        return { style: ConsultationStyle.KIND, image: "이미지" };
      case "PROFESSIONAL":
        return { style: ConsultationStyle.PROFESSIONAL, image: "이미지" };
      case "HONEST":
        return { style: ConsultationStyle.HONEST, image: "이미지" };
      case "PRAGMATIC":
        return { style: ConsultationStyle.PRAGMATIC, image: "이미지" };
      case "DIRECTIONAL":
        return { style: ConsultationStyle.DIRECTIONAL, image: "이미지" };
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div>투자자 님들의 실제 상담 후기</div>
        <div>
          <div>"투자자님들이 말하는 {name} PB의 매력은?"</div>
          <div>
            {/* <Image src={styleCase(reviewData.style1)?.image} alt="이미지" /> */}
            <div>{styleCase(style1)?.style}</div>
          </div>
          <div>
            {/* <Image src={styleCase(reviewData.style2)?.image} alt="이미지" /> */}
            <div>{styleCase(style2)?.style}</div>
          </div>
          <div>
            {/* <Image src={styleCase(reviewData.style3)?.image} alt="이미지" /> */}
            <div>{styleCase(style3)?.style}</div>
          </div>
        </div>
        <div>
          <div>
            <div>후기{pbReviewData ? pbReviewData.totalElements : 0}건</div>
            {pbReviewData ? <Link href="/detail/review">전체보기</Link> : null}
          </div>
          {pbRecentData ? (
            <ul>
              <Carousel autoplay>
                {pbRecentData.list.map((item: any) => (
                  <li className="card" key={item.reviewId}>
                    <div>
                      <div>{item.userName}</div>
                      <div>{item.createdAt}</div>
                      <ul>
                        {item.list.map((styles: any, idx: number) => (
                          <li key={idx}>{styles.style}</li>
                        ))}
                      </ul>
                    </div>
                    <div>{item.content}</div>
                  </li>
                ))}
              </Carousel>
            </ul>
          ) : null}
        </div>
      </div>
      <div>
        <div>방문 상담을 원하시나요?</div>
        <div>
          <div>
            {companyName}
            {branchName}점
          </div>
          <div>
            <div>{branchAddress}</div>
            <button onClick={addressCopy}>주소 복사</button>
          </div>
          <LocationCard latitude={branchLatitude} longitude={branchLongitude} />
        </div>
      </div>
      <div>
        <div>핏에 맞는 다른 PB도 함께 만나보세요</div>
        <PbCardList props={sameData} />
      </div>
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
    </>
  );
}

export default About;
