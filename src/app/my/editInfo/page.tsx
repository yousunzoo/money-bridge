"use client";
import TopNav from "@/components/common/TopNav";
import UserInfoList from "@/components/myPage/editInfoPage/UserInfoList";
import CheckPassword from "@/components/myPage/editInfoPage/CheckPassword";
import userInfo from "@/mocks/seon/userInfo.json";
import { useState } from "react";

function EditInfoPage() {
  // api 연결 시 해당 부분은 QueryClient에서 가져옴
  // 인증 거치고 status 200 일때 isUser = true
  // 데이터가 있고 status 400 일때 isUser = false, error modal
  const [isUser, setIsUser] = useState(false);

  return (
    <>
      <TopNav title="개인 정보 수정" />
      {userInfo.data && isUser ? (
        <UserInfoList userInfo={userInfo.data} />
      ) : (
        <CheckPassword type="check" setIsUser={setIsUser} />
      )}
    </>
  );
}

export default EditInfoPage;
