"use client";
import React from "react";
import Link from "next/link";

function PbRecommend() {
  
  return (
    <li className="card">
      <div>
        <div>맞춤 PB 추천</div>
        <div>
          000님께 딱 맞는
          <br />
          PB 매칭 결과가 도착했어요!
        </div>
        <Link href="/lounge/recommend">PB 매칭 결과 확인하기</Link>
      </div>
    </li>
  );
}

export default PbRecommend;
