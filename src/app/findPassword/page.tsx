import DoubleInputForm from "@/components/common/DoubleInputForm";
import LocationCard from "@/components/common/LocationCard";
import TopNav from "@/components/common/TopNav";
import React from "react";

function FindPassword() {
  return (
    <>
      <TopNav title="비밀번호 찾기" />
      <DoubleInputForm type="findPassword" />
    </>
  );
}

export default FindPassword;
