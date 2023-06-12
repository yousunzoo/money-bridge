"use client";
import TopNav from "@/components/common/TopNav";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import React, { useState } from "react";
import InformationCheck from "@/components/findEmailPage/SelectInformation";
import { useRouter } from "next/navigation";

function FindEmail() {
  const [nextStep, setNextStep] = useState(false);
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  const router = useRouter();

  const clickLogin = () => {
    router.replace("/login");
  };

  return (
    <>
      <TopNav title="이메일 찾기" hasBack backGroundWhite />
      {nextStep ? (
        <>
          <p className="mb-[40px] mt-[56px] px-[16px] text-[20px] font-bold leading-[28px]">
            회원 정보를 확인해 주세요.
          </p>
          <div className="flex flex-col gap-[25px] px-[16px]">
            {[1, 2].map(item => (
              <div key={item}>
                <InformationCheck inputs={inputs} />
              </div>
            ))}
            <button
              type="button"
              className="mb-[96px] mt-[54px] h-[56px] w-full rounded-[8px] bg-[#153445]"
              onClick={clickLogin}
            >
              <span className="text-[20px] font-bold leading-[28px] text-white">로그인</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-[40px] mt-[56px] px-[16px] text-[20px] font-bold leading-[28px]">
            가입할 때 등록한 정보를 입력해 주세요.
          </p>
          <DoubleInputForm type="findEmail" inputs={inputs} setInputs={setInputs} setNextStep={setNextStep} />
        </>
      )}
    </>
  );
}

export default FindEmail;
