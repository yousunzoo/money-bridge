"use client";

import { getLoungeHot as Hot } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeHot() {
  return <ContentCardList queryKey={"getLoungeHot"} api={Hot} bookmarks={false} />;
}

export default LoungeHot;
