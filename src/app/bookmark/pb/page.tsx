"use client";
import React, { useEffect, useState } from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import PbData from "@/mocks/hyeon17/Common/pbList.json";
import { useRoleStore } from "@/store/roleStore";

function PbBookMark() {
  const userData = useRoleStore();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userData.user.role);
  }, [userData]);

  return (
    <div className="mb-10">
      <BookMark />
      {PbData ? <PbCardList props={PbData} role={role} /> : <div>북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default PbBookMark;
