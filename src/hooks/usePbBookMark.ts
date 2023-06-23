import { useState } from "react";
import { useRouter } from "next/navigation";
import { postBookMarkPB, deleteBookMarkPB } from "@/app/apis/services/user";


const usePbBookMark = (isBookmarked: boolean, link: string, id: number) => {
  
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const router = useRouter();

  const bookMarkHandler = () => {
    setIsBookmarkOpen(true);
    if (isBookmark) {
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
      setIsBookmarkOpen(false);
    },
    cancelFn: () => {
      router.push(link);
      setIsBookmarkOpen(false);
    },
  };

  return { isBookmark, isBookmarkOpen, setIsBookmarkOpen, bookMarkHandler, bookMarkContents };
};

export default usePbBookMark;
