"use client";

import { useMemo, useState } from "react";
import AccordianItem from "./AccordianItem";
import { IAccordianListProps } from "@/types/my";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFAQs, getNotices } from "@/app/apis/services/etc";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

function AccordianList({ type }: IAccordianListProps) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    [type],
    ({ pageParam = 0 }) => {
      return type === "notice" ? getNotices(pageParam) : getFAQs(pageParam);
    },
    {
      getNextPageParam: ({ curPage, last }) => (last ? false : curPage + 1),
    },
  );

  const list = useMemo(() => (data ? data.pages.flatMap(data => data.list) : []), [data]);

  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const [nowClicked, setNowClicked] = useState<string | null>(null);
  if (!data || isLoading) return;
  return (
    <>
      <ul>
        {list.map(listItem => (
          <AccordianItem key={listItem.id} nowClicked={nowClicked} setNowClicked={setNowClicked} listItem={listItem} />
        ))}
      </ul>
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default AccordianList;
