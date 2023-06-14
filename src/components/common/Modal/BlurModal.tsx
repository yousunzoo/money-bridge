"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function BlurModal() {
  const pathname = usePathname();

  return (
    <div className="z-20 fixed top-[40px] flex h-full w-[425px] flex-col bg-transparent bg-gradient-to-b from-transparent to-black">
      <div className="mb-16 mt-[430px] flex h-full w-full flex-col items-center">
        <div className="flex h-24 w-full items-center justify-center text-white">
          {pathname === "/detail" ? (
            <>회원가입 하고 프라이빗 뱅커의 프로필과 포트폴리오를 확인하세요</>
          ) : (
            <>회원가입 후 프라이빗 뱅커의 콘텐츠를 읽어보실 수 있습니다.</>
          )}
        </div>
        <Link className="h-16 w-56 bg-white" href="/join">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default BlurModal;
