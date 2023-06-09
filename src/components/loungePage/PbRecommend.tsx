"use client";
import React from "react";
import Card from "@/components/common/Card/CardItem/Card";
import Link from "next/link";

function PbRecommend() {
  
  return (
    <Card>
      <div>
        <div>맞춤 PB 추천</div>
        <div>
          000님께 딱 맞는
          <br />
          PB 매칭 결과가 도착했어요!
        </div>
        <Link href="/lounge/recommend">PB 매칭 결과 확인하기</Link>
      </div>
    </Card>
  );
}

export default PbRecommend;
