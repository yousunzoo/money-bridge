import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function ContentBookMark({ data }: any) {
  return (
    data && (
      <div>
        <ContentCardList props={data} />
      </div>
    )
  );
}

export default ContentBookMark;
