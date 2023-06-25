"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useUserStore } from "@/store/userStore";

function ContentCardItem({ item }: { item: any }) {
  const router = useRouter();
  const userData = useUserStore();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);
  const bookMark = (event: any) => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
    event.stopPropagation();
  };
  const goTOLounge = () => {
    router.push("/lounge/content");
  };

  return (
    <li className="h-56 p-6 bg-white cursor-pointer card" onClick={goTOLounge}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <div className="text-base ">
              {item.tag1}&nbsp;&nbsp;•&nbsp;&nbsp;{item.tag2}
            </div>
            <div className="text-2xl font-bold">{item.title}</div>
          </div>
          {userData.user.role && (
            <button onClick={bookMark} className="flex p-2">
              {item.isBookmark ? (
                <Image src={bookmark_filled} alt="북마크 해제" />
              ) : (
                <Image src={bookmark} alt="북마크" />
              )}
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-bold">{item.pbName}PB&nbsp;&nbsp;</span>
            <span>|&nbsp;&nbsp;{item.career}년차</span>
            <div>{item.msg}</div>
          </div>
          {/* <Image src={item.companyLogo} alt="증권사로고" className="w-[114px] h-[26px] ml-[45px]" width={0} height={0} /> */}
        </div>
      </div>
    </li>
  );
}

export default ContentCardItem;
