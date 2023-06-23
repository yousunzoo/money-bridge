"use client";

import DoubleButton from "@/components/common/DoubleButton";
import TopNav from "@/components/common/TopNav";
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

function ReviewWritePage({ params }: { params: { slug: string } }) {
  const [reviewState, setReviewState] = useState({
    reservationId: Number(params.slug),
    adhercence: 0,
    styleList: [] as string[],
    content: "",
  });

  useEffect(() => {
    console.log(reviewState);
  }, [reviewState]);

  const adherenceClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const item = Number(e.currentTarget.id);
    setReviewState(prevStatue => ({
      ...prevStatue,
      adhercence: item,
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

  const writeCancelHandler = () => {
    console.log("작성 취소");
  };
  const completedHandler = () => {
    console.log("작성 완료");
  };

  return (
    <div>
      <TopNav title="후기 작성" hasBack={true} />
      <div className="user_top_Phrase mt-4">
        <span className="text-white ">상담 후기를 남겨주세요.</span>
      </div>
      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs shadow-2xl">
        <article className="w-full pt-3">
          <h3 className="font-bold">상담 일정은 잘 지켜졌나요?</h3>
          <ul className="mt-5 flex justify-around border-b-1 border-background-secondary pb-3">
            {Object.entries(ADHERENCE).map(([key, value]) => (
              <li
                key={key}
                id={key}
                onClick={adherenceClickHandler}
                className={`flex w-[70px] cursor-pointer flex-col items-center`}
              >
                <div
                  className={`${
                    reviewState.adhercence === Number(key)
                      ? "border-[#F5A8A3] bg-status-alert"
                      : "border-background-secondary bg-white"
                  } h-7 w-7 rounded-full border-[8px] `}
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
          <ul className="mt-3 flex flex-wrap justify-center gap-2 border-b-1 border-background-secondary pb-4">
            {Object.entries(COUNSELING_STYLE).map(([key, value]) => (
              <li
                key={key}
                id={key}
                onClick={counselingClickHandler}
                className={`${
                  reviewState.styleList.includes(key) && "bg-black text-white"
                } flex h-8 w-[70px] cursor-pointer items-center justify-center rounded-full border-1 text-black `}
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
            className="w-ful mt-4 rounded-md bg-background-secondary p-2"
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
      </section>
    </div>
  );
}

export default ReviewWritePage;
