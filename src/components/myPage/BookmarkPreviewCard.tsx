import { IBookmarkPreviewCardProps } from "@/types/my";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BookmarkPreviewCard({ type, bookmark }: IBookmarkPreviewCardProps) {
  const moreColor = type === "board" ? "bg-secondary-normal" : "bg-primary-normal";
  const link = type === "board" ? "/bookmark/content" : "/bookmark/pb";

  if (!bookmark) return;
  const { count, list } = bookmark;

  return (
    <Link href={link} className="w-[48%] rounded-[8px] bg-white shadow-md">
      <div className="flex h-[150px] w-full px-2 pt-5">
        {count > 0 && (
          <>
            <div className="h-[50px] w-[50px] overflow-hidden rounded-[25px]">
              <Image src={list[0].thumbnail} width={50} height={50} alt={list[0].thumbnail} />
            </div>
            {count > 1 && (
              <div className="-ml-4 h-[50px] w-[50px] overflow-hidden rounded-[25px]">
                <Image src={list[1].thumbnail} width={50} height={50} alt={list[1].thumbnail} />
              </div>
            )}
            {count > 2 && (
              <div className={`-ml-4 flex h-[50px] w-[50px] items-center justify-center rounded-[25px] ${moreColor}`}>
                <p className="text-2xl font-bold text-white">+{count - 2}</p>
              </div>
            )}
          </>
        )}
        {count === 0 && (
          <p className="mx-auto self-center break-keep text-xs">
            북마크한 {type === "board" ? "컨텐츠" : "PB"}가 없습니다.
          </p>
        )}
      </div>
      <p className="border-t-1 border-dashed border-background-normal px-2 py-3">
        북마크한 {type === "board" ? "컨텐츠" : "PB"} {count}건
      </p>
    </Link>
  );
}

export default BookmarkPreviewCard;
