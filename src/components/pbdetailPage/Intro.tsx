"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRoleStore } from "@/store/roleStore";
import BlurModal from "@/components/common/Modal/BlurModal";
import ButtonModal from "@/components/common/ButtonModal";
import { usePathname, useRouter } from "next/navigation";

function Intro({ introData, edit }: { introData: any, edit: boolean }) {
  const { id, profile, name, isBookmarked, branchName, msg, companyName, companyLogo, reserveCount, reviewCount } =
    introData;
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const { getRole } = useRoleStore();
  const pathname = usePathname();
  const router = useRouter();
  const base = "http://localhost:3000";
  const urlToCopy = base + pathname;

  const goToCompany = () => {
    console.log("goToCompany");
  };
  const bookMarkHandler = () => {
    setIsBookmarkOpen(true);
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };
  const shareHandler = () => {
    setIsShareOpen(true);
    setIsShare(!isShare);
  };
  const shareContents = {
    content: "PB 정보 공유하기",
    confirmText: "카카오톡으로 공유",
    cancelText: "링크 복사",
    confirmFn: () => {
      console.log("카카오톡으로 공유");
      setIsShareOpen(false);
    },
    cancelFn: () => {
      setIsShareOpen(false);
      setIsCopy(!isCopy);
      setIsCopyOpen(true);
    },
  };

  const copyContents = {
    content: "링크가 복사되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      navigator.clipboard.writeText(urlToCopy);
      setIsCopyOpen(false);
    },
  };

  const bookMarkContents = {
    content: "북마크에 추가되었습니다.",
    confirmText: "확인",
    cancelText: "북마크 바로가기",
    confirmFn: () => {
      setIsBookmarkOpen(false);
    },
    cancelFn: () => {
      router.push("/bookmark/pb");
      setIsBookmarkOpen(false);
    },
  };

  const isEdit = edit ? (
    <div>
      <div>이미지 변경하기</div>
    </div>
  ) : null;

  return (
    <div id={id}>
      <div className="relative">
        <button onClick={goToCompany} className="absolute z-10 h-[42px] w-[112px]">
          {companyLogo}
        </button>
        {isEdit}
        <div className="absolute h-full w-full bg-gradient-to-t from-black from-0%"></div>
        <div className="absolute bottom-[74px] left-[19px] h-[70px] w-[285px] text-[26px] text-white">{msg}</div>
        <Image
          src={profile}
          alt="프로필 이미지"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {getRole() === "" ? (
        <BlurModal />
      ) : (
        <>
          <div>
            <div>{name} PB</div>
            <div>
              {companyName}
              {branchName}
            </div>
            <div>
              <div>총 상담횟수{reserveCount ? reserveCount : 0}회</div>
              <div>상담후기 {reviewCount ? reviewCount : 0}건</div>
            </div>
            <div>
              <button onClick={shareHandler}>공유 아이콘</button>
              <button onClick={bookMarkHandler}>{isBookmark ? "북마크 해제" : "북마크"}</button>
            </div>
          </div>
          <div>
            <Link href="/detail">PB정보</Link>
            <Link href="/detail/content">콘텐츠</Link>
          </div>
        </>
      )}
      {isShareOpen && isShare && (
        <ButtonModal modalContents={shareContents} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      )}
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
      {isBookmarkOpen && isBookmark && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkOpen} setIsOpen={setIsBookmarkOpen} />
      )}
    </div>
  );
}

export default Intro;
