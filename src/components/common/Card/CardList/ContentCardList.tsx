"use client";
import React, { SetStateAction, useMemo, Dispatch,useEffect } from "react";
import ContentCardItem from "@/components/common/Card/CardItem/ContentCardItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { IContentCard } from "@/types/card";

function ContentCardList({
  queryKey,
  api,
  etc,
  setResult,
  bookmarks,
}: {
  queryKey: string[] | string;
  api: any;
  etc?: number | string;
  setResult?: Dispatch<SetStateAction<boolean>>;
  bookmarks:boolean;
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
        {list.length > 0 ? (
          list.map((item: IContentCard) => (
            <ContentCardItem key={item.id} item={item} queryKey={queryKey} bookmarks={bookmarks} />
          ))
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
