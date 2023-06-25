"use client";
import React from "react";
import ContentCardItem from "../common/Card/CardItem/ContentCardItem";
import { getContents } from "@/app/apis/services/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getUserContents } from "@/app/apis/services/user";
import { ILoginedUserInfo } from "@/types/common";
import { getLoginedUserInfo } from "@/app/apis/services/auth";

interface BoardListProps {
  career: number;
  companyLogo: string;
  id: number;
  isBookmark: boolean;
  msg: string;
  pbName: string;
  tag1: string;
  tag2: string;
  title: string;
}
function CustomListSection() {
  const {
    data: userInfo,
    isLoading: userLoading,
    isSuccess: isLogined,
  } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["loginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  const {
    data: boardList,
    error,
    isLoading,
  } = useQuery<BoardListProps[], AxiosError>(["boardList"], userInfo?.role === "USER" ? getUserContents : getContents);

  return (
    <section className="relative w-full mt-3 ">
      <h3 className="text-xl font-bold">
        ㅇㅇㅇ님의 성향을 딱! 맞춘
        <br /> 실제 PB의 투자 정보
      </h3>
      <ul className="flex flex-wrap items-center justify-between py-4">
        {boardList && boardList.map(item => <ContentCardItem key={item.id} item={item} />)}
      </ul>
    </section>
  );
}

export default CustomListSection;
