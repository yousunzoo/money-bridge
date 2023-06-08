"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToFind from "@/components/loginPage/ButtonToFind";
import ButtonToSignUp from "@/components/loginPage/ButtonToSignUp";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import KeepLoginButton from "@/components/loginPage/KeepLoginButton";
import React from "react";

function page() {
  return (
    <>
      <TopNav title="로그인/회원가입" />
      <DoubleInputForm type="login" />
      <KeepLoginButton />
      <ButtonToSignUp />
      <ButtonToFind />
    </>
  );
}

export default page;
