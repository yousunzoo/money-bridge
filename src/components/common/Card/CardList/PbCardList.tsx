"use client";
import React, { useMemo } from "react";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { IPbCard } from "@/types/card";

function PbCardList({ queryKey, api, etc }: { queryKey: string; api: any; etc?: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 0 }) => {
      if (etc) {
        return api(etc, pageParam);
      } else {
        return api(pageParam);
      }
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
        {list?.map((item: IPbCard) => (
          <PbCardItem key={item.id} item={item} />
        ))}
      </ul>
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default PbCardList;
