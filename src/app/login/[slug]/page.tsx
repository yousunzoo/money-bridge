"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToFind from "@/components/loginPage/ButtonToAccountSetting";
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
      <TopNav title="로그인" hasBack backGroundWhite />
      <div className="mt-[40px] pl-[16px] text-[#242424]">
        <p>안녕하세요,</p>
        <p>
          <span className="text-[20px] font-bold leading-[28px] text-[#153445]">MONEY BRIDGE </span>입니다.
        </p>
      </div>
      <DoubleInputForm type="login" />
      <KeepLoginButton />
      <ButtonToFind />
    </>
  );
}

export default Login;
