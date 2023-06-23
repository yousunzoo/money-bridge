import { useState } from "react";
import { useRouter } from "next/navigation";
import { setBookMarkContent, deleteBookMarkContent } from "@/app/apis/services/auth";

const useContentBookMark = (isBookmarked: any, link: any, id: any) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const router = useRouter();
  

  const bookMarkHandler = () => {
    setIsBookmarkOpen(true);
    if (isBookmarked) {
      setIsBookmark(false);
      setBookMarkContent(id);
    } else {
      setIsBookmark(true);
      deleteBookMarkContent(id);
    }
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

export default useContentBookMark;
