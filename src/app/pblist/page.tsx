"use client";
import PBMenu from "@/components/pblistPage/PBMenu";
import SortTab from "@/components/pblistPage/SortTab";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import FilteredPbCardList from "@/components/pblistPage/FilteredPbCardList";

function PBListPage() {
  const { redirectPath } = usePBListQueries();
  redirectPath();

  return (
    <>
      <PBMenu />
      <SortTab />
      <FilteredPbCardList />
    </>
  );
}

export default PBListPage;
