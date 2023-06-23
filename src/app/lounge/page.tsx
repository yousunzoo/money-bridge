"use client";
import React, { useEffect, useState }  from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";
import { useUserStore } from "@/store/userStore";
import TopNav from "@/components/common/TopNav";

function Lounge() {
  const userData = useUserStore();
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
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
