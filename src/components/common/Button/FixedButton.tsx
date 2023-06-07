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
      router.push("/reservationPage");
    } else if (getRole() === CommonROLE.PB) {
      // 프로필 수정, 저장, 콘텐츠 작성 페이지로 이동
      if (pathname === "/detailPage") {
        router.push("/detailPage/edit");
      }
      if (pathname === "/detailPage/edit") {
        router.push("/detailPage");
      }
      if (pathname === "/detailPage/content") {
        router.push("/loungePage/write");
      }
    }
  };

  let text;
  if (getRole() === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (getRole() === CommonROLE.PB) {
    if (pathname === "/detailPage") {
      text = "프로필 수정하기";
    }
    if (pathname === "/detailPage/edit") {
      text = "프로필 저장하기";
    }
    if (pathname === "/detailPage/content") {
      text = "콘텐츠 작성하기";
    }
  }

  return (
    <>
      <button onClick={status}>{text}</button>
    </>
  );
}

export default FixedButton;
