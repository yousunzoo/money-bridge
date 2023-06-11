"use client";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import TopNav from "@/components/common/TopNav";
import React, { useState } from "react";

function FindPassword() {
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  return (
    <>
      <TopNav title="비밀번호 찾기" />
      <DoubleInputForm type="findPassword" inputs={inputs} setInputs={setInputs} />
    </>
  );
}

export default FindPassword;
