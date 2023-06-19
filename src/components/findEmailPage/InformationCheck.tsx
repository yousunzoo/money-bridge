"use client";
import React from "react";
import InformationItem from "./InformationItem";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IFindEmail } from "@/types/login";

function InformationCheck() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["findEmail"]) as IFindEmail;
  console.log(data);

  const handleClick = () => {
    router.push("/login");
  };
  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">회원 정보를 확인해 주세요.</p>
      <ul>{data.data && data.data.map(item => <InformationItem information={item} key={item.email} />)}</ul>
      <button
        className="mb-24 mt-[266px] h-14 w-full rounded-[8px] bg-primary-normal text-xl font-bold leading-7 text-white"
        onClick={handleClick}
      >
        로그인
      </button>
    </>
  );
}

export default InformationCheck;
