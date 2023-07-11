"use client";
import EnterInformation from "@/components/findEmailPage/EnterInformation";
import InformationCheck from "@/components/findEmailPage/InformationCheck";
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
  return <>{step[path]}</>;
}

export default Page;
