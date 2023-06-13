import React from 'react'
import TopNav from "@/components/common/TopNav";
import reviewData from "@/mocks/hyeon17/PbDetail/Review/pbreview.json";
import PbReviewList from '@/components/pbdetailPage/pbreviewPage/PbReviewList';

function PbDetailReview() {

  return (
    <>
      <TopNav title="후기 전체보기" hasBack={true} />
      <PbReviewList props={reviewData} />
    </>
  );
}

export default PbDetailReview