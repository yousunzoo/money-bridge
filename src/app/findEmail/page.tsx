import TopNav from "@/components/common/TopNav";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import React from "react";

function page() {
  return (
    <>
      <TopNav title="이메일 찾기" />
      <DoubleInputForm type="findEmail" />
    </>
  );
}

export default page;
