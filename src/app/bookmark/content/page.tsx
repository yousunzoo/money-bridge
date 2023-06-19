import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import ContentData from "@/mocks/hyeon17/Common/pbContent.json";

function ContentBookMark() {
  return (
    <div className="mb-10">
      <BookMark />
      {ContentData ? <ContentCardList props={ContentData} /> : <div>북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default ContentBookMark;
