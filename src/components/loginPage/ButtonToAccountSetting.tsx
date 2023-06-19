import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ButtonToFind() {
  const pathName = usePathname();
  const type = pathName.split("/")[2];
  return (
    <div className="mb-[60px] mt-[140px] flex h-5 items-center justify-center gap-4 text-sm leading-5 text-gray-heavy underline">
      <Link href={`/join/${type}/email`}>회원가입</Link>
      <Link href={`/findEmail/${type}/enterInformation`}>이메일 찾기</Link>
      <Link href={`/findPassword/${type}/enterInformation`}>비밀번호 찾기</Link>
    </div>
  );
}

export default ButtonToFind;
