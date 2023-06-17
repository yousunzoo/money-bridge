import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { CommonROLE } from "@/constants/enum";

function FixedButton({ role }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const goToPage = () => {
    if (role.user === CommonROLE.USER) {
      router.push("/reservation");
    } else if (role.user === CommonROLE.PB) {
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
  if (role.user === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (role === CommonROLE.PB) {
    if (pathname === "/detail") {
      text = "프로필 수정하기";
    }
    if (pathname === "/detail/edit") {
      text = "수정 완료";
    }
    if (pathname === "/detail/content") {
      text = "콘텐츠 작성하기";
    }
  }
  return (
    <button className="button_fixed" onClick={() => goToPage()}>
      {text}
    </button>
  );
}

export default FixedButton;
