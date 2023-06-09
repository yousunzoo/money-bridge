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
      <TopNav title="이메일 찾기" path="/login" />
      {nextStep ? (
        <InformationCheck inputs={inputs} />
      ) : (
        <DoubleInputForm type="findEmail" inputs={inputs} setInputs={setInputs} setNextStep={setNextStep} />
      )}
    </>
  );
}

export default FindEmail;
