import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import React from "react";

function ContentsWrite() {
  return (
    <>
      <TopNav title="콘텐츠 작성하기" hasBack={true} />
      <Write />
    </>
  );
}

export default ContentsWrite;
