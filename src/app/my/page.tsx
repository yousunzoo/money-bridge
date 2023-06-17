"use client";

import TopNav from "@/components/common/TopNav";
import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import React from "react";
import myPageData from "@/mocks/seon/userMy.json";
import { IUserInfo } from "@/types/my";

function MyPage() {
  // const { role, name } = useRoleStore();
  // role에 따라 마이페이지 API 요청
  const user = { role: "user", name: "홍김박" };
  const userData = myPageData.data as IUserInfo;
  console.log(userData);
  return (
    <>
      <TopNav title="마이페이지" hasBack={true} />
      {user.role === "user" ? <UserInfo data={userData} /> : <PBInfo />}
    </>
  );
}

export default MyPage;
