"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function BlurModal() {
  const pathname = usePathname();

  return (
    <div className="custom-gradient fixed top-[40px] flex h-full min-w-[768px] flex-col">
      <div className="mb-16 mt-[430px] flex h-full w-full flex-col items-center text-base font-bold text-white">
        <div className="mb-[31px] flex w-full items-center justify-center">
          {pathname === "/detail/info" ? (
            <div className="flex items-center justify-center text-center">
              회원가입 하고
              <br />
              프라이빗 뱅커의 프로필과 포트폴리오를 확인하세요
            </div>
          ) : (
            <div className="flex items-center justify-center text-center">
              회원가입 후<br />
              프라이빗 뱅커의 콘텐츠를 읽어보실 수 있습니다.
            </div>
          )}
        </div>
        <Link className="flex h-[52px] w-[195px] items-center justify-center rounded-md bg-primary-normal" href="/join">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default BlurModal;