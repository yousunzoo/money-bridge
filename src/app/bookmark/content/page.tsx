"use client";
import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { userBookMarkContent } from "@/app/apis/services/user";
import { useInfiniteQuery } from "@tanstack/react-query";

function ContentBookMark() {
  const { data: res } = useInfiniteQuery(["/auth/bookmarks/boards"], ({ pageParam = 0 }) =>
    userBookMarkContent(pageParam),
  );

  return (
    <div className="mb-10">
      <BookMark />
      {res?.list ? <ContentCardList props={res} /> : <div className="flex justify-center">북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default ContentBookMark;
