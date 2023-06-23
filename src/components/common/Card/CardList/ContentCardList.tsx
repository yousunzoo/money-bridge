"use client";
import React, { useMemo } from "react";
import ContentCardItem from "@/components/common/Card/CardItem/ContentCardItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

function ContentCardList({ queryKey, api ,id}: { queryKey: string; api: any; id?:number }) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    [queryKey],
    ({ pageParam = 0 }) => {
      return api(id, pageParam);
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
        {list ? (
          list.map((item: any) => <ContentCardItem key={item.id} item={item} />)
        ) : (
          <li className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
            작성한 콘텐츠가 없습니다
          </li>
        )}
      </ul>
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default ContentCardList;
