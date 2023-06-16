import { useState } from "react";
import { useRouter } from "next/navigation";

const useBookMark = (isBookmarked: any, link: any) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setIsBookmarkOpen(true);
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  const bookMarkContents = {
    content: "북마크에 추가되었습니다.",
    confirmText: "확인",
    cancelText: "북마크 바로가기",
    confirmFn: () => {
      setIsBookmarkOpen(false);
    },
    cancelFn: () => {
      router.push(link);
      setIsBookmarkOpen(false);
    },
  };

  return { isBookmark, isBookmarkOpen, setIsBookmarkOpen, bookMarkHandler, bookMarkContents };
};

export default useBookMark;
