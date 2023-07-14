"use client";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useJoinStore } from "@/store/joinStore";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

function SelectLoginType() {
  const { resetInformations } = useJoinStore();
  const { isLogined, userLoading } = useGetUserInfo();

  useEffect(() => {
    resetInformations();
    if (!navigator.cookieEnabled) {
      alert("쿠키를 허용해주세요");
      redirect("/");
    }
  }, []);

  if (isLogined && !userLoading) {
    redirect("/");
  }
  return (
    <>
      <div className="mr-19 mt-[86px] text-black">
        <p className="font-bold ">처음뵙겠습니다,</p>
        <p className="font-bold">
          <span className="text-3xl text-primary-normal">MONEY BRIDGE </span>입니다.
        </p>
        <p>내가 찾던 PB와 투자자를 지금 만나보세요 :&#41;</p>
        <p></p>
      </div>
      <div className="mb-24 mt-[200px] flex flex-col gap-4">
        <Link
          href={"/login/user"}
          className="flex h-14 w-full items-center  justify-center rounded-[8px] bg-secondary-heavy text-xl  font-bold leading-7 text-white"
        >
          일반회원 입니다
        </Link>
        <Link
          href={"/login/pb"}
          className="flex h-14 w-full items-center  justify-center rounded-[8px] bg-primary-normal text-xl font-bold leading-7 text-white"
        >
          PB 입니다
        </Link>
      </div>
    </>
  );
}

export default SelectLoginType;
