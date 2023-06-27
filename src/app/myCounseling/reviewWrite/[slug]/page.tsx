"use client";

import { createReview } from "@/app/apis/services/user";
import ButtonModal from "@/components/common/ButtonModal";
import DoubleButton from "@/components/common/DoubleButton";
import ErrorModal from "@/components/common/ErrorModal";
import TopNav from "@/components/common/TopNav";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

function ReviewWritePage({ params: { slug } }: { params: { slug: string } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  if (!isLogined && !userLoading) {
    redirect("/");
  }
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const [reviewState, setReviewState] = useState({
    reservationId: Number(slug),
    adherence: "BAD",
    styleList: [] as string[],
    content: "",
  });

  const { mutate: reviewMutate } = useMutation(createReview, {
    onSuccess: () => {
      router.push(`/myCounseling/myReview/${slug}`);
    },
  });

  const adherenceClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const item = e.currentTarget.id;
    console.log(item);

    setReviewState(prevStatue => ({
      ...prevStatue,
      adherence: item,
    }));
  };

  const counselingClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const item = e.currentTarget.id;
    setReviewState(prevState => {
      if (prevState.styleList.includes(item)) {
        return {
          ...prevState,
          styleList: prevState.styleList.filter(style => style !== item),
        };
      } else {
        if (prevState.styleList.length < 4) {
          return {
            ...prevState,
            styleList: [...prevState.styleList, item],
          };
        } else {
          return prevState;
        }
      }
    });
  };

  const reviewChangeHanlder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const review = e.target.value;
    setReviewState(prevState => ({
      ...prevState,
      content: review,
    }));
  };
  const modalContents = {
    content: "후기를 작성 하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    cancelFn: () => setIsButtonOpen(false),
    confirmFn: () => reviewMutate({ ...reviewState }),
  };
  const writeCancelHandler = () => {
    router.back();
  };
  const completedHandler = () => {
    setIsButtonOpen(true);
  };

  if (userInfo?.role !== "USER")
    return (
      <ErrorModal isError={true} path={"/myCounseling?process=APPLY"} content={"권한이 없습니다. 다시 시도해주세요."} />
    );
  return (
    <div>
      <TopNav title="후기 작성" hasBack={true} />
      <div className="user_top_Phrase mx-[-16px] mt-4 box-content w-full">
        <span className="text-white ">상담 후기를 남겨주세요.</span>
      </div>
      <section className="w-full p-4 pb-6 mt-6 text-xs bg-white rounded-md shadow-2xl">
        <article className="w-full pt-3">
          <h3 className="font-bold">상담 일정은 잘 지켜졌나요?</h3>
          <ul className="flex justify-around pb-3 mt-5 border-b-1 border-background-secondary">
            {Object.entries(ADHERENCE).map(([key, value]) => (
              <li
                key={key}
                id={key}
                onClick={adherenceClickHandler}
                className={`flex w-[70px] cursor-pointer flex-col items-center`}
              >
                <div
                  className={`${
                    reviewState.adherence.includes(key)
                      ? "border-[#F5A8A3] bg-status-alert"
                      : "border-background-secondary bg-white"
                  }  h-7 w-7 rounded-full border-[8px]`}
                ></div>
                <span className="my-2">{value}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="w-full pt-3">
          <h3 className="font-bold ">
            상담 스타일은 어떠셨나요? <span>(최대 4개 선택 가능)</span>
          </h3>
          <ul className="flex flex-wrap justify-center gap-2 pb-4 mt-3 border-b-1 border-background-secondary">
            {Object.entries(COUNSELING_STYLE).map(([key, value]) => (
              <li
                key={key}
                id={key}
                onClick={counselingClickHandler}
                className={`${
                  reviewState.styleList.includes(key) && "bg-black text-white"
                } flex h-8 w-[70px] cursor-pointer items-center justify-center rounded-lg border-1 text-black `}
              >
                {value}
              </li>
            ))}
          </ul>
        </article>
        <article className="w-full pt-3">
          <h3 className="font-bold">상담은 어떠셨나요? 자세한 후기를 남겨주세요.</h3>
          <textarea
            name=""
            id=""
            rows={4}
            cols={50}
            className="w-full p-2 mt-4 rounded-md bg-background-secondary"
            onChange={reviewChangeHanlder}
          ></textarea>
        </article>
        <DoubleButton
          role="USER"
          firstTitle="작성 취소"
          secondTitle="작성 완료"
          firstClickFunc={writeCancelHandler}
          secondClickFunc={completedHandler}
        ></DoubleButton>
        {isButtonOpen && (
          <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />
        )}
      </section>
    </div>
  );
}

export default ReviewWritePage;
