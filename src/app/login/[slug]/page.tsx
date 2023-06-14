"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToFind from "@/components/loginPage/ButtonToAccountSetting";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import KeepLoginButton from "@/components/loginPage/KeepLoginButton";
import { InputFormType } from "@/constants/enum";
import { useState } from "react";
import AdminAuthentication from "@/components/loginPage/AdminAuthentication";

function Login() {
  const [nextStep, setNextStep] = useState(false);

  return (
    <>
      <TopNav title={`${nextStep ? "관리자 인증" : "로그인"}`} hasBack backGroundWhite />
      <div className="mx-[16px] mt-[40px] text-[#242424]">
        {nextStep ? (
          <AdminAuthentication />
        ) : (
          <>
            <p>안녕하세요,</p>
            <p>
              <span className="text-[20px] font-bold leading-[28px] text-[#153445]">MONEY BRIDGE </span>입니다.
            </p>
            <DoubleInputForm type={InputFormType.LOGIN} setNextStep={setNextStep} />
            <KeepLoginButton />
            <ButtonToFind />
          </>
        )}
      </div>
    </>
  );
}
export default Login;
