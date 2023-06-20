"use client";
import TopNav from "@/components/common/TopNav";
import Authentication from "@/components/findPasswordPage/Authentication";
import AgreeProvision from "@/components/joinPage/common/AgreeProvision";
import JoinInformation from "@/components/joinPage/common/JoinInformation";
import SetPasswordForm from "@/components/joinPage/common/SetPasswordForm";
import RegisterBusinessCard from "@/components/joinPage/pb/RegisterBusinessCard";
import PBJoinGuide from "@/components/joinPage/pb/PBJoinGuide";
import { JoinFormType } from "@/constants/enum";
import { useJoinStore } from "@/store/joinStore";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import SelectCompany from "@/components/joinPage/pb/SelectCompany";

type Tstep =
  | "pbJoinGuide"
  | "email"
  | "authentication"
  | "password"
  | "name"
  | "phoneNumber"
  | "registerBusinessCard"
  | "selectCompany"
  | "agreements";

const step = {
  pbJoinGuide: <PBJoinGuide />,
  email: <JoinInformation type={JoinFormType.EMAIL} />,
  authentication: <Authentication />,
  password: <SetPasswordForm />,
  name: <JoinInformation type={JoinFormType.NAME} />,
  phoneNumber: <JoinInformation type={JoinFormType.PHONENUMBER} />,
  registerBusinessCard: <RegisterBusinessCard />,
  selectCompany: <SelectCompany />,
  agreements: <AgreeProvision />,
};

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
  if (path2 === "pb") {
    res.res2 = true;
  }
  return res.res1 && res.res2;
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  checkRedirect(pathName) ?? redirect("/login");
  const { informations } = useJoinStore();
  console.log(informations);
  return (
    <>
      <TopNav title="PB 회원가입" hasBack backGroundWhite />
      {step[path]}
    </>
  );
}

export default Page;
