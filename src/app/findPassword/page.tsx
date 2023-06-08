import DoubleInputForm from "@/components/common/DoubleInputForm";
import TopNav from "@/components/common/TopNav";
import React from "react";

function page() {
  return (
    <>
      <TopNav title="비밀번호 찾기" />
      <DoubleInputForm type="findPassword" />
    </>
  );
}

export default page;
