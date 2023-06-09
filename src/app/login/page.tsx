"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToFind from "@/components/loginPage/ButtonToFind";
import ButtonToSignUp from "@/components/loginPage/ButtonToSignUp";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import KeepLoginButton from "@/components/loginPage/KeepLoginButton";
import React, { useState } from "react";

function Login() {
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  return (
    <>
      <TopNav title="로그인/회원가입" />
      <DoubleInputForm type="login" inputs={inputs} setInputs={setInputs} />
      <KeepLoginButton />
      <ButtonToSignUp />
      <ButtonToFind />
    </>
  );
}

export default Login;
