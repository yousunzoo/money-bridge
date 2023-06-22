"use client";
import Link from "next/link";
import React from "react";
import MainCarousel from "../common/Carousel/MainCarousel";

const CAROUSEL_TEXT = [
  {
    id: 1,
    first: "경험 많은 프라이빗 뱅커를",
    second: "만나보세요",
    href: "/findPb/list",
    linkText: "PB 포트폴리오 보러가기",
    color: "bg-primary-light",
  },
  {
    id: 2,
    first: "가까운 거리의 PB를",
    second: "바로 만나보세요",
    href: "/findPb/list",
    linkText: "가까운 거리의 PB 찾기",
    color: "bg-secondary-heavy",
  },
  {
    id: 3,
    first: "선호하는",
    second: "증권사별 PB를 찾아보세요",
    href: "/findPb/list",
    linkText: "증권사별 PB 보러가기",
    color: "bg-secondary-light",
  },
];

function CarouselBanner() {
  return (
    <section>
      <MainCarousel className="text-white">
        {CAROUSEL_TEXT.map(item => (
          <div key={item.id} className={`pb_banner h-[235px] ${item.color}`}>
            <div className="title">
              {item.first}
              <br />
              {item.second}
            </div>
            <Link href={item.href} className="link">
              {item.linkText}
            </Link>
          </div>
        ))}
      </MainCarousel>
    </section>
  );
}

export default CarouselBanner;
