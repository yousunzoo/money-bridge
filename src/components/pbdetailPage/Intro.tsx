"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRoleStore } from "@/store/roleStore";
import BlurModal from "@/components/common/Modal/BlurModal";

function Intro({ introData }: any) {
  const { id, profile, name, branchName, msg, companyName, reserveCount, reviewCount } = introData;
  // const [isBookmark, setIsBookmark] = useState(Bookmark);
  const { getRole } = useRoleStore();
  const goToCompany = () => {
    console.log("goToCompany");
  };
  // const bookMark = () => {
  //   setIsBookmark(!isBookmark);
  //   // 북마크 여부에 따라 추가, 삭제 api호출
  // };

  return (
    <div id={id}>
      <div className="relative">
        <button onClick={goToCompany} className="absolute z-10">
          로고
        </button>
        <div className="absolute h-[390px] w-[390px] bg-gradient-to-t from-black from-0%"></div>
        <Image src={profile} alt="프로필 이미지" width={390} height={390} />
        <div className="absolute top-72 text-white">{msg}</div>
      </div>
      {getRole() === "" ? (
        <BlurModal />
      ) : (
        <>
          <div>
            <div>{name} PB</div>
            <div>
              {companyName}
              {branchName}점
            </div>
            <div>
              <div>총 상담횟수{reserveCount ? reserveCount : 0}회</div>
              <div>상담후기 {reviewCount ? reviewCount : 0}건</div>
            </div>
            <div>
              <div>공유 아이콘</div>
              {/* <button onClick={bookMark}>{Bookmark ? "북마크 해제" : "북마크"}</button> */}
            </div>
          </div>
          <div>
            <Link href="/detail">PB정보</Link>
            <Link href="/detail/content">콘텐츠</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Intro;
