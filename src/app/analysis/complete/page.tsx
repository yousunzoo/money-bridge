"use client";

import React from "react";
import { useRouter } from "next/navigation";

function AnalysisCompletePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <section className="flex h-full w-full flex-col py-[100px]">
      <div>
        <p className="mb-6 text-3xl font-bold">
          홍길동님의
          <br />
          투자 성향이 등록되었어요.
        </p>
        <p className="mb-6">
          소중한 정보 감사합니다.
          <br />
          투자 성향에 맞는 PB를 만나보세요. &#58;&#41;
        </p>
      </div>
      <button onClick={handleClick} className="mt-auto h-[56px] w-full rounded-lg bg-black text-white">
        시작하기
      </button>
    </section>
  );
}

export default AnalysisCompletePage;
