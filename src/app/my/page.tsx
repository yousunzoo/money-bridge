"use client";

import TopNav from "@/components/common/TopNav";
import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import React from "react";
// import myPageData from "@/mocks/seon/userMy.json";
import myPageData from "@/mocks/seon/pbMy.json";

function MyPage() {
  // const { role, name } = useRoleStore();
  const user = { role: "pb", name: "홍김박" };
  // role에 따라 마이페이지 API 요청
  const userData = myPageData.data as any;

  return (
    <>
      <TopNav title="마이페이지" hasBack={true} />
      {user.role === "user" ? <UserInfo data={userData} /> : <PBInfo data={userData} />}
    </>
  );
}

export default MyPage;
