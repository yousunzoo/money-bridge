import React from "react";

function InformationCheck() {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-[24px] rounded-[4px] border-[1px] border-[#153445] p-[24px]">
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">이름</p>
          <p className="text-[16px] font-bold leading-[22px]">props 이름</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">전화번호</p>
          <p className="text-[16px] font-bold leading-[22px]">props 전화번호</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">이메일</p>
          <p className="text-[16px] font-bold leading-[22px]">props 이메일</p>
        </div>
      </div>
    </>
  );
}

export default InformationCheck;
