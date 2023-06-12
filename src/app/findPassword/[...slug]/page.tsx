"use client";
import React from "react";
import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import EnterInformation from "@/components/findPasswordPage/EnterInformation";
import SelectInformation from "@/components/findPasswordPage/SelectInformation";
import { usePathname } from "next/navigation";

const step = {
  1: <EnterInformation />,
  2: <Authentication />,
  3: <SelectInformation />,
  4: <ResetPassword />,
};

function Page() {
  const pathName = usePathname();
  const path = pathName.substring(pathName.length - 1);

  return <>{step[path]}</>;
}

export default Page;
