"use client";

import TopNav from "@/components/common/TopNav";
import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import React, { MouseEvent } from "react";
// import myPageData from "@/mocks/seon/userMy.json";
import myPageData from "@/mocks/seon/pbMy.json";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LINK_STYLE = "flex items-center text-sm justify-between py-2 mb-2 pr-1";
const BUTTON_STYLE = "gray-heavy text-xs underline decoration-gray-heavy decoration-1";
const nextIcon = "/assets/images/nextIcon.svg";
function MyPage() {
  const router = useRouter();
  // const { role, name } = useRoleStore();
  const user = { role: "pb", name: "홍김박" };
  // role에 따라 마이페이지 API 요청
  const userData = myPageData.data as any;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const id = e.target.dataset.id;
    if (id === "secession") router.push("/secession");
  };

  return (
    <>
      <TopNav title="마이페이지" hasBack={true} />
      {user.role === "user" ? <UserInfo data={userData} /> : <PBInfo data={userData} />}
      <section className="mb-10">
        <h3 className="mb-2 text-xl font-bold">나의 관리</h3>
        <ul>
          {user.role === "user" && (
            <li>
              <Link href="/my/propensity" className={LINK_STYLE}>
                <span>나의 투자 성향</span>
                <Image src={nextIcon} width={14} height={14} alt="나의 투자 성향 이동" />
              </Link>
            </li>
          )}
          <li>
            <Link href="/my/editInfo" className={LINK_STYLE}>
              <span>개인 정보 설정</span>
              <Image src={nextIcon} width={14} height={14} alt="개인 정보 설정 이동" />
            </Link>
          </li>
        </ul>
      </section>
      <section className="mb-20">
        <h3 className="mb-2 text-xl font-bold">고객센터</h3>
        <ul>
          <li>
            <Link href="/customerService/faq" className={LINK_STYLE}>
              <span>자주 묻는 질문</span>
              <Image src={nextIcon} width={14} height={14} alt="자주 묻는 질문 이동" />
            </Link>
          </li>
          <li>
            <Link href="/customerService/notice" className={LINK_STYLE}>
              <span>개인 정보 설정</span>
              <Image src={nextIcon} width={14} height={14} alt="개인 정보 설정 이동" />
            </Link>
          </li>
        </ul>
      </section>
      <section onClick={handleClick} className="flex flex-col items-start gap-6">
        <button data-id="terms" className={BUTTON_STYLE}>
          서비스 약관
        </button>
        <button data-id="secession" className={BUTTON_STYLE}>
          탈퇴하기
        </button>
        <button data-id="logout" className={BUTTON_STYLE}>
          로그아웃
        </button>
      </section>
    </>
  );
}

export default MyPage;
