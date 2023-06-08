"use client";
import TopNav from "@/components/common/TopNav";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import React, { useState } from "react";
import InformationCheck from "@/components/findEmailPage/InformationCheck";

function FindEmail() {
  const [nextStep, setNextStep] = useState<boolean>(false);
  return (
    <>
      <TopNav title="이메일 찾기" />
      {nextStep ? <InformationCheck /> : <DoubleInputForm type="findEmail" setNextStep={setNextStep} />}
    </>
  );
}

export default FindEmail;
