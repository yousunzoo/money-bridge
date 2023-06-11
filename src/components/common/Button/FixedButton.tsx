"use client";
import React from "react";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE } from "@/constants/enum";
import { useRouter, usePathname } from "next/navigation";

function FixedButton() {
  const { getRole } = useRoleStore();
  const router = useRouter();
  const pathname = usePathname();

  const status = () => {
    if (getRole() === CommonROLE.USER) {
      router.push("/reservation");
    } else if (getRole() === CommonROLE.PB) {
      // 프로필 수정, 저장, 콘텐츠 작성 페이지로 이동
      if (pathname === "/detail") {
        router.push("/detail/edit");
      }
      if (pathname === "/detail/edit") {
        router.push("/detail");
      }
      if (pathname === "/detail/content") {
        router.push("/lounge/write");
      }
    }
  };

  let text;
  if (getRole() === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (getRole() === CommonROLE.PB) {
    if (pathname === "/detail") {
      text = "프로필 수정하기";
    }
    if (pathname === "/detail/edit") {
      text = "프로필 저장하기";
    }
    if (pathname === "/detail/content") {
      text = "콘텐츠 작성하기";
    }
  }

  return (
    <button
      className="fixed bottom-10 flex h-16 min-w-[425px] items-center justify-center rounded-t-3xl bg-black text-2xl text-white"
      onClick={status}
    >
      {text}
    </button>
  );
}

export default FixedButton;
