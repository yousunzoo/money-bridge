"use client";

import React, { useEffect } from "react";
import TopNav from "@/components/common/TopNav";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { ILoginedUserInfo } from "@/types/common";

function AnalysisCompletePage() {
  const { data, isError } = useQuery<ILoginedUserInfo, AxiosError>(["loginedUserInfo"], getLoginedUserInfo);

  useEffect(() => {
    if (isError) {
      redirect("/");
    }
  }, []);
  return (
    <>
      <TopNav title="투자 성향 알아보기" hasBack={true} />
      <section>
        <div className="mb-40">
          <p className="mb-6 text-3xl font-bold">
            {data?.name}님의
            <br />
            투자 성향이 등록되었어요.
          </p>
          <p className="mb-6">
            소중한 정보 감사합니다.
            <br />
            투자 성향에 맞는 PB를 만나보세요. &#58;&#41;
          </p>
        </div>
        <Link
          href="/"
          className="flex h-[56px] w-full items-center justify-center rounded-lg bg-primary-normal text-white"
        >
          시작하기
        </Link>
      </section>
    </>
  );
}

export default AnalysisCompletePage;
