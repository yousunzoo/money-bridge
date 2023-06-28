import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { useMemo } from "react";
import PbCardItem from "../common/Card/CardItem/PbCardItem";
import { useGetFilteredPBlist } from "@/hooks/useGetFilteredPBList";
import PBCardSkeletonItem from "../common/Card/CardItem/PBCardSkeletonItem";

function FilteredPbCardList() {
  const { pbListData, fetchNextPage, hasNextPage, isFetching } = useGetFilteredPBlist();

  const list = useMemo(
    () => (pbListData ? (pbListData.pages || []).flatMap(pbListData => pbListData.list) : []),
    [pbListData],
  );
  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      {isFetching && (
        <>
          <PBCardSkeletonItem />
          <PBCardSkeletonItem />
        </>
      )}
      {list.length > 0 ? (
        <ul>
          {list.map((item: any) => (
            <PbCardItem key={item.id} item={item} bookmarks={true} />
          ))}
        </ul>
      ) : (
        <p className="pt-20 text-center">해당 조건에 맞는 PB가 없습니다.</p>
      )}
      {hasNextPage && <div ref={ref} className="h-1" />}
    </>
  );
}

export default FilteredPbCardList;
