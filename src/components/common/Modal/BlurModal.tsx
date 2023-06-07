"use client";
import React from "react";
import { useRouter } from "next/navigation";

function BlurModal() {
  const router = useRouter();

  return (
    <div>
      <div>회원가입을 하시면 더 많은 정보를 볼 수 있어요!</div>
      <button onClick={() => router.push("/joinPage")}>회원가입</button>
    </div>
  );
}

export default BlurModal;
