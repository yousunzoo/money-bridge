"use client";
import TopNav from "@/components/common/TopNav";
import LoginForm from "@/components/loginPage/LoginForm";
import React from "react";

function page() {
  return (
    <>
      <TopNav title="로그인/회원가입" />
      <LoginForm />
    </>
  );
}

export default page;
