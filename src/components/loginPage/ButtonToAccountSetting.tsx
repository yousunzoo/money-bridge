import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ButtonToFind() {
  const pathName = usePathname();
  return (
    <div className="mt-[140px] flex h-[20px] items-center justify-center gap-[16px] text-[14px] leading-[20px] text-[#565656] underline">
      <Link href="/join">회원가입</Link>
      <Link href="/findEmail">이메일 찾기</Link>
      <Link href={`/findPassword/${pathName.split("/")[2]}/1`}>비밀번호 찾기</Link>
    </div>
  );
}

export default ButtonToFind;
