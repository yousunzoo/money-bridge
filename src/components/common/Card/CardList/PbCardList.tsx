"use client";
import React, { SetStateAction, useMemo, Dispatch, useEffect } from "react";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { IPbCard } from "@/types/card";
import PBCardSkeletonItem from "../CardItem/PBCardSkeletonItem";

function PbCardList({
  queryKey,
  api,
  etc,
  setResult,
  bookmarks,
}: {
  queryKey: string[] | string;
  api: any;
  etc?: string;
  setResult?: Dispatch<SetStateAction<boolean>>;
  bookmarks: boolean;
}) {
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

  useEffect(() => {
    if (list.length > 0) {
      setResult && setResult(true);
    } else {
      setResult && setResult(false);
    }
  }, [list.length, setResult]);

  return (
    <>
      <ul>
        {(isFetching || list.length === 0) && (
          <>
            <PBCardSkeletonItem />
            <PBCardSkeletonItem />
          </>
        )}
        {list?.map((item: IPbCard) => (
          <PbCardItem key={item.id} item={item} queryKey={queryKey} bookmarks={bookmarks} />
        ))}
      </ul>
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default PbCardList;
