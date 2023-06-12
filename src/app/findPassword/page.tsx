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
      <TopNav title="비밀번호 찾기" hasBack backGroundWhite />
      <p className="mb-[40px] mt-[56px] px-[16px] text-[20px] font-bold leading-[28px]">
        가입할 때 등록한 정보를 입력해 주세요.
      </p>
      <DoubleInputForm type="findPassword" />
    </>
  );
}

export default FindPassword;
