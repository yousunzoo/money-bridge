import React from "react";
import ContentCardList from "@/components/common/CardList/ContentCardList";

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
