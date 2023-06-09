import Link from "next/link";
import React from "react";

function ButtonToFind() {
  return (
    <div className="flex h-[40px] items-center justify-center gap-3 text-xs font-semibold">
      <Link href="/findEmail">
        <span>이메일 찾기</span>
      </Link>
      <Link href="/findPassword">
        <span>비밀번호 찾기</span>
      </Link>
    </div>
  );
}

export default ButtonToFind;
