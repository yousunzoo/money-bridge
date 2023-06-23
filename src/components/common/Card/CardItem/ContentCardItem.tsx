"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { postBookMarkContent, deleteBookMarkContent } from "@/app/apis/services/user";

function ContentCardItem({ item }: { item: any }) {
  const { data: userData } = useQuery(["/auth/account"], getLoginedUserInfo);
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);

  const bookMark = (event: any) => {
    event.stopPropagation();
    if (isBookmark) {
      deleteBookMarkContent(item.id);
      setIsBookmark(false);
    } else {
      postBookMarkContent(item.id);
      setIsBookmark(true);
    }
  };
  const goTOLounge = () => {
    router.push("/lounge/content");
  };

  return (
    <li className="card h-56 cursor-pointer bg-white" onClick={goTOLounge}>
      <div className="px-[17px]">
        <div className="mt-7 flex">
          <div className="flex-1">
            <div className="mb-1 text-[8px]">
              {item.tag1}&nbsp;&nbsp;•&nbsp;&nbsp;{item.tag2}
            </div>
            <div className="text-2xl font-bold">{item.title}</div>
          </div>
          {userData?.role && (
            <button onClick={bookMark} className="flex-3 flex w-12 items-center justify-center">
              {isBookmark ? <Image src={bookmark_filled} alt="북마크 해제" /> : <Image src={bookmark} alt="북마크" />}
            </button>
          )}
        </div>
        <div className="mt-20 flex">
          <div className="flex h-[31px] flex-col text-[10px] flex-1">
            <div className="flex">
              <p className="font-bold">{item.pbName}PB</p>&nbsp;| {item.career}년차
            </div>
            <div>{item.msg}</div>
          </div>
          <Image
            src={item.companyLogo}
            alt="증권사로고"
            className="ml-[45px] h-[40px] w-[114px] object-cover"
            width={114}
            height={40}
          />
        </div>
      </div>
    </li>
  );
}

export default ContentCardItem;
