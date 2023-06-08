"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE } from "@/constants/enum";

function Intro() {
  const router = useRouter();
  const { getRole } = useRoleStore();

  const goToBookMark = () => {
    router.push("/bookmark");
  };
  const goToPbWrite = () => {
    router.push("/lounge/write");
  };
  const goToPbContent = () => {
    router.push("/detail/content");
  };

  return (
    <div className="flex">
      <div>
        <div className="flex flex-1 flex-col">
          <div>라운지</div>
          <div>라운지 소개</div>
        </div>
        <button className="flex justify-end" onClick={goToBookMark}>
          아이콘
        </button>
      </div>
      {getRole() === CommonROLE.PB && (
        <div>
          <div>투자자들을 위한 투자 정보 콘텐츠를 작성해보세요</div>
          <div>
            <button onClick={goToPbContent}>내 글 목록</button>
            <button onClick={goToPbWrite}>작성하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intro;
