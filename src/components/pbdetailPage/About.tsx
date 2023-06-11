"use client";
import React from "react";
import Carousel from "antd/lib/carousel";
import "@/styles/defaultCarousel.css";
import { useRouter } from "next/navigation";
import { ConsultationStyle } from "@/constants/enum";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import review from "@/mocks/hyeon17/PbDetail/review.json";
import same from "@/mocks/hyeon17/PbDetail/same.json";
import portfolio from "@/mocks/hyeon17/PbDetail/portfolio.json";
// import LocationCard from "@/components/common/LocationCard";

function About({ aboutData }: any) {
  const { id, name, address, branchName, companyName } = aboutData;
  const reviewData = review.data;
  const sameData = same.data.list;
  const portfolioData = portfolio.data;
  const router = useRouter();

  const goToPbReview = () => {
    router.push(`/detail/review/${id}`);
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = portfolioData.file;
    link.download = "portfolio.pdf";
    link.click();
  };

  const styleCase = (style: string) => {
    switch (style) {
      case "METICULOUS":
        return ConsultationStyle.METICULOUS;
      case "FAST":
        return ConsultationStyle.FAST;
      case "KIND":
        return ConsultationStyle.KIND;
      case "PROFESSIONAL":
        return ConsultationStyle.PROFESSIONAL;
      case "HONEST":
        return ConsultationStyle.HONEST;
      case "PRAGMATIC":
        return ConsultationStyle.PRAGMATIC;
      case "DIRECTIONAL":
        return ConsultationStyle.DIRECTIONAL;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div>{name}PB의 포트폴리오를 확인해 보세요</div>
        <div key={portfolioData.id}>
          <div>
            <div>{portfolioData.highestReturn}</div>
            <div>최고 수익률</div>
          </div>
          <div>
            <div>{portfolioData.propensity}</div>
            <div>투자 성향</div>
          </div>
          <div>
            <div>
              {portfolioData.startDate}
              {portfolioData.endDate}
            </div>
            <div>기간</div>
          </div>
          <div>
            <div>{portfolioData.dangerRate}</div>
            <div>위험등급</div>
          </div>
        </div>
      </div>
      <div>
        <div>포트폴리오 다운로드</div>
        <div>
          <div>portfolio.pdf</div>
          <button onClick={() => download}>다운로드</button>
        </div>
      </div>
      <div>
        <div>투자자 님들의 실제 상담 후기</div>
        <div>
          <div>"투자자님들이 말하는 {name} PB의 매력은?"</div>
          <div>
            <div>이미지</div>
            <div>{styleCase(reviewData.style1)}</div>
          </div>
          <div>
            <div>이미지</div>
            <div>{styleCase(reviewData.style2)}</div>
          </div>
          <div>
            <div>이미지</div>
            <div>{styleCase(reviewData.style3)}</div>
          </div>
        </div>
        <div>
          <div>
            <div>후기00건</div>
            <button onClick={() => goToPbReview}>전체보기</button>
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
            <div>{address}</div>
            <button>주소 복사</button>
          </div>
          <div>{/* <LocationCard latitude={lat} longitude={lng} /> */}</div>
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
