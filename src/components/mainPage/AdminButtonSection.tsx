"use client";
import React from "react";
import SingleButton from "@/components/common/SingleButton";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

function AdminButtonSection() {
  const { userInfo } = useGetUserInfo();

  const checkClickHandler = () => {
    window.open("https://admin.moneybridge.co.kr/");
  };

  if (!userInfo) return;
  return (
    userInfo.isAdmin && (
      <div className="mb-4">
        <SingleButton title={"관리자 페이지로 가기"} role={"ADMIN"} ClickFunc={checkClickHandler} />
      </div>
    )
  );
}

export default AdminButtonSection;
