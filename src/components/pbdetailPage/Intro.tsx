import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlurModal from "@/components/common/Modal/BlurModal";
import ButtonModal from "@/components/common/ButtonModal";
import { usePathname, useRouter } from "next/navigation";
import useBookMark from "@/hooks/useBookMark";
import useShare from "@/hooks/useShare";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import share from "/public/assets/images/icon/share.svg";

function Intro({ introData, role }: { introData: any; role: any }) {
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
        <button onClick={goToCompany} className="absolute h-[42px] w-[112px]">
          {companyLogo}
        </button>
        <div className="absolute h-full w-full bg-gradient-to-t from-black from-0%"></div>
        <div className="absolute bottom-[74px] left-[19px] h-[70px] w-[285px] text-[26px] text-white">{msg}</div>
        <Image src={profile} alt="프로필 이미지" width={0} height={0} sizes="100vw" className="h-[390px] w-full" />
      </div>
      {role === "" ? (
        <BlurModal />
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4 mt-[23px] text-2xl font-bold">{name} PB</div>
          <div className="mb-[18px] font-medium">
            {companyName}&nbsp;{branchName}
          </div>
          <div className="mb-3 flex h-[34px] w-[200px] items-center justify-center rounded-md bg-background-secondary text-[10px]">
            <div className="flex pr-[15px]">
              <div className="font-bold">총 상담횟수</div>
              <div>&nbsp;&nbsp;{reserveCount ? reserveCount : 0}회</div>
            </div>
            <div className="h-full w-[2px] bg-white"></div>
            <div className="flex pl-[14px]">
              <div className="font-bold">상담후기</div>
              <div>&nbsp;&nbsp;{reviewCount ? reviewCount : 0}건</div>
            </div>
          </div>
          <div className="mb-5 flex w-full justify-end">
            <button onClick={shareHandler} className="flex w-9 justify-end">
              <Image src={share} alt="공유하기" />
            </button>
            <button onClick={bookMarkHandler} className="flex w-9 justify-end">
              {isBookmark ? <Image src={bookmark_filled} alt="북마크 활성화" /> : <Image src={bookmark} alt="북마크" />}
            </button>
          </div>
          <div className="mb-6 flex h-[52px] w-full items-center border-[1px] border-solid border-primary-normal text-base font-bold">
            <Link
              href="/detail/info"
              className={`flex h-full w-full items-center justify-center ${
                pathname === "/detail/info" ? "bg-primary-normal text-white" : ""
              }`}
            >
              PB정보
            </Link>
            <Link
              href="/detail/content"
              className={`flex h-full w-full items-center justify-center ${
                pathname === "/detail/content" ? "bg-primary-normal text-white" : ""
              }`}
            >
              콘텐츠
            </Link>
          </div>
        </div>
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
