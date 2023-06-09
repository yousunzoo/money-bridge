import React from "react";
import PostCardList from "@/components/common/Card/CardList/ContentCardList";

function ContentBookMark({ data }: any) {
  return (
    data && (
      <div>
        <PostCardList props={data} />
      </div>
    )
  );
}

export default ContentBookMark;
