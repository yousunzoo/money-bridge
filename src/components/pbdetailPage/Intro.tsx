"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRoleStore } from "@/store/roleStore";
import BlurModal from "@/components/common/Modal/BlurModal";
import ButtonModal from "@/components/common/ButtonModal";
import { usePathname, useRouter } from "next/navigation";
import useBookMark from "@/hooks/useBookMark";
import useShare from "@/hooks/useShare";

function Intro({ introData, edit }: { introData: any; edit: boolean }) {
  const {
    profile,
    name,
    isBookmarked,
    branchName,
    msg,
    companyId,
    companyName,
    companyLogo,
    reserveCount,
    reviewCount,
  } = introData;
  const { getUser } = useRoleStore();
  const pathname = usePathname();
  const router = useRouter();
  const base = "http://localhost:3000";
  const urlToCopy = base + pathname;
  const { isBookmark, isBookmarkOpen, setIsBookmarkOpen, bookMarkHandler, bookMarkContents } = useBookMark(
    isBookmarked,
    "/bookmark/pb",
  );
  const {
    isShare,
    isShareOpen,
    setIsShareOpen,
    shareHandler,
    shareContents,
    isCopy,
    isCopyOpen,
    setIsCopyOpen,
    copyContents,
  } = useShare(urlToCopy, name + "PB", msg, profile);

  const goToCompany = () => {
    router.push(`/pblist/financial/${companyId}`);
  };

  return (
    <div>
      <div className="relative">
        <button onClick={goToCompany} className="absolute z-10 h-[42px] w-[112px]">
          {companyLogo}
        </button>
        {edit ? <button>이미지 변경하기</button> : null}
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
      {getUser().role === "" ? (
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
            {edit ? (
              <div>기본정보 수정은 마이페이지 개인정보수정에서 가능합니다.</div>
            ) : (
              <div>
                <button onClick={shareHandler}>공유 아이콘</button>
                <button onClick={bookMarkHandler}>{isBookmark ? "북마크 해제" : "북마크"}</button>
              </div>
            )}
          </div>
          <div>
            <Link href="/detail">PB정보</Link>
            {/* todo: 수정 중이면 콘텐츠 누르는거 안되게 */}
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
