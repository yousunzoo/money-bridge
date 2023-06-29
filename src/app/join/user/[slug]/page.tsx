"use client";
import TopNav from "@/components/common/TopNav";
import Authentication from "@/components/findPasswordPage/Authentication";
import JoinInformation from "@/components/joinPage/common/JoinInformation";
import AgreeProvision from "@/components/joinPage/common/AgreeProvision";
import { JoinFormType } from "@/constants/enum";
import { redirect, usePathname } from "next/navigation";
import UserComplete from "@/components/joinPage/user/UserComplete";
import { useJoinStore } from "@/store/joinStore";
import SetPasswordForm from "@/components/joinPage/common/SetPasswordForm";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useEffect } from "react";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

type Tstep = "email" | "authentication" | "password" | "name" | "phoneNumber" | "agreements" | "complete";

const step = {
  email: <JoinInformation type={JoinFormType.EMAIL} />,
  authentication: <Authentication />,
  password: <SetPasswordForm />,
  name: <JoinInformation type={JoinFormType.NAME} />,
  phoneNumber: <JoinInformation type={JoinFormType.PHONENUMBER} />,
  agreements: <AgreeProvision />,
  complete: <UserComplete />,
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
  if (path2 === "user") {
    res.res2 = true;
  }
  return res.res1 && res.res2;
};

function Page() {
  const pathName = usePathname();
  const path = (pathName.split("/")[3] as Tstep) ?? redirect("/login");
  checkRedirect(pathName) ?? redirect("/login");
  const { isLogined, userLoading } = useGetUserInfo();

  useEffect(() => {
    if (!navigator.cookieEnabled) {
      alert("쿠키를 허용해주세요");
      redirect("/");
    }
  }, []);

  if (isLogined && !userLoading) {
    if (path !== "complete") {
      redirect("/");
    }
  }

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
