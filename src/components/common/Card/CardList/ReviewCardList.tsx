import { ReviewCardItemProps } from "@/types/common";
import React from "react";
import ReviewCardItem from "../CardItem/ReviewCardItem";
type ReviewList = ReviewCardItemProps[];
function ReviewCardList(props: { reviewList: ReviewList }) {
  const { reviewList } = props;

  return (
    <ul>
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
    </ul>
  );
}

export default ReviewCardList;
