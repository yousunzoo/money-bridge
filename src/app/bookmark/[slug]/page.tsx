import ContentBookMark from "@/components/bookmarkPage/ContentBookmark";
import PbBookMark from "@/components/bookmarkPage/PBBookmark";
import React from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;
  return {
    title: slug === "content" ? "컨텐츠 북마크" : "PB 북마크",
  };
}

function BookmarkPage({ params: { slug } }: { params: { slug: string } }) {
  return <>{slug === "content" ? <ContentBookMark /> : <PbBookMark />}</>;
}

export default BookmarkPage;
