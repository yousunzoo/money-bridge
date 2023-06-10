import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/app/bookmark/page";
import ContentData from "@/mocks/hyeon17/Common/pbContent.json";

function ContentBookMark() {
  return (
    <>
      <BookMark />
      {ContentData ? <ContentCardList props={ContentData} /> : <div>북마크 한 콘텐츠 없음</div>}
    </>
  );
}

export default ContentBookMark;
