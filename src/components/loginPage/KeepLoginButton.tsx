import React, { useState } from "react";

function KeepLoginButton() {
  const [autoLogin, setAutoLogin] = useState(false);
  return (
    <div className="flex h-[50px] items-center justify-center gap-1">
      <input type="radio" checked={autoLogin} onClick={() => setAutoLogin(!autoLogin)} />
      <span className="text-xs font-semibold">로그인 상태 유지하기</span>
    </div>
  );
}

export default KeepLoginButton;
