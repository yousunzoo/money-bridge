"use client";
import React, { useMemo } from "react";
import PbReviewItem from "@/components/pbdetailPage/pbreviewPage/PbReviewItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { getPbReview } from "@/app/apis/services/pb";
import { IPbReview } from "@/types/pb";

function PbReviewList({ id }: { id: number }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    [`auth/reviews/${id}`],
    ({ pageParam = 0 }) => {
      return getPbReview(id, pageParam);
    },
    {
      getNextPageParam: ({ curPage, last }) => (last ? false : curPage + 1),
    },
  );

  const list = useMemo(() => (data ? (data.pages || []).flatMap(data => data.list) : []), [data]);
  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <ul>
        {list?.map((item: IPbReview) => (
          <PbReviewItem key={item.reviewId} item={item} />
        ))}
      </ul>
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default PbReviewList;
