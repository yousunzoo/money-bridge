"use client";
import Image from "next/image";
import React, { useState } from "react";

function PostItem({ key, router }: any) {
  const [isBookmark, setIsBookmark] = useState(false);
  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
  };
  return (
    <>
      <div id={key.id} key={key.id} onClick={() => router.push(`/loungePage/content/${key.id}`)}>
        <div>
          <div>
            <div>
              {key.tag1}
              {key.tag2}
              태그
            </div>
            <div>{key.title}제목</div>
          </div>
          <button onClick={bookMark}>북마크</button>
        </div>
        <div>
          <div>
            <div>
              {key.pbName}/{key.career}이름/경력
            </div>
            <div>{key.msg}한줄 소개</div>
          </div>
          <div>
            <Image src={key.companyLogo} alt="증권사로고" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;
