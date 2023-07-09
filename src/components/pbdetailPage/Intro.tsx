import React from "react";
import Image from "next/image";
import ButtonModal from "@/components/common/ButtonModal";
import { usePathname, useRouter } from "next/navigation";
import usePbBookMark from "@/hooks/usePbBookMark";
import useShare from "@/hooks/useShare";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import share from "/public/assets/images/icon/share.svg";
import PbContentButton from "@/components/pbdetailPage/PbContentButton";
import { IIntroData } from "@/types/pb";
import { ILoginedUserInfo } from "@/types/common";

function Intro({ introData, userData }: { introData: IIntroData; userData: ILoginedUserInfo; }) {
  const { id, profile, name, isBookmarked, branchName, msg, companyId, companyLogo, reserveCount, reviewCount } =
    introData;

  const pathname: string = usePathname();
  const router = useRouter();
  const base: string = "https://money-bridge.vercel.app";
  const urlToCopy: string = base + pathname;

  const { isBookmark, isBookmarkedOpen, setIsBookmarkedOpen, bookMarkHandler, bookMarkContents } = usePbBookMark(
    isBookmarked,
    "/bookmark/pb",
    "getPbProfile",
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
    router.push(`pblist?company=${companyId}`);
  };

  return (
    <>
      <div className="relative">
        <Image
          src={companyLogo}
          alt="증권사 로고"
          width={42}
          height={42}
          className="absolute left-2 top-5 z-10 h-[42px] cursor-pointer object-contain"
          onClick={goToCompany}
          priority
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-black from-0%"></div>
        <p className="absolute bottom-[74px] left-[19px] h-[70px] w-[285px] whitespace-normal text-[26px] text-white">
          {msg}
        </p>
        <Image
          src={profile}
          alt="프로필 이미지"
          width={0}
          height={390}
          sizes="100vw"
          className="h-[390px] w-full object-contain"
          priority
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-4 mt-[23px] text-2xl font-bold">{name} PB</p>
        <p className="mb-[18px] font-medium">{branchName}</p>
        <div className="mb-3 flex h-[34px] w-[200px] items-center justify-center rounded-md bg-background-secondary text-[10px]">
          <div className="flex pr-[15px]">
            <p className="font-bold">총 상담횟수</p>
            <div>&nbsp;&nbsp;{reserveCount ? reserveCount : 0}회</div>
          </div>
          <div className="h-full w-[2px] bg-white"></div>
          <div className="flex pl-[14px]">
            <p className="font-bold">상담후기</p>
            <div>&nbsp;&nbsp;{reviewCount ? reviewCount : 0}건</div>
          </div>
        </div>
        <div className="mb-5 flex w-full justify-end">
          <button onClick={shareHandler} className="flex w-9 justify-end">
            <Image src={share} alt="공유하기" width={25} height={25} priority className="h-[25px] w-[25px]" />
          </button>
          {userData?.role === "USER" && (
            <button onClick={() => bookMarkHandler(id)} className="flex w-9 justify-end">
              {isBookmarked ? (
                <Image
                  src={bookmark_filled}
                  alt="북마크 활성화"
                  width={24}
                  height={25}
                  priority
                  className="h-[25px] w-[24px]"
                />
              ) : (
                <Image src={bookmark} alt="북마크" width={24} height={25} priority className="h-[25px] w-[24px]" />
              )}
            </button>
          )}
        </div>
        <PbContentButton
          path1={`/detail/info/${id}`}
          path2={`/detail/content/${id}`}
          text1="PB정보"
          text2="콘텐츠"
          mainStyle="mb-6 flex h-[52px] w-full items-center border-[1px] border-solid border-primary-normal text-base font-bold"
          subStyle1="flex h-full w-full items-center justify-center"
          subStyle2="flex h-full w-full items-center justify-center"
        />
      </div>

      {isShareOpen && isShare && (
        <ButtonModal modalContents={shareContents} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      )}
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
      {isBookmark && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkedOpen} setIsOpen={setIsBookmarkedOpen} />
      )}
    </>
  );
}

export default Intro;
