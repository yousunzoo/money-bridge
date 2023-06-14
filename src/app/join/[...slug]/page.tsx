"use client";
import TopNav from "@/components/common/TopNav";
import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import JoinInformation from "@/components/joinPage/common/JoinInformation";
import AgreeProvision from "@/components/joinPage/common/AgreeProvision";
import { JoinFormType } from "@/constants/enum";
import { redirect, usePathname } from "next/navigation";
import React, { useState } from "react";
import UserComplete from "@/components/joinPage/user/UserComplete";

type Tstep = "email" | "authentication" | "name" | "phoneNumber" | "provision" | "complete";

const step = {
  email: <JoinInformation type={JoinFormType.EMAIL} />,
  authentication: <Authentication />,
  name: <JoinInformation type={JoinFormType.NAME} />,
  phoneNumber: <JoinInformation type={JoinFormType.PHONENUMBER} />,
  provision: <AgreeProvision />,
  complete: <UserComplete />,
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
      <TopNav
        title={`${pathName.split("/")[2] === "user" ? "일반 회원가입" : "PB 회원가입"}`}
        hasBack
        backGroundWhite
      />
      {step[path]}
    </>
  );
}

export default Page;
