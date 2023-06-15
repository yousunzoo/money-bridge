"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";

function ContentCardItem({ item }: any) {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(false);
  const bookMark = (event: any) => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
    event.stopPropagation();
  };
  const goTOLounge = () => {
    router.push("/lounge/content");
  };

  return (
    <li className="card h-56 cursor-pointer" onClick={goTOLounge}>
      <div className="px-[17px]">
        <div className="mt-7 flex">
          <div className="flex-1">
            <div className="mb-1 text-[8px]">
              {item.tag1}&nbsp;&nbsp;•&nbsp;&nbsp;{item.tag2}
            </div>
            <div className="text-2xl font-bold">{item.title}</div>
          </div>
          <button onClick={bookMark} className="flex-3 flex w-12 items-center justify-center">
            {isBookmark ? <Image src={bookmark_filled} alt="북마크 해제" /> : <Image src={bookmark} alt="북마크" />}
          </button>
        </div>
        <div className="mt-[66px] flex">
          <div className="flex flex-col">
            <div>
              {item.pbName}/{item.career}
            </div>
            <div>{item.msg}</div>
          </div>
          {/* <Image src={item.companyLogo} alt="증권사로고" width={50} height={50} /> */}
        </div>
      </div>
    </li>
  );
}

export default ContentCardItem;
