import React from "react";
import Link from "next/link";

function PbRecommend({ name }: any) {
  return (
    <div className="card my-8 h-[214px] bg-primary-normal font-bold">
      <div className="ml-4 mt-7">
        <div className="mb-1 text-xs text-white">맞춤 PB 추천</div>
        <div className="text-xl text-white">
          {name}님께 딱 맞는
          <br />
          PB 매칭 결과가 도착했어요!
        </div>
        <Link
          href="/analysis/complete"
          className="ml-44 mt-10 flex h-11 w-[168px] items-center justify-center rounded-sm bg-white text-xs text-primary-normal"
        >
          PB 매칭 결과 확인하기
        </Link>
      </div>
    </div>
  );
}

export default PbRecommend;
