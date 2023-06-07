"use client";
import Image from "next/image";
import React, { useState } from "react";

function PbItem({ key, router }: any) {
  const [isBookmark, setIsBookmark] = useState(false);

  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  return (
    <>
      <div id={key.id} key={key.id}>
        <div>
          <div>
            <Image src={key.profile} alt="프로필" width={100} height={100} />
            프로필
          </div>
          <div>
            <div>{key.name} 이름</div>
            <div>{key.companyName} 소속</div>
            <div>
              {key.career}
              {key.speciality1}
              {key.speciality2}
              전문분야/경력
            </div>
          </div>
          <button onClick={bookMark}>{isBookmark ? "북마크 해제" : "북마크"}</button>
        </div>
        <div>{key.intro} 한줄 소개</div>
        <div>
          <div>
            <div>{key.reservCount} 상담횟수</div>
            <div>{key.reviewCount} 후기</div>
          </div>
          <button onClick={() => router.push(`/detailPage/${key.id}`)}>정보보기</button>
        </div>
      </div>
    </>
  );
}

export default PbItem;
