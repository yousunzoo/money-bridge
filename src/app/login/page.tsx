import Link from "next/link";
import React from "react";

function SelectLoginType() {
  return (
    <>
      <div className="ml-[16px] mr-[76px] mt-[86px] text-[#242424]">
        <p className="font-bold ">처음뵙겠습니다,</p>
        <p className="font-bold">
          <span className="text-[32px] text-[#153445]">MONEY BRIDGE </span>입니다.
        </p>
        <p className="font-normal">내가 찾던 PB와 투자자를 지금 만나보세요 :&#41;</p>
        <p></p>
      </div>
      <div className="mx-[16px] mb-[96px] mt-[200px] flex flex-col gap-[16px]">
        <Link
          href={"/login/user"}
          className="flex h-[56px] w-full items-center  justify-center rounded-[8px] bg-[#453015] text-[20px] font-bold leading-[28px] text-white"
        >
          일반회원
        </Link>
        <Link
          href={"/login/pb"}
          className="flex h-[56px] w-full items-center  justify-center rounded-[8px] bg-[#153445] text-[20px] font-bold leading-[28px] text-white"
        >
          PB
        </Link>
      </div>
    </>
  );
}

export default SelectLoginType;
