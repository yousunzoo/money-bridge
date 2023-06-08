"use client";
import Image from "next/image";
import React, { useState } from "react";

function PbCardItem({ key, router }: any) {
  const [isBookmark, setIsBookmark] = useState(false);

  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  return (
    <>
      <div className="mx-auto my-4 flex flex-col h-48 w-4/5 rounded-xl shadow-md" key={key?.id}>
        <div className="flex">
          <div>
            <Image src={key?.profile} alt="프로필" width={100} height={100} />
            프로필
          </div>
          <div className="flex flex-col">
            <div>{key?.name}이름</div>
            <div>{key?.companyName} 소속</div>
            <div>
              {key?.career}
              경력
              {key?.speciality1}
              전문분야1
              {key?.speciality2? key?.speciality2 : null}
              전문분야2
            </div>
            <div>{key?.roadAddress? key?.roadAddress : key?.streetAddress}사무실 위치</div>
          </div>
          <button onClick={bookMark}>{key?.isBookmark ? "북마크 해제" : "북마크"}</button>
        </div>
        <div>{key?.intro} 한줄 소개</div>
        <div className="flex">
          <div className="flex">
            <div>{key?.reservCount} 상담횟수</div>
            <div>{key?.reviewCount} 후기</div>
          </div>
          <button onClick={() => router.push(`/detailPage/${key?.id}`)}>정보보기</button>
        </div>
      </div>
    </>
  );
}

export default PbCardItem;
