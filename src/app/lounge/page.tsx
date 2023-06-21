"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";
import { useUserStore } from "@/store/userStore";
import TopNav from "@/components/common/TopNav";
import { LoungeBoard, LoungeNew } from "@/app/apis/services/common";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

function Lounge() {
  const userData = useUserStore();
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [All, setAll] = useState();
  const [NewAndHot, setNewAndHot] = useState();
  const { data: newandhot } = useQuery(["/lounge/board"], LoungeBoard);
  const {
    data: all,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(["/boards"], ({ pageParam = 0 }) => LoungeNew(pageParam), {
    getNextPageParam: lastPage => {
      const result = lastPage?.data?.last === true ? undefined : lastPage?.data?.curPage + 1;
      return result;
    },
  });



  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
  }, [userData]);

  return (
    <>
      <TopNav title="라운지" hasBack={true} />
      <Intro role={role} />
      {role === "USER" && <PbRecommend name={name} />}
      {/* <Content NewAndHot={newandhot} All={all} /> */}
      <button onClick={() => fetchNextPage()}>fetchNextPage</button>
    </>
  );
}

export default Lounge;
