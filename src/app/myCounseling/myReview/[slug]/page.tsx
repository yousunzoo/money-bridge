"use client";

import { getMyReview } from "@/app/apis/services/user";
import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";
import TopNav from "@/components/common/TopNav";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const COUNSELING_STYLE: { [key: string]: string } = {
  METICULOUS: "꼼꼼한",
  KIND: "친절한",
  PROFESSIONAL: "전문적인",
  FAST: "빠른",
  HONEST: "솔직한",
  PRAGMATIC: "현실적인",
  DIRECTIONAL: "방향 제시",
  EXPERIENCED: "노련한",
};

const ADHERENCE: { [key: string]: string } = {
  BAD: "아니요",
  NORMAL: "보통이에요",
  EXCELLENT: "잘 지켜졌어요",
};

interface MyReviewProps {
  adherence: string;
  content: string;
  styleList: { style: string }[];
}

function MyReviewPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  if (!isLogined && !userLoading) {
    redirect("/");
  }
  const { data, isError, isLoading } = useQuery<MyReviewProps, AxiosError>(["myreview", slug], () => getMyReview(slug));

  if (!data) return;
  const onClickHandler = () => {
    router.push("/myCounseling?process=COMPLETE");
  };

  if (userInfo?.role !== "USER")
    return (
      <ErrorModal isError={true} path={"/myCounseling?process=APPLY"} content={"권한이 없습니다. 다시 시도해주세요."} />
    );
  if (isError)
    return (
      <ErrorModal
        isError={true}
        path={"/myCounseling?process=APPLY"}
        content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."}
      />
    );
  console.log(data.styleList);
  return (
    <div>
      <TopNav title="나의 후기" hasBack={true} />
      <section className="flex flex-col items-center w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md shadow-2xl">
        <article className="w-full pt-3">
          <h3 className="font-bold">상담 일정은 잘 지켜졌나요?</h3>
          <div className={`mt-5 flex w-full flex-col items-center border-b-1 border-background-secondary pb-3`}>
            <div className="h-7 w-7 rounded-full border-[8px] border-[#F5A8A3] bg-status-alert"></div>
            <span className="my-2">{ADHERENCE[data.adherence]}</span>
          </div>
        </article>
        <article className="w-full pt-3 pb-5 border-b-1 border-background-secondary ">
          <h3 className="font-bold ">상담 스타일은 어떠셨나요?</h3>
          <ul className="flex justify-center w-full gap-2 mt-4">
            {data.styleList.map(style => (
              <li
                key={style.style}
                className="flex h-8 w-[70px] items-center justify-center rounded-lg bg-black text-white"
              >
                {COUNSELING_STYLE[style.style]}
              </li>
            ))}
          </ul>
        </article>
        <article className="w-full pt-3 ">
          <h3 className="font-bold">상담은 어떠셨나요? 자세한 후기를 남겨주세요.</h3>
          <div className="w-ful my-4 min-h-[100px] rounded-md bg-background-secondary p-4">{data.content} </div>
        </article>
        <SingleButton title={"확인"} role="USER" ClickFunc={onClickHandler} />
      </section>
    </div>
  );
}

export default MyReviewPage;
