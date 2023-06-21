"use client";

import TopNav from "@/components/common/TopNav";
import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import ButtonModal from "@/components/common/ButtonModal";
import { IModalContents } from "@/types/common";
import { useLogout } from "@/hooks/useLogout";

const LINK_STYLE = "flex items-center text-sm justify-between py-2 mb-2 pr-1";
const BUTTON_STYLE = "gray-heavy text-xs underline decoration-gray-heavy decoration-1";
const nextIcon = "/assets/images/nextIcon.svg";

function MyPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const logout = useLogout();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState<IModalContents>({ content: "", confirmText: "" });

  useEffect(() => {
    setMounted(true);
    if (!user.role) {
      setIsOpen(true);
      setModalContents({
        content: "로그인이 필요한 페이지입니다.",
        confirmText: "로그인으로 이동",
        confirmFn: () => router.push("/login"),
      });
    }
  }, [user]);

  const handleAuthorizationError = () => {
    setIsOpen(true);
    setModalContents({
      content: "로그인이 필요한 페이지입니다.",
      confirmText: "로그인으로 이동",
      confirmFn: () => router.push("/login"),
    });
  };

  const handleLogout = () => {
    setIsOpen(true);
    setModalContents({
      content: "로그아웃 하시겠습니까?",
      confirmText: "로그아웃",
      cancelText: "취소",
      confirmFn: () => {
        logout();
      },
    });
  };

  if (!mounted) return;

  return (
    <>
      <TopNav title="마이페이지" hasBack={true} />
      {user.role === "USER" && <UserInfo handleAuthorizationError={handleAuthorizationError} />}
      {user.role === "PB" && <PBInfo handleAuthorizationError={handleAuthorizationError} />}
      <section className="mb-10">
        <h3 className="mb-2 text-xl font-bold">나의 관리</h3>
        <ul>
          <li>
            <Link href="/my/editInfo" className={LINK_STYLE}>
              <span>개인 정보 설정</span>
              <Image src={nextIcon} width={14} height={14} alt="개인 정보 설정 이동" />
            </Link>
          </li>
          {user && user.role === "USER" && (
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
