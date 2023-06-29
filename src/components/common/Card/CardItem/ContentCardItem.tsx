"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { IContentCard } from "@/types/card";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import useContentBookMark from "@/hooks/useContentBookMark";
import ButtonModal from "@/components/common/ButtonModal";

function ContentCardItem({ item, queryKey, bookmarks }: { item: IContentCard; queryKey?: string | string[]; bookmarks: boolean; }) {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();

  const goToContents = () => {
    router.push(`/contents/${item.id}`);
  };

  const { isBookmark, isBookmarkedOpen, setIsBookmarkedOpen, bookMarkHandler, bookMarkContents } = useContentBookMark(
    item.isBookmarked,
    "/bookmark/content",
    queryKey,
  );

  return (
    <>
      <li className="card h-56 cursor-pointer bg-white p-6" onClick={goToContents}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <div className="text-base ">
                {item.tag1}&nbsp;&nbsp;•&nbsp;&nbsp;{item.tag2}
              </div>
              <div className="text-2xl font-bold">{item.title}</div>
            </div>
            {userData?.role !== undefined && bookmarks && (
              <button
                onClick={event => {
                  event.stopPropagation(); // Prevent event propagation
                  bookMarkHandler(item.id);
                }}
                className="flex-3 flex w-12 items-center justify-center"
              >
                {item.isBookmarked ? (
                  <Image src={bookmark_filled} alt="북마크 해제" />
                ) : (
                  <Image src={bookmark} alt="북마크" />
                )}
              </button>
            )}
          </div>
          <div className="mt-20 flex">
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
      {isBookmarkedOpen && isBookmark && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkedOpen} setIsOpen={setIsBookmarkedOpen} />
      )}
    </>
  );
}

export default ContentCardItem;
