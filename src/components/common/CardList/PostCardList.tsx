"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PostCardItem from "../CardItem/PostCardItem";

function PostCardList({ props }: any) {
  const router = useRouter();

  return (
    <>
      {props ? (
        props.map((item: any) => <PostCardItem key={item} router={router} />)
      ) : (
        <div className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
          작성한 콘텐츠가 없습니다
        </div>
      )}
    </>
  );
}

export default PostCardList;
