"use client";
import React from "react";
import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import EnterInformation from "@/components/findPasswordPage/EnterInformation";
import SelectInformation from "@/components/findPasswordPage/SelectInformation";
import { usePathname } from "next/navigation";
import TopNav from "@/components/common/TopNav";

type Tstep = "1" | "2" | "3" | "4";

const step = {
  "1": <EnterInformation />,
  "2": <Authentication />,
  "3": <SelectInformation />,
  "4": <ResetPassword />,
};

function Page() {
  const pathName = usePathname();
  const path = pathName.substring(pathName.length - 1) as Tstep;

  return (
    <>
      <TopNav title="비밀번호 찾기" hasBack backGroundWhite />
      <div className="mx-[16px]">{step[path]}</div>
    </>
  );
}

export default Page;
