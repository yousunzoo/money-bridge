"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/Card/CardItem/Card";

function PbCardItem({ item }: any) {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);

  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  const goToDetail = () => {
    router.push(`/detail/${item.id}`);
  };

  return (
    <Card>
      <div className="flex">
        <div>{/* <Image src={item.profile} alt="프로필" width={50} height={50} /> */}</div>
        <div className="flex flex-col">
          <div>이름{item.name}</div>
          <div>소속{item.companyName}</div>
          <div>
            전문분야/경력
            {item.speciality1}
            {item.speciality2 ? item.speciality2 : null}
            {item.career}
          </div>
          <div>사무실 위치{item.roadAddress ? item.roadAddress : item.streetAddress}</div>
        </div>
        {/* 비로그인시 안보여야함 나중에 수정 */}
        <button onClick={bookMark}>{item.isBookmark ? "북마크 해제" : "북마크"}</button>
      </div>
      <div>{item.intro}</div>
      <div className="flex">
        <div className="flex">
          <div>총 상담횟수 {item.reservCount}회</div>
          <div>후기 {item.reviewCount}건</div>
        </div>
        <button onClick={goToDetail}>정보보기</button>
      </div>
    </Card>
    // <li className="mx-auto my-4 flex h-48 w-4/5 flex-col rounded-xl shadow-md">

    // </li>
  );
}

export default PbCardItem;
