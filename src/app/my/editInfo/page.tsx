"use client";
import TopNav from "@/components/common/TopNav";
import UserInfoList from "@/components/myPage/editInfoPage/UserInfoList";
import CheckPassword from "@/components/myPage/editInfoPage/CheckPassword";
import userInfo from "@/mocks/seon/userInfo.json";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function EditInfoPage() {
  const queryClient = useQueryClient();
  const [isUser, setIsUser] = useState<boolean>(queryClient.getQueryData(["isPwChecked"]) || false);

  return (
    <>
      <TopNav title="개인 정보 수정" hasBack={true} />
      {userInfo.data && isUser ? <UserInfoList /> : <CheckPassword type="check" setIsUser={setIsUser} />}
    </>
  );
}

export default EditInfoPage;
