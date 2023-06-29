"use client";
import Link from "next/link";
import React from "react";
import MainCarousel from "../common/Carousel/MainCarousel";
import { CAROUSEL_TEXT } from "@/constants/common";

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
