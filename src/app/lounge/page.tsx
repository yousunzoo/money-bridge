"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import All from "@/mocks/hyeon17/Lounge/all.json";
import Content from "@/components/loungePage/Content";
import { useRoleStore } from "@/store/roleStore";
import TopNav from "@/components/common/TopNav";
import { useLoungeBoard } from "@/app/apis/services/common";
import { ListResponse } from "@/types/common";
import { ContentCard } from "@/types/card";

function Lounge() {
  const userData = useRoleStore();
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [all, setAll] = useState(All);
  const [NewAndHot, setNewAndHot] = useState<ListResponse<ContentCard> | undefined>();
  const { data: res, error, isLoading, isSuccess } = useLoungeBoard();

  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      setNewAndHot(res);
    }
  }, [isSuccess, res]);

  return (
    <div className="my-5 flex w-full flex-col">
      <TopNav title="라운지" hasBack={true} />
      <Intro role={role} />
      {role === "USER" && <PbRecommend name={name} />}
      <Content NewAndHot={NewAndHot} All={all} role={role} />
    </div>
  );
}

export default Lounge;
