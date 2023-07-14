"use client";
import Image from "next/image";
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

function ContentCardItem({
  item,
  queryKey,
  bookmarks,
  id,
}: {
  item: IContentCard;
  queryKey?: string | string[];
  bookmarks: boolean;
  id?: number;
}) {
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();

  const goToContents = () => {
    router.push(`/contents/${item.id}`);
  };

  const {
    isBookmarkedOpen,
    setIsBookmarkedOpen,
    bookMarkHandler,
    bookMarkContents,
    isOpen,
    setIsOpen,
    error,
    isBookmark,
  } = useContentBookMark(item.isBookmarked, "/bookmark/content", id, queryKey);

  return (
    <>
      <li className="card h-56 cursor-pointer bg-white p-6" onClick={goToContents}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <div className="text-base ">
                {item.tag1}&nbsp;&nbsp;{item.tag2 && "•"}&nbsp;&nbsp;{item.tag2}
              </div>
              <div className="break-keep text-2xl font-bold">{item.title}</div>
            </div>
            {userData?.role === "USER" && bookmarks && (
              <button
                onClick={event => {
                  event.stopPropagation();
                  bookMarkHandler(item.id);
                }}
                className="flex-3 flex w-12 items-center justify-end"
              >
                {isBookmark ? (
                  <Image src={bookmark_filled} alt="북마크 해제" />
                ) : (
                  <Image src={bookmark} alt="북마크" />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex-1 text-base">
              <p>
                <b>{item.pbName}PB&nbsp;</b>| {item.career}년차
              </p>
              <p className="text-base">{item.msg}</p>
            </div>
            <Image src={item.companyLogo} alt="증권사로고" width={80} height={80} />
          </div>
        </div>
      </li>
      {isBookmarkedOpen && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkedOpen} setIsOpen={setIsBookmarkedOpen} />
      )}
      {error && <ButtonModal modalContents={error} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default ContentCardItem;
