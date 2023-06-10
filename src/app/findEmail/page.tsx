"use client";
import TopNav from "@/components/common/TopNav";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import React, { useState } from "react";
import InformationCheck from "@/components/findEmailPage/InformationCheck";

function FindEmail() {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  return (
    <>
      <TopNav title="이메일 찾기" hasBack />
      <p className="ml-[16px] mt-[56px] pb-[16px] text-[20px] font-bold leading-[28px]">
        {nextStep ? "해당하는 정보를 선택해 주세요." : "가입할 때 등록한 정보를 입력해 주세요."}
      </p>
      {!nextStep ? (
        <InformationCheck inputs={inputs} />
      ) : (
        <DoubleInputForm type="findEmail" inputs={inputs} setInputs={setInputs} setNextStep={setNextStep} />
      )}
    </>
  );
}

export default FindEmail;
