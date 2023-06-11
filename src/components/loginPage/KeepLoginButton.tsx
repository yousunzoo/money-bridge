import React, { useState } from "react";

function KeepLoginButton() {
  const [autoLogin, setAutoLogin] = useState(false);

  const clickRememberLoginStatus = () => {
    setAutoLogin(!autoLogin);
  };
  return (
    <div className="flex h-[50px] items-center justify-center gap-1">
      <button
        className={`h-[24px] w-[24px] cursor-default rounded-full border-[2px] ${
          autoLogin ? "border-[#153455] bg-[#153455]" : "border-[#dfdfdf] bg-transparent"
        }`}
        onClick={clickRememberLoginStatus}
      ></button>
      <span className="text-xs font-semibold">로그인 상태 유지하기</span>
    </div>
  );
}

export default KeepLoginButton;
