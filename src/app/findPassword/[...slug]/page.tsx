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

interface IRes {
  res1: null | boolean;
  res2: null | boolean;
}

const checkRedirect = (pathName: string) => {
  const res: IRes = {
    res1: null,
    res2: null,
  };

  const path1 = pathName.split("/")[3] as Tstep;
  if (Object.keys(step).includes(path1)) {
    res.res1 = true;
  }

  const path2 = pathName.split("/")[2];
  if (type.includes(path2)) {
    res.res2 = true;
  }

  return res.res1 && res.res2;
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  checkRedirect(pathName) ?? redirect("/login");

  return (
    <>
      <TopNav title={`${pathName.split("/")[2] === "user" ? "유저" : "PB"} 비밀번호 찾기`} hasBack backGroundWhite />
      {step[path]}
    </>
  );
}

export default Page;
