"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PostItem from "../CardItem/PostItem";

function PostList({ props }: any) {
  const router = useRouter();
  const prop = props?.data?.list;
  console.log(prop);

  return (
    <>
      {prop ? (
        prop.map((item: any) => <PostItem key={item} router={router} />)
      ) : (
        <div className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
          작성한 콘텐츠가 없습니다
        </div>
      )}
    </>
  );
}

export default PostList;
