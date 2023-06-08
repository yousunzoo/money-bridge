"use client";
import Image from "next/image";
import React, { useState } from "react";

function PostCardItem({ key, router }: any) {
  const [isBookmark, setIsBookmark] = useState(false);
  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
  };
  return (
    <>
      <div
        className="mx-auto my-4 flex h-48 w-4/5 flex-col rounded-xl shadow-md"
        key={key?.id}
        onClick={() => router.push(`/loungePage/content/${key.id}`)}
      >
        <div className="flex">
          <div>
            <div>
              {key?.tag1}
              태그1
              {key?.tag2}
              태그2
            </div>
            <div>{key?.title}제목</div>
          </div>
          <button onClick={bookMark}>{key?.isBookmark ? "북마크 해제" : "북마크"}북마크</button>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <div>
              {key?.pbName}/{key?.career}이름/경력
            </div>
            <div>{key?.msg}한줄 소개</div>
          </div>
          <div className="flex">
            <Image src={key?.companyLogo} alt="증권사로고" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCardItem;
