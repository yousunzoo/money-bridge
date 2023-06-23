"use client";
import React, { useState, useEffect } from "react";
import Poster from "@/components/contentsPage/Poster";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/contentsPage/Content";
import Comments from "@/components/contentsPage/Comments";
import { useUserStore } from "@/store/userStore";
import BlurModal from "@/components/common/Modal/BlurModal";
import { ContentsId } from "@/app/apis/services/common";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function ContentsDetail() {
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: res } = useQuery([`/board/${id}`], () => ContentsId(id));
  const [poster, setPoster] = useState();
  const [profile, setProfile] = useState();
  const [comment, setComment] = useState();

  const userData = useUserStore();
  const boardData = res;
  const ContentData = {
    id: boardData?.id,
    thumbnail: boardData?.thumbnail,
    title: boardData?.title,
    content: boardData?.content,
    createdAt: boardData?.createdAt,
    tag1: boardData?.tag1,
    tag2: boardData?.tag2,
    pdId: boardData?.pbId,
    name: boardData?.name,
    isBookmarked: boardData?.isBookmarked,
    profile: boardData?.profile,
  };

  useEffect(() => {
    setPoster(res?.thumbnail);
  }, [res?.thumbnail]);

  useEffect(() => {
    setProfile(ContentData.profile);
  }, [ContentData.profile]);

  useEffect(() => {
    setComment(res?.reply);
  }, [res?.reply]);

  return (
    <>
      <TopNav title="콘텐츠" hasBack={true} />
      {poster && <Poster img={res?.thumbnail} />}
      {userData.user.role ? (
        <>
          {profile && <Content contentData={ContentData} />}
          {comment && <Comments commentData={res?.reply} />}
        </>
      ) : (
        <BlurModal />
      )}
    </>
  );
}

export default ContentsDetail;
