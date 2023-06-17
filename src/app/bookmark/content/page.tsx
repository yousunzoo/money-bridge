"use client";
import React, { useEffect, useState } from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/app/bookmark/page";
import ContentData from "@/mocks/hyeon17/Common/pbContent.json";
import { useRoleStore } from "@/store/roleStore";

function ContentBookMark() {
  const userData = useRoleStore();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userData.user.role);
  }, [userData]);

  return (
    <div className="mb-10">
      <BookMark />
      {ContentData ? <ContentCardList props={ContentData} role={role} /> : <div>북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default ContentBookMark;
