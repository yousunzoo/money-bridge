"use client"
import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { getBookMarkContent } from "@/app/apis/services/user";
import { useQuery } from "@tanstack/react-query";
import { IContentCard } from "@/types/card";
import { IDataResponse } from "@/types/common";

function ContentBookMark() {
  const { data: res } = useQuery<IDataResponse<IContentCard>>(["/auth/bookmarks/boards"], () => getBookMarkContent(0));

  return (
    <div className="mb-10">
      <BookMark />
      {res !== null ? (
        <ContentCardList queryKey={"/auth/bookmarks/boards"} api={getBookMarkContent} />
      ) : (
        <div className="flex justify-center">북마크 한 콘텐츠 없음</div>
      )}
    </div>
  );
}

export default ContentBookMark;
