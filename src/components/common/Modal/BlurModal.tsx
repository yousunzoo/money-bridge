"use client";
import React from "react";
import { useRouter } from "next/navigation";

function BlurModal() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-end bg-transparent bg-gradient-to-b from-transparent to-black">
      <div className="mb-16 flex w-full flex-col items-center">
        <div className="flex h-24 w-full items-center justify-center text-white">
          회원가입을 하시면 더 많은 정보를 볼 수 있어요!
        </div>
        <button className="h-16 w-56 bg-white" onClick={() => router.push("/join")}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default BlurModal;
