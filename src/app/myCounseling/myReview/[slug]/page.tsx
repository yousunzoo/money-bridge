"use client";

import SingleButton from "@/components/common/SingleButton";
import TopNav from "@/components/common/TopNav";
import React from "react";

const MOCK_DATA = {
  adherence: "EXCELLENT", // 상담 일정 준수 등급 "BAD"(아니요) or "NORMAL"(보통이에요) or "EXCELLENT"(잘 지켜졌어요)
  styleList: ["FAST", "KIND"],
  content: "content 입니다",
};

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

function MyReviewPage() {
  const data = {
    adherence: "EXCELLENT",
    styleList: ["FAST", "KIND"],
    content: "content 입니다",
  };

  const onClickHandler = () => {
    console.log("확인");
  };
  return (
    <div>
      <TopNav title="나의 후기" hasBack={true} />
      <section className="mt-6 flex w-full flex-col items-center rounded-md bg-white p-4 pb-6 text-xs shadow-2xl">
        <article className="w-full pt-3">
          <h3 className="font-bold">상담 일정은 잘 지켜졌나요?</h3>
          <div
            className={`mt-5 flex w-full cursor-pointer flex-col items-center border-b-1 border-background-secondary pb-3`}
          >
            <div className="h-7 w-7 rounded-full border-[8px] border-[#F5A8A3] bg-status-alert"></div>
            <span className="my-2">{ADHERENCE[data.adherence]}</span>
          </div>
        </article>
        <article className="w-full border-b-1 border-background-secondary pb-5 pt-3 ">
          <h3 className="font-bold ">
            상담 스타일은 어떠셨나요? <span>(최대 4개 선택 가능)</span>
          </h3>
          <ul className="mt-4 flex w-full justify-center gap-2">
            {data.styleList.map(style => (
              <li
                key={style}
                className="flex h-8 w-[70px] cursor-pointer items-center justify-center rounded-full bg-black text-white"
              >
                {COUNSELING_STYLE[style]}
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
