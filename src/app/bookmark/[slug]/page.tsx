import ContentBookMark from "@/components/bookmarkPage/ContentBookmark";
import PbBookMark from "@/components/bookmarkPage/PBBookmark";
import React from "react";

function BookmarkPage({ params: { slug } }: { params: { slug: string } }) {
  return <>{slug === "content" ? <ContentBookMark /> : <PbBookMark />}</>;
}

export default BookmarkPage;
