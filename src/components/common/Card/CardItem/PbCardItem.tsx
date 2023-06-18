"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { PbCard } from "@/types/card";
import { useRoleStore } from "@/store/roleStore";

function PbCardItem({ item}: { item: any; }) {
  const router = useRouter();
  const userData = useRoleStore();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);

  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  const goToDetail = () => {
    router.push("/detail/info");
  };

  return (
    <li className="card h-[200px] px-[20px] pt-[20px]">
      <div className="mb-[18px] flex">
        <Image
          src={item.profile}
          alt="프로필"
          width={0}
          height={0}
          className="mr-[13px] h-[60px] w-[60px] rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <div className="mb-[6px] text-base font-bold">{item.name} PB</div>
          <div className="text-xs">
            {item.companyName}&nbsp;{item.branchName}
          </div>
          <div className="flex text-xs text-gray-normal">
            <p className="font-bold">분야</p>&nbsp;{item.speciality1}&nbsp;
            {item.speciality2 ? item.speciality2 : null}&nbsp;・&nbsp;
            {item.career}년차
          </div>
        </div>
        {userData.user.role && (
          <button onClick={bookMark} className="flex-2 flex w-12 items-start justify-center pt-1">
            {item.isBookmark ? (
              <Image src={bookmark_filled} alt="북마크 해제" />
            ) : (
              <Image src={bookmark} alt="북마크" />
            )}
          </button>
        )}
      </div>
      <div className="flex h-[34px] items-center justify-center rounded-md bg-background-primary text-xs font-bold text-primary-normal">
        "{item.msg}"
      </div>
      <div className="mt-[13px] flex items-center text-sm">
        <div className="flex flex-1 text-[10px]">
          <div className="mr-[27px] flex">
            <p className="font-bold">총 상담횟수</p>&nbsp;{item.reserveCount}회
          </div>
          <div className="flex">
            <p className="font-bold">상담 후기</p>&nbsp;{item.reviewCount}건
          </div>
        </div>
        <button onClick={goToDetail} className="flex-2 h-[34px] w-[110px] rounded-md bg-primary-normal text-white">
          상담 신청
        </button>
      </div>
    </li>
  );
}

export default PbCardItem;
