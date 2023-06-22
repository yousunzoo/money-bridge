"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToAccountSetting from "@/components/loginPage/ButtonToAccountSetting";
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
      <div className="mt-10 text-black">
        {nextStep ? (
          <AdminAuthentication />
        ) : (
          <>
            <p>안녕하세요,</p>
            <p>
              <span className="text-xl font-bold leading-7 text-primary-normal">MONEY BRIDGE </span>입니다.
            </p>
            <DoubleInputForm type={InputFormType.LOGIN} setNextStep={setNextStep} />
            <KeepLoginButton />
            <ButtonToAccountSetting />
          </>
        )}
      </div>
    </>
  );
}
export default Login;
