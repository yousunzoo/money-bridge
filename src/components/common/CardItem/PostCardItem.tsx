"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function PostCardItem(item: any) {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);
  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
  };

  const goTOLounge = () => {
    router.push(`/loungePage/content/${item.id}`);
  };

  return (
    <li className="mx-auto my-4 flex h-48 w-4/5 flex-col rounded-xl shadow-md" onClick={goTOLounge}>
      <div className="flex">
        <div>
          <div>
            {item.tag1}
            {item.tag2}
          </div>
          <div>{item.title}</div>
        </div>
        {/* 비로그인시 안보여야함 나중에 수정 */}
        <button onClick={bookMark}>{item.isBookmark ? "북마크 해제" : "북마크"}</button>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div>
            {item.pbName}/{item.career}
          </div>
          <div>{item.msg}</div>
        </div>
        <div className="flex">
          {/* <Image src={item.companyLogo} alt="증권사로고" width={50} height={50} /> */}
        </div>
      </div>
    </li>
  );
}

export default PostCardItem;
