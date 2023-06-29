import React, { useEffect, useState } from "react";
import Image from "next/image";
import check from "/public/assets/images/check.svg";

function KeepLoginButton() {
  const [autoLogin, setAutoLogin] = useState(localStorage.getItem("AutoLogin") === "true");

  const clickRememberLoginStatus = () => {
    localStorage.setItem("AutoLogin", (!autoLogin).toString());
    sessionStorage.setItem("AutoLogin", (!autoLogin).toString());
    setAutoLogin(!autoLogin);
  };

  useEffect(() => {
    localStorage.setItem("AutoLogin", autoLogin.toString());
    sessionStorage.setItem("AutoLogin", autoLogin.toString());
  }, []);
  return (
    <div className="flex h-[50px] items-center justify-center gap-1">
      <button
        className={`flex h-6 w-6 cursor-default items-center justify-center rounded-lg border-[2px] ${
          autoLogin ? "border-primary-normal bg-primary-normal" : "bg-transparent border-button-inactive"
        }`}
        onClick={clickRememberLoginStatus}
      >
        <Image src={check} alt="check" />
      </button>
      <span className="text-xs font-semibold">로그인 상태 유지하기</span>
    </div>
  );
}

export default KeepLoginButton;
