import Link from "next/link";
import React from "react";

function UserComplete() {
  return (
    <>
      <p className="mt-14 font-bold leading-[22px]">반갑습니다 투자자님 :&#41;</p>
      <p className="mt-2 text-3xl font-bold leading-[42px]">
        회원가입이
        <br />
        완료되었습니다
      </p>
      <p className="mt-6">
        투자성향을 기록하면
        <br />
        MONEY BRIDGE를 더 알차게
        <br />
        사용하실 수 있어요!
      </p>
      <div className="mt-[288px] flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-xl leading-7 text-white">
        <Link href={"/analysis"}>1분 만에 투자 성향 알아보기</Link>
      </div>
      <div className="mb-[60px] mt-4 flex justify-center text-center text-sm leading-5 text-gray-heavy">
        <Link className="cursor-pointer border-b-1" href={"/"}>
          홈으로 가기
        </Link>
      </div>
    </>
  );
}

export default UserComplete;
