"use client";
import React from "react";
import Card from "@/components/common/Card/CardItem/Card";
import { useRouter } from "next/navigation";

function PbRecommend() {
  const router = useRouter();
  const goToPbMatching = () => {
    router.push("/lounge/recommend");
  };
  return (
    <Card
      props={
        <div>
          <div>맞춤 PB 추천</div>
          <div>
            000님께 딱 맞는
            <br />
            PB 매칭 결과가 도착했어요!
          </div>
          <button onClick={goToPbMatching}>PB 매칭 결과 확인하기</button>
        </div>
      }
    />
  );
}

export default PbRecommend;
