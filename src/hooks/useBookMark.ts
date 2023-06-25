import { useState } from "react";
import { useRouter } from "next/navigation";
import { postBookMarkContent, deleteBookMarkContent } from "@/app/apis/services/user";

const useBookMark = (isBookmarked: boolean, link: string, id: number) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkedOpen, setIsBookmarkedOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setIsBookmarkedOpen(true);
    if (isBookmarked) {
      setIsBookmark(false);
      deleteBookMarkContent(id);
    } else {
      setIsBookmark(true);
      postBookMarkContent(id);
    }
  };

  const bookMarkContents = {
    content: "북마크에 추가되었습니다.",
    confirmText: "확인",
    cancelText: "북마크 바로가기",
    confirmFn: () => {
      setIsBookmarkedOpen(false);
    },
    cancelFn: () => {
      router.push(link);
      setIsBookmarkedOpen(false);
    },
  };

  return { isBookmark, isBookmarkedOpen, setIsBookmarkedOpen, bookMarkHandler, bookMarkContents };
};

export default useBookMark;
