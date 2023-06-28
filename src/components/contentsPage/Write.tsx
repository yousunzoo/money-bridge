"use client";
import React, { useState } from "react";
import "@/styles/content.css";
import { BoardStatus } from "@/constants/enum";
import { useRouter } from "next/navigation";
import { ITemp } from "@/types/contents";

function Write({ data, id }: { data?: ITemp; id?: number }) {
  const router = useRouter();
  const isStatus = data?.status === BoardStatus.ACTIVE || BoardStatus.TEMP;
  const [titleText, setTitleText] = useState(isStatus ? data?.title : "");
  const [contentText, setContentText] = useState(isStatus ? data?.content : "");
  const [tag1Text, setTag1Text] = useState(isStatus ? data?.tag1 : "");
  const [tag2Text, setTag2Text] = useState(isStatus ? data?.tag2 : "");
  const [thumbnailText, setThumbnailText] = useState(isStatus ? data?.thumbnail : "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setTitleText(inputValue);
    }
  };

  const handleTag1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 7) {
      setTag1Text(inputValue);
    }
  };

  const handleTag2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 7) {
      setTag2Text(inputValue);
    }
  };

  return (
    <form className="flex flex-col">
      <div className="title">제목</div>
      <input
        type="text"
        placeholder="제목을 작성해주세요.(20자 이내)"
        className="form_input mb-[24px] h-[56px]"
        value={titleText}
        onChange={handleTitleChange}
      />
      <div className="title">본문(글상세)</div>
      <input
        type="text"
        placeholder="본문을 작성해 주세요."
        className="form_input mb-[24px] h-[131px] whitespace-normal"
        value={contentText}
        onChange={e => {
          setContentText(e.target.value);
        }}
      />
      <div className="title">태그</div>
      <input
        type="text"
        placeholder="1. 어떤 주제인가요?(7자 이내)"
        className="form_input mb-[10px] h-[56px]"
        value={tag1Text}
        onChange={handleTag1Change}
      />
      <input
        type="text"
        placeholder="2. 이 콘텐츠의 키워드는 무엇인가요?(7자 이내)"
        className="form_input mb-[24px] h-[56px]"
        value={tag2Text}
        onChange={handleTag2Change}
      />
      <div className="flex items-center">
        <div className="title flex-1">대표 이미지 업로드</div>
        <button className="file_button">이미지 찾기</button>
      </div>
      <div className="form_input mb-[24px] h-[48px] text-placeholder">{thumbnailText ? thumbnailText : "파일명"}</div>
      <div className="flex items-center justify-center">
        {isStatus ? (
          <>
            <button onClick={() => router.push(`/contents/${id}`)} className="button_outlined mr-10 min-w-[175px] max-w-[350px]">
              취소
            </button>
            <button onClick={() => router.push(`/contents/${id}`)} className="button min-w-[175px] max-w-[350px]">
              수정 완료
            </button>
          </>
        ) : (
          <>
            <button className="button_outlined mr-10 min-w-[175px] max-w-[350px]">임시 저장</button>
            <button onClick={() => router.push(`/contents/${id}`)} className="button min-w-[175px] max-w-[350px]">
              작성 완료
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default Write;
