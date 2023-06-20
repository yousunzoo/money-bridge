"use client";
import React, { useEffect, useState } from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { useBookmarkPB } from "@/app/apis/services/user";
import { ListResponse } from "@/types/common";
import { PbCard } from "@/types/card";

function PbBookMark() {
  const [PbData, setPbData] = useState<ListResponse<PbCard> | undefined>();
  const { data: res, error, isLoading, isSuccess } = useBookmarkPB();

  useEffect(() => {
    if (isSuccess) {
      setPbData(res);
    }
  }, [isSuccess, res]);

  return (
    <div className="mb-10">
      <BookMark />
      {PbData ? <PbCardList props={PbData} /> : <div>북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default PbBookMark;
