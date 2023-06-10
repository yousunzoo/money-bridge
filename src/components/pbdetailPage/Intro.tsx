import React from "react";
import Link from "next/link";

function Intro() {
  return (
    <div>
      <div>
        <div>로고</div>
        <div>사진</div>
        <div>소개</div>
      </div>
      <div>
        <div>이름</div>
        <div>지점</div>
        <div>
          <div>상담</div>
          <div>후기</div>
        </div>
      </div>
      <div>
        <Link href="/detail">분야별</Link>
        <Link href="/detail/content">증권사별</Link>
      </div>
    </div>
  );
}

export default Intro;
