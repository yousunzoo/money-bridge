import { RevieCardItemProps } from "@/types/common";
import React from "react";
import ReviewCardItem from "./ReviewCardItem";
type ReviewList = RevieCardItemProps[];
function ReviewCardList(props: { reviewList: ReviewList }) {
  const { reviewList } = props;

  return (
    <div>
      {reviewList &&
        reviewList.map(item => (
          <ReviewCardItem
            key={item.reviewId}
            profileImage={item.profileImage}
            userName={item.userName}
            content={item.content}
            createdAt={item.createdAt}
          />
        ))}
    </div>
  );
}

export default ReviewCardList;
