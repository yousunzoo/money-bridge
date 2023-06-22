import Link from "next/link";
import React from "react";

function PBJoinGuide() {
  return (
    <>
      <p className="mb-6 mt-14 text-3xl font-bold">PB 가입 안내</p>
      <p className="mb-[360px]">
        PB 가입 이메일은 회원 식별 고유 키로
        <br />
        가입 후 변경이 불가능하므로
        <br />
        개인 이메일로 가입하기를 권유드립니다
      </p>
      <Link
        className="flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-white"
        href={"/join/pb/email"}
      >
        PB 회원가입
      </Link>
    </>
  );
}

export default PBJoinGuide;
