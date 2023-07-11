"use client";
import ButtonToAccountSetting from "@/components/loginPage/ButtonToAccountSetting";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import KeepLoginButton from "@/components/loginPage/KeepLoginButton";
import { InputFormType } from "@/constants/enum";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

function Login() {
  const { isLogined, userLoading } = useGetUserInfo();

  useEffect(() => {
    if (!navigator.cookieEnabled) {
      alert("쿠키를 허용해주세요");
      redirect("/");
    }
  }, []);

  if (isLogined && !userLoading) {
    redirect("/");
  }

  return (
    <>
      <div className="mt-10 text-black">
        <p>안녕하세요,</p>
        <p>
          <span className="text-xl font-bold leading-7 text-primary-normal">MONEY BRIDGE </span>입니다.
        </p>
        <DoubleInputForm type={InputFormType.LOGIN} />
        <KeepLoginButton />
        <ButtonToAccountSetting />
      </div>
    </>
  );
}
export default Login;
