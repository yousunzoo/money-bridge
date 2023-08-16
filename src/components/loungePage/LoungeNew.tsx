"use client";
import { getLoungeNew as New } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeNew() {
  return <ContentCardList queryKey={"getLoungeNew"} api={New} bookmarks={false} />;
}

export default LoungeNew;
