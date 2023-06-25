"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/pbdetailPage/Intro";
import TopNav from "@/components/common/TopNav";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { useQuery } from "@tanstack/react-query";
import { getPbContent, getPbProfile } from "@/app/apis/services/pb";
import { useRouter, usePathname } from "next/navigation";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { getMyId } from "@/utils/pbMyId";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { IloginProfile } from "@/types/pb";
import { IDataResponse } from "@/types/common";

function PbDetailContent() {
  const pathname: string = usePathname();
  const router = useRouter();
  const id: number = Number(pathname.split("/").pop());
  const { data: userData ,isLoading } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["/auth/account"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });
  const { data: authProfile } = useQuery<IDataResponse<IloginProfile>, AxiosError>(
    [`/auth/profile/${id}`],
    () => getPbProfile(id),
  );
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!isLoading) setMounted(true);
  }, [isLoading]);
  if (!mounted || !authProfile?.data) return null;

  return (
    <div className="mb-32">
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={authProfile?.data} />
      <ContentCardList queryKey={`/auth/boards/${id}`} api={getPbContent} id={id} />
      {getMyId(userData?.role, userData?.id, id) && (
        <button className="button_fixed" onClick={() => router.push("/lounge/write")}>
          콘텐츠 작성하기
        </button>
      )}
    </div>
  );
}

export default PbDetailContent;
