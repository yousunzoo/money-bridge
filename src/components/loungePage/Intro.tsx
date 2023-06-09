"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE } from "@/constants/enum";
import ButtonModal from "@/components/common/ButtonModal";

function Intro() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const { getRole } = useRoleStore();
  const modalContents = {
    content: "로그인 후 북마크 저장이 가능합니다",
    confirmText: "확인",
    confirmFn: () => {
      router.push("/login");
    },
  };
  useEffect(() => {
    const roles = getRole();
    setRole(roles);
  }, [role]);

  const goToBookMark = () => {
    if (getRole() === "") {
      setIsOpen(true);
    } else {
      router.push("/bookmark");
    }
  };
  const goToPbWrite = () => {
    router.push("/lounge/write");
  };
  const goToPbContent = () => {
    router.push("/detail/content");
  };

  return (
    <div className="flex">
      <div className="flex">
        <div className="flex flex-1 flex-col">
          <div>라운지</div>
          <div>라운지 소개</div>
        </div>
        <button className="flex justify-end" onClick={goToBookMark}>
          아이콘
        </button>
      </div>
      {role === CommonROLE.PB && (
        <div>
          <div>투자자들을 위한 투자 정보 콘텐츠를 작성해보세요</div>
          <div>
            <button onClick={goToPbContent}>내 글 목록</button>
            <button onClick={goToPbWrite}>작성하기</button>
          </div>
        </div>
      )}
      {isOpen && <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Intro;
