import { Iinputs } from "@/types/DoubleInputForm";
import React from "react";

function InformationCheck({ inputs }: { inputs: Iinputs }) {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-[24px] rounded-[4px] border-[1px] border-[#153445] p-[24px]">
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">이름</p>
          <p className="text-[16px] font-bold leading-[22px]">{inputs.first}</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">전화번호</p>
          <p className="text-[16px] font-bold leading-[22px]">{inputs.second}</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p className="text-[16px] leading-[24px]">이메일</p>
          <p className="text-[16px] font-bold leading-[22px]">Moneybridge@logo.com</p>
        </div>
      </div>
    </>
  );
}

export default InformationCheck;
