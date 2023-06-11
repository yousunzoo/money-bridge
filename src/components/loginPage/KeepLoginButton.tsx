import React, { useState } from "react";
import Image from "next/image";
import check from "/public/assets/images/check.svg";

function KeepLoginButton() {
  const [autoLogin, setAutoLogin] = useState(false);

  const clickRememberLoginStatus = () => {
    setAutoLogin(!autoLogin);
  };
  return (
    <div className="flex h-[50px] items-center justify-center gap-1">
      <button
        className={`flex h-[24px] w-[24px] cursor-default items-center justify-center rounded-full border-[2px] ${
          autoLogin ? "border-[#153455] bg-[#153455]" : "border-[#dfdfdf] bg-transparent"
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
