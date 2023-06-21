import React, { useState } from "react";
import "@/styles/content.css";
import { BoardStatus } from "@/constants/enum";

function Write({ props }: { props?: any }) {
  const { content, status, tag1, tag2, thumbnail, title, file } = props;
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [tag1Text, setTag1Text] = useState("");
  const [tag2Text, setTag2Text] = useState("");
  const [thumbnailText, setThumbnailText] = useState("");
  const [fileText, setFileText] = useState("");

  return (
    <form className="flex flex-col">
      <div className="title">제목</div>
      <input
        type="text"
        placeholder="제목을 작성해주세요.(20자 이내)"
        className="form_input mb-[24px] h-[56px]"
        defaultValue={status === BoardStatus.ACTIVE ? title : ""}
        value={titleText}
        onChange={e => {
          setTitleText(e.target.value);
        }}
      />
      <div className="title">본문</div>
      <input
        type="text"
        placeholder="본문을 작성해 주세요."
        className="form_input mb-[24px] h-[131px]"
        defaultValue={status === BoardStatus.ACTIVE ? content : ""}
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
        defaultValue={status === BoardStatus.ACTIVE ? tag1 : ""}
        value={tag1Text}
        onChange={e => {
          setTag1Text(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="2. 이 콘텐츠의 키워드는 무엇인가요?(7자 이내)"
        className="form_input mb-[24px] h-[56px]"
        defaultValue={status === BoardStatus.ACTIVE ? tag2 : ""}
        value={tag2Text}
        onChange={e => {
          setTag2Text(e.target.value);
        }}
      />
      <div className="flex items-center">
        <div className="title flex-1">대표 이미지 업로드</div>
        <button className="file_button">이미지 찾기</button>
      </div>
      <input
        type="text"
        placeholder="파일명"
        className="form_input mb-[24px] h-[48px]"
        defaultValue={status === BoardStatus.ACTIVE ? thumbnail : ""}
        value={thumbnailText}
        onChange={e => {
          setThumbnailText(e.target.value);
        }}
      />
      <div className="flex items-center">
        <div className="title flex-1">첨부파일 업로드</div>
        <button className="file_button">파일 찾기</button>
      </div>
      <input
        type="text"
        placeholder="파일명"
        className="form_input mb-[24px] h-[48px]"
        defaultValue={status === BoardStatus.ACTIVE ? file : ""}
        value={fileText}
        onChange={e => {
          setFileText(e.target.value);
        }}
      />
      <div className="flex items-center justify-center">
        {status === BoardStatus.ACTIVE ? (
          <>
            <button className="button_outlined mr-10 min-w-[175px] max-w-[350px]">임시 저장</button>
            <button className="button min-w-[175px] max-w-[350px]">작성 완료</button>
          </>
        ) : (
          <>
            <button className="button_outlined mr-10 min-w-[175px] max-w-[350px]">취소</button>
            <button className="button min-w-[175px] max-w-[350px]">수정 완료</button>
          </>
        )}
      </div>
    </form>
  );
}

export default Write;
