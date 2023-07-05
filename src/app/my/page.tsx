"use client";

import TopNav from "@/components/common/TopNav";
import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonModal from "@/components/common/ButtonModal";
import { useMyPageCheck } from "@/hooks/useMyPageCheck";
import { Skeleton } from "antd";
import { redirect } from "next/navigation";

const LINK_STYLE = "flex items-center text-sm justify-between py-2 mb-2 pr-1";
const BUTTON_STYLE = "gray-heavy text-xs underline decoration-gray-heavy decoration-1";
const nextIcon = "/assets/images/nextIcon.svg";

function MyPage() {
  const { loginedUserInfo, isLoading, isError, handleLogout, isOpen, setIsOpen, modalContents } = useMyPageCheck();

  // useEffect(() => {
  //   if (!loginedUserInfo && isError) {
  //     redirect("/login");
  //   }
  // }, [loginedUserInfo, isError]);

  if (isLoading || !loginedUserInfo) return null;
  return (
    <>
      <TopNav title="마이페이지" hasBack={true} />
      <Skeleton className="mb-10" active loading={isLoading} />
      {loginedUserInfo.role === "USER" && <UserInfo />}
      {loginedUserInfo.role === "PB" && <PBInfo />}
      <section className="mb-10">
        <h3 className="mb-2 text-xl font-bold">나의 관리</h3>
        <ul>
          <li>
            <Link href="/my/editInfo" className={LINK_STYLE}>
              <span>개인 정보 설정</span>
              <Image src={nextIcon} width={14} height={14} alt="개인 정보 설정 이동" />
            </Link>
          </li>
          {loginedUserInfo.role === "USER" && (
            <li>
              <Link href="/my/propensity" className={LINK_STYLE}>
                <span>나의 투자 성향</span>
                <Image src={nextIcon} width={14} height={14} alt="나의 투자 성향 이동" />
              </Link>
            </li>
          )}
        </ul>
      </section>
      <section className="mb-20">
        <h3 className="mb-2 text-xl font-bold">고객센터</h3>
        <ul>
          <li>
            <Link href="/my/faq" className={LINK_STYLE}>
              <span>자주 묻는 질문</span>
              <Image src={nextIcon} width={14} height={14} alt="자주 묻는 질문 이동" />
            </Link>
          </li>
          <li>
            <Link href="/my/notice" className={LINK_STYLE}>
              <span>공지사항</span>
              <Image src={nextIcon} width={14} height={14} alt="공지사항 이동" />
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex flex-col items-start gap-6">
        <Link href="/my/terms" className={BUTTON_STYLE}>
          서비스 약관
        </Link>
        <Link href="/withdraw" className={BUTTON_STYLE}>
          탈퇴하기
        </Link>
        <button onClick={handleLogout} className={BUTTON_STYLE}>
          로그아웃
        </button>
      </section>
      {isOpen && <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default MyPage;
