import Image from "next/image";
import Link from "next/link";
import React from "react";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import share from "/public/assets/images/icon/share.svg";
import useContentBookMark from "@/hooks/useContentBookMark";
import useShare from "@/hooks/useShare";
import { usePathname, useRouter } from "next/navigation";
import ButtonModal from "@/components/common/ButtonModal";
import user_profile from "/public/assets/images/profile.svg";
import "@/styles/content.css";
import edit from "/public/assets/images/icon/edit.svg";
import trash from "/public/assets/images/icon/delete.svg";
import { getMyId } from "@/utils/pbMyId";
import { deleteContent } from "@/app/apis/services/common";
import useDelete from "@/hooks/useDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ILoginedUserInfo } from "@/types/common";
import { IContentData } from "@/types/contents";
import { timeShow } from "@/utils/timeShow";

function Content({ contentData, userData }: { contentData: IContentData; userData: ILoginedUserInfo }) {
  const { id, thumbnail, title, content, createdAt, updatedAt, tag1, tag2, pbId, name, isBookmarked, profile } =
    contentData;
  const pathname: string = usePathname();
  const router = useRouter();
  const base: string = "https://money-bridge.vercel.app";
  const urlToCopy: string = base + pathname;
  const myId: number | undefined = getMyId(userData?.role, userData?.id, pbId);
  const queryClient = useQueryClient();

  const { mutate: deletecontent } = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: AxiosError) => {},
  });

  const { isBookmark, isBookmarkedOpen, setIsBookmarkedOpen, bookMarkHandler, bookMarkContents } = useContentBookMark(
    isBookmarked,
    "/bookmark/content",
    id,
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
  } = useShare(urlToCopy, title, content, thumbnail);
  const { isDeleteOpen, setIsDeleteOpen, deleteHandler, deleteContents } = useDelete();
  return (
    <div>
      <div className="card mt-[33px] flex h-[52px] flex-row items-center rounded-md bg-white font-bold">
        <Image
          src={profile ? profile : user_profile}
          alt="프로필"
          width={36}
          height={36}
          className="mr-[12px] h-[36px] w-[36px] rounded-full"
        />
        <div className="flex-1 text-[17px]">{name} PB</div>
        <Link
          href={`/detail/info/${pbId}`}
          className="flex-3 flex h-full w-[112px] items-center justify-center rounded-r-md bg-secondary-heavy text-base text-white"
        >
          프로필 보기
        </Link>
      </div>
      <div className="mt-[24px]">
        <div className="text-xs font-bold">
          {tag1}・{tag2}
        </div>
        <div className="mb-[11px] text-2xl font-bold">{title}</div>
        <div className="mb-[15px] flex">
          <div className="font-xs flex-1">{timeShow(createdAt, updatedAt)}</div>
          <div className="flex">
            {myId && (
              <>
                <button onClick={() => router.push("/contents/edit")} className="flex w-9 justify-end">
                  <Image src={edit} alt="수정" width={24} height={24} className="icon" />
                </button>
                <button onClick={() => deleteHandler(id, deletecontent)} className="flex w-9 justify-end">
                  <Image src={trash} alt="삭제" width={24} height={24} className="icon" />
                </button>
              </>
            )}
            <button onClick={shareHandler} className="flex w-9 justify-end">
              <Image src={share} alt="공유" width={24} height={24} className="icon" />
            </button>
            <button onClick={bookMarkHandler} className="flex w-9 justify-end">
              {isBookmark ? (
                <Image src={bookmark_filled} alt="북마크 활성화" width={24} height={24} className="icon" />
              ) : (
                <Image src={bookmark} alt="북마크" width={24} height={24} className="icon" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-[103px] p-4 text-sm">{content}</div>
      </div>
      {isShareOpen && isShare && (
        <ButtonModal modalContents={shareContents} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      )}
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
      {isBookmarkedOpen && isBookmark && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkedOpen} setIsOpen={setIsBookmarkedOpen} />
      )}
      {isDeleteOpen && <ButtonModal modalContents={deleteContents} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />}
    </div>
  );
}

export default Content;
