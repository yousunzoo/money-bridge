import TopNav from "@/components/common/TopNav";
import Write from "@/components/contentsPage/Write";
import React from "react";

function ContentsEdit() {
  return (
    <>
      <TopNav title="콘텐츠 수정하기" hasBack={true} />
      <Write />
    </>
  );
}

export default ContentsEdit;
