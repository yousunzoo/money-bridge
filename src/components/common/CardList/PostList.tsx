"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PostItem from "../CardItem/PostItem";

function PostList({ props }: any) {
  const router = useRouter();

  return (
    <>
      {props ? (
        props.map((item: any) => <PostItem key={item} router={router} />)
      ) : (
        <div>작성한 콘텐츠가 없습니다</div>
      )}
    </>
  );
}

export default PostList;
