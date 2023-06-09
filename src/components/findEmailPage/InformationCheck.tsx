import { Iinputs } from "@/types/DoubleInputForm";
import React from "react";

function InformationCheck({ inputs }: { inputs: Iinputs }) {
  return (
    <div className=" pt-[50px]">
      <div className="mx-[50px] mb-[25px] mt-[50px] flex flex-col items-center gap-[15px] rounded-[20px] bg-gray-300 p-[20px]">
        <div>
          <p>
            해당 정보가
            <br />
            맞으신가요?
          </p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p>이름</p>
          <p>{inputs.first}</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p>전화번호</p>
          <p>{inputs.second}</p>
        </div>
        <div className="flex w-full flex-row justify-between text-xs">
          <p>이메일</p>
          <p>test@test.com</p>
        </div>
      </div>
      <button className="h-[40px] w-full bg-gray-300">
        <span className="text-xs font-semibold text-slate-400">로그인 하기</span>
      </button>
    </div>
  );
}

export default InformationCheck;
