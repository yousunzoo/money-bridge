"use client";
import React, { useEffect, useState }  from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";
import TopNav from "@/components/common/TopNav";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";

function Lounge() {
  const { data: userData } = useQuery(["/auth/account"], getLoginedUserInfo);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setRole(userData?.role);
    setName(userData?.name);
  }, [userData]);

  return (
    <>
      <TopNav title="라운지" hasBack={true} />
      <Intro role={role} />
      {role === "USER" && <PbRecommend name={name} />}
      <Content />
    </>
  );
}

export default Lounge;
