import React from "react";
import { useRoleStore } from "@/store/roleStore";
import { CommonROLE } from "@/constants/enum";
import { useRouter } from "next/router";

function FixedButton() {
  const { getRole } = useRoleStore();
  const router = useRouter();

  const status = () => {
    if (getRole() === CommonROLE.USER) {
      router.push('/reservationPage');
    } else if (getRole() === CommonROLE.PB) {
      // 프로필 수정, 저장, 콘텐츠 작성 페이지로 이동
      if (router.asPath === "/detailPage") {
        router.push('/detailPage/edit');
      }
      if(router.asPath === "/detailPage/edit") {
        router.push('/detailPage');
      }
      if (router.asPath === "/detailPage/content") {
        router.push("/loungePage/write");
      }
    }
  };

  let text;
  if (getRole() === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (getRole() === CommonROLE.PB) {
    if (router.asPath === "/detailPage") {
      text = "프로필 수정하기";
    }
    if (router.asPath === "/detailPage/edit") {
      text = "프로필 저장하기";
    }
    if (router.asPath === "/detailPage/content") {
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
