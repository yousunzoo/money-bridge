import React from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import BookMark from "@/app/bookmark/page";
import PbData from "@/mocks/hyeon17/Common/pbList.json"

function PbBookMark() {
  return (
    <>
      <BookMark />
      {PbData ? <PbCardList props={PbData} /> : <div>북마크 한 콘텐츠 없음</div>}
    </>
  );
}

export default PbBookMark;
