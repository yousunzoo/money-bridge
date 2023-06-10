import React from "react";
import Link from "next/link";
import Image from "next/image";

function Intro({introData}: any) {
  const { id, profile, name, branchName, msg, companyName, reserveCount, reviewCount } = introData;
  return (
    <div id={id}>
      <div>
        <div>로고</div>
        <Image src={profile} alt="프로필 이미지" width={30} height={30}></Image>
        <div>{msg}</div>
      </div>
      <div>
        <div>{name} PB</div>
        <div>
          {companyName}
          {branchName}점
        </div>
        <div>
          <div>총 상담횟수{reserveCount}회</div>
          <div>상담후기 {reviewCount}건</div>
        </div>
      </div>
      <div>
        <Link href="/detail">PB정보</Link>
        <Link href="/detail/content">콘텐츠</Link>
      </div>
    </div>
  );
}

export default Intro;
