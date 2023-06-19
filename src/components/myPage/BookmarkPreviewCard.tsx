import { IBookmarkPreviewCardProps } from "@/types/my";
import Link from "next/link";
import React from "react";

function BookmarkPreviewCard({ type, bookmark }: IBookmarkPreviewCardProps) {
  const moreColor = type === "board" ? "bg-secondary-normal" : "bg-primary-normal";
  const link = type === "board" ? "/bookmark/content" : "/bookmark/pb";
  const { count, list } = bookmark;
  return (
    <Link href={link} className="w-[48%] rounded-[8px] bg-white shadow-md">
      <div className="flex h-[150px] w-full px-2 pt-5">
        {count > 0 && (
          <>
            <div className="h-[50px] w-[50px] overflow-hidden rounded-[25px] bg-gray-normal">
              {/* <Image src={list[0].thumbnail} width={50} height={50} alt={list[0].id} /> */}
            </div>
            {count > 1 && (
              <div className="-ml-4 h-[50px] w-[50px] overflow-hidden rounded-[25px] bg-gray-normal">
                {/* <Image src={list[0].thumbnail} width={50} height={50} alt={list[0].id} /> */}
              </div>
            )}
            {count > 2 && (
              <div className={`-ml-4 flex h-[50px] w-[50px] items-center justify-center rounded-[25px] ${moreColor}`}>
                <p className="text-2xl font-bold text-white">+{count - 2}</p>
              </div>
            )}
          </>
        )}
      </div>
      <p className="border-t-1 border-dashed border-background-normal px-2 py-3">
        북마크한 {type === "board" ? "컨텐츠" : "PB"} {count}건
      </p>
    </Link>
  );
}

export default BookmarkPreviewCard;
