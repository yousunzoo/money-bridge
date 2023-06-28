import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "콘텐츠 작성하기",
};

function ContentsWrite() {
  return (
    <>
      <TopNav title="콘텐츠 작성하기" hasBack={true} />
      <Write />
    </>
  );
}

export default ContentsWrite;
