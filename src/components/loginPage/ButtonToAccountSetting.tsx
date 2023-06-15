import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ButtonToFind() {
  const pathName = usePathname();
  return (
    <div className="mt-[140px] flex h-5 items-center justify-center gap-4 text-sm leading-5 text-gray-heavy underline">
      <Link href="/join">회원가입</Link>
      <Link href="/findEmail">이메일 찾기</Link>
      <Link href={`/findPassword/${pathName.split("/")[2]}/enterInformation`}>비밀번호 찾기</Link>
    </div>
  );
}

export default ButtonToFind;
