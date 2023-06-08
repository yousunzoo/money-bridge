"use client";
import React from 'react'
import { useRouter } from "next/navigation";

function Intro() {
  const router = useRouter();
  const goToBookMark = () => {
    router.push('/bookmark');
  }

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>라운지</div>
        <div>라운지 소개</div>
      </div>
      <button className="flex justify-end" onClick={goToBookMark}>
        아이콘
      </button>
    </div>
  );
}

export default Intro;