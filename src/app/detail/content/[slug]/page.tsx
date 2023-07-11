"use client";
import React from "react";
import Intro from "@/components/pbdetailPage/Intro";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { useQuery } from "@tanstack/react-query";
import { getPbContent, getPbProfile } from "@/app/apis/services/pb";
import { usePathname } from "next/navigation";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { getMyId } from "@/utils/pbMyId";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { IloginProfile } from "@/types/pb";
import { IDataResponse } from "@/types/common";
import Link from "next/link";

function PbDetailContent() {
  const pathname: string = usePathname();
  const id: number = Number(pathname.split("/").pop());
  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const { data: authProfile } = useQuery<IDataResponse<IloginProfile>, AxiosError>({
    queryKey: ["getPbProfile", id],
    queryFn: () => getPbProfile(id),
    refetchOnWindowFocus: false,
  });

  const myId: number | null = getMyId(userData?.role, userData?.id, id, userData?.role);

  return (
    <div className="mb-32">
      {userData?.role !== undefined && authProfile?.data && (
        <>
          <Intro introData={authProfile.data} userData={userData} />
          <ContentCardList queryKey={`/auth/boards/${id}`} api={getPbContent} etc={id} bookmarks={true} />
        </>
      )}
      {myId && (
        <Link className="button_fixed" href="/contents/write">
          콘텐츠 작성하기
        </Link>
      )}
    </div>
  );
}

export default PbDetailContent;
