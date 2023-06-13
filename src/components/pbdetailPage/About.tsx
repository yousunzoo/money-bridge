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

function About({ aboutData }: any) {
  const { name, branchAddress, branchName, companyName, branchLatitude, branchLongitude } = aboutData;
  const reviewData = review.data;
  const{ style1, style2, style3 } = reviewData;
  const sameData = same.data.list;

  const styleCase = (style: string) => {
    switch (style) {
      case "METICULOUS":
        return {style: ConsultationStyle.METICULOUS, image: "이미지"};
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
            <div>후기00건</div>
            <Link href='/detail/review'>전체보기</Link>
          </div>
          <Carousel className="">
            <li className="card">
              <div>
                <div>이름1</div>
                <div>날짜</div>
              </div>
              <div>내용</div>
            </li>
            <li className="card">
              <div>
                <div>이름2</div>
                <div>날짜</div>
              </div>
              <div>내용</div>
            </li>
            <li className="card">
              <div>
                <div>이름3</div>
                <div>날짜</div>
              </div>
              <div>내용</div>
            </li>
          </Carousel>
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
            <button>주소 복사</button>
          </div>
          <LocationCard latitude={branchLatitude} longitude={branchLongitude} />
        </div>
      </div>
      <div>
        <div>핏에 맞는 다른 PB도 함께 만나보세요</div>
        <PbCardList props={sameData} />
      </div>
    </>
  );
}

export default About;
