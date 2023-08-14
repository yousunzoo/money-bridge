import React, { ReactNode } from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;
  return {
    title: slug === "content" ? "컨텐츠 북마크" : "PB 북마크",
  };
}

function BookmarkLayout({ children }: { params: { slug: string }; children: ReactNode }) {
  return <>{children}</>;
}

export default BookmarkLayout;
