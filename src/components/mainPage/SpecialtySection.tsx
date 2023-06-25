import React from "react";
import Image from "next/image";
import "@/styles/specialty.css";
import KOREAN_STOCK from "/public/assets/images/specialty/KOREAN_STOCK.svg";
import US_STOCK from "/public/assets/images/specialty/US_STOCK.svg";
import DERIVATIVE from "/public/assets/images/specialty/DERIVATIVE.svg";
import FUND from "/public/assets/images/specialty/FUND.svg";
import ETF from "/public/assets/images/specialty/ETF.svg";
import REAL_ESTATE from "/public/assets/images/specialty/REAL_ESTATE.svg";
import BOND from "/public/assets/images/specialty/BOND.svg";
import WRAP from "/public/assets/images/specialty/WRAP.svg";
import Link from "next/link";

const SPECIALTY_LIST = [
  { name: "한국주식", key: "KOREAN_STOCK", src: KOREAN_STOCK },
  { name: "미국주식", key: "US_STOCK", src: US_STOCK },
  { name: "파생", key: "DERIVATIVE", src: DERIVATIVE },
  { name: "펀드", key: "FUND", src: FUND },
  { name: "ETF", key: "ETF", src: ETF },
  { name: "부동산", key: "REAL_ESTATE", src: REAL_ESTATE },
  { name: "채권", key: "BOND", src: BOND },
  { name: "랩", key: "WRAP", src: WRAP },
];

function SpecialtySection() {
  return (
    <section className="relative w-full mt-3 chart">
      <h3 className="text-xl font-bold">
        관심 있는 분야의 전문가를 <br /> 찾아보세요
      </h3>
      <ul className="flex flex-wrap items-center justify-between gap-4 py-4">
        {SPECIALTY_LIST.map(specialty => (
          <li key={specialty.key} className="mt-4 flex h-[68px] w-[68px] flex-col justify-center">
            <Link href={`/pblist?speciality=${specialty.key}`} className="flex flex-col items-center justify-center">
              <div className="p-2 bg-white rounded-md shadow-md">
                <Image src={specialty.src} alt={"KOREAN_STOCK"} width={54} height={54} />
              </div>
              <span className="mt-1 text-sm text-center text-primary-normal">{specialty.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SpecialtySection;
