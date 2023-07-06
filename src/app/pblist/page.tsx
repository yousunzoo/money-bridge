"use client";
import Link from "next/link";
import Image from "next/image";
import PBMenu from "@/components/pblistPage/PBMenu";
import SortTab from "@/components/pblistPage/SortTab";
import { usePBListQueries } from "@/hooks/usePBListQueries";
import TopNav from "@/components/common/TopNav";
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
