"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import NewAndHot from "@/mocks/hyeon17/Lounge/newandhot.json";
import All from "@/mocks/hyeon17/Lounge/all.json";
import Content from "@/components/loungePage/Content";
import { useRoleStore } from "@/store/roleStore";
import TopNav from "@/components/common/TopNav";

function Lounge() {
  const userData = useRoleStore();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [all, setAll] = useState(All);
  const [newAndHot, setNewAndHot] = useState(NewAndHot);

  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
  }, [userData]);

  return (
    <div className="my-5 flex w-full flex-col">
      <TopNav title="라운지" hasBack={true} />
      <Intro user={role} />
      {role === "USER" && <PbRecommend name={name} />}
      <Content NewAndHot={newAndHot} All={all} user={role} />
    </div>
  );
}

export default Lounge;
