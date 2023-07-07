import React, { useMemo } from "react";
import PbReviewItem from "@/components/pbdetailPage/pbreviewPage/PbReviewItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { getPbReview } from "@/app/apis/services/pb";
import { IPbReview } from "@/types/pb";

function PbReviewList({ id }: { id: number }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["getPbReview",id],
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
  if (!list) return;
  return (
    <>
      {list.length > 0 ? (
        <>
          <ul>
            {list?.map((item: IPbReview) => (
              <PbReviewItem key={item.reviewId} item={item} />
            ))}
          </ul>
          {hasNextPage && <div ref={ref} className="h-1" />}
        </>
      ) : (
        <div className="mt-5 flex w-full items-center justify-center font-bold">작성된 후기가 없습니다.</div>
      )}
    </>
  );
}

export default PbReviewList;
