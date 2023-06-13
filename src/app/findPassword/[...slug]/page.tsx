"use client";
import React from "react";
import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import EnterInformation from "@/components/findPasswordPage/EnterInformation";
import SelectInformation from "@/components/findPasswordPage/SelectInformation";
import { redirect, usePathname } from "next/navigation";
import TopNav from "@/components/common/TopNav";

type Tstep = "enterInformation" | "authentication" | "selectInformation" | "resetPassword";

const step = {
  enterInformation: <EnterInformation />,
  authentication: <Authentication />,
  selectInformation: <SelectInformation />,
  resetPassword: <ResetPassword />,
};

const checkRedirect = (path: string) => {
  for (const key in step) {
    if (path === key) {
      return true;
    }
  }
  return null;
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  checkRedirect(path) ?? redirect("/login");

  return (
    <>
      <TopNav title="비밀번호 찾기" hasBack backGroundWhite />
      <div className="mx-[16px]">{step[path]}</div>
    </>
  );
}

export default Page;
