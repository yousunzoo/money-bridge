"use client";
import React from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { getBookMarkPB } from "@/app/apis/services/user";
import { useQuery } from "@tanstack/react-query";
import { IListResponse } from "@/types/common";
import { IPbCard } from "@/types/card";

function PbBookMark() {
  const { data: res } = useQuery<IListResponse<IPbCard>>(["getBookMarkPB"], () => getBookMarkPB(0));

  return (
    <div className="mb-10">
      <BookMark />
      {res && res?.list.length > 0 ? (
        <PbCardList queryKey={"/user/bookmarks/pb"} api={getBookMarkPB} bookmarks={true} />
      ) : (
        <div className="flex justify-center">북마크 한 PB 없음</div>
      )}
    </div>
  );
}

export default PbBookMark;
