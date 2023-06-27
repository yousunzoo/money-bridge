"use client";
import Image from "next/image";
import React, { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { postBookMarkContent, deleteBookMarkContent } from "@/app/apis/services/user";
import { IContentCard } from "@/types/card";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";

function ContentCardItem({ item }: { item: IContentCard }) {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["/auth/account"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(item.isBookmarked);
  console.log(item);
  const bookMark = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isBookmarked) {
      deleteBookMarkContent(item.id);
      setIsBookmarked(false);
    } else {
      postBookMarkContent(item.id);
      setIsBookmarked(true);
    }
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
          {userData?.role && (
            <button onClick={bookMark} className="flex items-center justify-center w-12 flex-3">
              {isBookmarked ? <Image src={bookmark_filled} alt="북마크 해제" /> : <Image src={bookmark} alt="북마크" />}
            </button>
          )}
        </div>
        <div className="flex mt-20">
          <div className="flex h-[31px] flex-1 flex-col text-[10px]">
            <div className="flex text-base">
              <p className="font-bold">{item.pbName}PB</p> &nbsp;| {item.career}년차
            </div>
            <span className="text-base">{item.msg}</span>
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
