"use client";
import DoubleInputForm from "@/components/common/DoubleInputForm";
import TopNav from "@/components/common/TopNav";
import EnterInformation from "@/components/findEmailPage/EnterInformation";
import InformationCheck from "@/components/findEmailPage/InformationCheck";
import { InputFormType } from "@/constants/enum";
import { redirect, usePathname } from "next/navigation";
import React from "react";

type Tstep = "enterInformation" | "informationCheck";

const step = {
  enterInformation: <EnterInformation />,
  informationCheck: <InformationCheck />,
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  return (
    <>
      <TopNav title="이메일 찾기" hasBack backGroundWhite />
      {step[path]}
    </>
  );
}

export default Page;
