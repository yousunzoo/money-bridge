"use client";
import React from "react";
import Poster from "@/components/contentsPage/Poster";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/contentsPage/Content";
import Comments from "@/components/contentsPage/Comments";
import BlurModal from "@/components/common/Modal/BlurModal";
import { getContentsId, getNotLoginContents } from "@/app/apis/services/common";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ILoginedUserInfo } from "@/types/common";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";

function ContentsDetail() {
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: contents } = useQuery(["getContentsId"], () => getContentsId(id));
  const { data: notLoginContents } = useQuery(["getNotLoginContents"], () => getNotLoginContents(id));
  const { data: userData, isLoading } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <TopNav title="콘텐츠" hasBack={true} />
      {userData
        ? contents && (
            <>
              <Poster img={contents.thumbnail} />
              <Content contentData={contents} userData={userData} />
              <Comments commentData={contents.reply} />
            </>
          )
        : notLoginContents && (
            <>
              <Poster img={notLoginContents.thumbnail} />
              <BlurModal />
            </>
          )}
    </>
  );
}

export default ContentsDetail;
