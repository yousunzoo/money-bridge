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

const type = ["user", "pb"];

const checkRedirect = (pathName: string) => {
  let res1 = null;
  let res2 = null;

  const path1 = pathName.split("/")[3] as Tstep;
  if (Object.keys(step).includes(path1)) {
    res1 = true;
  }

  const path2 = pathName.split("/")[2];
  if (type.includes(path2)) {
    res2 = true;
  }

  return res1 && res2;
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  checkRedirect(pathName) ?? redirect("/login");

  return (
    <>
      <TopNav title="비밀번호 찾기" hasBack backGroundWhite />
      {step[path]}
    </>
  );
}

export default Page;
