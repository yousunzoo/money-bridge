import { useState } from "react";
import { useRouter } from "next/navigation";
import { postBookMarkPB, deleteBookMarkPB } from "@/app/apis/services/user";

const usePbBookMark = (isBookmarked: boolean, link: string, id: number) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkedOpen, setIsBookmarkedOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setIsBookmarkedOpen(true);
    if (isBookmarked) {
      setIsBookmark(false);
      deleteBookMarkPB(id);
    } else {
      setIsBookmark(true);
      postBookMarkPB(id);
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

export default usePbBookMark;
