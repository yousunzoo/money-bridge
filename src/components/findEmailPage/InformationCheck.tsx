import React from "react";

function InformationCheck() {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-6 rounded-sm border-1 border-primary-normal p-6">
        <div className="flex w-full flex-row justify-between">
          <p className="leading-6">이름</p>
          <p className="font-bold leading-[22px]">props 이름</p>
        </div>
        <div className="flex w-full flex-row justify-between">
          <p className="leading-6">전화번호</p>
          <p className="font-bold leading-[22px]">props 전화번호</p>
        </div>
        <div className="flex w-full flex-row justify-between">
          <p className="leading-6">이메일</p>
          <p className="font-bold leading-[22px]">props 이메일</p>
        </div>
      </div>
    </>
  );
}

export default InformationCheck;
