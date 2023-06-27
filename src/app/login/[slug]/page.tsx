"use client";
import TopNav from "@/components/common/TopNav";
import ButtonToAccountSetting from "@/components/loginPage/ButtonToAccountSetting";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import KeepLoginButton from "@/components/loginPage/KeepLoginButton";
import { InputFormType } from "@/constants/enum";
import { usePathname } from "next/navigation";

function Login() {
  const pathName = usePathname();

  return (
    <>
      <TopNav title={`${pathName.split("/")[2] === "user" ? "유저 로그인" : "PB 로그인"}`} hasBack backGroundWhite />
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
